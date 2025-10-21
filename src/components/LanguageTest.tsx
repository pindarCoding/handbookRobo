'use client'
import { useLanguage } from '@/components/providers/language-provider'

export function LanguageTest() {
  const { language, setLanguage } = useLanguage()
  
  return (
    <div>
      <p>Current: {language}</p>
      <button onClick={() => setLanguage('en')}>EN</button>
      <button onClick={() => setLanguage('it')}>IT</button>
    </div>
  )
}