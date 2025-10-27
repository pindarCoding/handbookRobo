// src/components/test/SubThemeContentTest.tsx
'use client'

import { useState } from 'react'
import { useSubThemeContent } from '@/hooks/useSubThemeContent'
import { handbookData } from '@/data/handbook-data'

export function SubThemeContentTest() {
  // Prendi il primo SubTheme disponibile per test
  const testSubTheme = handbookData[4].subThemes[0] // work-values
  const [isEnabled, setIsEnabled] = useState(false)
  
  const { content, isLoading, error } = useSubThemeContent(
    isEnabled ? testSubTheme : null
  )
  
  return (
    <div className="fixed bottom-20 left-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border-2 border-purple-500 z-50 max-w-md max-h-[60vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm">🧪 SubTheme Content Test</h3>
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            isEnabled 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          }`}
        >
          {isEnabled ? 'Disable' : 'Enable'}
        </button>
      </div>
      
      <div className="space-y-3 text-xs">
        {/* Status */}
        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
          <div className="font-bold mb-1">Status:</div>
          {!isEnabled && <div className="text-gray-500">❌ Disabled</div>}
          {isEnabled && isLoading && <div className="text-blue-500">⏳ Loading...</div>}
          {isEnabled && error && <div className="text-red-500">❌ Error: {error.message}</div>}
          {isEnabled && !isLoading && !error && content && (
            <div className="text-green-500">✅ Loaded ({content.length} chars)</div>
          )}
        </div>
        
        {/* SubTheme Info */}
        {isEnabled && (
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="font-bold mb-1">SubTheme:</div>
            <div>{testSubTheme.title}</div>
            <div className="text-gray-500">File: {testSubTheme.markdownFile}</div>
          </div>
        )}
        
        {/* Content Preview */}
        {isEnabled && content && (
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="font-bold mb-1">Content Preview:</div>
            <div className="max-h-32 overflow-y-auto text-xs whitespace-pre-wrap">
              {content.substring(0, 200)}...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}