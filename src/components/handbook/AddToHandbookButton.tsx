'use client'

import { motion } from 'framer-motion'
import { PlusCircleIcon } from 'lucide-react'

interface AddToHandbookButtonProps {
  onClick: () => void
  title?: string
  size?: 'default' | 'large'
}

export const AddToHandbookButton = ({ 
  onClick, 
  title = 'Add to Handbook',
  size = 'default' 
}: AddToHandbookButtonProps) => {
  const sizeClasses = size === 'large' 
    ? 'px-6 py-3 text-base' 
    : 'px-4 py-2.5 text-sm'
  
  const iconSize = size === 'large' ? 20 : 18

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 ${sizeClasses}
        bg-orange-500 hover:bg-orange-600 
        text-white font-semibold rounded-lg 
        shadow-lg hover:shadow-xl
        transition-all duration-200
        relative overflow-hidden
        group
      `}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        delay: 0.2 
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.2)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-20"
        initial={false}
        animate={{ 
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Icon with subtle animation */}
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 3
        }}
      >
        <PlusCircleIcon size={iconSize} strokeWidth={2.5} />
      </motion.div>

      <span className="relative z-10">{title}</span>

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-orange-400"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 1.1, opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut'
        }}
      />
    </motion.button>
  )
}