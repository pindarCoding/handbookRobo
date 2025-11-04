// src/components/providers/book-provider.tsx
'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { BookPage } from '@/types/handbook'
import { toast } from 'sonner'

interface BookContextType {
  pages: BookPage[];
  addPage: (page: Omit<BookPage, 'addedAt'>) => void;
  removePage: (id: string) => void;
  clearBook: () => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export function BookProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<BookPage[]>([])
  
  // Carica le pagine salvate dopo il primo render
  useEffect(() => {
    try {
      const savedPages = localStorage.getItem('handbook-book')
      if (savedPages) {
        setPages(JSON.parse(savedPages))
      }
    } catch (error) {
      console.error('Failed to load book from localStorage:', error)
    }
  }, [])

  // Salva le pagine quando cambiano
  useEffect(() => {
    try {
      localStorage.setItem('handbook-book', JSON.stringify(pages))
    } catch (error) {
      console.error('Failed to save book to localStorage:', error)
    }
  }, [pages])

  /**
   * Crea un BookPage per il SubTheme padre di una Card
   */
  const createSubThemePage = (cardPage: Omit<BookPage, 'addedAt'>): Omit<BookPage, 'addedAt'> => {
    // Estrai info dal titolo della card (es: "Gen Z: Workplace Values")
    // Il SubTheme sarà "Workplace Values (Work)"
    const cardTitle = cardPage.title
    
    // Rimuovi la parte generation dal titolo (tutto prima del ":")
    const subThemeTitle = cardTitle.includes(':') 
      ? cardTitle.split(':')[1].trim() 
      : cardTitle
    
    return {
      id: `${cardPage.themeId}-${cardPage.subThemeId}`,
      title: subThemeTitle,
      themeId: cardPage.themeId,
      subThemeId: cardPage.subThemeId
      // No generationId, no cardId → è un SubTheme
    }
  }

  /**
   * Trova la posizione corretta per inserire una nuova card
   * Mantiene l'ordine: SubTheme → Cards dello stesso SubTheme
   */
  const findInsertPosition = (currentPages: BookPage[], newCard: Omit<BookPage, 'addedAt'>): number => {
    let lastRelatedIndex = -1
    
    // Trova l'ultima pagina dello stesso subTheme (SubTheme o Card)
    for (let i = currentPages.length - 1; i >= 0; i--) {
      if (currentPages[i].subThemeId === newCard.subThemeId) {
        lastRelatedIndex = i
        break
      }
    }
    
    // Se trovata, inserisci dopo
    if (lastRelatedIndex !== -1) {
      return lastRelatedIndex + 1
    }
    
    // Altrimenti aggiungi in fondo
    return currentPages.length
  }

  /**
   * Aggiunge una Card al book
   * Auto-inserisce il SubTheme padre se non esiste
   */
  const addPage = (page: Omit<BookPage, 'addedAt'>) => {
    // ✅ ASSUNZIONE: Sempre una Card (cardId sempre presente)
    
    // 1. Check duplicato
    const isDuplicate = pages.some(p => p.id === page.id)
    if (isDuplicate) {
      toast.error(`"${page.title}" is already in your handbook`, {
        duration: 3000,
      })
      return
    }

    // 2. Check se SubTheme padre esiste
    const subThemeExists = pages.some(p => 
      p.themeId === page.themeId && 
      p.subThemeId === page.subThemeId && 
      !p.cardId  // È il SubTheme, non una Card
    )

    setPages(currentPages => {
  const newPages = [...currentPages]
  let addedChapter = false
  
  // 3. Se SubTheme non esiste, crealo e inseriscilo
  if (!subThemeExists) {
    const subThemePage = createSubThemePage(page)
    const subThemeWithTime: BookPage = { 
      ...subThemePage, 
      addedAt: Date.now() - 1
    }
    
    const subThemePosition = findInsertPosition(newPages, page)
    newPages.splice(subThemePosition, 0, subThemeWithTime)
    addedChapter = true
  }
  
  // 4. Inserisci la Card
  const cardWithTime: BookPage = { 
    ...page, 
    addedAt: Date.now() 
  }
  const cardPosition = findInsertPosition(newPages, page)
  newPages.splice(cardPosition, 0, cardWithTime)
  
  // 5. Toast DOPO aver aggiornato lo state (fuori dal setter)
  setTimeout(() => {
    if (addedChapter) {
      toast.success(
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-base">📖 Added chapter introduction for you</div>
          <div className="text-sm opacity-90">{page.title}</div>
        </div>,
        {
          duration: 4000,
          position: 'top-center',
        }
      )
    } else {
      toast.success(`Added "${page.title}"`, {
        duration: 2500,
      })
    }
  }, 0)
  
  return newPages
})
  }

  /**
   * Rimuove una pagina dal book
   * Se è un SubTheme con Cards figlie, chiede conferma
   */
  const removePage = (id: string) => {
    const pageToRemove = pages.find(p => p.id === id)
    if (!pageToRemove) return

    // Check se è un SubTheme (no cardId)
    const isSubTheme = !pageToRemove.cardId && !!pageToRemove.subThemeId
    
    if (isSubTheme) {
      // Conta quante cards figlie ha
      const childCards = pages.filter(p => 
        p.subThemeId === pageToRemove.subThemeId && 
        !!p.cardId
      )
      
      if (childCards.length > 0) {
        // ⚠️ Ha cards figlie → Conferma richiesta
        toast.warning(
          `Removing this chapter will leave ${childCards.length} card${childCards.length > 1 ? 's' : ''} without context. Click again to confirm.`,
          {
            duration: 5000,
            action: {
              label: 'Remove Anyway',
              onClick: () => {
                setPages(current => current.filter(p => p.id !== id))
                toast.success('Chapter removed. Cards are still in your handbook.', {
                  duration: 3000,
                })
              }
            }
          }
        )
        return
      }
    }
    
    // Rimozione normale (Card o SubTheme senza figli)
    setPages(current => current.filter(p => p.id !== id))
    toast.success('Removed from handbook', {
      duration: 2000,
    })
  }

  /**
   * Svuota completamente il book
   */
  const clearBook = () => {
    if (pages.length === 0) return
    
    toast.warning(
      `Remove all ${pages.length} pages from your handbook?`,
      {
        duration: 5000,
        action: {
          label: 'Clear All',
          onClick: () => {
            setPages([])
            toast.success('Handbook cleared', {
              duration: 2000,
            })
          }
        }
      }
    )
  }

  return (
    <BookContext.Provider value={{ pages, addPage, removePage, clearBook }}>
      {children}
    </BookContext.Provider>
  )
}

// Hook personalizzato per usare il contesto
export function useBook() {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider')
  }
  return context
}