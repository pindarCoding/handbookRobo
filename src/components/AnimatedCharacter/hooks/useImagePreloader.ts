/**
 * Custom hook for preloading images
 * @module hooks/useImagePreloader
 */

import { useEffect, useState, useCallback } from 'react';
import { ImagePreloadResult } from '../AnimatedCharacter.types';

interface UseImagePreloaderProps {
  images: string[];
  enabled?: boolean;
}

export const useImagePreloader = ({ 
  images, 
  enabled = true 
}: UseImagePreloaderProps) => {
  const [loadingState, setLoadingState] = useState<ImagePreloadResult>({
    success: false,
    loadedCount: 0,
    failedIndexes: []
  });
  const [isLoading, setIsLoading] = useState(true);

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
  }, [images, enabled, preloadImage]);

  useEffect(() => {
    preloadAllImages();
  }, [preloadAllImages]);

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