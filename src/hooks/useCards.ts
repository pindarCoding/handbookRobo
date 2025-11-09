import { useTranslation, CardTranslation } from './useTranslation'


import {
  parseThemeCode,
  parseSubThemeCode,      // ✅ AGGIUNTO - Import nuovo
  parseGenerationCode,    // ✅ AGGIUNTO - Import nuovo
  getThemeId,
  GENERATION_CODE_TO_ID
} from '@/data/config/taxonomy'

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
 * Hook per ottenere cards con traduzioni
 * Sostituisce l'import diretto da handbook-data.ts
 * 
 * @returns { 
 *   getCardsByThemeCode, 
 *   findCard, 
 *   getCardByCode,
 *   getAllCards 
 * }
 * 
 * @example
 * ```tsx
 * const { findCard } = useCards()
 * const card = findCard('genz', 'T5.1')
 * ```
 */
export function useCards() {
  const { getAllCardsForTheme, getCardByCode: getCardByCodeFromTranslation } = useTranslation()

  /**
   * ✅ REFACTORED: Trasforma CardTranslation in Card completo
   * USA SOLO CODE e funzioni di taxonomy.ts (SV0026)
   */
  const transformCard = (cardTranslation: CardTranslation, themeId: string): Card => {
    // ✅ MODIFICATO: USA parseSubThemeCode invece di parsing manuale
    const subThemeCode = parseSubThemeCode(cardTranslation.code)     // "T2.1.GZ" → "T2.1"

    // ✅ MODIFICATO: USA parseGenerationCode invece di split manuale
    const generationCode = parseGenerationCode(cardTranslation.code) // "T2.1.GZ" → "GZ"

    // Converti generation code in ID (questo resta uguale)
    const generationId = GENERATION_CODE_TO_ID[generationCode] || generationCode.toLowerCase()

    // ✅ Log strutturato per tracking caricamento card
    const themeCode = parseThemeCode(cardTranslation.code) // "T2.1.GZ" → "T2"
    console.log(`✅ Caricata Card del tema ${themeCode} - subTema ${subThemeCode} - generazione ${generationCode} -> file: cards/${themeCode.toLowerCase()}/${cardTranslation.code}.json`)

    return {
      ...cardTranslation,
      themeId,
      subThemeId: subThemeCode,  // ✅ MODIFICATO: usa CODE invece di ID derivato
      generationId,
      page_id: cardTranslation.pageId // pageId → page_id
    }
  }

  /**
  * Ottieni tutte le cards per un theme CODE
  * @param themeCode - Theme CODE (es: 'T5', 'T1')
  * @returns Array di cards per il theme
  * 
  * ✨ NESSUN useMemo - si rigenera ad ogni chiamata per reagire al cambio lingua
  */
  const getCardsByThemeCode = (themeCode: string): Card[] => {
    // Converti theme CODE in ID per compatibilità
    const themeId = getThemeId(themeCode)

    if (!themeId) {
      console.error(`❌ [useCards] Invalid theme code: ${themeCode}`)
      return []
    }

    // Passa theme code lowercase a useTranslation ('T5' → 't5')
    const cardsTranslations = getAllCardsForTheme(themeCode.toLowerCase())
    const transformedCards = cardsTranslations.map(ct => transformCard(ct, themeId))

    return transformedCards
  }

  /**
 * Trova card per generation ID + subtheme CODE
 * @param generationId - Generation ID (es: 'genz', 'millennial')
 * @param subThemeCode - SubTheme CODE (es: 'T5.1')
 * @returns Card o undefined
 * 
 * @example
 * const card = findCard('genz', 'T5.1')
 */
  const findCard = (generationId: string, subThemeCode: string): Card | undefined => {
    // Estrai theme CODE da subtheme CODE: "T5.1" → "T5"
    const themeCode = parseThemeCode(subThemeCode)

    // Ottieni tutte le cards del theme (dinamico, no cache)
    const themeCards = getCardsByThemeCode(themeCode)

    // ✅ MODIFICATO: Matching con LOG dettagliato
    const foundCard = themeCards.find(card => {
      const generationMatch = card.generationId === generationId
      const subThemeMatch = card.subThemeId === subThemeCode  // ✅ MODIFICATO: ora confronta CODE con CODE

      return generationMatch && subThemeMatch
    })

    return foundCard
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
    if (!cardTranslation) {
      return undefined
    }

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

    // Itera su tutti i theme CODES
    const themeCodes = ['T1', 'T2', 'T3', 'T4', 'T5']

    themeCodes.forEach(themeCode => {
      const themeCards = getCardsByThemeCode(themeCode)
      allCards.push(...themeCards)
    })

    return allCards
  }

  return {
    getCardsByThemeCode,  // ✅ Nome aggiornato
    findCard,             // ✅ Firma aggiornata
    getCardByCode,
    getAllCards
  }
}