/**
 * Custom hook for preloading images
 * @module hooks/useImagePreloader
 */

import { useEffect, useState, useCallback } from 'react';
import { ImagePreloadResult } from '../AnimatedCharacter.types';
import { useImageCache } from '@/components/providers/image-cache-provider';

interface UseImagePreloaderProps {
  images: string[];
  enabled?: boolean;
}

export const useImagePreloader = ({ 
  images, 
  enabled = true 
}: UseImagePreloaderProps) => {
  const { areAllImagesCached, addImagesToCache } = useImageCache();
  
  // 🆕 SV0002 - Inizializza isLoading in modo intelligente
  const allCached = areAllImagesCached(images);
  const initialLoadingState = enabled && images.length > 0 && !allCached;
  
  const [loadingState, setLoadingState] = useState<ImagePreloadResult>({
    success: allCached, // ✅ TRUE se già in cache
    loadedCount: allCached ? images.length : 0, // ✅ Se cached, già "caricate"
    failedIndexes: []
  });
  const [isLoading, setIsLoading] = useState(initialLoadingState); // ✅ FALSE se cached!

  const preloadImage = useCallback((src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        resolve(true);
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${src}`);
        resolve(false);
      };
      
      img.src = src;
    });
  }, []);

  const preloadAllImages = useCallback(async () => {
    if (!enabled || images.length === 0) {
      setIsLoading(false);
      return;
    }

    // 🆕 SV0002 - CONTROLLA CACHE E SKIP PRELOAD
    if (areAllImagesCached(images)) {
      console.log(`✅ All ${images.length} images already cached, skipping preload`);
      setLoadingState({
        success: true,
        loadedCount: images.length,
        failedIndexes: []
      });
      setIsLoading(false); // ✅ Importante!
      return;
    }

    console.log(`⏳ Preloading ${images.length} images...`);
    setIsLoading(true);
    
    try {
      const results = await Promise.all(
        images.map(src => preloadImage(src))
      );
      
      const loadedCount = results.filter(Boolean).length;
      const failedIndexes = results
        .map((success, index) => (!success ? index : -1))
        .filter(index => index !== -1);
      
      setLoadingState({
        success: failedIndexes.length === 0,
        loadedCount,
        failedIndexes
      });

      // 🆕 SV0002 - AGGIUNGI ALLA CACHE
      if (loadedCount > 0) {
        const successfulImages = images.filter((_, index) => !failedIndexes.includes(index));
        addImagesToCache(successfulImages);
        console.log(`✅ Preloaded and cached ${loadedCount} images`);
      }
      
    } catch (error) {
      console.error('Error preloading images:', error);
      setLoadingState({
        success: false,
        loadedCount: 0,
        failedIndexes: images.map((_, index) => index)
      });
    } finally {
      setIsLoading(false);
    }
  }, [images, enabled, preloadImage, areAllImagesCached, addImagesToCache]);

  useEffect(() => {
    // 🆕 SV0002 - Se già tutto in cache, non chiamare preloadAllImages
    if (allCached) {
      console.log(`🚀 Hook initialized with all images cached`);
      return; // ✅ Skip completamente
    }
    
    preloadAllImages();
  }, [allCached, preloadAllImages]);

  const retry = useCallback(() => {
    preloadAllImages();
  }, [preloadAllImages]);

  return {
    isLoading,
    loadingState,
    retry,
    progress: images.length > 0 
      ? (loadingState.loadedCount / images.length) * 100 
      : 0
  };
};