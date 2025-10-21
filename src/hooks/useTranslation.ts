import { useLanguage } from '@/components/providers/language-provider'

// Import statici di TUTTE le traduzioni
import enThemes from '@/data/i18n/en/themes.json'
import enGenerations from '@/data/i18n/en/generations.json'
import enUi from '@/data/i18n/en/ui.json'
import enWork from '@/data/i18n/en/cards/work.json'
import enCommunication from '@/data/i18n/en/cards/communication.json'
import enDiversity from '@/data/i18n/en/cards/diversity.json'
import enDigital from '@/data/i18n/en/cards/digital.json'
import enIntercultural from '@/data/i18n/en/cards/intercultural.json'

import itThemes from '@/data/i18n/it/themes.json'
import itGenerations from '@/data/i18n/it/generations.json'
import itUi from '@/data/i18n/it/ui.json'
import itWork from '@/data/i18n/it/cards/work.json'
import itCommunication from '@/data/i18n/it/cards/communication.json'
import itDiversity from '@/data/i18n/it/cards/diversity.json'
import itDigital from '@/data/i18n/it/cards/digital.json'
import itIntercultural from '@/data/i18n/it/cards/intercultural.json'

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

// Tutte le traduzioni caricate all'init (sync!)
const allTranslations: Record<'en' | 'it', Translations> = {
  en: {
    themes: enThemes as TranslationObject,
    cards: {
      work: enWork as TranslationObject,
      communication: enCommunication as TranslationObject,
      diversity: enDiversity as TranslationObject,
      digital: enDigital as TranslationObject,
      intercultural: enIntercultural as TranslationObject
    },
    ui: enUi as TranslationObject,
    generations: enGenerations as TranslationObject
  },
  it: {
    themes: itThemes as TranslationObject,
    cards: {
      work: itWork as TranslationObject,
      communication: itCommunication as TranslationObject,
      diversity: itDiversity as TranslationObject,
      digital: itDigital as TranslationObject,
      intercultural: itIntercultural as TranslationObject
    },
    ui: itUi as TranslationObject,
    generations: itGenerations as TranslationObject
  }
}

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

export function useTranslation() {
  const { language } = useLanguage()
  
  const currentTranslations = allTranslations[language]
  const fallbackTranslations = allTranslations['en']
  
  /**
   * Traduce una chiave (SINCRONO!)
   * @param key - Path della traduzione (es: 'generations.genz.title')
   * @returns Stringa tradotta o [key] se mancante
   */
  const t = (key: string): string => {
    // Cerca in tutti i namespace
    const searchInAll = (translations: Translations): string | undefined => {
      return getNestedValue(translations.themes, key) ||
             getNestedValue(translations.cards.work, key) ||
             getNestedValue(translations.cards.communication, key) ||
             getNestedValue(translations.cards.diversity, key) ||
             getNestedValue(translations.cards.digital, key) ||
             getNestedValue(translations.cards.intercultural, key) ||
             getNestedValue(translations.ui, key) ||
             getNestedValue(translations.generations, key)
    }
    
    // 1. Prova lingua corrente
    const currentValue = searchInAll(currentTranslations)
    if (currentValue) return currentValue
    
    // 2. Fallback inglese
    const fallbackValue = searchInAll(fallbackTranslations)
    if (fallbackValue) return fallbackValue
    
    // 3. Mostra key se manca
    console.warn(`Translation missing: ${key} (${language})`)
    return `[${key}]`
  }
  
  /**
   * Carica contenuto Markdown per SubTheme (rimane async)
   */
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