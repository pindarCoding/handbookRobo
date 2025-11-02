// src/hooks/useCards.ts
import { useTranslation, CardTranslation } from './useTranslation'

/**
 * Interface completa Card per l'app
 * (Compatibile con handbook-data.ts esistente)
 */
export interface Card {
  id: string
  code: string
  title: string
  color: string
  description: string
  themeId: string       // Aggiunto per compatibilità
  subThemeId: string    // Aggiunto per compatibilità
  generationId: string  // Aggiunto per compatibilità
  page_id: number       // Nota: underscore per compatibilità
  image?: string
  stereotype: string
  researchFindings: string
  strategiesAdvice: string
}

/**
 * Mapping Theme ID → Theme Code
 * Per convertire themeId ('work') in themeCode ('T5')
 */
const THEME_ID_TO_CODE: Record<string, string> = {
  'work': 'T5',
  'communication': 'T1',
  'diversity': 'T2',
  'digital': 'T3',
  'intercultural': 'T4'
}

/**
 * Mapping Generation Code → Generation ID
 * Per convertire generationCode ('GZ') in generationId ('genz')
 */
const GENERATION_CODE_TO_ID: Record<string, string> = {
  'GZ': 'genz',
  'GM': 'millennial',
  'GX': 'genx',
  'GB': 'boomer'
}

/**
 * Hook per ottenere cards con traduzioni
 * Sostituisce l'import diretto da handbook-data.ts
 * 
 * @returns { 
 *   getCardsByTheme, 
 *   findCard, 
 *   getCardByCode,
 *   getAllCards 
 * }
 * 
 * @example
 * ```tsx
 * const { findCard } = useCards()
 * const card = findCard('genz', 'work-values')
 * ```
 */
export function useCards() {
  const { getAllCardsForTheme, getCardByCode: getCardByCodeFromTranslation } = useTranslation()
  
  /**
   * Trasforma CardTranslation in Card completo
   * Aggiunge themeId, subThemeId, generationId per compatibilità
   */
  const transformCard = (cardTranslation: CardTranslation, themeId: string): Card => {
    // Estrai generationId dal code (es: T5.1.GZ → GZ)
    const codeParts = cardTranslation.code.split('.')
    const generationCode = codeParts[2] // GZ
    
    // Costruisci subThemeId dal code (T5.1 → work-values)
    // Usa l'ID dalla card che è già nel formato corretto
    const subThemeId = cardTranslation.id.split('-').slice(0, -1).join('-') // 'work-values-genz' → 'work-values'
    
    // Converti generation code in ID
    const generationId = GENERATION_CODE_TO_ID[generationCode] || generationCode.toLowerCase()
    
    return {
      ...cardTranslation,
      themeId,
      subThemeId,
      generationId,
      page_id: cardTranslation.pageId // pageId → page_id
    }
  }
  
  /**
   * Ottieni tutte le cards per un theme
   * @param themeId - Theme ID (es: 'work', 'communication')
   * @returns Array di cards per il theme
   * 
   * ✨ NESSUN useMemo - si rigenera ad ogni chiamata per reagire al cambio lingua
   */
  const getCardsByTheme = (themeId: string): Card[] => {
    const cardsTranslations = getAllCardsForTheme(themeId)
    return cardsTranslations.map(ct => transformCard(ct, themeId))
  }
  
  /**
   * Trova card per generation + subtheme (compatibilità con codice esistente)
   * @param generationId - Generation ID (es: 'genz', 'millennial')
   * @param subThemeId - SubTheme ID (es: 'work-values')
   * @returns Card o undefined
   * 
   * @example
   * const card = findCard('genz', 'work-values')
   */
  const findCard = (generationId: string, subThemeId: string): Card | undefined => {
    // Estrai themeId dal subThemeId (work-values → work)
    const themeId = subThemeId.split('-')[0]
    
    // Ottieni tutte le cards del theme (dinamico, no cache)
    const themeCards = getCardsByTheme(themeId)
    
    // Trova la card che matcha
    return themeCards.find(
      card => card.generationId === generationId && card.subThemeId === subThemeId
    )
  }
  
  /**
   * Ottieni card per code completo
   * @param code - Card code (es: 'T5.1.GZ')
   * @param themeId - Theme ID (es: 'work')
   * @returns Card o undefined
   * 
   * @example
   * const card = getCardByCode('T5.1.GZ', 'work')
   */
  const getCardByCode = (code: string, themeId: string): Card | undefined => {
    const cardTranslation = getCardByCodeFromTranslation(code, themeId)
    if (!cardTranslation) return undefined
    
    return transformCard(cardTranslation, themeId)
  }
  
  /**
   * Ottieni TUTTE le cards di tutti i themes
   * @returns Array di tutte le cards
   * 
   * ✨ NESSUN useMemo - si rigenera ad ogni chiamata per reagire al cambio lingua
   */
  const getAllCards = (): Card[] => {
    const allCards: Card[] = []
    
    // Itera su tutti i themes
    Object.keys(THEME_ID_TO_CODE).forEach(themeId => {
      const themeCards = getCardsByTheme(themeId)
      allCards.push(...themeCards)
    })
    
    return allCards
  }
  
  return {
    getCardsByTheme,
    findCard,
    getCardByCode,
    getAllCards
  }
}