// src/components/handbook/NavigationFilter.tsx
'use client'

import { SunIcon, MoonIcon } from 'lucide-react'
import { useTheme } from '@/components/providers/theme-provider'
import { Theme, SubTheme, Generation, Variant, generations, variants } from '@/data/handbook-data'

type FilterStep = 'theme' | 'subtheme' | 'generation' | 'variant'

interface NavigationFilterProps {
  // Current state
  currentStep: FilterStep
  selectedTheme: Theme | null
  selectedSubTheme: SubTheme | null
  selectedGeneration: Generation | null
  
  // Available data
  themes: Theme[]
  
  // Callbacks
  onThemeSelect: (theme: Theme) => void
  onSubThemeSelect: (subTheme: SubTheme) => void
  onGenerationSelect: (generation: Generation) => void
  onVariantSelect: (variant: Variant) => void
  onBack: () => void
}

export const NavigationFilter = ({
  currentStep,
  selectedTheme,
  selectedSubTheme,
  selectedGeneration,
  themes,
  onThemeSelect,
  onSubThemeSelect,
  onGenerationSelect,
  onVariantSelect,
  onBack
}: NavigationFilterProps) => {
  const { theme, toggleTheme } = useTheme()
  
  const steps = ['theme', 'subtheme', 'generation', 'variant'] as const
  const currentStepIndex = steps.indexOf(currentStep)
  
  // Funzione helper per ottenere il titolo dello step corrente
  const getStepTitle = () => {
    if (selectedTheme && currentStep !== 'theme') {
      return `${selectedTheme.title} > ${
        currentStep === 'subtheme' ? 'Select Subtheme' : 
        currentStep === 'generation' ? `${selectedSubTheme?.title} > Select Generation` : 
        currentStep === 'variant' ? `${selectedGeneration?.title} > Select Variant` : ''
      }`
    }
    return 'Select Theme'
  }

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-screen-2xl  mx-auto p-4">
        {/* Header con back button e theme toggle */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {currentStep !== 'theme' && (
              <button
                onClick={onBack}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 
                         dark:hover:text-white transition-colors"
              >
                ← Back
              </button>
            )}
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {getStepTitle()}
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            ) : (
              <MoonIcon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            )}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6 px-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center w-full">
              <div 
                className={`
                  w-6 h-6 rounded-full
                  flex items-center justify-center 
                  ${index <= currentStepIndex 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}
                  transition-colors duration-300
                  text-sm
                `}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-1 rounded">
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

        {/* Filter Options */}
        <div className="space-y-4">
          {currentStep === 'theme' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {themes.map((theme) => (
                <button
                  type="button"
                  key={theme.id}
                  onClick={() => onThemeSelect(theme)}
                  className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700 
                           text-slate-700 dark:text-slate-200 
                           hover:bg-slate-200 dark:hover:bg-slate-600 
                           transition-colors text-left"
                >
                  {theme.title}
                </button>
              ))}
            </div>
          )}

          {currentStep === 'subtheme' && selectedTheme && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedTheme.subThemes.map((subTheme) => (
                <button
                  type="button"
                  key={subTheme.id}
                  onClick={() => onSubThemeSelect(subTheme)}
                  className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700 
                           text-slate-700 dark:text-slate-200 
                           hover:bg-slate-200 dark:hover:bg-slate-600 
                           transition-colors text-left"
                >
                  {subTheme.title}
                </button>
              ))}
            </div>
          )}

          {currentStep === 'generation' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {generations.map((generation) => (
                <button
                  type="button"
                  key={generation.id}
                  onClick={() => onGenerationSelect(generation)}
                  className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700 
                           text-slate-700 dark:text-slate-200 
                           hover:bg-slate-200 dark:hover:bg-slate-600 
                           transition-colors"
                >
                  <h3 className="font-bold mb-1">{generation.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Age: {generation.ageRange}
                  </p>
                  <p className="text-sm">
                    {generation.description}
                  </p>
                </button>
              ))}
            </div>
          )}

          {currentStep === 'variant' && selectedGeneration && selectedSubTheme && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {variants
                .filter(variant => 
                  variant.generationId === selectedGeneration.id && 
                  variant.subThemeId === selectedSubTheme.id
                ).length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-slate-500 dark:text-slate-400 mb-2">
                      No variants available yet for:
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {selectedSubTheme.title} × {selectedGeneration.title}
                    </p>
                  </div>
                ) : (
                  variants
                    .filter(variant => 
                      variant.generationId === selectedGeneration.id && 
                      variant.subThemeId === selectedSubTheme.id
                    )
                    .map((variant) => (
                      <button
                        type="button"
                        key={variant.id}
                        onClick={() => onVariantSelect(variant)}
                        className={`
                          p-4 rounded-lg text-left
                          transition-all duration-300
                          ${variant.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' : ''}
                          ${variant.color === 'green' ? 'bg-green-100 dark:bg-green-900' : ''}
                          hover:scale-105
                        `}
                      >
                        <h3 className="font-bold mb-2 text-slate-900 dark:text-white">
                          {variant.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {variant.description}
                        </p>
                      </button>
                    ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}