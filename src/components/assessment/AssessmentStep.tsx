// src/components/assessment/AssessmentStep.tsx

'use client';

/**
 * SV0044 - Singolo step del Test Assessment (1 domanda per step)
 * 
 * Mostra:
 * - Background con immagine personaggio
 * - Header con step number e tema
 * - Progress bar
 * - 1 QuestionCard
 * - Navigazione Back/Next
 */

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question, AnswerOption, UserAnswer } from '@/types/assessment';
import { QuestionCard } from './QuestionCard';

// ============================================
// TYPES
// ============================================

interface AssessmentStepProps {
  /** Indice step corrente (0-9) */
  stepIndex: number;
  /** La domanda di questo step */
  question: Question;
  /** Tutte le risposte date finora */
  answers: UserAnswer[];
  /** Callback per risposta */
  onAnswer: (questionCode: string, answer: AnswerOption) => void;
  /** Vai al prossimo step */
  onNext: () => void;
  /** Vai allo step precedente */
  onBack: () => void;
  /** True se siamo all'ultimo step (mostra "Finish" invece di "Next") */
  isLastStep: boolean;
  /** Callback per completare il test (ultimo step) */
  onComplete: () => void;
}

// ============================================
// CONSTANTS
// ============================================

/** Mapping step → info tema (10 step, 2 per tema) */
const STEP_INFO: Record<number, { themeCode: string; themeName: string; emoji: string }> = {
  0: { themeCode: 'T1', themeName: 'Communication', emoji: '💬' },
  1: { themeCode: 'T1', themeName: 'Communication', emoji: '💬' },
  2: { themeCode: 'T2', themeName: 'Diversity', emoji: '🌍' },
  3: { themeCode: 'T2', themeName: 'Diversity', emoji: '🌍' },
  4: { themeCode: 'T3', themeName: 'Digital', emoji: '💻' },
  5: { themeCode: 'T3', themeName: 'Digital', emoji: '💻' },
  6: { themeCode: 'T4', themeName: 'Intercultural', emoji: '🤝' },
  7: { themeCode: 'T4', themeName: 'Intercultural', emoji: '🤝' },
  8: { themeCode: 'T5', themeName: 'Work', emoji: '💼' },
  9: { themeCode: 'T5', themeName: 'Work', emoji: '💼' }
};

/** Colori di sfondo per tema */
const THEME_BACKGROUNDS: Record<string, string> = {
  'T1': 'from-blue-500/20 to-blue-600/30',
  'T2': 'from-purple-500/20 to-purple-600/30',
  'T3': 'from-cyan-500/20 to-cyan-600/30',
  'T4': 'from-orange-500/20 to-orange-600/30',
  'T5': 'from-green-500/20 to-green-600/30'
};

// ============================================
// COMPONENT
// ============================================

export function AssessmentStep({
  stepIndex,
  question,
  answers,
  onAnswer,
  onNext,
  onBack,
  isLastStep,
  onComplete
}: AssessmentStepProps) {
  
  const stepInfo = STEP_INFO[stepIndex];
  const totalSteps = 10;
  const progressPercentage = ((stepIndex + 1) / totalSteps) * 100;
  const questionNumber = stepIndex + 1;

  // Trova la risposta per la domanda di questo step
  const getSelectedAnswer = (): AnswerOption | null => {
    const answer = answers.find(a => a.questionCode === question.code);
    return answer ? answer.userAnswer : null;
  };

  const selectedAnswer = getSelectedAnswer();
  const hasAnswered = selectedAnswer !== null;
  const themeBackground = THEME_BACKGROUNDS[stepInfo.themeCode] || THEME_BACKGROUNDS['T1'];

  return (
    <div className="flex flex-col min-h-[500px]">
      {/* Background gradient per tema */}
      <div className={`absolute inset-0 bg-gradient-to-br ${themeBackground} rounded-2xl -z-10`} />
      
      {/* Header */}
      <div className="mb-6">
        {/* Step info */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{stepInfo.emoji}</span>
            <div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Question {questionNumber} of {totalSteps}
              </span>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {stepInfo.themeName}
              </h2>
            </div>
          </div>
          
          {/* Step dots */}
          <div className="hidden sm:flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`
                  w-2 h-2 rounded-full transition-colors
                  ${i < stepIndex 
                    ? 'bg-green-500' 
                    : i === stepIndex 
                      ? 'bg-blue-500' 
                      : 'bg-slate-300 dark:bg-slate-600'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card - Centered and larger */}
      <div className="flex-1 flex items-center justify-center py-4">
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          key={question.code} // Force re-animation on question change
        >
          <QuestionCard
            question={question}
            questionNumber={questionNumber}
            selectedAnswer={selectedAnswer}
            onAnswer={(answer) => onAnswer(question.code, answer)}
          />
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200/50 dark:border-slate-700/50 mt-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={stepIndex === 0}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all
            ${stepIndex === 0
              ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
              : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }
          `}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Answer status */}
        <div className="flex items-center gap-2">
          {hasAnswered ? (
            <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Answered
            </span>
          ) : (
            <span className="text-sm text-slate-400 dark:text-slate-500">
              Select an answer
            </span>
          )}
        </div>

        {/* Next/Finish Button */}
        {isLastStep ? (
          <button
            onClick={onComplete}
            disabled={!hasAnswered}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all
              ${hasAnswered
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }
            `}
          >
            Finish
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!hasAnswered}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all
              ${hasAnswered
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }
            `}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}