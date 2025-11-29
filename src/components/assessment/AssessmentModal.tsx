// src/components/assessment/AssessmentModal.tsx

'use client';

/**
 * SV0040 - Modal contenitore per Test Assessment
 * 
 * Orchestrazione:
 * - Renderizza componente corretto in base a testState.status
 * - Gestisce overlay e chiusura
 * - Connette TestProvider ai componenti UI
 */

import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTest } from '@/components/providers/test-provider';
import { Question } from '@/types/assessment';
import { AssessmentLoading } from './AssessmentLoading';
import { AssessmentStep } from './AssessmentStep';
import { AssessmentResult } from './AssessmentResult';

// ============================================
// TYPES
// ============================================

interface AssessmentModalProps {
  /** Controlla visibilità del modal */
  isOpen: boolean;
  /** Callback per chiudere il modal */
  onClose: () => void;
}

// ============================================
// COMPONENT
// ============================================

export function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
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

  // Gestisce chiusura con reset
  const handleClose = useCallback(() => {
     console.log('[SV0040] 🚪 Closing modal...'); // Aggiungi questo log
    hasStartedRef.current = false; // Reset del flag
    resetTest();
    onClose();
  }, [resetTest, onClose]);

  // Gestisce "Try Again"
  const handleRetry = useCallback(() => {
    hasStartedRef.current = false; // Reset del flag
    resetTest();
    // Piccolo delay per permettere il reset, poi avvia nuovo test
    setTimeout(() => {
      hasStartedRef.current = true;
      startTest();
    }, 100);
  }, [resetTest, startTest]);

  // Avvia il test quando il modal si apre (solo una volta)
  useEffect(() => {
    if (isOpen && testState.status === 'idle' && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startTest();
    }
    
    // Reset del flag quando il modal si chiude
    if (!isOpen) {
      hasStartedRef.current = false;
    }
  }, [isOpen, testState.status, startTest]);

  // Estrae le 2 domande per lo step corrente
  const getStepQuestions = (): [Question, Question] | null => {
    const { currentStep, questions } = testState;
    const startIndex = currentStep * 2;
    const stepQuestions = questions.slice(startIndex, startIndex + 2);
    
    if (stepQuestions.length !== 2) {
      console.warn(`[SV0040] ⚠️ Expected 2 questions for step ${currentStep}, got ${stepQuestions.length}`);
      return null;
    }
    
    return stepQuestions as [Question, Question];
  };

  // Blocca scroll del body quando modal è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Gestisce tasto ESC per chiudere
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  // Renderizza il contenuto in base allo stato
  const renderContent = () => {
    switch (testState.status) {
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              className="relative bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-6">
                {renderContent()}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}