/**
 * Type definitions for AnimatedCharacter component
 * @module AnimatedCharacter.types
 */

export interface AnimatedCharacterProps {
  /**
   * Array of image paths for the animation sequence
   */
  images: string[];
  
  /**
   * Alt text for accessibility
   */
  alt: string;
  
  /**
   * Width of the character (in pixels or string with unit)
   */
  width?: number | string;
  
  /**
   * Height of the character (in pixels or string with unit)
   */
  height?: number | string;
  
  /**
   * Frame rate of the animation (frames per second)
   * @default 24
   */
  frameRate?: number;
  
  /**
   * Whether the animation should loop
   * @default true
   */
  loop?: boolean;
  
  /**
   * Whether to autoplay on hover or require click
   * @default true (play on hover)
   */
  playOnHover?: boolean;
  
  /**
   * Whether to reverse to first frame on mouse leave
   * @default true
   */
  reverseOnLeave?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Callback when animation starts
   */
  onAnimationStart?: () => void;
  
  /**
   * Callback when animation completes
   */
  onAnimationComplete?: () => void;
  
  /**
   * Callback when image fails to load
   */
  onError?: (error: Error) => void;
  
  /**
   * Loading strategy for images
   * @default 'eager'
   */
  loading?: 'eager' | 'lazy';
  
  /**
   * Whether to show loading skeleton while images load
   * @default true
   */
  showSkeleton?: boolean;
}

export interface AnimationState {
  isPlaying: boolean;
  currentFrame: number;
  isLoading: boolean;
  hasError: boolean;
  loadedImages: Set<number>;
}

export interface ImagePreloadResult {
  success: boolean;
  loadedCount: number;
  failedIndexes: number[];
}

export type FrameDirection = 'forward' | 'backward' | 'paused';