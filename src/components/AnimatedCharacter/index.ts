/**
 * Barrel export for AnimatedCharacter component
 * @module components/AnimatedCharacter
 */

export { default as AnimatedCharacter } from './AnimatedCharacter';
export type { 
  AnimatedCharacterProps, 
  AnimationState,
  ImagePreloadResult,
  FrameDirection 
} from './AnimatedCharacter.types';
export { useImagePreloader } from './hooks/useImagePreloader';