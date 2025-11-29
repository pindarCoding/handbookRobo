'use client';

/**
 * SV0036 - Componente singola domanda
 * 
 * Mostra:
 * - Numero domanda e codice
 * - Testo della domanda
 * - 4 opzioni selezionabili (A, B, C, D)
 */

import { motion } from 'framer-motion';
import { Question, AnswerOption } from '@/types/assessment';

// ============================================
// TYPES
// ============================================

interface QuestionCardProps {
  /** La domanda da mostrare */
  question: Question;
  /** Numero della domanda (1-10) per display */
  questionNumber: number;
  /** Risposta attualmente selezionata (null se nessuna) */
  selectedAnswer: AnswerOption | null;
  /** Callback quando l'utente seleziona una risposta */
  onAnswer: (answer: AnswerOption) => void;
}

// ============================================
// CONSTANTS
// ============================================

const OPTIONS: AnswerOption[] = ['a', 'b', 'c', 'd'];

const OPTION_LABELS: Record<AnswerOption, string> = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D'
};

// ============================================
// COMPONENT
// ============================================

export function QuestionCard({ 
  question, 
  questionNumber, 
  selectedAnswer, 
  onAnswer 
}: QuestionCardProps) {
  
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header: Question number + Code */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          Q{questionNumber}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
          {question.code}
        </span>
      </div>

      {/* Question Text */}
      <p className="text-lg text-slate-900 dark:text-white mb-6 leading-relaxed">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-3">
        {OPTIONS.map((option) => {
          const isSelected = selectedAnswer === option;
          
          return (
            <motion.button
              key={option}
              onClick={() => onAnswer(option)}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                flex items-center gap-4
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400' 
                  : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }
              `}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Option Letter Badge */}
              <span 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                  ${isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                  }
                `}
              >
                {OPTION_LABELS[option]}
              </span>
              
              {/* Option Text */}
              <span 
                className={`
                  flex-1 
                  ${isSelected 
                    ? 'text-blue-900 dark:text-blue-100 font-medium' 
                    : 'text-slate-700 dark:text-slate-300'
                  }
                `}
              >
                {question.options[option]}
              </span>

              {/* Selected Indicator */}
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-blue-500 dark:text-blue-400"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}