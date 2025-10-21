// src/hooks/useTranslation.ts

import { useLanguage } from '@/components/providers/language-provider'

// Interface ricorsiva (non type alias)
interface TranslationObject {
  [key: string]: string | TranslationObject
}

type Translations = {
  themes: TranslationObject
  cards: {
    work: TranslationObject
    communication: TranslationObject
    diversity: TranslationObject
    digital: TranslationObject
    intercultural: TranslationObject
  }
  ui: TranslationObject
  generations: TranslationObject
}

// Helper con tipo corretto (no any!)
function getNestedValue(obj: TranslationObject | string, path: string): string | undefined {
  const keys = path.split('.')
  let current: TranslationObject | string = obj
  
  for (const key of keys) {
    if (typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return undefined
    }
  }
  
  return typeof current === 'string' ? current : undefined
}

// Load con dynamic import (no require!)
async function loadTranslations(lang: 'en' | 'it'): Promise<Translations> {
  try {
    const [themes, workCards, communicationCards, diversityCards, digitalCards, interculturalCards, ui, generations] = await Promise.all([
      import(`@/data/i18n/${lang}/themes.json`).then(m => m.default),
      import(`@/data/i18n/${lang}/cards/work.json`).then(m => m.default),
      import(`@/data/i18n/${lang}/cards/communication.json`).then(m => m.default),
      import(`@/data/i18n/${lang}/cards/diversity.json`).then(m => m.default),
      import(`@/data/i18n/${lang}/cards/digital.json`).then(m => m.default),
      import(`@/data/i18n/${lang}/cards/intercultural.json`).then(m => m.default),
      import(`@/data/i18n/${lang}/ui.json`).then(m => m.default),
      import(`@/data/i18n/${lang}/generations.json`).then(m => m.default),
    ])
    
    return {
      themes,
      cards: {
        work: workCards,
        communication: communicationCards,
        diversity: diversityCards,
        digital: digitalCards,
        intercultural: interculturalCards
      },
      ui,
      generations
    }
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error)
    return {
      themes: {},
      cards: {
        work: {},
        communication: {},
        diversity: {},
        digital: {},
        intercultural: {}
      },
      ui: {},
      generations: {}
    }
  }
}

export function useTranslation() {
  const { language } = useLanguage()
  
  // Nota: In produzione, considera useMemo qui
  const currentTranslations = loadTranslations(language)
  const fallbackTranslations = language !== 'en' 
    ? loadTranslations('en') 
    : currentTranslations
  
  const t = async (key: string): Promise<string> => {
    const [current, fallback] = await Promise.all([currentTranslations, fallbackTranslations])
    
    const currentValue = getNestedValue(current.themes, key) ||
                        getNestedValue(current.cards as unknown as TranslationObject, key) ||
                        getNestedValue(current.ui, key) ||
                        getNestedValue(current.generations, key)
    
    if (currentValue) return currentValue
    
    const fallbackValue = getNestedValue(fallback.themes, key) ||
                         getNestedValue(fallback.cards as unknown as TranslationObject, key) ||
                         getNestedValue(fallback.ui, key) ||
                         getNestedValue(fallback.generations, key)
    
    if (fallbackValue) return fallbackValue
    
    console.warn(`Translation missing: ${key} (${language})`)
    return `[${key}]`
  }
  
  const loadMarkdown = async (filename: string): Promise<string> => {
    try {
      const response = await fetch(`/data/i18n/${language}/subthemes/${filename}`)
      
      if (response.ok) {
        return await response.text()
      }
      
      console.warn(`Markdown not found for ${language}, falling back to English`)
      const fallbackResponse = await fetch(`/data/i18n/en/subthemes/${filename}`)
      
      if (fallbackResponse.ok) {
        return await fallbackResponse.text()
      }
      
      throw new Error(`Markdown file not found: ${filename}`)
      
    } catch (error) {
      console.error(`Failed to load markdown: ${filename}`, error)
      return `# Content Not Available\n\nThe content file **${filename}** could not be loaded.\n\n[${filename}]`
    }
  }
  
  return { t, loadMarkdown, language }
}