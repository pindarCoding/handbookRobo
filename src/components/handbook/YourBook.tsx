// src/components/handbook/YourBook.tsx
"use client";

import { useBook } from "@/components/providers/book-provider";
import { Trash2Icon } from "lucide-react";
import { BookPage } from "@/types/handbook";
import { useCards } from "@/hooks/useCards";
import { useThemes } from "@/hooks/useThemes";
import { useTranslation } from "@/hooks";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  bookItemContainer,
  bookItemEnter,
  bookBadgePulse,
  bookFirstItem,
} from "@/data/config/animations";

export const YourBook = () => {
  const { pages, removePage, clearBook } = useBook();
  const { getAllCards } = useCards();
  const { getThemeById, getSubThemeById } = useThemes();
  const { t } = useTranslation();

  // Funzione helper per recuperare il page_id basandosi sugli ID salvati
  const getPageId = (page: BookPage): number | null => {
    if (page.themeId && !page.subThemeId && !page.cardId) {
      const theme = getThemeById(page.themeId);
      return theme?.page_id || null;
    }

    if (page.themeId && page.subThemeId && !page.cardId) {
      const subTheme = getSubThemeById(page.themeId, page.subThemeId);
      return subTheme?.page_id || null;
    }

    if (page.cardId) {
      const allCards = getAllCards();
      const card = allCards.find((c) => c.id === page.cardId);
      return card?.page_id || null;
    }

    return null;
  };

  // Funzione helper per recuperare il code della pagina
  const getPageCode = (page: BookPage): string | null => {
    if (page.cardId) {
      const allCards = getAllCards();
      const card = allCards.find((c) => c.id === page.cardId);
      return card?.code || null;
    }

    if (page.themeId && page.subThemeId) {
      const subTheme = getSubThemeById(page.themeId, page.subThemeId);
      return subTheme?.code || null;
    }

    if (page.themeId) {
      const theme = getThemeById(page.themeId);
      return theme?.code || null;
    }

    return null;
  };

  // Funzione per esportare il PDF
  const exportHandbook = async () => {
    try {
      const pageIds = pages
        .map((page) => getPageId(page))
        .filter((id) => id !== null)
        .map((id) => id!.toString());

      if (pageIds.length === 0) {
        alert("No pages with valid page IDs to export");
        return;
      }

      const response = await fetch("https://api.meetyourcolleague.eu/merge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: pageIds.map((id) => `en/${id}.pdf`),
        }),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        if (errorData.error) {
          if (errorData.error.includes("File not found")) {
            const missingFile = errorData.error.match(/en\/(\d+)\.pdf/);
            if (missingFile) {
              alert(
                `Error: Page ${missingFile[1]} is not available on the server. Please remove it from your selection and try again.`
              );
            } else {
              alert(`Error: ${errorData.error}`);
            }
          } else {
            alert(`Error: ${errorData.error}`);
          }
          return;
        }
      }

      if (!response.ok) {
        alert(`Error: Server responded with status ${response.status}`);
        return;
      }

      if (!contentType || !contentType.includes("application/pdf")) {
        alert("Error: Server did not return a valid PDF file");
        return;
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        alert("Error: Received empty PDF file");
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "custom-handbook.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      // 🎉 Confetti
      const canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "9999";
      document.body.appendChild(canvas);

      const myConfetti = confetti.create(canvas, { resize: true });
      myConfetti({
        particleCount: 100,
        ticks: 500,
        spread: 70,
        gravity: 0.4,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        document.body.removeChild(canvas);
      }, 5000);
    } catch (error: unknown) {
      console.error("Export error:", error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        alert(
          "Network error: Unable to connect to the PDF server. Please check:\n" +
            "- The server is running at https://api.meetyourcolleague.eu/merge\n" +
            "- CORS is properly configured on the server\n" +
            "- You are on the same network"
        );
      } else {
        alert(
          "An unexpected error occurred while exporting the handbook. Please try again."
        );
      }
    }
  };

  const needsScroll = pages.length > 6;

  if (pages.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          Your handbook is empty. Start adding pages from the categories above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t("yourBook.title")}
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            {pages.length}
          </span>
        </div> 
        <button
          onClick={clearBook}
          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium transition-colors"
        >
          {t("common.clearAll")}    
        </button>
      </div>

      {/* Lista Items */}
      <div className={`flex-1 px-6 py-4 ${needsScroll ? "overflow-y-auto" : ""}`}>
        <motion.ul
          className="space-y-3"
          variants={bookItemContainer}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {pages.map((page, index) => {
              const pageCode = getPageCode(page);
              const pageId = getPageId(page);
              const isChapter = !page.cardId && !!page.subThemeId;

              return (
                <motion.li
                  key={page.id}
                  layout
                  variants={index === 0 && pages.length === 1 ? bookFirstItem : bookItemEnter}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`group relative flex gap-0 rounded-lg overflow-hidden transition-all duration-200
                             ${isChapter 
                                ? 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-lg' 
               : 'bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-orange-400 hover:shadow-md'
                             }`}
                >
                  {/* Badge/Icon Area */}
                  {isChapter ? (
                    <motion.div
                      className="flex items-center justify-center w-14 bg-slate-600 dark:bg-slate-500 text-white"
                      variants={bookBadgePulse}
                      initial="initial"
                      animate="animate"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </motion.div>
                  ) : (
                    pageCode && (
                      <motion.div
                        className="flex items-center justify-center w-14 bg-slate-400 dark:bg-slate-400 text-white text-xs font-bold"
                        variants={bookBadgePulse}
                        initial="initial"
                        animate="animate"
                      >
                        {pageCode}
                      </motion.div>
                    )
                  )}

                  {/* Content Area */}
                  <div className="flex-1 flex items-start gap-3 p-3 min-w-0">
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium line-clamp-2 mb-1
                                      ${isChapter 
                                        ? 'text-blue-900 dark:text-orange-100 font-semibold' 
                                        : 'text-slate-800 dark:text-slate-200'
                                      }`}>
                        {page.title}
                      </div>

                      {isChapter ? (
                        <div className="text-xs font-medium text-blue-600 dark:text-orange-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                          {t("yourBook.chapterIntroduction")}
                        </div>
                      ) : (
                        pageId && (
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {t("common.page")} {pageId}
                          </div>
                        )
                      )}
                    </div>

                    <button
                      onClick={() => removePage(page.id)}
                      className={`flex-shrink-0 p-1.5 rounded-md transition-colors duration-200 opacity-0 group-hover:opacity-100
                                 ${isChapter
                                   ? 'text-blue-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                                   : 'text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                                 }`}
                      title="Remove from handbook"
                    >
                      <Trash2Icon size={16} strokeWidth={2} />
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* Footer Button */}
      <div className="p-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={exportHandbook}
          className="w-full py-3 px-4
                   bg-gradient-to-r from-blue-500 to-blue-600 
                   hover:from-blue-600 hover:to-blue-700
                   dark:from-orange-500 dark:to-orange-600
                   dark:hover:from-orange-600 dark:hover:to-orange-700
                   text-white font-semibold rounded-lg 
                   shadow-md hover:shadow-lg
                   transition-all duration-200
                   flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Handbook PDF
        </button>
      </div>
    </div>
  );
};