import { useTranslation, CardTranslation } from './useTranslation'
import { 
  parseThemeCode, 
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
 * ✅ NUOVO: Ottieni tutte le cards per un theme CODE
 * @param themeCode - Theme CODE (es: 'T5', 'T1')
 * @returns Array di cards per il theme
 * 
 * ✨ NESSUN useMemo - si rigenera ad ogni chiamata per reagire al cambio lingua
 */
const getCardsByThemeCode = (themeCode: string): Card[] => {
  // Converti theme CODE in ID per compatibilità
  const themeId = getThemeId(themeCode)
  
  if (!themeId) {
    console.error(`Invalid theme code: ${themeCode}`)
    return []
  }
  
  // Passa theme code lowercase a useTranslation ('T5' → 't5')
  const cardsTranslations = getAllCardsForTheme(themeCode.toLowerCase())
  return cardsTranslations.map(ct => transformCard(ct, themeId))
}
  
  /**
 * ✅ NUOVO: Trova card per generation ID + subtheme CODE
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
  
  // Trova la card che matcha per generation + subtheme CODE
  return themeCards.find(
    card => card.generationId === generationId && 
            card.code.startsWith(subThemeCode)  // T5.1.GZ starts with T5.1
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