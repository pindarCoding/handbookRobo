// src/components/providers/image-cache-provider.tsx
'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface ImageCacheContextType {
  // Verifica se un'immagine è in cache
  isImageCached: (url: string) => boolean
  
  // Verifica se TUTTE le immagini sono in cache
  areAllImagesCached: (urls: string[]) => boolean
  
  // Aggiunge immagini alla cache
  addImagesToCache: (urls: string[]) => void
  
  // Aggiunge una singola immagine
  addImageToCache: (url: string) => void
  
  // Pulisce la cache (per debug)
  clearCache: () => void
  
  // Statistiche
  cacheSize: number
}

const ImageCacheContext = createContext<ImageCacheContextType | undefined>(undefined)

export function ImageCacheProvider({ children }: { children: ReactNode }) {
  // Usa Set per performance O(1) nelle ricerche
  const [cachedImages, setCachedImages] = useState<Set<string>>(new Set())

  // Verifica se una singola immagine è in cache
  const isImageCached = useCallback((url: string): boolean => {
    return cachedImages.has(url)
  }, [cachedImages])

  // Verifica se TUTTE le immagini sono in cache
  const areAllImagesCached = useCallback((urls: string[]): boolean => {
    if (urls.length === 0) return false
    return urls.every(url => cachedImages.has(url))
  }, [cachedImages])

  // Aggiunge più immagini alla cache
  const addImagesToCache = useCallback((urls: string[]) => {
    setCachedImages(prev => {
      const newSet = new Set(prev)
      urls.forEach(url => newSet.add(url))
      
      // Log per debug (rimuovibile in produzione)
      console.log(`📦 Added ${urls.length} images to cache. Total: ${newSet.size}`)
      
      return newSet
    })
  }, [])

  // Aggiunge una singola immagine
  const addImageToCache = useCallback((url: string) => {
    setCachedImages(prev => {
      const newSet = new Set(prev)
      newSet.add(url)
      return newSet
    })
  }, [])

  // Pulisce tutta la cache
  const clearCache = useCallback(() => {
    console.log('🗑️ Clearing image cache')
    setCachedImages(new Set())
  }, [])

  const value: ImageCacheContextType = {
    isImageCached,
    areAllImagesCached,
    addImagesToCache,
    addImageToCache,
    clearCache,
    cacheSize: cachedImages.size
  }

  return (
    <ImageCacheContext.Provider value={value}>
      {children}
    </ImageCacheContext.Provider>
  )
}

// Hook personalizzato per usare il context
export function useImageCache() {
  const context = useContext(ImageCacheContext)
  if (context === undefined) {
    throw new Error('useImageCache must be used within an ImageCacheProvider')
  }
  return context
}