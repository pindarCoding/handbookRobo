// src/components/assessment/AssessmentResult.tsx

'use client';

/**
 * SV0039 - Schermata risultato Test Assessment
 * 
 * Mostra:
 * - Punteggio totale con feedback visivo
 * - Breakdown per tema
 * - Azioni: Try Again, Close
 */

import { motion } from 'framer-motion';
import { RotateCcw, X } from 'lucide-react';
import { TestResult } from '@/types/assessment';

// ============================================
// TYPES
// ============================================

interface AssessmentResultProps {
  /** Risultato del test completato */
  result: TestResult;
  /** Callback per ripetere il test */
  onRetry: () => void;
  /** Callback per chiudere */
  onClose: () => void;
}

// ============================================
// CONSTANTS
// ============================================

/** Mapping themeCode → nome leggibile */
const THEME_NAMES: Record<string, string> = {
  'T1': 'Communication',
  'T2': 'Diversity',
  'T3': 'Digital',
  'T4': 'Intercultural',
  'T5': 'Work'
};

/** Colori per le barre dei temi */
const THEME_COLORS: Record<string, string> = {
  'T1': 'bg-blue-500',
  'T2': 'bg-purple-500',
  'T3': 'bg-cyan-500',
  'T4': 'bg-orange-500',
  'T5': 'bg-green-500'
};

// ============================================
// HELPERS
// ============================================

/**
 * Ritorna emoji e colore in base al punteggio
 */
function getScoreFeedback(percentage: number): { emoji: string; color: string; message: string } {
  if (percentage >= 90) {
    return { emoji: '🏆', color: 'text-yellow-500', message: 'Excellent!' };
  } else if (percentage >= 70) {
    return { emoji: '🎉', color: 'text-green-500', message: 'Great job!' };
  } else if (percentage >= 50) {
    return { emoji: '👍', color: 'text-blue-500', message: 'Good effort!' };
  } else {
    return { emoji: '💪', color: 'text-orange-500', message: 'Keep learning!' };
  }
}

// ============================================
// COMPONENT
// ============================================

export function AssessmentResult({ result, onRetry, onClose }: AssessmentResultProps) {
  const feedback = getScoreFeedback(result.percentage);

  return (
    <div className="flex flex-col items-center py-8 px-4">
      {/* Header with Emoji */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <span className="text-6xl block mb-2">{feedback.emoji}</span>
        <h2 className={`text-2xl font-bold ${feedback.color}`}>
          {feedback.message}
        </h2>
      </motion.div>

      {/* Score Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-8 text-center min-w-[200px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
          {result.score} / {result.totalQuestions}
        </div>
        <div className={`text-3xl font-semibold ${feedback.color}`}>
          {result.percentage}%
        </div>
      </motion.div>

      {/* Theme Breakdown */}
      <motion.div
        className="w-full max-w-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 text-center">
          Results by Theme
        </h3>
        
        <div className="space-y-3">
          {result.themeBreakdown.map((theme, index) => {
            const percentage = (theme.correct / theme.total) * 100;
            const themeName = THEME_NAMES[theme.themeCode] || theme.themeCode;
            const themeColor = THEME_COLORS[theme.themeCode] || 'bg-slate-500';
            
            return (
              <motion.div
                key={theme.themeCode}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {/* Theme Name */}
                <span className="w-28 text-sm text-slate-600 dark:text-slate-400 truncate">
                  {themeName}
                </span>
                
                {/* Progress Bar */}
                <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${themeColor} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  />
                </div>
                
                {/* Score */}
                <span className="w-10 text-sm font-medium text-slate-700 dark:text-slate-300 text-right">
                  {theme.correct}/{theme.total}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
        
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
        >
          <X className="w-5 h-5" />
          Close
        </button>
      </motion.div>
    </div>
  );
}