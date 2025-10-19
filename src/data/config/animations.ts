import { Variants } from 'framer-motion'

/**
 * Reusable Framer Motion Animation Variants
 */

// Container that staggers children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
}

// Item that fades and slides in from left
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
}

// Card that fades and slides up
export const fadeSlideUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
}

// Page transition
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    x: 20 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.2 }
  }
}

// Scale pop
export const scalePop: Variants = {
  initial: { 
    scale: 0.8, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.15 }
  }
}