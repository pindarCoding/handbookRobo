// src/hooks/useSubThemeContent.ts
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from './useTranslation'
import { SubTheme } from './useThemes'

/**
 * Hook per caricare contenuto Markdown di un SubTheme
 * 
 * @param subTheme - SubTheme object da useThemes() o null
 * @returns { content, isLoading, error }
 * 
 * @example
 * ```tsx
 * const { getSubThemeById } = useThemes()
 * const subTheme = getSubThemeById('work', 'work-values')
 * const { content, isLoading, error } = useSubThemeContent(subTheme)
 * 
 * if (isLoading) return <Spinner />
 * if (error) return <Error message={error.message} />
 * return <MarkdownRenderer content={content} />
 * ```
 */
export function useSubThemeContent(subTheme: SubTheme | null | undefined) {
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const { loadMarkdown } = useTranslation()
  
  // Estrai valori primitivi per dipendenze stabili
  const subThemeId = subTheme?.id
  const markdownFile = subTheme?.markdownFile
  
  // Debug render counter (rimuovere in produzione se necessario)
  const renderCount = useRef(0)
  const isDev = process.env.NODE_ENV === 'development'
  
  if (isDev) {
    renderCount.current++
    console.log(`🔄 useSubThemeContent render #${renderCount.current}`, {
      subThemeId,
      markdownFile,
      isLoading,
      hasContent: content.length > 0,
      hasError: !!error
    })
  }
  
  useEffect(() => {
    if (isDev) {
      console.log(`🎯 useEffect triggered`, {
        subThemeId,
        markdownFile
      })
    }
    
    // GUARD CLAUSE: Nessun SubTheme o file non configurato
    if (!subThemeId || !markdownFile) {
      if (isDev && subThemeId && !markdownFile) {
        console.warn(`⚠️ SubTheme "${subThemeId}" has no markdownFile configured`)
      }
      
      // Reset state
      setContent('')
      setIsLoading(false)
      setError(null)
      return
    }
    
    // Flag per gestire cleanup (previene race conditions)
    let isMounted = true
    
    // Async function per caricare markdown
    const fetchContent = async () => {
      try {
        // 1. Inizia caricamento
        setIsLoading(true)
        setError(null)
        
        if (isDev) {
          console.log(`⏳ Loading markdown: ${markdownFile}`)
        }
        
        // 2. Carica markdown (con fallback EN automatico in loadMarkdown)
        const markdown = await loadMarkdown(markdownFile)
        
        // 3. Verifica: componente ancora montato?
        if (!isMounted) {
          if (isDev) {
            console.log(`🚫 Component unmounted, ignoring result for: ${markdownFile}`)
          }
          return
        }
        
        // 4. Success: salva contenuto
        setContent(markdown)
        
        if (isDev) {
          console.log(`✅ Successfully loaded: ${markdownFile} (${markdown.length} chars)`)
        }
        
      } catch (err) {
        // 5. Error handling
        if (!isMounted) {
          if (isDev) {
            console.log('🚫 Component unmounted during error handling')
          }
          return
        }
        
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Unknown error occurred while loading content'
        
        if (isDev) {
          console.error(`❌ Failed to load: ${markdownFile}`, err)
        }
        
        setError(new Error(errorMessage))
        setContent('')
        
      } finally {
        // 6. Sempre eseguito: fine caricamento
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    
    // Esegui fetch
    fetchContent()
    
    // CLEANUP: quando SubTheme cambia o componente si smonta
    return () => {
      isMounted = false
      if (isDev) {
        console.log(`🧹 Cleanup for: ${markdownFile}`)
      }
    }
    
  }, [subThemeId, markdownFile, loadMarkdown, isDev])
  
  return { 
    content, 
    isLoading, 
    error,
    // Metadata utile per UI
    hasContent: content.length > 0,
    subThemeId,
    markdownFile
  }
}