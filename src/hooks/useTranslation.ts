import { useCallback } from 'react'
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
  [key: string]: string | number |boolean | null | TranslationObject
}

// ✨ NUOVO: Interface per Generation da JSON
interface GenerationTranslation {
  id: string
  code: string
  title: string
  ageRange: string
  description: string
}

// ✨ NUOVO: Interfaces per Theme e SubTheme
interface SubThemeTranslation {
  id: string
  code: string
  title: string
  description?: string
  pageId: number
  markdownFile?: string
}



interface ThemeTranslation {
  id: string
  code: string
  title: string
  introduction?: string
  reportPdfUrl?: string | null
  pageId: number
  subthemes: {
    [key: string]: SubThemeTranslation
  }
}

interface CardTranslation {
  id: string
  code: string
  title: string
  color: string
  description: string
  pageId: number
  image?: string
  stereotype: string
  researchFindings: string
  strategiesAdvice: string
}

type Translations = {
  themes: TranslationObject  // ✨ AGGIUNTO
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
    themes: enThemes as TranslationObject,  // ✨ AGGIUNTO
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
    themes: itThemes as TranslationObject,  // ✨ AGGIUNTO
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
      const value = current[key]
      if (typeof value === 'string' || (typeof value === 'object' && value !== null)) {
        current = value as TranslationObject | string
      } else {
        return undefined
      }
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
   * Ottieni generation completa per CODICE
   * @param code - Generation code (GZ, GM, GX, GB)
   * @returns Generation object con tutte le traduzioni
   */
  const getGeneration = (code: string): GenerationTranslation | null => {
    const generationsData = currentTranslations.generations
    
    if (typeof generationsData === 'object' && generationsData !== null) {
      const generation = generationsData[code]
      
      if (typeof generation === 'object' && generation !== null && 
          'id' in generation && 'code' in generation && 'title' in generation) {
        return generation as unknown as GenerationTranslation
      }
    }
    
    // Fallback inglese
    const fallbackData = fallbackTranslations.generations
    if (typeof fallbackData === 'object' && fallbackData !== null) {
      const fallbackGeneration = fallbackData[code]
      
      if (typeof fallbackGeneration === 'object' && fallbackGeneration !== null &&
          'id' in fallbackGeneration && 'code' in fallbackGeneration && 'title' in fallbackGeneration) {
        console.warn(`Generation ${code} not found in ${language}, using EN fallback`)
        return fallbackGeneration as unknown as GenerationTranslation
      }
    }
    
    console.error(`Generation ${code} not found in any language`)
    return null
  }
  
  /**
   * Ottieni TUTTE le generations
   * @returns Array di tutte le generations con traduzioni correnti
   */
  const getAllGenerations = (): GenerationTranslation[] => {
    const generationsData = currentTranslations.generations
    
    if (typeof generationsData === 'object' && generationsData !== null) {
      const values = Object.values(generationsData) as unknown as GenerationTranslation[]
      
      return values.filter((gen): gen is GenerationTranslation => {
        return typeof gen === 'object' && gen !== null &&
               'id' in gen && 'code' in gen && 'title' in gen
      })
    }
    
    return []
  }
  
  /**
   * ✨ NUOVO: Ottieni theme completo per CODICE
   * @param code - Theme code (T1, T2, T3, T4, T5)
   * @returns Theme object con tutte le traduzioni
   */
  const getTheme = (code: string): ThemeTranslation | null => {
    const themesData = currentTranslations.themes
    
    if (typeof themesData === 'object' && themesData !== null) {
      const theme = themesData[code]
      
      if (typeof theme === 'object' && theme !== null && 
          'id' in theme && 'code' in theme && 'title' in theme) {
        return theme as unknown as ThemeTranslation
      }
    }
    
    // Fallback inglese
    const fallbackData = fallbackTranslations.themes
    if (typeof fallbackData === 'object' && fallbackData !== null) {
      const fallbackTheme = fallbackData[code]
      
      if (typeof fallbackTheme === 'object' && fallbackTheme !== null &&
          'id' in fallbackTheme && 'code' in fallbackTheme && 'title' in fallbackTheme) {
        console.warn(`Theme ${code} not found in ${language}, using EN fallback`)
        return fallbackTheme as unknown as ThemeTranslation
      }
    }
    
    console.error(`Theme ${code} not found in any language`)
    return null
  }
  
  /**
   * ✨ NUOVO: Ottieni TUTTI i themes
   * @returns Array di tutti i themes con traduzioni correnti
   */
  const getAllThemes = (): ThemeTranslation[] => {
    const themesData = currentTranslations.themes
    
    if (typeof themesData === 'object' && themesData !== null) {
      const values = Object.values(themesData) as unknown as ThemeTranslation[]
      
      return values.filter((theme): theme is ThemeTranslation => {
        return typeof theme === 'object' && theme !== null &&
               'id' in theme && 'code' in theme && 'title' in theme
      })
    }
    
    return []
  }
  
  /**
   * ✨ NUOVO: Ottieni subtheme specifico
   * @param themeCode - Theme code (es: 'T5')
   * @param subThemeCode - SubTheme code (es: 'T5.1')
   * @returns SubTheme object o null
   */
  const getSubTheme = (themeCode: string, subThemeCode: string): SubThemeTranslation | null => {
    const theme = getTheme(themeCode)
    
    if (!theme || !theme.subthemes) {
      console.error(`Theme ${themeCode} not found or has no subthemes`)
      return null
    }
    
    const subTheme = theme.subthemes[subThemeCode]
    
    if (!subTheme) {
      console.error(`SubTheme ${subThemeCode} not found in theme ${themeCode}`)
      return null
    }
    
    return subTheme as SubThemeTranslation
  }
  
  /**
   * Carica contenuto Markdown per SubTheme (rimane async)
   */
  const loadMarkdown = useCallback(async (filename: string): Promise<string> => {
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
  }, [language])

  /**
   * ✨ NUOVO: Ottieni card per SubTheme + Generation
   * @param subThemeCode - SubTheme code (es: 'T5.1')
   * @param generationCode - Generation code (es: 'GZ')
   * @param themeId - Theme ID (es: 'work') per sapere quale JSON caricare
   * @returns Card object o null
   */
  const getCard = (subThemeCode: string, generationCode: string, themeId: string): CardTranslation | null => {
    // Seleziona il JSON corretto in base al themeId
    const cardsData = currentTranslations.cards[themeId as keyof typeof currentTranslations.cards]
    
    if (!cardsData) {
      console.error(`Cards not found for theme: ${themeId}`)
      return null
    }
    
    if (typeof cardsData === 'object' && cardsData !== null) {
      const subThemeCards = cardsData[subThemeCode]
      
      if (typeof subThemeCards === 'object' && subThemeCards !== null) {
        const card = subThemeCards[generationCode]
        
        if (typeof card === 'object' && card !== null && 'id' in card && 'code' in card) {
          return card as unknown as CardTranslation
        }
      }
    }
    
    // Fallback inglese
    const fallbackCardsData = fallbackTranslations.cards[themeId as keyof typeof fallbackTranslations.cards]
    
    if (typeof fallbackCardsData === 'object' && fallbackCardsData !== null) {
      const fallbackSubThemeCards = fallbackCardsData[subThemeCode]
      
      if (typeof fallbackSubThemeCards === 'object' && fallbackSubThemeCards !== null) {
        const fallbackCard = fallbackSubThemeCards[generationCode]
        
        if (typeof fallbackCard === 'object' && fallbackCard !== null && 'id' in fallbackCard && 'code' in fallbackCard) {
          console.warn(`Card ${subThemeCode}.${generationCode} not found in ${language}, using EN fallback`)
          return fallbackCard as unknown as CardTranslation
        }
      }
    }
    
    console.error(`Card not found: ${subThemeCode}.${generationCode} in theme ${themeId}`)
    return null
  }
  
  /**
   * ✨ NUOVO: Ottieni card per CODE completo
   * @param code - Card code (es: 'T5.1.GZ')
   * @param themeId - Theme ID (es: 'work')
   * @returns Card object o null
   * 
   * @example
   * const card = getCardByCode('T5.1.GZ', 'work')
   */
  const getCardByCode = (code: string, themeId: string): CardTranslation | null => {
    // Parse code: T5.1.GZ → subTheme='T5.1', generation='GZ'
    const parts = code.split('.')
    if (parts.length !== 3) {
      console.error(`Invalid card code format: ${code}. Expected format: T5.1.GZ`)
      return null
    }
    
    const subThemeCode = `${parts[0]}.${parts[1]}` // T5.1
    const generationCode = parts[2] // GZ
    
    return getCard(subThemeCode, generationCode, themeId)
  }
  
  /**
   * ✨ NUOVO: Ottieni TUTTE le cards per un theme
   * @param themeId - Theme ID (es: 'work')
   * @returns Array di tutte le cards del theme
   * 
   * @example
   * const cards = getAllCardsForTheme('work') // Tutte le 12 cards di work
   */
  const getAllCardsForTheme = (themeId: string): CardTranslation[] => {
    const cardsData = currentTranslations.cards[themeId as keyof typeof currentTranslations.cards]
    
    if (!cardsData || typeof cardsData !== 'object') {
      console.error(`Cards not found for theme: ${themeId}`)
      return []
    }
    
    const allCards: CardTranslation[] = []
    
    // Itera su tutti i subthemes (T5.1, T5.2, T5.3)
    Object.values(cardsData).forEach((subThemeCards) => {
      if (typeof subThemeCards === 'object' && subThemeCards !== null) {
        // Itera su tutte le generations (GZ, GM, GX, GB)
        Object.values(subThemeCards).forEach((card) => {
          if (typeof card === 'object' && card !== null && 'id' in card && 'code' in card) {
            allCards.push(card as unknown as CardTranslation)
          }
        })
      }
    })
    
    return allCards
  }
  
  return { 
    t, 
    getGeneration,
    getAllGenerations,
    getTheme,         // ✨ NUOVO
    getAllThemes,     // ✨ NUOVO
    getSubTheme,      // ✨ NUOVO
        getCard,              // ✨ NUOVO
    getCardByCode,        // ✨ NUOVO
    getAllCardsForTheme,  // ✨ NUOVO
    loadMarkdown, 
    language 
  }
}

// ✨ EXPORT dei tipi (per uso in altri file)
export type { 
  GenerationTranslation, 
  ThemeTranslation, 
  SubThemeTranslation, 
  CardTranslation
}