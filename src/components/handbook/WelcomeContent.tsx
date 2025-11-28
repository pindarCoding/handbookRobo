"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FilterIcon, DownloadIcon, PlusCircleIcon, ClipboardCheck } from "lucide-react";
import {
  fadeSlideUp,
  staggerContainer,
  staggerItem,
  scalePop,
} from "@/data/config/animations";

export const WelcomeContent = () => {

  const handleScrollToThemes = () => {
    const sidebar = document.getElementById('theme-selector');
    
    if (sidebar) {
      // Scroll smooth verso la sidebar
      sidebar.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Aggiungi classe highlight
      sidebar.classList.add('sidebar-highlight');
      
      // Rimuovi dopo 3 secondi
      setTimeout(() => {
        sidebar.classList.remove('sidebar-highlight');
      }, 3000);
    } else {
      // Fallback per mobile: potrebbe non esserci la sidebar desktop
      // In futuro qui si potrebbe aprire il drawer mobile
      console.log('Theme selector not found - possibly on mobile view');
    }
  };


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
          Welcome to the MYCo Generational Handbook
        </motion.h1>
        <motion.p
          className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          A practical resource for HR professionals, trainers, and facilitators
          to navigate intergenerational dynamics and foster inclusive workplaces.
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
            className="rounded-lg  w-auto h-auto max-w-full"
            priority
          />
        </motion.div>

        {/* Introduction Block - Expanded */}
        <motion.div
          className="text-xs max-w-[600px] mx-auto"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-center text-slate-500 dark:text-slate-400">
            This Handbook is the result of transnational research conducted
            across six European countries, exploring how four
            generations—Baby Boomers, Generation X, Millennials, and Generation
            Z—experience the workplace. Rather than reinforcing stereotypes, our
            goal is to provide evidence-based insights and actionable strategies
            to promote collaboration, mutual understanding, and generational
            inclusion.
          </p>
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
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Choose a Theme
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select from five research-based themes: communication, values,
              diversity, digital skills, or intergenerational learning.
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
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Pick a Subtopic
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Each theme contains three specific topics developed from our
              transnational research findings.
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
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Select a Generation
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Focus on the generation most relevant to your context: Gen Z,
              Millennials, Gen X, or Baby Boomers.
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
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Build & Export
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Add the pages you need to your personalised handbook and download
              it as a PDF.
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
          Start Exploring
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
            Build your selection
          </motion.div>
          <motion.div
            className="flex items-center text-slate-600 dark:text-slate-400"
            variants={staggerItem}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <FilterIcon className="w-4 h-4 mr-2 text-green-500" />
            Focus on what matters
          </motion.div>
          <motion.div
            className="flex items-center text-slate-600 dark:text-slate-400"
            variants={staggerItem}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <DownloadIcon className="w-4 h-4 mr-2 text-purple-500" />
            Download your handbook
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
        {/* Custom Handbook Card */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          variants={staggerItem}
          whileHover={{
            scale: 1.05,
            y: -5,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div className="flex items-center mb-4" variants={scalePop}>
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
              Your Personalised Handbook
            </motion.h3>
          </motion.div>
          <motion.p
            className="text-slate-600 dark:text-slate-300 mb-4"
            variants={fadeSlideUp}
          >
            The complete Handbook offers extensive research and detailed
            strategies—but you may not need everything. This platform allows you
            to select only the content relevant to your specific context, whether
            you are addressing a particular generation, a single theme, or a
            combination of both. Build a tailored resource that fits your
            training needs and download it as a ready-to-use PDF.
          </motion.p>
          <motion.p
            className="text-green-600 dark:text-green-400 font-medium"
            variants={fadeSlideUp}
          >
          </motion.p>
          <motion.button
            onClick={handleScrollToThemes}
            className="text-green-600 dark:text-green-400 font-medium 
                       hover:text-green-700 dark:hover:text-green-300
                       hover:underline cursor-pointer
                       transition-colors inline-flex items-center gap-1"
            variants={fadeSlideUp}
            whileHover={{ x: 4 }}
          >
            Select a theme to begin
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 11l5-5m0 0l5 5m-5-5v12" 
              />
            </svg>
          </motion.button>
        </motion.div>

        {/* Self-Assessment Card */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          variants={staggerItem}
          whileHover={{
            scale: 1.05,
            y: -5,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div className="flex items-center mb-4" variants={scalePop}>
            <motion.div
              className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ClipboardCheck className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </motion.div>
            <motion.h3
              className="text-xl font-semibold text-slate-900 dark:text-white"
              variants={fadeSlideUp}
            >
              Self-Assessment Test
            </motion.h3>
          </motion.div>
          <motion.p
            className="text-slate-600 dark:text-slate-300 mb-4"
            variants={fadeSlideUp}
          >
            Measure your awareness of generational diversity and your ability to
            manage intergenerational dynamics inclusively. The test consists of
            10 questions randomly selected from our research-based question pool,
            covering all five thematic areas. We recommend completing the test
            before and after exploring the Handbook to track your progress.
          </motion.p>
          <motion.p
            className="text-blue-600 dark:text-blue-400 font-medium"
            variants={fadeSlideUp}
          >
            Coming soon
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Project Quote */}
      <motion.div
        className="text-xs mx-auto my-8"
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2.4 }}
      >
        <motion.p
          className="text-sm text-center text-slate-500 dark:text-slate-400"
          variants={fadeSlideUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          &ldquo;MYCo – Meet Your Colleague&rdquo; is an Erasmus+ funded project
          bringing together six European partners to create practical tools for
          generational inclusion. Through research, training activities, and
          interactive resources, we aim to move beyond stereotypes and build
          workplaces where every generation can thrive.
        </motion.p>
      </motion.div>
    </div>
  );
};