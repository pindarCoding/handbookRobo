// src/components/handbook/HandbookNavigator.tsx
'use client'

import { useState } from 'react'
import { handbookData, Theme, SubTheme, Generation, Card, cards } from '@/data/handbook-data'
import { MainContent } from '@/components/handbook/MainContent'
import { NavigationFilter } from '@/components/handbook/NavigationFilter'
import { Header } from '@/components/layout/Header' 
import { Footer } from '../layout/Footer'
import { YourBook } from './YourBook'
import { MobileNavigationDrawer } from '@/components/mobile/MobileNavigationDrawer'

type FilterStep = 'theme' | 'subtheme' | 'generation'  // Rimosso 'variant'

export default function HandbookNavigator() {
  const [currentStep, setCurrentStep] = useState<FilterStep>('theme')
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [selectedSubTheme, setSelectedSubTheme] = useState<SubTheme | null>(null)
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)  // Cambiato da selectedVariant

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)
    setSelectedSubTheme(null)
    setSelectedGeneration(null)
    setSelectedCard(null)
    setCurrentStep('subtheme')
  }

  const handleSubThemeSelect = (subTheme: SubTheme) => {
    setSelectedSubTheme(subTheme)
    setSelectedGeneration(null)
    setSelectedCard(null)
    setCurrentStep('generation')
  }

  const handleGenerationSelect = (generation: Generation) => {
    setSelectedGeneration(generation)
    
    // Trova automaticamente la card quando si seleziona una generazione
    if (selectedSubTheme && selectedTheme) {
      const card = cards.find(c => 
        c.generationId === generation.id && 
        c.subThemeId === selectedSubTheme.id &&
        c.themeId === selectedTheme.id
      )
      
      if (card) {
        setSelectedCard(card)
      } else {
        console.warn(`No card found for generation ${generation.id} and subtheme ${selectedSubTheme.id}`)
        setSelectedCard(null)
      }
    }
    // Non cambiamo più lo step - restiamo su 'generation'
  }

  // State per mobile drawer
const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const handleBack = () => {
    switch (currentStep) {
      case 'subtheme':
        setCurrentStep('theme')
        setSelectedTheme(null)
        setSelectedSubTheme(null)
        setSelectedGeneration(null)
        setSelectedCard(null)
        break
      case 'generation':
        setCurrentStep('subtheme')
        setSelectedSubTheme(null)
        setSelectedGeneration(null)
        setSelectedCard(null)
        break
    }
  }

 return (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
    
    {/* Header Sticky */}
    <Header />

    {/* Main Layout Container - Holy Grail */}
    <div className="flex-1 flex overflow-hidden">
      
      {/* LEFT SIDEBAR - NavigationFilter */}
      <aside className="hidden lg:flex lg:flex-col w-[220px] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
        <NavigationFilter
          currentStep={currentStep}
          selectedTheme={selectedTheme}
          selectedSubTheme={selectedSubTheme}
          selectedGeneration={selectedGeneration}
          themes={handbookData}
          onThemeSelect={handleThemeSelect}
          onSubThemeSelect={handleSubThemeSelect}
          onGenerationSelect={handleGenerationSelect}
          onBack={handleBack}
        />
      </aside>

      {/* MAIN CONTENT - Center */}
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
        <div className="max-w-screen-2xl mx-auto p-4 md:p-6">
          <MainContent
            step={currentStep}
            selectedTheme={selectedTheme}
            selectedSubTheme={selectedSubTheme}
            selectedGeneration={selectedGeneration}
            selectedCard={selectedCard}
          />
        </div>
      </main>

      {/* RIGHT SIDEBAR - YourBook */}
      <aside className="hidden lg:flex lg:flex-col w-[340px] bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 overflow-y-auto">
        <div className="p-4">
          <YourBook />
        </div>
      </aside>

    </div>

{/* Floating Action Button - Solo Mobile */}
<button
  onClick={() => setIsMobileNavOpen(true)}
  className="lg:hidden fixed bottom-6 right-6 z-30
             px-6 py-3 rounded-full 
             bg-orange-500 hover:bg-orange-600 
             text-white shadow-lg hover:shadow-xl
             flex items-center gap-2
             transition-all active:scale-95"
  aria-label="Open navigation"
>
  {/* Icona hamburger */}
  <svg 
    className="w-5 h-5" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4 6h16M4 12h16M4 18h16" 
    />
  </svg>
  <span className="font-semibold text-sm whitespace-nowrap">
    Filter & Navigate
  </span>
</button>

{/* Mobile Navigation Drawer */}
<MobileNavigationDrawer
  isOpen={isMobileNavOpen}
  onClose={() => setIsMobileNavOpen(false)}
  currentStep={currentStep}
  selectedTheme={selectedTheme}
  selectedSubTheme={selectedSubTheme}
  selectedGeneration={selectedGeneration}
  themes={handbookData}
  onThemeSelect={handleThemeSelect}
  onSubThemeSelect={handleSubThemeSelect}
  onGenerationSelect={handleGenerationSelect}
  onBack={handleBack}
/>

    {/* Footer */}
    <Footer />
  </div>
)
}