'use client'

import { useLanguage } from '@/components/providers/language-provider'
import { useTranslation } from '@/hooks/useTranslation'
import { generationsConfig } from '@/data/config/generations'
import { useState, useEffect } from 'react'

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
    <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border-2 border-green-500 z-50 max-w-md max-h-[80vh] overflow-y-auto">
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
    </div>
  )
}