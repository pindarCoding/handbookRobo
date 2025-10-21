'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'it'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  
  // Load language preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('handbook-language')
      if (saved === 'en' || saved === 'it') {
        setLanguage(saved)
      }
    } catch (error) {
      console.error('Failed to load language preference:', error)
    }
  }, [])
  
  // Save language preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('handbook-language', language)
    } catch (error) {
      console.error('Failed to save language preference:', error)
    }
  }, [language])
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}