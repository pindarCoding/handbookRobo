"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTest } from "@/components/providers/test-provider";
import {
  ClipboardCheck,
} from "lucide-react";
import {
  fadeSlideUp,
  staggerContainer,
  staggerItem,
  scalePop,
} from "@/data/config/animations";

export const WelcomeContent = () => {
  const { startTest } = useTest();

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
          to navigate intergenerational dynamics and foster inclusive
          workplaces.
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
            className="rounded-lg w-auto h-auto max-w-full"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Your Personalised Handbook - Main Introduction */}
      <motion.div
        className="mb-12"
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <motion.h2
          className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center"
          variants={fadeSlideUp}
        >
          Your Personalised Handbook
        </motion.h2>
        <motion.p
          className="text-base text-slate-600 dark:text-slate-400 text-center max-w-3xl mx-auto mb-4"
          variants={fadeSlideUp}
        >
          The complete Handbook offers extensive research and detailed
          strategies — but you may not need everything. This platform allows you
          to select only the content relevant to your specific context,
          whether you are addressing a particular generation, a single theme,
          or a combination of both. Build a tailored resource that fits your
          training needs and download it as a ready-to-use PDF.
        </motion.p>
        <motion.p
          className="text-base text-slate-500 dark:text-slate-400 text-center max-w-3xl mx-auto"
          variants={fadeSlideUp}
        >
          This Handbook is the result of <strong>transnational research</strong> conducted
          across <strong>six European countries</strong>, exploring how four generations — Baby
          Boomers, Generation X, Millennials, and Generation Z — experience the
          workplace. Rather than reinforcing stereotypes, <strong>our goal is to provide evidence-based</strong> insights and actionable strategies <strong>to promote collaboration, mutual understanding, and generational inclusion.</strong>
        </motion.p>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        className="bg-slate-50 dark:bg-slate-900 rounded-xl p-8 mb-12"
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center"
          variants={fadeSlideUp}
        >
          How to Create Your Custom Handbook
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
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
              Select from <strong>five research-based themes</strong>: communication, values,
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
              Each theme contains <strong>three specific topics </strong> developed from our
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
              <strong>Focus on the generation</strong> most relevant to your context: Gen Z,
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
              Add the pages you need to your personalised handbook and <strong>download
              it as a PDF.</strong>
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
        transition={{ delay: 0.8 }}
      >

      </motion.div>

      {/* Self-Assessment Card - Single Card */}
      <motion.div
        className="max-w-xl mx-auto mb-12"
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.0 }}
      >
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          whileHover={{
            scale: 1.02,
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
            10 questions randomly selected from our research-based question
            pool, covering all five thematic areas.
          </motion.p>
          <motion.p
            className="text-sm text-slate-500 dark:text-slate-400 mb-4"
            variants={fadeSlideUp}
          >
            We recommend completing the test before and after exploring the
            Handbook to track your progress.
          </motion.p>
          <motion.button
            onClick={startTest}
            className="w-full py-3 px-4
              bg-gradient-to-r from-blue-500 to-blue-600 
              hover:from-blue-600 hover:to-blue-700
              dark:from-blue-500 dark:to-blue-600
              dark:hover:from-blue-600 dark:hover:to-blue-700
              text-white font-semibold rounded-lg 
              shadow-md hover:shadow-lg
              transition-all duration-200
              flex items-center justify-center gap-2"
            variants={fadeSlideUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ClipboardCheck className="w-5 h-5" />
            Start Test
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Project Quote */}
      <motion.div
        className="text-xs mx-auto"
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
      >
        <motion.p
          className="text-sm text-center text-slate-500 dark:text-slate-400"
          variants={fadeSlideUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          &ldquo;MYCo – Meet Your Colleague&rdquo; is an Erasmus+ funded project
          bringing together five European partners to create practical tools for
          generational inclusion. Through research, training activities, and
          interactive resources, we aim to move beyond stereotypes and build
          workplaces where every generation can thrive.
        </motion.p>
      </motion.div>
    </div>
  );
};