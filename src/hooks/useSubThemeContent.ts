// src/hooks/useSubThemeContent.ts
import { useState, useEffect, useRef } from 'react' // ← Aggiungi useRef
import { useTranslation } from './useTranslation'
import { SubTheme } from './useThemes'

export function useSubThemeContent(subTheme: SubTheme | null) {
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const { loadMarkdown } = useTranslation()
  
  // 🆕 Contatore render per debug
  const renderCount = useRef(0)
  renderCount.current++
  
  // 🆕 Log ogni render
  console.log(`🔄 useSubThemeContent render #${renderCount.current}`, {
    subThemeId: subTheme?.id,
    markdownFile: subTheme?.markdownFile,
    isLoading,
    hasContent: content.length > 0,
    hasError: !!error
  })
  
  useEffect(() => {
    console.log(`🎯 useEffect triggered for:`, {
      subThemeId: subTheme?.id,
      markdownFile: subTheme?.markdownFile,
      loadMarkdownRef: typeof loadMarkdown
    })
    
    // GUARD CLAUSE 1: Nessun SubTheme selezionato
    if (!subTheme) {
      console.log('⏭️ Skipping: no subTheme')
      setContent('')
      setIsLoading(false)
      setError(null)
      return
    }
    
    // GUARD CLAUSE 2: SubTheme senza file markdown configurato
    if (!subTheme.markdownFile) {
      console.warn(`⚠️ SubTheme ${subTheme.id} has no markdownFile configured`)
      console.log('📋 SubTheme object:', JSON.stringify(subTheme, null, 2))
      setContent('')
      setIsLoading(false)
      setError(new Error('No markdown file configured for this SubTheme'))
      return
    }
    
    // Flag per gestire cleanup (previene race condition)
    let isMounted = true
    
    // Async function per caricare markdown
    const fetchContent = async () => {
      try {
        // 1️⃣ Inizia caricamento
        setIsLoading(true)
        setError(null)
        
        console.log(`⏳ Loading markdown: ${subTheme.markdownFile}`)
        
        // 2️⃣ Chiama loadMarkdown
        const markdown = await loadMarkdown(subTheme.markdownFile!)
        
        // 3️⃣ Verifica: componente ancora montato?
        if (!isMounted) {
          console.log(`🚫 Component unmounted during fetch, ignoring result for: ${subTheme.markdownFile}`)
          return
        }
        
        // 4️⃣ Success: salva contenuto
        setContent(markdown)
        console.log(`✅ Successfully loaded markdown: ${subTheme.markdownFile} (${markdown.length} chars)`)
        
      } catch (err) {
        // 5️⃣ Error handling
        if (!isMounted) {
          console.log('🚫 Component unmounted during error handling')
          return
        }
        
        console.error(`❌ Failed to load markdown: ${subTheme.markdownFile}`, err)
        
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Unknown error occurred while loading content'
        
        setError(new Error(errorMessage))
        setContent('')
        
      } finally {
        // 6️⃣ Sempre eseguito: fine caricamento
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
      console.log(`🧹 Cleanup: marking fetch as stale for ${subTheme.markdownFile}`)
    }
    
  }, [subTheme, loadMarkdown])
  
  return { 
    content, 
    isLoading, 
    error 
  }
}