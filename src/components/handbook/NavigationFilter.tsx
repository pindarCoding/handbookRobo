// src/components/handbook/NavigationFilter.tsx
'use client'

import { SunIcon, MoonIcon } from 'lucide-react'
import { useTheme } from '@/components/providers/theme-provider'
import { Theme, SubTheme, Generation, generations } from '@/data/handbook-data'
import { GenerationCharacter } from '@/components/GenerationCharacter/GenerationCharacter'

type FilterStep = 'theme' | 'subtheme' | 'generation'

interface NavigationFilterProps {
  currentStep: FilterStep
  selectedTheme: Theme | null
  selectedSubTheme: SubTheme | null
  selectedGeneration: Generation | null
  themes: Theme[]
  onThemeSelect: (theme: Theme) => void
  onSubThemeSelect: (subTheme: SubTheme) => void
  onGenerationSelect: (generation: Generation) => void
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
  onBack
}: NavigationFilterProps) => {
  const { theme, toggleTheme } = useTheme()
  
  const steps = ['theme', 'subtheme', 'generation'] as const
  const currentStepIndex = steps.indexOf(currentStep)
  
  const getStepTitle = () => {
    if (selectedTheme && currentStep !== 'theme') {
      return `${selectedTheme.title} > ${
        currentStep === 'subtheme' ? 'Select Subtheme' : 
        currentStep === 'generation' ? `${selectedSubTheme?.title} > Select Generation` : ''
      }`
    }
    return 'Select Theme'
  }

  const getStepName = (step: string) => {
    switch(step) {
      case 'theme': return 'Theme'
      case 'subtheme': return 'Subtheme'
      case 'generation': return 'Generation'
      default: return ''
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-screen-2xl mx-auto p-4">
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
                           hover:bg-slate-200 dark:hover:bg-slate-600 
                           transition-all group relative overflow-hidden"
                >
                  {/* Contenitore con layout flex per avatar e contenuto */}
                  <div className="flex items-start gap-3">
                    {/* Avatar animato se disponibile */}
                    {generation.characterFolder && (
                      <div className="flex-shrink-0">
                        <GenerationCharacter
                          characterFolder={generation.characterFolder}
                          frameStart={generation.frameStart || 1}
                          frameEnd={generation.frameEnd || 10}
                          framePrefix={generation.framePrefix}
                          size={150}
                          frameRate={24}
                          showBorder={true}
                          borderColor="border-white dark:border-slate-600"
                          className="shadow-md group-hover:shadow-lg transition-shadow"
                        />
                      </div>
                    )}
                    
                    {/* Contenuto testuale */}
                    <div className="flex-1 text-left">
                      <h3 className="font-bold mb-1 text-slate-900 dark:text-white 
                                   group-hover:text-blue-500 dark:group-hover:text-blue-400 
                                   transition-colors">
                        {generation.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                        {generation.ageRange}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {generation.description}
                      </p>
                    </div>
                  </div>

                  {/* Badge di selezione (opzionale) */}
                  {selectedGeneration?.id === generation.id && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}