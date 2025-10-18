'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { YourBook } from '@/components/handbook/YourBook'

interface YourBookModalProps {
  isOpen: boolean
  onClose: () => void
}

export const YourBookModal = ({ isOpen, onClose }: YourBookModalProps) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 lg:hidden
                       bg-white dark:bg-slate-800 
                       rounded-t-2xl shadow-2xl
                       max-h-[90vh] flex flex-col"
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
            </div>
            
            <div className="flex items-center justify-between px-4 pb-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Your Custom Book
              </h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <YourBook />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}