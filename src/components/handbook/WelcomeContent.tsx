// src/components/handbook/WelcomeContent.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FilterIcon, DownloadIcon, PlusCircleIcon } from 'lucide-react'
import { fadeSlideUp, staggerContainer, staggerItem, scalePop } from '@/data/config/animations'

export const WelcomeContent = () => {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
        >
          Welcome to the Generational Handbook
        </motion.h1>
        <motion.p 
          className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Your comprehensive guide to navigating intergenerational workplace dynamics
        </motion.p>

        {/* Generations Image */}
        <motion.div 
          className="flex justify-center mb-12"
          variants={scalePop}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          <Image
            src="/images/generations.png"
            alt="Generational representation"
            width={300}
            height={150}
            className="rounded-lg shadow-lg"
            priority
          />
        </motion.div>
        <motion.div 
          className='text-xs max-w-[370px] mx-auto'
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-center text-slate-500 dark:text-slate-400">Following an introductory chapter, the Handbook explores generational inclusion from five different perspectives.</p>
        </motion.div>

      </motion.div>



      {/* How It Works Section */}
      <motion.div 
        className="bg-slate-50 dark:bg-slate-900 rounded-xl p-8 mb-12"
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
        >
          How to Create Your Custom Handbook
        </motion.h2>

        <motion.div 
          className="grid md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          {/* Step 1 */}
          <motion.div 
            className="text-center"
            variants={staggerItem}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              1
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Choose Theme</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select from communication, diversity, digital inequality, and more
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="text-center"
            variants={staggerItem}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              2
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Pick Subtopic</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Dive deeper into specific areas within your chosen theme
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="text-center"
            variants={staggerItem}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              3
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Select Generation</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Focus on Gen Z, Millennials, Gen X, or Baby Boomers
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            className="text-center"
            variants={staggerItem}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              4
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Build & Export</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Add pages to your book and export your custom PDF
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Key Features */}
      <motion.div 
        className="text-center mb-12"
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.4 }}
      >
        <motion.h3 
          className="text-lg font-semibold text-slate-900 dark:text-white mb-4"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.6 }}
        >
          Start now
        </motion.h3>
        <motion.div 
          className="flex flex-wrap justify-center gap-4 text-sm"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
        >
          <motion.div 
            className="flex items-center text-slate-600 dark:text-slate-400"
            variants={staggerItem}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <PlusCircleIcon className="w-4 h-4 mr-2 text-blue-500" />
            Add unlimited pages
          </motion.div>
          <motion.div 
            className="flex items-center text-slate-600 dark:text-slate-400"
            variants={staggerItem}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <FilterIcon className="w-4 h-4 mr-2 text-green-500" />
            Filter by your needs
          </motion.div>
          <motion.div 
            className="flex items-center text-slate-600 dark:text-slate-400"
            variants={staggerItem}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <DownloadIcon className="w-4 h-4 mr-2 text-purple-500" />
            Export as PDF
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Action Cards */}
      <motion.div 
        className="grid md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2.0 }}
      >
        {/* Create Custom Handbook */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          variants={staggerItem}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            transition: { duration: 0.3 } 
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="flex items-center mb-4"
            variants={scalePop}
          >
            <motion.div 
              className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FilterIcon className="w-6 h-6 text-green-600 dark:text-green-300" />
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-slate-900 dark:text-white"
              variants={fadeSlideUp}
            >
              Custom Handbook
            </motion.h3>
          </motion.div>
          <motion.p 
            className="text-slate-600 dark:text-slate-300 mb-4"
            variants={fadeSlideUp}
          >
            Create your personalized handbook by selecting only the topics that matter to you.
            Navigate through themes, generations, and specific approaches to build your custom guide.
          </motion.p>
          <motion.p 
            className="text-green-600 dark:text-green-400 font-medium"
            variants={fadeSlideUp}
          >
            Start by selecting a theme above
          </motion.p>
        </motion.div>

        {/* Test Card */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          variants={staggerItem}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            transition: { duration: 0.3 } 
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="flex items-center mb-4"
            variants={scalePop}
          >
            <motion.div 
              className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FilterIcon className="w-6 h-6 text-green-600 dark:text-green-300" />
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-slate-900 dark:text-white"
              variants={fadeSlideUp}
            >
              Test
            </motion.h3>
          </motion.div>
          <motion.p 
            className="text-slate-600 dark:text-slate-300 mb-4"
            variants={fadeSlideUp}
          >
            Test placeholder
          </motion.p>
          <motion.p 
            className="text-green-600 dark:text-green-400 font-medium"
            variants={fadeSlideUp}
          >
            Start by selecting a theme above
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div 
        className='text-xs mx-auto my-8'
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2.4 }}
      >
        <motion.p 
          className='text-sm text-center text-slate-500 dark:text-slate-400'
          variants={fadeSlideUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          &ldquo;MYCO – Meet Your Colleague&rdquo; is a 24-month Erasmus+ funded project that aims to create a training tool in the field of Diversity and Inclusion.
          By going beyond generational stereotypes, we want to promote inclusion in the workplace.
        </motion.p>
      </motion.div>

    </div>

  )
}