'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { NavigationFilter } from '@/components/handbook/NavigationFilter'
import { Theme, SubTheme, Generation } from '@/data/handbook-data'

type FilterStep = 'theme' | 'subtheme' | 'generation'

interface MobileNavigationDrawerProps {
  isOpen: boolean
  onClose: () => void
  
  // NavigationFilter props
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

export const MobileNavigationDrawer = ({
  isOpen,
  onClose,
  currentStep,
  selectedTheme,
  selectedSubTheme,
  selectedGeneration,
  themes,
  onThemeSelect,
  onSubThemeSelect,
  onGenerationSelect,
  onBack
}: MobileNavigationDrawerProps) => {
  
  // Blocca scroll del body quando drawer è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 lg:hidden
                       bg-white dark:bg-slate-800 
                       rounded-t-2xl shadow-2xl
                       max-h-[85vh] flex flex-col"
          >
            {/* Handle */}
<div className="flex justify-center pt-3 pb-2">
  <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
</div>

{/* Header Compatto - Tutto in una riga */}
<div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
  
  {/* Back Button */}
  {currentStep !== 'theme' && (
    <button
      onClick={onBack}
      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors flex-shrink-0"
      title="Go back"
    >
      <svg 
        className="w-5 h-5 text-slate-600 dark:text-slate-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
    </button>
  )}
  
  {/* Title */}
  <h2 className="text-base font-semibold text-slate-900 dark:text-white flex-shrink-0">
    Filter & Navigate
  </h2>
  
  {/* Spacer */}
  <div className="flex-1" />
  
  {/* Stepper Compatto */}
  <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full flex-shrink-0">
    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
      currentStep === 'theme' ? 'bg-blue-500' : 'bg-slate-400 dark:bg-slate-500'
    }`} />
    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
      currentStep === 'subtheme' ? 'bg-blue-500' : 'bg-slate-400 dark:bg-slate-500'
    }`} />
    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
      currentStep === 'generation' ? 'bg-blue-500' : 'bg-slate-400 dark:bg-slate-500'
    }`} />
  </div>
  
  {/* Close Button */}
  <button
    onClick={onClose}
    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors flex-shrink-0"
  >
    <XIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
  </button>
</div>
            
            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <NavigationFilter
                currentStep={currentStep}
                selectedTheme={selectedTheme}
                selectedSubTheme={selectedSubTheme}
                selectedGeneration={selectedGeneration}
                themes={themes}
                onThemeSelect={onThemeSelect}
                onSubThemeSelect={onSubThemeSelect}
                onGenerationSelect={onGenerationSelect}
                onBack={onBack}
                context='mobile'
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}