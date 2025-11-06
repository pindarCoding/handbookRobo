// src/components/handbook/BookListItem.tsx
"use client";

import { motion } from "framer-motion";
import { Trash2Icon } from "lucide-react";
import { BookPage } from "@/types/handbook";
import { useTranslation } from "@/hooks/useTranslation";
import { bookBadgePulse, bookFirstItem, bookItemEnter } from "@/data/config/animations";

interface BookListItemProps {
  page: BookPage;
  pageCode: string | null;
  isChapter: boolean;
  isFirst: boolean;
  isSingle: boolean;
  onRemove: (id: string) => void;
}

export const BookListItem = ({
  page,
  pageCode,
  isChapter,
  isFirst,
  isSingle,
  onRemove,
}: BookListItemProps) => {
  const { t } = useTranslation();

  return (
    <motion.li
      layout
      variants={isFirst && isSingle ? bookFirstItem : bookItemEnter}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`group relative flex items-center gap-3 rounded-lg p-3 transition-all duration-200
                 ${isChapter 
                   ? 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-lg' 
                   : 'bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-orange-400 hover:shadow-md'
                 }`}
    >
      {/* Left Badge/Icon Area */}
      {isChapter ? (
        // Chapter Icon
        <motion.div
          className="flex-shrink-0 w-10 h-10 rounded-full
                    bg-blue-900 dark:bg-blue-500
                    flex items-center justify-center
                    text-white shadow-sm"
          variants={bookBadgePulse}
          initial="initial"
          animate="animate"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
            />
          </svg>
        </motion.div>
      ) : (
        // Card Badge
        pageCode && (
          <motion.div
            className="flex-shrink-0 px-2 py-1 rounded
                      bg-slate-500 dark:bg-slate-400
                      text-white text-[10px] font-bold
                      shadow-sm min-w-[48px] text-center"
            variants={bookBadgePulse}
            initial="initial"
            animate="animate"
          >
            {pageCode}
          </motion.div>
        )
      )}

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <div 
          className={`text-sm font-medium line-clamp-1
                     ${isChapter 
                       ? 'text-slate-900 dark:text-slate-100 font-semibold' 
                       : 'text-slate-800 dark:text-slate-200'
                     }`}
          title={page.title}
        >
          {page.title}
        </div>

        {/* Chapter Label */}
        {isChapter && (
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            {t('common.chapterIntroduction')}
          </div>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onRemove(page.id)}
        className="flex-shrink-0 p-1.5 rounded-md
                  text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                  transition-colors duration-200
                  opacity-0 group-hover:opacity-100"
        title={t("handbook.removed")}
      >
        <Trash2Icon size={14} strokeWidth={2} />
      </button>
    </motion.li>
  );
};