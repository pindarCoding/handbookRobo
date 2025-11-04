// src/components/handbook/YourBook.tsx
"use client";

import { useBook } from "@/components/providers/book-provider";
import { Trash2Icon } from "lucide-react";
import { BookPage } from "@/types/handbook"; // ✅ NUOVO - Solo interface
import { useCards } from "@/hooks/useCards";
import { useThemes } from "@/hooks/useThemes"; // ✅ NUOVO - Hook per themes
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
  const { getAllCards } = useCards(); // Usa useCards per ottenere tutte le cards
  const { getThemeById, getSubThemeById } = useThemes();

  // Funzione helper per recuperare il page_id basandosi sugli ID salvati
  const getPageId = (page: BookPage): number | null => {
    // Caso 1: Solo Theme selezionato
    if (page.themeId && !page.subThemeId && !page.cardId) {
      // Cambiato variantId → cardId
      const theme = getThemeById(page.themeId);
      return theme?.page_id || null;
    }

    // Caso 2: Theme + SubTheme selezionati
    if (page.themeId && page.subThemeId && !page.cardId) {
      // Cambiato variantId → cardId
      const subTheme = getSubThemeById(page.themeId, page.subThemeId);
      return subTheme?.page_id || null;
    }

    // Caso 3: Card completa selezionata
    if (page.cardId) {
      const allCards = getAllCards(); // Ottieni tutte le cards con traduzioni
      const card = allCards.find((c) => c.id === page.cardId); // Cambiato variant → card, variants → cards
      return card?.page_id || null;
    }

    return null;
  };

  // Funzione helper per recuperare il code della pagina
  const getPageCode = (page: BookPage): string | null => {
    // Caso 1: Card completa (ha il code più specifico)
    if (page.cardId) {
      const allCards = getAllCards();
      const card = allCards.find((c) => c.id === page.cardId);
      return card?.code || null;
    }

    // Caso 2: SubTheme selezionato
    if (page.themeId && page.subThemeId) {
      const subTheme = getSubThemeById(page.themeId, page.subThemeId);
      return subTheme?.code || null;
    }

    // Caso 3: Solo Theme selezionato
    if (page.themeId) {
      const theme = getThemeById(page.themeId);
      return theme?.code || null;
    }

    return null;
  };

  // Funzione per esportare il PDF
  const exportHandbook = async () => {
    try {
      // Estrai tutti i page_id nell'ordine corretto
      const pageIds = pages
        .map((page) => getPageId(page))
        .filter((id) => id !== null)
        .map((id) => id!.toString());

      if (pageIds.length === 0) {
        alert("No pages with valid page IDs to export");
        return;
      }

      // Effettua la chiamata API

      const response = await fetch("https://api.meetyourcolleague.eu/merge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: pageIds.map((id) => `en/${id}.pdf`),
        }),
      });

      // Prima controlla il content-type per capire se è un errore JSON o un PDF
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        // Il server ha risposto con JSON, probabilmente un errore
        const errorData = await response.json();
        if (errorData.error) {
          // Gestione specifica per errori di file non trovato
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

      // Se non è JSON e lo status non è ok, gestisci come errore generico
      if (!response.ok) {
        alert(`Error: Server responded with status ${response.status}`);
        return;
      }

      // Verifica che sia effettivamente un PDF
      if (!contentType || !contentType.includes("application/pdf")) {
        alert("Error: Server did not return a valid PDF file");
        return;
      }

      // Gestisci il download del blob
      const blob = await response.blob();

      // Verifica che il blob non sia vuoto
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

      // Pulisci l'URL object
      window.URL.revokeObjectURL(url);

      // 🎉 Confetti - Always on top!
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

      // Rimuovi canvas dopo 5 secondi
      setTimeout(() => {
        document.body.removeChild(canvas);
      }, 5000);
    } catch (error: unknown) {
      console.error("Export error:", error);

      // Gestione specifica per errori di rete/CORS
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
      {/* Header - Fisso */}
      <div className="flex justify-between items-center p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Your Custom Handbook
          </h2>
          <span
            className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 
                         text-blue-700 dark:text-blue-300 text-xs font-semibold"
          >
            {pages.length}
          </span>
        </div>
        <button
          onClick={clearBook}
          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 
                   text-sm font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Lista Items - Scrollabile solo se necessario */}
      <div
        className={`flex-1 px-6 py-4 ${needsScroll ? "overflow-y-auto" : ""}`}
      >
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

              return (
                <motion.li
                  key={page.id}
                  layout // ← IMPORTANTE per smooth reposition
                  variants={
                    index === 0 && pages.length === 1
                      ? bookFirstItem
                      : bookItemEnter
                  }
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group relative flex gap-0 
             rounded-lg overflow-hidden
             bg-slate-50 dark:bg-slate-700/50 
             border border-slate-200 dark:border-slate-600
             hover:border-blue-300 dark:hover:border-orange-400
             hover:shadow-md
             transition-all duration-200"
                >
                  {/* Badge Code - Full Height */}
                  {pageCode && (
                    <motion.div
                      className="flex items-center justify-center
                w-14 bg-blue-500 dark:bg-orange-500
                text-white text-xs font-bold"
                      variants={bookBadgePulse}
                      initial="initial"
                      animate="animate"
                    >
                      {pageCode}
                    </motion.div>
                  )}
                  {/* Content Area */}
                  <div className="flex-1 flex items-start gap-3 p-3 min-w-0">
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <div
                        className="text-sm font-medium text-slate-800 dark:text-slate-200 
                                  line-clamp-2 mb-1"
                      >
                        {page.title}
                      </div>

                      {/* Page Number */}
                      {pageId && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Page {pageId}
                        </div>
                      )}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removePage(page.id)}
                      className="flex-shrink-0 p-1.5 rounded-md
                             text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                             transition-colors duration-200
                             opacity-0 group-hover:opacity-100"
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

      {/* Footer Button - Fisso */}
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
          Export Handbook PDF
        </button>
      </div>
    </div>
  );
};
