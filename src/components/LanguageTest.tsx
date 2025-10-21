'use client'

import { useLanguage } from '@/components/providers/language-provider'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'

export function LanguageTest() {
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()
  const [testKey, setTestKey] = useState<string>('[loading...]')

  useEffect(() => {
    // Test t() asincrono
    t('test.key').then(setTestKey)
  }, [language, t])

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border-2 border-blue-500 z-50">
      <h3 className="font-bold text-sm mb-2">🧪 Language Test</h3>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Current Language:</strong> 
          <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded">
            {language}
          </span>
        </div>
        
        <div>
          <strong>Test Translation:</strong>
          <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono">
            {testKey}
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors
              ${language === 'en' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('it')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors
              ${language === 'it' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'}`}
          >
            IT
          </button>
        </div>
        
        <div className="pt-2 text-xs text-gray-500">
          ℹ️ Missing translations show as [key]
        </div>
      </div>
    </div>
  )
}