// src/hooks/useGenerations.ts
import { useMemo } from 'react'
import { useTranslation } from './useTranslation'
import { generationsConfig } from '@/data/config/generations'

// Interface completa (da handbook-data.ts - per ora)
export interface Generation {
  id: string
  code: string              // ← NUOVO campo da JSON
  title: string
  ageRange: string
  description: string
  characterFolder?: string
  frameStart?: number
  frameEnd?: number
  framePrefix?: string
}

/**
 * Hook per ottenere generations con traduzioni + config tecnico
 * Sostituisce l'import diretto da handbook-data.ts
 * 
 * @returns { generations: Generation[] } - Array completo con traduzioni e animazioni
 * 
 * @example
 * ```tsx
 * const { generations } = useGenerations()
 * 
 * generations.map(gen => (
 *   <div key={gen.id}>
 *     {gen.title} - {gen.ageRange}
 *   </div>
 * ))
 * ```
 */
export function useGenerations() {
  const { getAllGenerations } = useTranslation()
  
  const generations = useMemo<Generation[]>(() => {
    // 1. Carica traduzioni (GZ, GM, GX, GB) dalla lingua corrente
    const translatedGenerations = getAllGenerations()
    
    // 2. Merge con config tecnico (animations)
    return translatedGenerations.map(gen => {
      // Trova config tecnico corrispondente per ID
      const config = generationsConfig.find(c => c.id === gen.id)
      
      if (!config) {
        console.warn(`⚠️ Animation config not found for generation: ${gen.id}`)
        return gen as Generation
      }
      
      // 3. Merge: traduzioni + animazioni
      return {
        ...gen,                                    // id, code, title, ageRange, description (tradotti!)
        characterFolder: config.avatarAnimation.folder,
        frameStart: config.avatarAnimation.frameStart,
        frameEnd: config.avatarAnimation.frameEnd,
        framePrefix: config.avatarAnimation.framePrefix
      } as Generation
    })
  }, [getAllGenerations])
  
  return { generations }
}