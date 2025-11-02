// src/components/providers/book-provider.tsx
'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { BookPage } from '@/types/handbook'

interface BookContextType {
  pages: BookPage[];
  addPage: (page: Omit<BookPage, 'addedAt'>) => void;
  removePage: (id: string) => void;
  clearBook: () => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export function BookProvider({ children }: { children: ReactNode }) {
  // Inizializziamo con un array vuoto per evitare hydration mismatch
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

  // Aggiunge una pagina al libro
  const addPage = (page: Omit<BookPage, 'addedAt'>) => {
    const pageWithTimestamp = { ...page, addedAt: Date.now() }
    
    setPages(currentPages => {
      // Controlla se la pagina esiste già
      if (currentPages.some(p => p.id === page.id)) {
        return currentPages
      }
      return [...currentPages, pageWithTimestamp]
    })
  }

  // Rimuove una pagina dal libro
  const removePage = (id: string) => {
    setPages(currentPages => currentPages.filter(p => p.id !== id))
  }

  // Svuota il libro
  const clearBook = () => {
    setPages([])
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