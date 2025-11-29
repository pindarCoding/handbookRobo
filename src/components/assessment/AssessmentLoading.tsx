// src/components/assessment/AssessmentLoading.tsx

'use client';

/**
 * SV0038 - Schermata di caricamento Assessment
 * 
 * Mostrata durante:
 * - Selezione random delle domande
 * - Caricamento iniziale del test
 */

import { motion } from 'framer-motion';

// ============================================
// COMPONENT
// ============================================

export function AssessmentLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Main Text */}
      <motion.h3
        className="mt-8 text-xl font-semibold text-slate-900 dark:text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Preparing your assessment...
      </motion.h3>

      {/* Sub Text */}
      <motion.p
        className="mt-2 text-slate-500 dark:text-slate-400 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Selecting questions from 5 themes...
      </motion.p>

      {/* Animated Dots */}
      <motion.div 
        className="flex gap-1 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}