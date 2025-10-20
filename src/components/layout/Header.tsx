// src/components/layout/Header.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react'
import { useTheme } from '../providers/theme-provider'
import { YourBookBadge } from '@/components/handbook/YourBookBadge'
import { YourBookModal } from '@/components/mobile/YourBookModal'


const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
]

export const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLanguage(language)
    setIsLanguageOpen(false)
  }

  return (
    <>
    <header className="sticky top-0 bg-white dark:bg-slate-800 shadow-md border-b border-gray-200 dark:border-slate-700  z-50">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <Image
          src="/MYCo-Logo_Transparent-300x300.png"
          alt="MyCo Logo"
          width={120}
          height={40}
          className="h-10 w-auto"
          priority
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium">
              MyCo Website
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium">
              MyLastHandBook
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium">
              How To
            </a>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                <span className="text-xl">{selectedLanguage.flag}</span>
                <span>Select Your Language</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600 w-full text-left"
                      >
                        <span className="text-xl mr-3">{language.flag}</span>
                        <span>{language.name}</span>
                        {selectedLanguage.code === language.code && (
                          <span className="ml-auto text-blue-500">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>


          </nav>

          {/* Mobile controls: Theme toggle + Menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle Mobile */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

              <YourBookBadge onClick={() => {
  console.log('Badge clicked!')
  setIsBookModalOpen(true)
}} />


            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium py-2">
                MyCo Website
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium py-2">
                MyLastHandBook
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium py-2">
                How To
              </a>

              {/* Mobile Language Selection */}
              <div className="border-t dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Select Your Language:</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        handleLanguageSelect(language)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium
                        ${selectedLanguage.code === language.code
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600'}`}
                    >
                      <span className="text-lg mr-2">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
      {/* YourBook Modal - Mobile Only */}
    <YourBookModal 
      isOpen={isBookModalOpen} 
      onClose={() => setIsBookModalOpen(false)} 
    />
  </>
  )
}