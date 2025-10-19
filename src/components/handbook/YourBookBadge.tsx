'use client'

import { useBook } from '@/components/providers/book-provider'
import { BookOpenIcon } from 'lucide-react'
import { motion, AnimatePresence} from 'framer-motion'

interface YourBookBadgeProps {
  onClick: () => void
}

export const YourBookBadge = ({ onClick }: YourBookBadgeProps) => {
  const { pages } = useBook()
  
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      aria-label={`Your book (${pages.length} items)`}
    >
      <BookOpenIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      
      {pages.length > 0 && (
        <AnimatePresence mode='wait'>
          <motion.span
           key={pages.length}
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
            className="absolute -top-1 -right-1 
            bg-blue-500 text-white 
            text-xs font-bold
            rounded-full w-5 h-5 
            flex items-center justify-center
            animate-pulse">
            {pages.length}
        </motion.span>
        </AnimatePresence>
      )}
    </button>
  )
}