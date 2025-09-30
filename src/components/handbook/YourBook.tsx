// src/components/handbook/YourBook.tsx
'use client'

import { useBook } from '@/components/providers/book-provider'
import { Trash2Icon } from 'lucide-react'
import { BookPage, handbookData, cards } from '@/data/handbook-data'  // Cambiato variants → cards

export const YourBook = () => {
  const { pages, removePage, clearBook } = useBook()

  // Funzione helper per recuperare il page_id basandosi sugli ID salvati
  const getPageId = (page: BookPage): number | null => {
    // Caso 1: Solo Theme selezionato
    if (page.themeId && !page.subThemeId && !page.cardId) {  // Cambiato variantId → cardId
      const theme = handbookData.find(t => t.id === page.themeId)
      return theme?.page_id || null
    }
    
    // Caso 2: Theme + SubTheme selezionati
    if (page.themeId && page.subThemeId && !page.cardId) {  // Cambiato variantId → cardId
      const theme = handbookData.find(t => t.id === page.themeId)
      const subTheme = theme?.subThemes.find(st => st.id === page.subThemeId)
      return subTheme?.page_id || null
    }
    
    // Caso 3: Card completa selezionata
    if (page.cardId) {  // Cambiato variantId → cardId
      const card = cards.find(c => c.id === page.cardId)  // Cambiato variant → card, variants → cards
      return card?.page_id || null
    }
    
    return null
  }

  // Funzione per esportare il PDF
  const exportHandbook = async () => {
    try {
      // Estrai tutti i page_id nell'ordine corretto
      const pageIds = pages
        .map(page => getPageId(page))
        .filter(id => id !== null)
        .map(id => id!.toString())

      if (pageIds.length === 0) {
        alert('No pages with valid page IDs to export')
        return
      }

      // Effettua la chiamata API
      const response = await fetch('https://api.meetyourcolleague.eu/merge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: 'en',
          pages: pageIds
        })
      })

      // Prima controlla il content-type per capire se è un errore JSON o un PDF
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        // Il server ha risposto con JSON, probabilmente un errore
        const errorData = await response.json()
        if (errorData.error) {
          // Gestione specifica per errori di file non trovato
          if (errorData.error.includes('File not found')) {
            const missingFile = errorData.error.match(/en\/(\d+)\.pdf/)
            if (missingFile) {
              alert(`Error: Page ${missingFile[1]} is not available on the server. Please remove it from your selection and try again.`)
            } else {
              alert(`Error: ${errorData.error}`)
            }
          } else {
            alert(`Error: ${errorData.error}`)
          }
          return
        }
      }
      
      // Se non è JSON e lo status non è ok, gestisci come errore generico
      if (!response.ok) {
        alert(`Error: Server responded with status ${response.status}`)
        return
      }

      // Verifica che sia effettivamente un PDF
      if (!contentType || !contentType.includes('application/pdf')) {
        alert('Error: Server did not return a valid PDF file')
        return
      }

      // Gestisci il download del blob
      const blob = await response.blob()
      
      // Verifica che il blob non sia vuoto
      if (blob.size === 0) {
        alert('Error: Received empty PDF file')
        return
      }
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'custom-handbook.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      
      // Pulisci l'URL object
      window.URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Export error:', error)
      
      // Gestione specifica per errori di rete/CORS
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        alert('Network error: Unable to connect to the PDF server. Please check:\n' +
              '- The server is running at https://api.meetyourcolleague.eu/merge\n' +
              '- CORS is properly configured on the server\n' +
              '- You are on the same network')
      } else {
        alert('An unexpected error occurred while exporting the handbook. Please try again.')
      }
    }
  }

  if (pages.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Your Custom Handbook
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Add pages to your handbook by clicking the + button when viewing content.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Your Custom Handbook
        </h2>
        <button
          onClick={clearBook}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Clear All
        </button>
      </div>
      
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {pages.map((page) => (
          <li 
            key={page.id}
            className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-700 rounded"
          >
            <div className="flex-1">
              <span className="text-slate-800 dark:text-slate-200 text-sm">{page.title}</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs ml-2">
                (Page {getPageId(page) || 'N/A'})
              </span>
            </div>
            <button
              onClick={() => removePage(page.id)}
              className="text-slate-500 hover:text-red-500 ml-2"
            >
              <Trash2Icon size={16} />
            </button>
          </li>
        ))}
      </ul>
      
      <button
        onClick={exportHandbook}
        className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
      >
        Export Handbook PDF
      </button>
    </div>
  )
}