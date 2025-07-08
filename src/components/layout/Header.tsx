// src/components/layout/Header.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
]

export const Header = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLanguage(language)
    setIsLanguageOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative z-50">
      <div className=" max-w-screen-2xl mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/MYCo-Logo_Transparent-300x300.png"
              alt="MyCo Logo"
              width={240}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              MyCo Website
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              MyLastHandBook
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
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
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
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
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium py-2">
                MyCo Website
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium py-2">
                MyLastHandBook
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium py-2">
                How To
              </a>
              
              {/* Mobile Language Selection */}
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Select Your Language:</p>
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
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
  )
}