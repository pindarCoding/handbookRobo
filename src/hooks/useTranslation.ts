import { useCallback } from 'react'
import { useLanguage } from '@/components/providers/language-provider'

// Import statici di TUTTE le traduzioni
import enThemes from '@/data/i18n/en/themes.json'
import enGenerations from '@/data/i18n/en/generations.json'
import enUi from '@/data/i18n/en/ui.json'
import enT5Cards from '@/data/i18n/en/cards/t5_cards.json'
import enT1Cards from '@/data/i18n/en/cards/t1_cards.json'
import enT2Cards from '@/data/i18n/en/cards/t2_cards.json'
import enT3Cards from '@/data/i18n/en/cards/t3_cards.json'
import enT4Cards from '@/data/i18n/en/cards/t4_cards.json'

import itThemes from '@/data/i18n/it/themes.json'
import itGenerations from '@/data/i18n/it/generations.json'
import itUi from '@/data/i18n/it/ui.json'
import itT5Cards from '@/data/i18n/it/cards/t5_cards.json'
import itT1Cards from '@/data/i18n/it/cards/t1_cards.json'
import itT2Cards from '@/data/i18n/it/cards/t2_cards.json'
import itT3Cards from '@/data/i18n/it/cards/t3_cards.json'
import itT4Cards from '@/data/i18n/it/cards/t4_cards.json'

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
  themes: TranslationObject
  cards: {
    t5: TranslationObject              // ✅ CODE-based key
    t1: TranslationObject,
    t2: TranslationObject,
    t3: TranslationObject,
    t4: TranslationObject
  }
  ui: TranslationObject
  generations: TranslationObject
}

// Tutte le traduzioni caricate all'init (sync!)
const allTranslations: Record<'en' | 'it', Translations> = {
  en: {
  themes: enThemes as TranslationObject,
  cards: {
    t5: enT5Cards as TranslationObject,               // ✅ Nuovo nome
    t1: enT1Cards as TranslationObject,
    t2: enT2Cards as TranslationObject,
    t3: enT3Cards as TranslationObject,
    t4: enT4Cards as TranslationObject
  },
  ui: enUi as TranslationObject,
  generations: enGenerations as TranslationObject
},
  it: {
  themes: itThemes as TranslationObject,
  cards: {
    t5: itT5Cards as TranslationObject,               // ✅ Nuovo nome
    t1: itT1Cards as TranslationObject,
    t2: itT2Cards as TranslationObject,
    t3: itT3Cards as TranslationObject,
    t4: itT4Cards as TranslationObject
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
 /**
 * Traduce una chiave (SINCRONO!)
 * @param key - Path della traduzione (es: 'ui.common.page')
 * @param params - Parametri opzionali per interpolazione (es: { pageId: 512 })
 * @returns Stringa tradotta o [key] se mancante
 * 
 * @example
 * t('ui.common.page') // → "Page"
 * t('ui.common.page', { pageId: 512 }) // → "Page 512"
 * t('ui.yourBook.clearConfirm', { count: 5 }) // → "Remove all 5 pages?"
 */
const t = (key: string, params?: Record<string, string | number>): string => {
  // Cerca in tutti i namespace
  const searchInAll = (translations: Translations): string | undefined => {
    return getNestedValue(translations.themes, key) ||
         getNestedValue(translations.cards.t1, key) ||
         getNestedValue(translations.cards.t2, key) ||
         getNestedValue(translations.cards.t3, key) ||
         getNestedValue(translations.cards.t4, key) ||
         getNestedValue(translations.cards.t5, key) ||
         getNestedValue(translations.ui, key) ||
         getNestedValue(translations.generations, key)
  }
  
  // 1. Prova lingua corrente
  let value = searchInAll(currentTranslations)
  
  // 2. Fallback inglese se non trovato
  if (!value) {
    value = searchInAll(fallbackTranslations)
  }
  
  // 3. Se ancora mancante, mostra key
  if (!value) {
    console.warn(`Translation missing: ${key} (${language})`)
    return `[${key}]`
  }
  
  // 4. ✨ NUOVO: Interpola parametri se presenti
  if (params) {
    Object.keys(params).forEach((paramKey) => {
      const placeholder = new RegExp(`{{${paramKey}}}`, 'g')
      value = value!.replace(placeholder, String(params[paramKey]))
    })
  }
  
  return value
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
    // 1. Tenta caricamento nella lingua corrente
    const response = await fetch(`/data/i18n/${language}/subthemes/${filename}`)
    
    if (response.ok) {
      const content = await response.text()
      console.log(`✅ Loaded markdown: ${filename} (${language})`)
      return content
    }
    
    // 2. Se non trovato, prova fallback inglese (SILENZIOSO, non è un errore)
    if (language !== 'en') {
      console.info(`ℹ️ Markdown not found for ${language}, trying English fallback: ${filename}`)
      const fallbackResponse = await fetch(`/data/i18n/en/subthemes/${filename}`)
      
      if (fallbackResponse.ok) {
        const content = await fallbackResponse.text()
        console.log(`✅ Loaded markdown (EN fallback): ${filename}`)
        return content
      }
    }
    
    // 3. Se nemmeno fallback funziona, restituisci placeholder (NESSUN THROW)
    console.warn(`⚠️ Markdown file not available: ${filename}`)
    return `# Content Not Available\n\nThe content file **${filename}** could not be loaded in any language.\n\nPlease check:\n- File exists in /public/data/i18n/${language}/subthemes/\n- Filename is correct in themes.json`
    
  } catch (error) {
    // 4. Errore di rete o altro problema tecnico
    console.error(`❌ Network error loading markdown: ${filename}`, error)
    return `# Error Loading Content\n\nThere was a technical error loading **${filename}**.\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`
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
 * @param themeCodeLowercase - Theme CODE lowercase (es: 't5', 't1', 't2')
 * @returns Array di tutte le cards del theme
 * 
 * @example
 * const cards = getAllCardsForTheme('t5') // Tutte le 12 cards di T5
 */
const getAllCardsForTheme = (themeCodeLowercase: string): CardTranslation[] => {
  const cardsData = currentTranslations.cards[themeCodeLowercase as keyof typeof currentTranslations.cards]
  
  if (!cardsData || typeof cardsData !== 'object') {
    console.error(`Cards not found for theme code: ${themeCodeLowercase}`)
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