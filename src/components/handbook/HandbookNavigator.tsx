// src/components/handbook/HandbookNavigator.tsx
'use client'

import { useState } from 'react'
import { handbookData, Theme, SubTheme, Generation, Variant } from '@/data/handbook-data'
import { MainContent } from '@/components/handbook/MainContent'
import { NavigationFilter } from '@/components/handbook/NavigationFilter'

type FilterStep = 'theme' | 'subtheme' | 'generation' | 'variant'

export default function HandbookNavigator() {
  const [currentStep, setCurrentStep] = useState<FilterStep>('theme')
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [selectedSubTheme, setSelectedSubTheme] = useState<SubTheme | null>(null)
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)
    setCurrentStep('subtheme')
  }

  const handleSubThemeSelect = (subTheme: SubTheme) => {
    setSelectedSubTheme(subTheme)
    setCurrentStep('generation')
  }

  const handleGenerationSelect = (generation: Generation) => {
    setSelectedGeneration(generation)
    setCurrentStep('variant')
  }

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant)
  }

  const handleBack = () => {
    switch (currentStep) {
      case 'subtheme':
        setCurrentStep('theme')
        setSelectedTheme(null)
        setSelectedSubTheme(null)
        setSelectedGeneration(null)
        setSelectedVariant(null)
        break
      case 'generation':
        setCurrentStep('subtheme')
        setSelectedSubTheme(null)
        setSelectedGeneration(null)
        setSelectedVariant(null)
        break
      case 'variant':
        setCurrentStep('generation')
        setSelectedGeneration(null)
        setSelectedVariant(null)
        break
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Navigazione in alto */}
      <NavigationFilter
        currentStep={currentStep}
        selectedTheme={selectedTheme}
        selectedSubTheme={selectedSubTheme}
        selectedGeneration={selectedGeneration}
        themes={handbookData}
        onThemeSelect={handleThemeSelect}
        onSubThemeSelect={handleSubThemeSelect}
        onGenerationSelect={handleGenerationSelect}
        onVariantSelect={handleVariantSelect}
        onBack={handleBack}
      />

      {/* Contenuto principale */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-screen-2xl mx-auto p-4 md:p-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Generational Handbook
          </h1>

          <MainContent
            step={currentStep}
            selectedTheme={selectedTheme}
            selectedSubTheme={selectedSubTheme}
            selectedGeneration={selectedGeneration}
            selectedVariant={selectedVariant}
          />
        </div>
      </main>
    </div>
  )
}