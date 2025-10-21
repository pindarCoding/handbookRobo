/**
 * Generations Configuration (Technical - Not Translatable)
 * Contains animation configs and technical identifiers only
 */

export interface GenerationAnimationConfig {
  id: string                    // Technical ID (never translate)
  
  // Avatar animation (small - navigation)
  avatarAnimation: {
    folder: string
    frameStart: number
    frameEnd: number
    framePrefix: string
  }
  
  // Hero animation (large - main content) - Preparato per futuro
  heroAnimation?: {
    folder: string
    frameStart: number
    frameEnd: number
    framePrefix: string
  }
}

/**
 * All generations with their animation configs
 * IDs must match with i18n JSON files!
 */
export const generationsConfig: GenerationAnimationConfig[] = [
  {
    id: 'genz',
    avatarAnimation: {
      folder: 'genZ',
      frameStart: 86400,
      frameEnd: 86515,
      framePrefix: 'genZ_'
    }
    // heroAnimation verrà aggiunto dopo quando crei le animazioni grandi
  },
  {
    id: 'millennial',
    avatarAnimation: {
      folder: 'millenial_small',
      frameStart: 86400,
      frameEnd: 86519,
      framePrefix: 'millenial_'
    }
  },
  {
    id: 'genx',
    avatarAnimation: {
      folder: 'genx_small',
      frameStart: 86400,
      frameEnd: 86455,
      framePrefix: 'genx_'
    }
  },
  {
    id: 'boomer',
    avatarAnimation: {
      folder: 'b_boomers',
      frameStart: 86400,
      frameEnd: 86449,
      framePrefix: 'bBoomers_'
    }
  }
]

/**
 * Helper: Get animation config by generation ID
 */
export function getGenerationAnimationConfig(id: string): GenerationAnimationConfig | undefined {
  return generationsConfig.find(g => g.id === id)
}

/**
 * Helper: Get all generation IDs
 */
export function getGenerationIds(): string[] {
  return generationsConfig.map(g => g.id)
}