// src/components/test/SubThemeContentTest.tsx
'use client'

import { useState, useMemo } from 'react'
import { useSubThemeContent } from '@/hooks/useSubThemeContent'
import { useThemes } from '@/hooks/useThemes'
import { useLanguage } from '@/components/providers/language-provider'

export function SubThemeContentTest() {
  const { themes } = useThemes()
  const { language } = useLanguage()
  const [isEnabled, setIsEnabled] = useState(false)
  
  // State per selezione
  const [selectedThemeId, setSelectedThemeId] = useState('work')
  const [selectedSubThemeId, setSelectedSubThemeId] = useState('work-values')
  
  // Ottieni SubTheme selezionato
  const selectedSubTheme = useMemo(() => {
    const theme = themes.find(t => t.id === selectedThemeId)
    if (!theme) return null
    return theme.subThemes.find(st => st.id === selectedSubThemeId) || null
  }, [themes, selectedThemeId, selectedSubThemeId])
  
  // Ottieni subthemes disponibili per il theme selezionato
  const availableSubThemes = useMemo(() => {
    const theme = themes.find(t => t.id === selectedThemeId)
    return theme?.subThemes || []
  }, [themes, selectedThemeId])
  
  const { content, isLoading, error } = useSubThemeContent(
    isEnabled ? selectedSubTheme : null
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
      
      {/* Language Info */}
      <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
        Language: {language.toUpperCase()}
      </div>
      
      {/* Theme Selector */}
      <div className="mb-3">
        <label className="block text-xs font-semibold mb-1">Theme:</label>
        <select
          value={selectedThemeId}
          onChange={(e) => {
            setSelectedThemeId(e.target.value)
            // Reset subtheme quando cambia theme
            const newTheme = themes.find(t => t.id === e.target.value)
            setSelectedSubThemeId(newTheme?.subThemes[0]?.id || '')
          }}
          className="w-full p-2 text-xs border rounded dark:bg-slate-700 dark:border-slate-600"
        >
          {themes.map(theme => (
            <option key={theme.id} value={theme.id}>
              {theme.code} - {theme.title}
            </option>
          ))}
        </select>
      </div>
      
      {/* SubTheme Selector */}
      <div className="mb-3">
        <label className="block text-xs font-semibold mb-1">SubTheme:</label>
        <select
          value={selectedSubThemeId}
          onChange={(e) => setSelectedSubThemeId(e.target.value)}
          className="w-full p-2 text-xs border rounded dark:bg-slate-700 dark:border-slate-600"
        >
          {availableSubThemes.map(subTheme => (
            <option key={subTheme.id} value={subTheme.id}>
              {subTheme.code} - {subTheme.title}
            </option>
          ))}
        </select>
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
        {isEnabled && selectedSubTheme && (
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="font-bold mb-1">SubTheme:</div>
            <div>{selectedSubTheme.title}</div>
            <div className="text-gray-500">
              File: {selectedSubTheme.markdownFile || '❌ NO FILE'}
            </div>
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