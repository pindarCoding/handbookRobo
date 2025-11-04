'use client'

import { motion } from 'framer-motion'
import { CheckIcon } from 'lucide-react'

type FilterStep = 'theme' | 'subtheme' | 'generation'

interface ProgressIndicatorProps {
  currentStep: FilterStep
  variant?: 'horizontal' | 'compact'
  hasThemeSelected?: boolean
  hasSubThemeSelected?: boolean
  hasGenerationSelected?: boolean
}

export const ProgressIndicator = ({
  currentStep,
  variant = 'compact',
  hasThemeSelected = false,
  hasSubThemeSelected = false,
  hasGenerationSelected = false,
}: ProgressIndicatorProps) => {
  const steps = ['theme', 'subtheme', 'generation'] as const
  const currentStepIndex = steps.indexOf(currentStep)

  if (variant === 'compact') {
    return (
      <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-700">
        {/* Dot Stepper Orizzontale */}
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const isStepCompleted = (stepIndex: number): boolean => {
              switch (stepIndex) {
                case 0: // Step 1 (Theme)
                  return hasThemeSelected && currentStepIndex > 0
                case 1: // Step 2 (SubTheme)
                  return hasThemeSelected && hasSubThemeSelected && currentStepIndex > 1
                case 2: // Step 3 (Generation)
                  return hasThemeSelected && hasSubThemeSelected && hasGenerationSelected
                default:
                  return false
              }
            }

            const isCompleted = isStepCompleted(index)
            const isActive = index === currentStepIndex && !isCompleted
            const isFuture = index > currentStepIndex && !isCompleted

            return (
              <div key={step} className="flex items-center">
                {/* Cerchio Step */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="relative"
                >
                  {/* Cerchio */}
                  <div
                    className={`
                      w-7 h-7 rounded-full
                      flex items-center justify-center
                      transition-all duration-300
                      ${isCompleted
                        ? 'bg-green-500 dark:bg-green-600'
                        : isActive
                          ? 'bg-blue-500 dark:bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/50'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckIcon className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : (
                      <span
                        className={`
                          text-sm font-bold
                          ${isActive
                            ? 'text-white'
                            : isFuture
                              ? 'text-slate-400 dark:text-slate-500'
                              : 'text-white'
                          }
                        `}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Pulse Animation for Active Step */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-400"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  )}
                </motion.div>

                {/* Linea Connettore */}
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 mx-2 relative">
                    {/* Background Line (always visible) */}
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-full" />

                    {/* Progress Line (animata) */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: index < currentStepIndex ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="absolute inset-0 bg-green-500 dark:bg-green-600 rounded-full origin-left"
                    />

                    {/* Dashed for future steps */}
                    {index >= currentStepIndex && (
                      <div className="absolute inset-0 border-t-2 border-dashed border-slate-300 dark:border-slate-600"
                        style={{ top: '50%', transform: 'translateY(-50%)' }}
                      />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Versione orizzontale estesa (non usata al momento)
  return null
}