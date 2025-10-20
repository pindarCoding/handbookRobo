// src/components/handbook/MainContent.tsx
"use client";

import { motion } from "framer-motion";
import { Theme, SubTheme, Generation, Card } from "@/data/handbook-data";
import { useBook } from "@/components/providers/book-provider";
import { PlusCircleIcon } from "lucide-react";
import { WelcomeContent } from "./WelcomeContent";
import { toast } from "sonner";
import { fadeSlideUp, staggerContainer, staggerItem, scalePop } from "@/data/config/animations";

type FilterStep = "theme" | "subtheme" | "generation";

interface MainContentProps {
  step: FilterStep;
  selectedTheme: Theme | null;
  selectedSubTheme: SubTheme | null;
  selectedGeneration: Generation | null;
  selectedCard: Card | null; // Cambiato da selectedVariant
}

export const MainContent = ({
  step,
  selectedTheme,
  selectedSubTheme,
  selectedGeneration,
  selectedCard, // Cambiato da selectedVariant
}: MainContentProps) => {
  const { addPage } = useBook();

  // Funzione per generare l'ID della pagina corrente
  const generatePageId = () => {
    if (
      selectedCard &&
      selectedTheme &&
      selectedSubTheme &&
      selectedGeneration
    ) {
      return `${selectedTheme.id}-${selectedSubTheme.id}-${selectedGeneration.id}-${selectedCard.id}`;
    }
    if (selectedTheme && selectedSubTheme) {
      return `${selectedTheme.id}-${selectedSubTheme.id}`;
    }
    if (selectedTheme) {
      return selectedTheme.id;
    }
    return "";
  };

  // Funzione per aggiungere la pagina corrente
  const handleAddPage = () => {
    if (
      selectedCard &&
      selectedTheme &&
      selectedSubTheme &&
      selectedGeneration
    ) {
      addPage({
        id: generatePageId(),
        title: selectedCard.title,
        themeId: selectedTheme.id,
        subThemeId: selectedSubTheme.id,
        generationId: selectedGeneration.id,
        cardId: selectedCard.id, // Cambiato da variantId
      });
      toast.success(`Added "${selectedCard.title}" to your handbook!`);
    } else if (selectedTheme && selectedSubTheme) {
      addPage({
        id: generatePageId(),
        title: `${selectedSubTheme.title} (${selectedTheme.title})`,
        themeId: selectedTheme.id,
        subThemeId: selectedSubTheme.id,
      });
      toast.success(
        `Added "${selectedSubTheme.title} (${selectedTheme.title})" to your handbook!`
      );
    } else if (selectedTheme) {
      addPage({
        id: generatePageId(),
        title: selectedTheme.title,
        themeId: selectedTheme.id,
      });
      toast.success(`Added "${selectedTheme.title}" to your handbook!`);
    }
  };

  // Contenuto del main in base allo stato
  const renderContent = () => {
    // Stato iniziale - nessuna selezione
    if (!selectedTheme) {
      return <WelcomeContent />;
    }

    // Visualizzazione tema
    if (
      step === "theme" ||
      (step === "subtheme" && selectedTheme && !selectedSubTheme)
    ) {
      return (
        <div className="animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedTheme.title}
              </h2>
              <button
                type="button"
                onClick={handleAddPage}
                className="inline-flex items-center gap-2 px-3 py-1.5
             text-blue-600 dark:text-blue-400 
             hover:text-blue-700 dark:hover:text-blue-300
             hover:bg-blue-50 dark:hover:bg-blue-900/20
             rounded-lg transition-colors"
              >
                <PlusCircleIcon size={24} />
                <span className="text-sm font-medium">Add to Handbook</span>
              </button>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-6">
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                {selectedTheme.introduction}
              </p>
            </div>

            {selectedTheme.reportPdfUrl && (
              <div className="flex justify-center">
                <a
                  href={selectedTheme.reportPdfUrl}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Analysis Report
                </a>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Visualizzazione sottotema
    // Visualizzazione sottotema o helper per selezione generazione
    if (
      (step === "subtheme" && selectedSubTheme) ||
      (step === "generation" && selectedSubTheme && !selectedGeneration)
    ) {
      return (
        <div className="animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {selectedSubTheme.title}
                </h2>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Part of: {selectedTheme.title}
                </div>
              </div>
              {step === "subtheme" && (
                <button
                  type="button"
                  onClick={handleAddPage}
                  className="text-blue-500 hover:text-blue-700"
                  title="Add to your handbook"
                >
                  <PlusCircleIcon size={24} />
                </button>
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-300">
                {step === "generation"
                  ? "Select a generation above to see specific approaches and methodologies for this topic."
                  : "Choose a generation to explore how different age groups approach this topic."}
              </p>
            </div>

            {/* Opzionale: aggiungi un'icona o grafica helper */}
            {step === "generation" && (
              <div className="mt-8 flex justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Choose a generation to continue
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Visualizzazione CARD quando si seleziona la generazione
    if (
      selectedCard &&
      selectedGeneration &&
      selectedSubTheme &&
      selectedTheme
    ) {
      // Verifica coerenza del themeId
      if (selectedCard.themeId !== selectedTheme.id) {
        console.error("Card theme mismatch!", {
          cardThemeId: selectedCard.themeId,
          selectedThemeId: selectedTheme.id,
        });
        return null;
      }
      return (
        <motion.div 
          className="animate-fadeIn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Card principale con stile distintivo */}
          <motion.div
            className={`
            rounded-lg  overflow-hidden
          `}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            {/* Header della card */}
            <div className="bg-white dark:bg-slate-800 p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="space-y-4">
              {/* First row: Button */}
              <motion.div 
                className="flex justify-end"
                variants={scalePop}
                initial="initial"
                animate="animate"
              >
                <motion.button
                type="button"
                onClick={handleAddPage}
                className="inline-flex items-center gap-2 px-4 py-2
             bg-blue-500 hover:bg-blue-600 
             text-white rounded-lg 
             transition-all shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                >
                <PlusCircleIcon size={16} />
                <span className="text-sm font-medium">Add to Handbook</span>
                </motion.button>
              </motion.div>

              {/* Second row: Title */}
              <motion.div
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedCard.title}
                </h2>
              </motion.div>

              {/* Third row: Chip with title and age range */}
              <motion.div
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <motion.span 
                  className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-sm font-medium text-blue-800 dark:text-blue-100"
                  whileHover={{ scale: 1.05 }}
                >
                {selectedGeneration.title} • {selectedGeneration.ageRange}
                </motion.span>
              </motion.div>
              </div>
            </div>

            {/* Corpo della card */}
            <div className="p-6 bg-white/50 dark:bg-slate-800/50">
              {/* Placeholder per contenuto futuro */}

              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                {/* Mostra i tre contenuti strutturati */}
                <motion.div 
                  className="space-y-6 mb-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {/* The Stereotype */}
                  <motion.div 
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                      <span className="text-lg">🏷️</span> The Stereotype
                    </h3>
                    <p className="text-red-800 dark:text-red-200">
                      {selectedCard.stereotype}
                    </p>
                  </motion.div>

                  {/* Research Findings */}
                  <motion.div 
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                      <span className="text-lg">📊</span> Research Findings
                    </h3>
                    <p className="text-green-800 dark:text-green-200">
                      {selectedCard.researchFindings}
                    </p>
                  </motion.div>

                  {/* Strategies and Practical Advice */}
                  <motion.div 
                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                      <span className="text-lg">💡</span> Strategies and
                      Practical Advice
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200">
                      {selectedCard.strategiesAdvice}
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              <div></div>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    // Fallback se generation è selezionata ma non c'è card
    if (step === "generation" && selectedGeneration && !selectedCard) {
      return (
        <div className="animate-fadeIn">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              No card available
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              No content card found for {selectedGeneration.title} in{" "}
              {selectedSubTheme?.title}.
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  // Layout a due colonne
  return <div className="w-full">{renderContent()}</div>;
};
