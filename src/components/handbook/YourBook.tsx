// src/components/handbook/YourBook.tsx
'use client'

import { useBook } from '@/components/providers/book-provider'
import { Trash2Icon } from 'lucide-react'
import { handbookData, variants } from '@/data/handbook-data'

export const YourBook = () => {
  const { pages, removePage, clearBook } = useBook()

  // Funzione helper per recuperare il page_id basandosi sugli ID salvati
  const getPageId = (page: any): number | null => {
    // Caso 1: Solo Theme selezionato
    if (page.themeId && !page.subThemeId && !page.variantId) {
      const theme = handbookData.find(t => t.id === page.themeId)
      return theme?.page_id || null
    }
    
    // Caso 2: Theme + SubTheme selezionati
    if (page.themeId && page.subThemeId && !page.variantId) {
      const theme = handbookData.find(t => t.id === page.themeId)
      const subTheme = theme?.subThemes.find(st => st.id === page.subThemeId)
      return subTheme?.page_id || null
    }
    
    // Caso 3: Variant completa selezionata
    if (page.variantId) {
      const variant = variants.find(v => v.id === page.variantId)
      return variant?.page_id || null
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
      const response = await fetch('http://192.168.19.204:5000/merge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language: 'en',
          pages: pageIds
        })
      })

      if (!response.ok) {
        const err = await response.json()
        alert('Error: ' + err.error)
        return
      }

      // Gestisci il download del blob
      const blob = await response.blob()
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
      alert('An error occurred while exporting the handbook. Please check your connection and try again.')
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