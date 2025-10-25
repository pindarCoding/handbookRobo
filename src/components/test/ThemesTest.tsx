// src/components/test/ThemesTest.tsx
'use client'

import { useThemes } from '@/hooks/useThemes'
import { useLanguage } from '@/components/providers/language-provider'

export function ThemesTest() {
  const { themes, getThemeById, getSubThemeById } = useThemes()
  const { language, setLanguage } = useLanguage()
  
  return (
    <div className="fixed bottom-20 right-2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border-2 border-blue-500 z-50 max-w-md max-h-[20vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm">🧪 Themes Hook Test</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('it')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              language === 'it' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            IT
          </button>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <strong>Themes Count:</strong> {themes.length}
        </div>
        
        {themes.map(theme => (
          <div key={theme.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="font-bold text-blue-600 dark:text-blue-400">
              {theme.code}: {theme.title}
            </div>
            <div className="text-gray-500 text-xs">
              ID: {theme.id} | Page: {theme.page_id}
            </div>
            <div className="mt-1 ml-2 space-y-1">
              {theme.subThemes.map(sub => (
                <div key={sub.id} className="text-xs text-gray-600 dark:text-gray-300">
                  • {sub.code}: {sub.title}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="border-t pt-2">
          <strong>Test getThemeById(&apos;work&apos;):</strong>
          <div className="mt-1 text-xs">
            {getThemeById('work')?.title || 'Not found'}
          </div>
        </div>
        
        <div>
          <strong>Test getSubThemeById(&apos;work&apos;, &apos;work-values&apos;):</strong>
          <div className="mt-1 text-xs">
            {getSubThemeById('work', 'work-values')?.title || 'Not found'}
          </div>
        </div>
      </div>
    </div>
  )
}