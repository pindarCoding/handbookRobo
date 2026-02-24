"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTest } from "@/components/providers/test-provider";
import { useTranslation } from "@/hooks/useTranslation";
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
  const { t } = useTranslation();

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
          {t('hero.title')}
        </motion.h1>
        <motion.p
          className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8"
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          {t('hero.subtitle')}
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
          {t('personalised.title')}
        </motion.h2>
        <motion.p
          className="text-base text-slate-600 dark:text-slate-400 text-center max-w-3xl mx-auto mb-4"
          variants={fadeSlideUp}
        >
          {t('personalised.description')}
        </motion.p>
        <motion.p
          className="text-base text-slate-500 dark:text-slate-400 text-center max-w-3xl mx-auto"
          variants={fadeSlideUp}
          dangerouslySetInnerHTML={{ __html: t('personalised.research') }}
        />
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
          {t('howItWorks.title')}
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
              {t('howItWorks.step1.title')}
            </h4>
            <p
              className="text-sm text-slate-600 dark:text-slate-400"
              dangerouslySetInnerHTML={{ __html: t('howItWorks.step1.description') }}
            />
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
              {t('howItWorks.step2.title')}
            </h4>
            <p
              className="text-sm text-slate-600 dark:text-slate-400"
              dangerouslySetInnerHTML={{ __html: t('howItWorks.step2.description') }}
            />
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
              {t('howItWorks.step3.title')}
            </h4>
            <p
              className="text-sm text-slate-600 dark:text-slate-400"
              dangerouslySetInnerHTML={{ __html: t('howItWorks.step3.description') }}
            />
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
              {t('howItWorks.step4.title')}
            </h4>
            <p
              className="text-sm text-slate-600 dark:text-slate-400"
              dangerouslySetInnerHTML={{ __html: t('howItWorks.step4.description') }}
            />
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
              {t('selfAssessment.title')}
            </motion.h3>
          </motion.div>
          <motion.p
            className="text-slate-600 dark:text-slate-300 mb-4"
            variants={fadeSlideUp}
          >
            {t('selfAssessment.description')}
          </motion.p>
          <motion.p
            className="text-sm text-slate-500 dark:text-slate-400 mb-4"
            variants={fadeSlideUp}
          >
            {t('selfAssessment.recommendation')}
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
            {t('selfAssessment.startButton')}
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
          {t('projectQuote')}
        </motion.p>
      </motion.div>
    </div>
  );
};
