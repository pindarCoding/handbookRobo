"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, FileDown, PlayCircle, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import { useTest } from "@/components/providers/test-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { useTranslation } from "@/hooks/useTranslation";
import { trackPdfDownload } from "@/utils/analytics";
import { getGuidePdf, getTutorialVideo } from "@/data/config/guide";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const primaryButton = `w-full py-3 px-4
  bg-gradient-to-r from-blue-500 to-blue-600
  hover:from-blue-600 hover:to-blue-700
  dark:from-blue-500 dark:to-blue-600
  dark:hover:from-blue-600 dark:hover:to-blue-700
  text-white font-semibold rounded-lg
  shadow-md hover:shadow-lg
  transition-all duration-200
  flex items-center justify-center gap-2`;

const card =
  "bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700";

export const GuideModal = ({ isOpen, onClose }: GuideModalProps) => {
  const { startTest } = useTest();
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Blocca lo scroll della pagina e chiude con ESC
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownloadGuide = () => {
    const fileName = getGuidePdf(language);
    const pdfPath = `/pdfs/${language}/${fileName}`;

    trackPdfDownload({
      content_type: "guide",
      taxonomic_code: "getting-started",
      pdf_language: language,
      file_name: fileName,
    });

    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Downloading ${fileName}...`);
  };

  const handleStartTest = () => {
    onClose();
    startTest();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="guide-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-2xl max-h-[90vh] flex flex-col
                         bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <h2
                    id="guide-modal-title"
                    className="text-xl font-semibold text-slate-900 dark:text-white"
                  >
                    {t("guide.modalTitle")}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {t("guide.modalIntro")}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label={t("guide.close")}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Step-by-step PDF */}
                <div className={card}>
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                      <FileDown className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {t("guide.pdfTitle")}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {t("guide.pdfDescription")}
                  </p>
                  <button onClick={handleDownloadGuide} className={primaryButton}>
                    <FileDown className="w-5 h-5" />
                    {t("guide.pdfButton")}
                  </button>
                </div>

                {/* Video tutorial */}
                <div className={card}>
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                      <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {t("guide.videoTitle")}
                    </h3>
                  </div>
                  <video
                    key={language}
                    src={getTutorialVideo(language)}
                    poster="/images/tutorial.jpg"
                    preload="none"
                    controls
                    className="w-full rounded-lg shadow-md"
                  />
                </div>

                {/* Self-assessment */}
                <div className={card}>
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                      <ClipboardCheck className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {t("guide.assessmentTitle")}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {t("guide.assessmentDescription")}
                  </p>
                  <button onClick={handleStartTest} className={primaryButton}>
                    <ClipboardCheck className="w-5 h-5" />
                    {t("guide.assessmentButton")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
