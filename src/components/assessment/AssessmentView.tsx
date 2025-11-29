// src/components/assessment/AssessmentView.tsx

'use client';

/**
 * SV0043 - Assessment View (contenuto sostitutivo, non modal)
 * 
 * Renderizzato al posto di WelcomeContent quando un test è in corso.
 * Evita problemi di overlay, z-index e conflitti Framer Motion.
 */

import { useEffect, useCallback, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTest } from '@/components/providers/test-provider';
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

  // Ref per evitare doppia chiamata a startTest
  const hasStartedRef = useRef(false);

  // Avvia il test al mount (solo una volta)
  useEffect(() => {
    if (testState.status === 'idle' && !hasStartedRef.current) {
      console.log('[SV0043] 🚀 Starting test from AssessmentView...');
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
    console.log('[SV0043] 🚪 Closing assessment...');
    hasStartedRef.current = false;
    resetTest();
  }, [resetTest]);

  // Gestisce "Try Again"
  const handleRetry = useCallback(() => {
    console.log('[SV0043] 🔄 Retrying assessment...');
    hasStartedRef.current = false;
    resetTest();
    setTimeout(() => {
      hasStartedRef.current = true;
      startTest();
    }, 100);
  }, [resetTest, startTest]);

  // Estrae le 2 domande per lo step corrente
  const getStepQuestions = (): [Question, Question] | null => {
    const { currentStep, questions } = testState;
    const startIndex = currentStep * 2;
    const stepQuestions = questions.slice(startIndex, startIndex + 2);
    
    if (stepQuestions.length !== 2) {
      console.warn(`[SV0043] ⚠️ Expected 2 questions, got ${stepQuestions.length}`);
      return null;
    }
    
    return stepQuestions as [Question, Question];
  };

  // Renderizza il contenuto in base allo stato
  const renderContent = () => {
    switch (testState.status) {
      case 'idle':
      case 'loading':
        return <AssessmentLoading />;

      case 'in-progress': {
        const stepQuestions = getStepQuestions();
        if (!stepQuestions) {
          return <AssessmentLoading />;
        }
        
        return (
          <AssessmentStep
            stepIndex={testState.currentStep}
            questions={stepQuestions}
            answers={testState.answers}
            onAnswer={answerQuestion}
            onNext={nextStep}
            onBack={previousStep}
            isLastStep={testState.currentStep === 4}
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
    <div className="py-8 px-4 max-w-2xl mx-auto animate-fadeIn">
      {/* Header con bottone Back */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          📝 Knowledge Assessment
        </h1>
        
        {testState.status === 'in-progress' && (
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Handbook
          </button>
        )}
      </div>

      {/* Content Container */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        {renderContent()}
      </div>
    </div>
  );
}