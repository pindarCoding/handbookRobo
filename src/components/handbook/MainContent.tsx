"use client";

import { motion } from "framer-motion";
import { Theme, SubTheme } from "@/hooks/useThemes";
import { Generation } from "@/hooks/useGenerations";
import { Card } from "@/hooks/useCards";
import { AddToHandbookButton } from "./AddToHandbookButton";
import { useBook } from "@/components/providers/book-provider";
import { WelcomeContent } from "./WelcomeContent";
import { toast } from "sonner";
import {
  fadeSlideUp,
  staggerContainer,
  staggerItem,
  scalePop,
} from "@/data/config/animations";
import { useSubThemeContent } from "@/hooks/useSubThemeContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslation } from "@/hooks";
import Image from "next/image";

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
  const { content, isLoading, error } = useSubThemeContent(selectedSubTheme);

  const { addPage } = useBook();
  const { t } = useTranslation();

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

    // 1 Visualizzazione tema
    if (
      step === "theme" ||
      (step === "subtheme" && selectedTheme && !selectedSubTheme)
    ) {
      return (
        <div className="animate-fadeIn">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 lg:p-16 shadow-lg ">
            {/* Code Pill */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium">
                🏷️ {selectedTheme.code}
              </span>
            </div>

            <div
              className="prose prose-slate dark:prose-invert max-w-none mb-6
                prose-p:text-slate-600 dark:prose-p:text-slate-300
                prose-p:leading-relaxed prose-p:text-lg
                prose-p:mb-4"
            >
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                {t("common.chapterIntroduction")}
              </div>
              <h1 className="mb-6 text-4xl font-bold text-slate-900 dark:text-orange-400">
                {selectedTheme.title}
              </h1>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-4 last:mb-0">{children}</p>
                  ),
                }}
              >
                {selectedTheme.introduction || ""}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      );
    }

    // Visualizzazione sottotema
    if (
      (step === "subtheme" && selectedSubTheme) ||
      (step === "generation" && selectedSubTheme && !selectedGeneration)
    ) {
      return (
        <div className="animate-fadeIn">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg  p-6 lg:p-16 shadow-lg">
            {/* Code Pill */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium">
                🏷️ {selectedSubTheme.code}
              </span>
            </div>
            {/* Header con titolo e bottone */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Part of: {selectedTheme.title}
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {t("handbook.helpGeneration")}
                </p>
              </div>
            </div>

            {/* Content Area - Loading/Error/Content */}
            {isLoading && (
              <div className="space-y-3 mb-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            )}

            {!isLoading && error && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  {t("error.notLoaded")}
                </p>
              </div>
            )}

            {!isLoading && !error && content && (
              <div className="prose prose-slate dark:prose-invert max-w-none mb-6 dark:prose-headings:text-orange-400">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
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
            <div className="bg-slate-100 dark:bg-slate-800 p-6 pb-0 border-b border-slate-200 dark:border-slate-700 lg:h-[180px] relative border-b-8 ">
              <div className="space-y-4">
                {/* Code Pill - Breadcrumb */}
                <motion.div
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center"
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium">
                    🏷️ {selectedCard.code}
                  </span>
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
               
                {selectedCard.image && (
                  <Image
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    width={535}
                    height={744}
                    className="absolute top-0 pb-8 right-1 lg:pb-3 md:right-5 rounded-md h-40 md:h-40 lg:h-60 w-auto object-cover "
                  />
                )}
              </div>
            </div>

            {/* Corpo della card */}
            <div className="p-6 bg-white/50 dark:bg-slate-800/50">
              {/* Placeholder per contenuto futuro */}

              <div className="overflow-hidden">
                {/* Mostra i tre contenuti strutturati */}
                <motion.div
                  className="space-y-6 lg:space-y-0 lg:space-x-6 mb-6 flex flex-col lg:flex-row"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {/* The Stereotype */}
                  <motion.div
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 lg:flex-1"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                      <span className="text-lg">🏷️</span>{" "}
                      {t("cards.title-stereotypes")}
                    </h3>
                    <p className="text-red-800 dark:text-red-200">
                      {selectedCard.stereotype}
                    </p>
                  </motion.div>

                  {/* Research Findings */}
                  <motion.div
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 lg:flex-1"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                      <span className="text-lg">📊</span>{" "}
                      {t("cards.title-research")}
                    </h3>
                    <p className="text-green-800 dark:text-green-200">
                      {selectedCard.researchFindings}
                    </p>
                  </motion.div>

                  {/* Strategies and Practical Advice */}
                  <motion.div
                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 lg:flex-1"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                      <span className="text-lg">💡</span>{" "}
                      {t("cards.title-advices")}
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200">
                      {selectedCard.strategiesAdvice}
                    </p>
                  </motion.div>
                </motion.div>
                {/* First row: Button */}
                <motion.div
                  className="flex justify-end"
                  variants={scalePop}
                  initial="initial"
                  animate="animate"
                >
                  <AddToHandbookButton size="large" onClick={handleAddPage} />
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
