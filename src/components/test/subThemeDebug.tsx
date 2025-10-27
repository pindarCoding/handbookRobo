// src/components/test/SubThemeDebug.tsx
'use client'

import { useThemes } from '@/hooks/useThemes'

export function SubThemeDebug() {
  const { themes } = useThemes()
  
  return (
    <div className="fixed top-20 right-4 bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg shadow-lg border-2 border-yellow-500 z-50 max-w-md max-h-[80vh] overflow-y-auto">
      <h3 className="font-bold text-sm mb-3">🔍 SubTheme Structure Debug</h3>
      
      <div className="space-y-4 text-xs">
        {themes.map(theme => (
          <div key={theme.id} className="p-2 bg-white dark:bg-gray-800 rounded">
            <div className="font-bold text-blue-600 mb-2">
              {theme.code} - {theme.title}
            </div>
            
            {theme.subThemes.map(subTheme => (
              <div key={subTheme.id} className="ml-4 p-2 bg-gray-50 dark:bg-gray-700 rounded mb-2">
                <div className="font-semibold">{subTheme.code}</div>
                <div className="text-gray-600 dark:text-gray-400">{subTheme.title}</div>
                <div className="text-xs mt-1">
                  <span className={subTheme.markdownFile ? 'text-green-600' : 'text-red-600'}>
                    {subTheme.markdownFile ? `✅ ${subTheme.markdownFile}` : '❌ NO FILE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}