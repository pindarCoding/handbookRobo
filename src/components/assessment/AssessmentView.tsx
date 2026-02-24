// src/components/assessment/AssessmentView.tsx

'use client';

/**
 * SV0044 - Assessment View (contenuto sostitutivo, non modal)
 * 
 * Renderizzato al posto del layout normale quando un test è in corso.
 * Aggiornato per 10 step con 1 domanda per step.
 */

import { useEffect, useCallback, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTest } from '@/components/providers/test-provider';
import { useTranslation } from '@/hooks/useTranslation';
import { Question } from '@/types/assessment';
import { AssessmentLoading } from './AssessmentLoading';
import { AssessmentStep } from './AssessmentStep';
import { AssessmentResult } from './AssessmentResult';

// ============================================
// COMPONENT
// ============================================

export function AssessmentView() {
  const {
    testState,
    lastResult,
    startTest,
    answerQuestion,
    nextStep,
    previousStep,
    completeTest,
    resetTest
  } = useTest();
  const { t } = useTranslation();

  // Ref per evitare doppia chiamata a startTest
  const hasStartedRef = useRef(false);

  // Avvia il test al mount (solo una volta)
  useEffect(() => {
    if (testState.status === 'idle' && !hasStartedRef.current) {
      console.log('[SV0044] 🚀 Starting test from AssessmentView...');
      hasStartedRef.current = true;
      startTest();
    }
  }, [testState.status, startTest]);

  // Reset ref quando component unmounts
  useEffect(() => {
    return () => {
      hasStartedRef.current = false;
    };
  }, []);

  // Gestisce chiusura/annullamento
  const handleClose = useCallback(() => {
    console.log('[SV0044] 🚪 Closing assessment...');
    hasStartedRef.current = false;
    resetTest();
  }, [resetTest]);

  // Gestisce "Try Again"
  const handleRetry = useCallback(() => {
    console.log('[SV0044] 🔄 Retrying assessment...');
    hasStartedRef.current = false;
    resetTest();
    setTimeout(() => {
      hasStartedRef.current = true;
      startTest();
    }, 100);
  }, [resetTest, startTest]);

  // Estrae la singola domanda per lo step corrente
  const getStepQuestion = (): Question | null => {
    const { currentStep, questions } = testState;
    return questions[currentStep] || null;
  };

  // Renderizza il contenuto in base allo stato
  const renderContent = () => {
    switch (testState.status) {
      case 'idle':
      case 'loading':
        return <AssessmentLoading />;

      case 'in-progress': {
        const question = getStepQuestion();
        if (!question) {
          return <AssessmentLoading />;
        }
        
        return (
          <AssessmentStep
            stepIndex={testState.currentStep}
            question={question}
            answers={testState.answers}
            onAnswer={answerQuestion}
            onNext={nextStep}
            onBack={previousStep}
            isLastStep={testState.currentStep === 9}
            onComplete={completeTest}
          />
        );
      }

      case 'completed':
        if (!lastResult) {
          return <AssessmentLoading />;
        }
        
        return (
          <AssessmentResult
            result={lastResult}
            onRetry={handleRetry}
            onClose={handleClose}
          />
        );

      default:
        return <AssessmentLoading />;
    }
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto animate-fadeIn">
      {/* Header con bottone Back */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          📝 {t('assessment.title')}
        </h1>
        
        {testState.status === 'in-progress' && (
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('assessment.backToHandbook')}
          </button>
        )}
      </div>

      {/* Content Container */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}