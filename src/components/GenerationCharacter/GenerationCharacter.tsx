// src/components/GenerationCharacter/GenerationCharacter.tsx
'use client'

import React from 'react'
import { AnimatedCharacter } from '@/components/AnimatedCharacter'
import { generateImageSequence } from '@/utils/imageSequence'

interface GenerationCharacterProps {
  characterFolder: string
  frameStart: number
  frameEnd: number
  framePrefix?: string
  size?: number
  frameRate?: number
  className?: string
  showBorder?: boolean
  borderColor?: string
}

export const GenerationCharacter: React.FC<GenerationCharacterProps> = ({
  characterFolder,
  frameStart,
  frameEnd,
  framePrefix = '',
  size = 80,
  frameRate = 12,
  className = '',
  showBorder = true,
  borderColor = 'border-slate-300'
}) => {
  // Genera la sequenza di immagini basata sui parametri
  const images = generateImageSequence({
    basePath: `/characters/${characterFolder}`,
    prefix: framePrefix,
    startFrame: frameStart,
    endFrame: frameEnd,
    digits: framePrefix ? 3 : 0,  // Se c'è un prefisso, usa 3 digit padding
    extension: 'png'
  })

  return (
    <div 
      className={`
        rounded-full overflow-hidden 
        ${showBorder ? `border-2 ${borderColor}` : ''}
        ${className}
      `}
      style={{ width: size, height: size }}
    >
      <AnimatedCharacter
        images={images}
        alt={`${characterFolder} character`}
        width={size}
        height={size}
        frameRate={frameRate}
        loop={true}
        playOnHover={true}
      />
    </div>
  )
}

// Export di default per lazy loading
export default GenerationCharacter