'use client'

type FilterStep = 'theme' | 'subtheme' | 'generation'

interface ProgressIndicatorProps {
  currentStep: FilterStep
  variant?: 'horizontal' | 'compact'  // Per uso futuro
}

export const ProgressIndicator = ({ 
  currentStep, 
  variant = 'compact' 
}: ProgressIndicatorProps) => {
  const steps = ['theme', 'subtheme', 'generation'] as const
  const currentStepIndex = steps.indexOf(currentStep)
  
  const getStepName = (step: string) => {
    switch(step) {
      case 'theme': return 'Theme'
      case 'subtheme': return 'Subtheme'
      case 'generation': return 'Generation'
      default: return ''
    }
  }

  if (variant === 'compact') {
    return (
      <div className="text-center py-2 border-b border-slate-200 dark:border-slate-700">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
          Step {currentStepIndex + 1} of {steps.length}
        </div>
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {getStepName(currentStep)}
        </div>
      </div>
    )
  }

  // Versione orizzontale (per uso futuro o altro contesto)
  return (
    <div className="flex items-center justify-between px-2">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center w-full">
          <div className="flex flex-col items-center">
            <div 
              className={`
                w-8 h-8 rounded-full
                flex items-center justify-center 
                ${index <= currentStepIndex 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}
                transition-colors duration-300
                text-sm font-medium
              `}
            >
              {index + 1}
            </div>
            <span className={`
              text-xs mt-1
              ${index <= currentStepIndex 
                ? 'text-blue-500 dark:text-blue-400' 
                : 'text-slate-500 dark:text-slate-400'}
            `}>
              {getStepName(step)}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 mx-2 h-1 rounded mt-[-1rem]">
              <div 
                className={`
                  h-full rounded transition-all duration-300
                  ${index < currentStepIndex 
                    ? 'bg-blue-500' 
                    : 'bg-slate-200 dark:bg-slate-700'}
                `}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}