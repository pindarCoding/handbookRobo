'use client';

/**
 * SV0037 - Singolo step del Test Assessment
 * 
 * Mostra:
 * - Header con step number e tema
 * - Progress bar
 * - Personaggio placeholder (poi GIF)
 * - 2 QuestionCard
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
  /** Indice step corrente (0-4) */
  stepIndex: number;
  /** Le 2 domande di questo step */
  questions: [Question, Question];
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

/** Mapping step → info tema */
const STEP_INFO: Record<number, { themeCode: string; themeName: string }> = {
  0: { themeCode: 'T1', themeName: 'Communication' },
  1: { themeCode: 'T2', themeName: 'Diversity' },
  2: { themeCode: 'T3', themeName: 'Digital' },
  3: { themeCode: 'T4', themeName: 'Intercultural' },
  4: { themeCode: 'T5', themeName: 'Work' }
};

// ============================================
// COMPONENT
// ============================================

export function AssessmentStep({
  stepIndex,
  questions,
  answers,
  onAnswer,
  onNext,
  onBack,
  isLastStep,
  onComplete
}: AssessmentStepProps) {
  
  const stepInfo = STEP_INFO[stepIndex];
  const progressPercentage = ((stepIndex + 1) / 5) * 100;

  // Trova le risposte per le domande di questo step
  const getSelectedAnswer = (questionCode: string): AnswerOption | null => {
    const answer = answers.find(a => a.questionCode === questionCode);
    return answer ? answer.userAnswer : null;
  };

  // Verifica se entrambe le domande hanno risposta
  const bothAnswered = questions.every(q => 
    answers.some(a => a.questionCode === q.code)
  );

  // Calcola il numero della domanda (1-10)
  const getQuestionNumber = (index: number): number => {
    return stepIndex * 2 + index + 1;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        {/* Step info */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Step {stepIndex + 1} of 5
          </span>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {stepInfo.themeName}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Character Placeholder */}
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl mb-1 block">🎭</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {stepInfo.themeCode}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Questions */}
      <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.code}
            question={question}
            questionNumber={getQuestionNumber(index)}
            selectedAnswer={getSelectedAnswer(question.code)}
            onAnswer={(answer) => onAnswer(question.code, answer)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={stepIndex === 0}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${stepIndex === 0
              ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }
          `}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Answer Progress Indicator */}
        <div className="flex gap-1">
          {questions.map((q, i) => (
            <span
              key={i}
              className={`
                w-2 h-2 rounded-full transition-colors
                ${getSelectedAnswer(q.code) 
                  ? 'bg-green-500' 
                  : 'bg-slate-300 dark:bg-slate-600'
                }
              `}
            />
          ))}
        </div>

        {/* Next/Finish Button */}
        {isLastStep ? (
          <button
            onClick={onComplete}
            disabled={!bothAnswered}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all
              ${bothAnswered
                ? 'bg-green-500 hover:bg-green-600 text-white'
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
            disabled={!bothAnswered}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all
              ${bothAnswered
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
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