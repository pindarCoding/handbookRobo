// src/components/handbook/YourBook.tsx
"use client";

import { useBook } from "@/components/providers/book-provider";
import { BookPage } from "@/types/handbook";
import { BookListItem } from "./BookListItem";
import { useCards } from "@/hooks/useCards";
import { useThemes } from "@/hooks/useThemes";
import { useTranslation } from "@/hooks";
import { useLanguage } from "@/components/providers/language-provider"; // [SV0001] Import per fallback lingua
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { bookItemContainer } from "@/data/config/animations";

export const YourBook = () => {
  const { pages, removePage, clearBook } = useBook();
  const { getAllCards } = useCards();
  const { getThemeById, getSubThemeById } = useThemes();
  const { t } = useTranslation();
  const { language: currentLanguage } = useLanguage(); // [SV0001] Lingua corrente per fallback

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

  /**
   * Trasforma il code tassonomico in un filename valido
   * Sostituisce i punti con trattini e converte in lowercase
   * @example "T1.1" → "t1-1"
   * @example "T2.1.GZ" → "t2-1-gz"
   */
  const codeToFilename = (code: string): string => {
    return code.toLowerCase().replace(/\./g, "-");
  };

  // Funzione per esportare il PDF
  const exportHandbook = async () => {
    try {
      console.log("🚀 [SV0001] Starting Custom Handbook Export");
      console.log("📚 [SV0001] Total pages in book:", pages.length);
      console.log("🌐 [SV0001] Current UI language:", currentLanguage);

      // Costruire l'array dei file da richiedere al backend
      const fileRequests: string[] = [];

      pages.forEach((page, index) => {
        console.log(`\n--- Processing Page ${index + 1}/${pages.length} ---`);
        console.log("📄 Page data:", {
          id: page.id,
          themeId: page.themeId,
          subThemeId: page.subThemeId,
          cardId: page.cardId,
          savedLanguage: page.language,
        });

        // Recuperare il code della pagina
        const code = getPageCode(page);
        console.log("🔖 Retrieved code:", code);

        if (!code) {
          console.warn(
            `⚠️ [SV0001] Page ${index + 1} has no valid code - SKIPPING`
          );
          return; // Skip questa pagina
        }

        // Trasformare il code in filename
        const filename = codeToFilename(code);
        console.log("📝 Transformed filename:", filename);

        // [SV0001] Recuperare la lingua: priorità a page.language, fallback a currentLanguage
        const language = page.language || currentLanguage;
        console.log("🌐 Language:", language, page.language ? "(saved)" : "(fallback to current)");

        // Costruire il path completo
        const filePath = `${language}/${filename}.pdf`;
        console.log("✅ Final file path:", filePath);

        fileRequests.push(filePath);
      });

      console.log("\n📦 [SV0001] Final files array to send:", fileRequests);

      if (fileRequests.length === 0) {
        console.error("❌ [SV0001] No valid files to export");
        alert("No pages with valid codes to export");
        return;
      }

      console.log(
        `🌐 [SV0001] Sending request to backend with ${fileRequests.length} files`
      );

      const response = await fetch("https://api.meetyourcolleague.eu/merge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: fileRequests,
        }),
      });

      console.log("📡 [SV0001] Backend response status:", response.status);

      const contentType = response.headers.get("content-type");
      console.log("📋 [SV0001] Response content-type:", contentType);

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        console.error("❌ [SV0001] Backend returned JSON error:", errorData);

        if (errorData.error) {
          if (errorData.error.includes("File not found")) {
            const missingFileMatch = errorData.error.match(
              /[a-z]{2}\/[a-z0-9-]+\.pdf/i
            );
            if (missingFileMatch) {
              const missingFile = missingFileMatch[0];
              console.error(
                `❌ [SV0001] Missing file on server: ${missingFile}`
              );
              alert(
                `Error: File "${missingFile}" is not available on the server. Please remove it from your selection and try again.`
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
        console.error(
          `❌ [SV0001] Server error: ${response.status} ${response.statusText}`
        );
        alert(`Error: Server responded with status ${response.status}`);
        return;
      }

      if (!contentType || !contentType.includes("application/pdf")) {
        console.error("❌ [SV0001] Invalid content-type, expected PDF");
        alert("Error: Server did not return a valid PDF file");
        return;
      }

      const blob = await response.blob();
      console.log("📦 [SV0001] Received PDF blob, size:", blob.size, "bytes");

      if (blob.size === 0) {
        console.error("❌ [SV0001] Received empty PDF blob");
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

      console.log("✅ [SV0001] PDF download triggered successfully!");

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

      console.log("🎉 [SV0001] Export completed successfully!");
    } catch (error: unknown) {
      console.error("💥 [SV0001] Export error:", error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.error("🌐 [SV0001] Network error - cannot reach backend");
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
      <div className="flex-shrink-0 justify-between items-center p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
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
      <div className={`flex-1 overflow-y-auto`}>
        <div className="p-6 pb-4 space-y-4 border-b">
          <motion.ul
            className="space-y-3"
            variants={bookItemContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {pages.map((page, index) => {
                const pageCode = getPageCode(page);
                const isChapter = !page.cardId && !!page.subThemeId;
                const isFirst = index === 0;
                const isSingle = pages.length === 1;

                return (
                  <BookListItem
                    key={page.id}
                    page={page}
                    pageCode={pageCode}
                    isChapter={isChapter}
                    isFirst={isFirst}
                    isSingle={isSingle}
                    onRemove={removePage}
                  />
                );
              })}
            </AnimatePresence>
          </motion.ul>
          {/* Footer Button */}

          <div className="pt-4">
            <button
              onClick={exportHandbook}
              className="w-full py-3 px-4
                   bg-gradient-to-r from-orange-500 to-orange-600 
                   hover:from-orange-600 hover:to-orange-700
                   dark:from-orange-500 dark:to-orange-600
                   dark:hover:from-orange-600 dark:hover:to-orange-700
                   text-white font-semibold rounded-lg 
                   shadow-md hover:shadow-lg
                   transition-all duration-200
                   flex items-center justify-center gap-2"
            >
              <svg
                className="w-9 h-9"
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
              {t("yourBook.exportButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};