// src/types/handbook.ts

/**
 * Type definitions for Handbook data structure
 * 
 * These interfaces define the core data models used throughout the application.
 * Extracted from handbook-data.ts for better separation of concerns.
 */

// ==========================================
// CORE INTERFACES
// ==========================================

/**
 * Represents a sub-theme within a main theme
 */
export interface SubTheme {
  id: string
  title: string
  page_id: number
  markdownFile?: string
}

/**
 * Represents a main theme with its sub-themes
 */
export interface Theme {
  id: string
  title: string
  introduction?: string
  page_id: number
  subThemes: SubTheme[]
  reportPdfUrl?: string
}

/**
 * Represents a generation (Gen Z, Millennial, Gen X, Baby Boomer)
 */
export interface Generation {
  id: string
  title: string
  ageRange: string
  description: string
  characterFolder?: string  // Nome della cartella del personaggio
  frameStart?: number       // Frame iniziale
  frameEnd?: number        // Frame finale
  framePrefix?: string     // Prefisso del file (se presente)
}

/**
 * Represents a card combining theme + subtheme + generation
 */
export interface Card {
  id: string
  title: string
  color: string
  description: string
  themeId: string       // Explicit theme reference
  subThemeId: string
  generationId: string
  page_id: number
  image?: string
  stereotype: string
  researchFindings: string
  strategiesAdvice: string
}

/**
 * Represents a page added to the user's custom handbook
 */
export interface BookPage {
  id: string
  title: string
  
  // ✅ CODE-based fields (SV0027) - Fonte di verità
  themeCode?: string      // es: "T5"
  subThemeCode?: string   // es: "T5.1"
  cardCode?: string       // es: "T5.1.GZ"
  
  // [SV0031] Titolo del SubTheme (per auto-inserimento corretto)
  subThemeTitle?: string  // es: "Intersectional Discrimination & Power Asymmetries"
  
  // ⚠️ LEGACY fields - Deprecati, da rimuovere in futuro
  themeId: string
  subThemeId?: string
  generationId?: string
  cardId?: string
  
  // Metadata
  addedAt: number
  language?: string
}