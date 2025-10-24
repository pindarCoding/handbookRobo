'use client'

import { useLanguage } from '@/components/providers/language-provider'
import { useTranslation } from '@/hooks/useTranslation'
import { generationsConfig } from '@/data/config/generations'
import { useState, useEffect } from 'react'
import { useGenerations } from '@/hooks/useGenerations'


// Type per le traduzioni
interface GenerationTranslation {
  title: string
  ageRange: string
  description: string
}

export function GenerationsTest() {
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()
  const [translations, setTranslations] = useState<Record<string, GenerationTranslation>>({})
  const { generations: hookGenerations } = useGenerations()


useEffect(() => {
  const data: Record<string, GenerationTranslation> = {}
  
  for (const gen of generationsConfig) {
    data[gen.id] = {
      title: t(`${gen.id}.title`),
      ageRange: t(`${gen.id}.ageRange`),
      description: t(`${gen.id}.description`)
    }
  }
  
  setTranslations(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [language])

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border-2 border-green-500 z-50 max-w-md max-h-[40vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm">🧪 Generations i18n Test</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors
              ${language === 'en' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('it')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors
              ${language === 'it' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            IT
          </button>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {generationsConfig.map(gen => (
          <div key={gen.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">
              {translations[gen.id]?.title || '[loading...]'}
            </div>
            <div className="text-gray-600 dark:text-gray-300 mb-1">
              📅 {translations[gen.id]?.ageRange || '[loading...]'}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">
              {translations[gen.id]?.description || '[loading...]'}
            </div>
            <div className="mt-2 text-xs text-gray-400 border-t pt-2">
              <strong>Config:</strong> {gen.avatarAnimation.folder}
            </div>
          </div>
        ))}
      </div>
      {/* ✨ NUOVO: Test useGenerations Hook */}
<div className="mt-4 border-t border-green-500 pt-4">
  <h4 className="font-bold text-sm text-green-600 dark:text-green-400 mb-3">
    🔧 useGenerations Hook Test
  </h4>
  <div className="space-y-2">
    {hookGenerations.map(gen => (
      <div 
        key={gen.id} 
        className="text-xs p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800"
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="font-bold text-green-700 dark:text-green-300">ID:</span> {gen.id}
          </div>
          <div className="border-t border-green-300 dark:border-green-700 pt-2">
        <div className="font-bold text-green-700 dark:text-green-300 mb-1">Description:</div>
        <div className="text-gray-700 dark:text-gray-300 italic">
          &quot;{gen.description}&quot;
        </div>
      </div>
          <div>
            <span className="font-bold text-green-700 dark:text-green-300">Code:</span> {gen.code}
          </div>
          <div className="col-span-2">
            <span className="font-bold text-green-700 dark:text-green-300">Title:</span> {gen.title}
          </div>
          <div className="col-span-2">
            <span className="font-bold text-green-700 dark:text-green-300">Age:</span> {gen.ageRange}
          </div>
          <div className="col-span-2 text-gray-600 dark:text-gray-400 text-xs">
            📁 {gen.characterFolder} | 🎬 {gen.frameStart}-{gen.frameEnd}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  )
}