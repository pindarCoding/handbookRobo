// src/components/handbook/WelcomeContent.tsx
'use client'

import Image from 'next/image'
import { BookOpenIcon, FilterIcon, DownloadIcon, PlusCircleIcon } from 'lucide-react'

export const WelcomeContent = () => {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Welcome to the Generational Handbook
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          Your comprehensive guide to navigating intergenerational workplace dynamics
        </p>
        
        {/* Generations Image */}
        <div className="flex justify-center mb-12">
          <Image
            src="/images/generations.png"
            alt="Generational representation"
            width={400}
            height={200}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>



      {/* How It Works Section */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          How to Create Your Custom Handbook
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              1
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Choose Theme</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select from communication, diversity, digital inequality, and more
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              2
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Pick Subtopic</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Dive deeper into specific areas within your chosen theme
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              3
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Select Generation</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Focus on Gen Z, Millennials, Gen X, or Baby Boomers
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              4
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Build & Export</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Add pages to your book and export your custom PDF
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Key Features
        </h3>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center text-slate-600 dark:text-slate-400">
            <PlusCircleIcon className="w-4 h-4 mr-2 text-blue-500" />
            Add unlimited pages
          </div>
          <div className="flex items-center text-slate-600 dark:text-slate-400">
            <FilterIcon className="w-4 h-4 mr-2 text-green-500" />
            Filter by your needs
          </div>
          <div className="flex items-center text-slate-600 dark:text-slate-400">
            <DownloadIcon className="w-4 h-4 mr-2 text-purple-500" />
            Export as PDF
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Create Custom Handbook */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
              <FilterIcon className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Custom Handbook
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Create your personalized handbook by selecting only the topics that matter to you. 
            Navigate through themes, generations, and specific approaches to build your custom guide.
          </p>
          <p className="text-green-600 dark:text-green-400 font-medium">
            Start by selecting a theme above
          </p>
        </div>

        {/* Test Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
              <FilterIcon className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Test 
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Test placeholder
          </p>
          <p className="text-green-600 dark:text-green-400 font-medium">
            Start by selecting a theme above
          </p>
        </div>
      </div>

      
    </div>
  )
}