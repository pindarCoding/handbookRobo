/**
 * AnimatedCharacter Component
 * A React component for displaying animated characters using image sequences
 * @module components/AnimatedCharacter
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { AnimatedCharacterProps, AnimationState } from './AnimatedCharacter.types';
import { useImagePreloader } from './hooks/useImagePreloader';
import styles from './AnimatedCharacter.module.css';

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  images,
  alt,
  width = 100,
  height = 100,
  frameRate = 24,
  loop = true,
  playOnHover = true,
  reverseOnLeave = true,
  className = '',
  onAnimationStart,
  onAnimationComplete,
  onError,
  loading = 'eager',
  showSkeleton = true,
}) => {
  // State management
  const [animationState, setAnimationState] = useState<AnimationState>({
    isPlaying: false,
    currentFrame: 0,
    isLoading: true,
    hasError: false,
    loadedImages: new Set(),
  });

  // Refs
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameInterval = 1000 / frameRate;

  // Preload images
  const { isLoading, loadingState, progress } = useImagePreloader({
    images,
    enabled: true
  });

  // Update loading state
  useEffect(() => {
    setAnimationState((prev: AnimationState) => ({
      ...prev,
      isLoading,
      hasError: !loadingState.success && !isLoading
    }));
  }, [isLoading, loadingState]);

  // Handle animation frame update
  const updateFrame = useCallback(() => {
    if (!animationState.isPlaying) return;

    setAnimationState((prev: AnimationState) => {
      const nextFrame = prev.currentFrame + 1;
      
      if (nextFrame >= images.length) {
        if (loop) {
          return { ...prev, currentFrame: 0 };
        } else {
          onAnimationComplete?.();
          return { ...prev, isPlaying: false, currentFrame: images.length - 1 };
        }
      }
      
      return { ...prev, currentFrame: nextFrame };
    });
  }, [animationState.isPlaying, images.length, loop, onAnimationComplete]);

  // Animation loop
  useEffect(() => {
    if (animationState.isPlaying) {
      animationRef.current = setInterval(updateFrame, frameInterval);
    } else {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [animationState.isPlaying, updateFrame, frameInterval]);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    if (!playOnHover || isLoading) return;
    
    setAnimationState((prev: AnimationState) => ({ ...prev, isPlaying: true }));
    onAnimationStart?.();
  }, [playOnHover, isLoading, onAnimationStart]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    if (!playOnHover) return;
    
    setAnimationState((prev: AnimationState) => ({
      ...prev,
      isPlaying: false,
      currentFrame: reverseOnLeave ? 0 : prev.currentFrame
    }));
  }, [playOnHover, reverseOnLeave]);

  // Handle click (for non-hover mode)
  const handleClick = useCallback(() => {
    if (playOnHover || isLoading) return;
    
    setAnimationState((prev: AnimationState) => {
      const newIsPlaying = !prev.isPlaying;
      if (newIsPlaying) {
        onAnimationStart?.();
      }
      return { ...prev, isPlaying: newIsPlaying };
    });
  }, [playOnHover, isLoading, onAnimationStart]);

  // Error handling
  useEffect(() => {
    if (animationState.hasError && onError) {
      onError(new Error('Failed to load some images'));
    }
  }, [animationState.hasError, onError]);

  // Render loading skeleton
  if (isLoading && showSkeleton) {
    return (
      <motion.div
        className={`${styles.skeleton} ${className}`}
        style={{ width, height }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={styles.skeletonBar}>
          <motion.div
            className={styles.skeletonProgress}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    );
  }

  // Render error state
  if (animationState.hasError) {
    return (
      <div
        className={`${styles.error} ${className}`}
        style={{ width, height }}
      >
        <span className={styles.errorIcon}>⚠️</span>
        <span className={styles.errorText}>Failed to load</span>
      </div>
    );
  }

  // Rimuoviamo le animazioni di slide che causano lo spostamento
  const containerVariants: Variants = {
    idle: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      }
    },
    active: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  // Rimuoviamo frameVariants che causava il problema dello sliding

  const playButtonVariants: Variants = {
    hidden: { 
      scale: 0, 
      opacity: 0 
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ width, height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      variants={containerVariants}
      initial="idle"
      whileHover={playOnHover ? "hover" : "idle"}
      whileTap="active"
      animate={animationState.isPlaying ? "hover" : "idle"}
    >
      {/* Rimuoviamo AnimatePresence e motion per i frame - causano lo sliding */}
      {images.length > 0 && (
        <div className={styles.imageWrapper}>
          <Image
            src={images[animationState.currentFrame]}
            alt={`${alt} - Frame ${animationState.currentFrame + 1}`}
            width={typeof width === 'number' ? width : 100}
            height={typeof height === 'number' ? height : 100}
            loading={loading}
            className={styles.image}
            priority={true}  // Carica subito le immagini
            unoptimized={true}  // Evita ottimizzazioni Next.js che potrebbero rallentare
            onError={() => {
              console.error(`Failed to display frame ${animationState.currentFrame}`);
            }}
          />
        </div>
      )}
      {/* Overlay trasparente per evitare flickering */}
      <div className={styles.overlayProtection} />

      {/* Play indicator for non-hover mode with advanced animation */}
      <AnimatePresence>
        {!playOnHover && !animationState.isPlaying && (
          <motion.div
            className={styles.playButton}
            variants={playButtonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
          >
            ▶
          </motion.div>
        )}
      </AnimatePresence>

      
      
    </motion.div>
  );
};

export default AnimatedCharacter;