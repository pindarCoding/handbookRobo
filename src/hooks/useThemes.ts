// src/hooks/useThemes.ts
import { useMemo } from 'react'
import { useTranslation, ThemeTranslation, SubThemeTranslation } from './useTranslation'

/**
 * Interface completa Theme per l'app
 * (Compatibile con handbook-data.ts esistente)
 */
export interface Theme {
  id: string
  code: string
  title: string
  introduction?: string
  reportPdfUrl?: string | null
  page_id: number  // Nota: underscore per compatibilità
  subThemes: SubTheme[]  // Array invece di object
}

/**
 * Interface completa SubTheme per l'app
 * (Compatibile con handbook-data.ts esistente)
 */
export interface SubTheme {
  id: string
  code: string
  title: string
  description?: string
  page_id: number  // Nota: underscore per compatibilità
  markdownFile?: string
}

/**
 * Hook per ottenere themes con traduzioni + trasformazione
 * Sostituisce l'import diretto di handbookData da handbook-data.ts
 * 
 * @returns { themes, getThemeById, getThemeByCode, getSubThemeById }
 * 
 * @example
 * ```tsx
 * const { themes } = useThemes()
 * 
 * themes.map(theme => (
 *   <div key={theme.id}>
 *     {theme.title}
 *   </div>
 * ))
 * ```
 */
export function useThemes() {
  const { getAllThemes } = useTranslation()
  
  /**
   * Trasforma themes dal formato JSON al formato app
   * - Converte subthemes da object a array
   * - Rinomina pageId → page_id (compatibilità)
   */
  const themes = useMemo<Theme[]>(() => {
    const translatedThemes = getAllThemes()
    
    return translatedThemes.map((themeTranslation: ThemeTranslation): Theme => {
      // Trasforma subthemes da object a array
      const subThemesArray: SubTheme[] = Object.values(themeTranslation.subthemes || {}).map(
        (subTheme: SubThemeTranslation): SubTheme => ({
          id: subTheme.id,
          code: subTheme.code,
          title: subTheme.title,
          description: subTheme.description,
          page_id: subTheme.pageId,  // pageId → page_id
          markdownFile: subTheme.markdownFile
        })
      )
      
      return {
        id: themeTranslation.id,
        code: themeTranslation.code,
        title: themeTranslation.title,
        introduction: themeTranslation.introduction,
        reportPdfUrl: themeTranslation.reportPdfUrl,
        page_id: themeTranslation.pageId,  // pageId → page_id
        subThemes: subThemesArray
      }
    })
  }, [getAllThemes])
  
  /**
   * Trova theme per ID
   * @param id - Theme ID (es: 'work', 'communication')
   */
  const getThemeById = (id: string): Theme | undefined => {
    return themes.find(theme => theme.id === id)
  }
  
  /**
   * Trova theme per CODE
   * @param code - Theme code (es: 'T5', 'T1')
   */
  const getThemeByCode = (code: string): Theme | undefined => {
    return themes.find(theme => theme.code === code)
  }
  
  /**
   * Trova subtheme per ID all'interno di un theme
   * @param themeId - Theme ID
   * @param subThemeId - SubTheme ID
   */
  const getSubThemeById = (themeId: string, subThemeId: string): SubTheme | undefined => {
    const theme = getThemeById(themeId)
    if (!theme) return undefined
    
    return theme.subThemes.find(sub => sub.id === subThemeId)
  }
  
  /**
   * Trova subtheme per CODE
   * @param subThemeCode - SubTheme code (es: 'T5.1')
   */
  const getSubThemeByCode = (subThemeCode: string): SubTheme | undefined => {
    // Estrai theme code da subtheme code (T5.1 → T5)
    const themeCode = subThemeCode.split('.')[0]
    const theme = getThemeByCode(themeCode)
    
    if (!theme) return undefined
    
    return theme.subThemes.find(sub => sub.code === subThemeCode)
  }
  
  return { 
    themes, 
    getThemeById, 
    getThemeByCode, 
    getSubThemeById,
    getSubThemeByCode
  }
}