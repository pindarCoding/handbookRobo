/**
 * Generations Configuration (Technical - Not Translatable)
 * Contains animation configs and technical identifiers only
 * 
 * @module data/config/generations
 * @description Technical configuration for generation avatars and animations.
 *              Translations are handled separately in i18n/generations.json
 */

export interface GenerationAnimationConfig {
  id: string                    // Technical ID (never translate)
  code: string                  // Taxonomy code (GZ, GM, GX, GB)
  
  // Avatar animation (small - navigation)
  avatarAnimation: {
    folder: string
    frameStart: number
    frameEnd: number
    framePrefix: string
  }
  
  // Hero animation (large - main content) - Prepared for future
  heroAnimation?: {
    folder: string
    frameStart: number
    frameEnd: number
    framePrefix: string
  }
}

/**
 * All generations with their animation configs
 * IDs and codes must match with i18n JSON files!
 * 
 * Code Mapping:
 * - GZ = Gen Z
 * - GM = Millennial
 * - GX = Gen X
 * - GB = Baby Boomer
 */
export const generationsConfig: GenerationAnimationConfig[] = [
  {
    id: 'genz',
    code: 'GZ',
    avatarAnimation: {
      folder: 'genZ',
      frameStart: 86400,
      frameEnd: 86515,
      framePrefix: 'genZ_'
    }
    // heroAnimation will be added later when large animations are created
  },
  {
    id: 'millennial',
    code: 'GM',
    avatarAnimation: {
      folder: 'millenial_small',
      frameStart: 86400,
      frameEnd: 86519,
      framePrefix: 'millenial_'
    }
  },
  {
    id: 'genx',
    code: 'GX',
    avatarAnimation: {
      folder: 'genx_small',
      frameStart: 86400,
      frameEnd: 86455,
      framePrefix: 'genx_'
    }
  },
  {
    id: 'boomer',
    code: 'GB',
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
 * @param id - Generation ID (genz, millennial, genx, boomer)
 * @returns Animation configuration or undefined
 */
export function getGenerationAnimationConfig(id: string): GenerationAnimationConfig | undefined {
  return generationsConfig.find(g => g.id === id)
}

/**
 * Helper: Get animation config by generation CODE
 * @param code - Generation code (GZ, GM, GX, GB)
 * @returns Animation configuration or undefined
 */
export function getGenerationAnimationConfigByCode(code: string): GenerationAnimationConfig | undefined {
  return generationsConfig.find(g => g.code === code)
}

/**
 * Helper: Get all generation IDs
 * @returns Array of generation IDs
 */
export function getGenerationIds(): string[] {
  return generationsConfig.map(g => g.id)
}

/**
 * Helper: Get all generation codes
 * @returns Array of generation codes (GZ, GM, GX, GB)
 */
export function getGenerationCodes(): string[] {
  return generationsConfig.map(g => g.code)
}

/**
 * Helper: Map code to ID
 * @param code - Generation code (GZ, GM, GX, GB)
 * @returns Generation ID or undefined
 */
export function getGenerationIdByCode(code: string): string | undefined {
  return generationsConfig.find(g => g.code === code)?.id
}

/**
 * Helper: Map ID to code
 * @param id - Generation ID (genz, millennial, genx, boomer)
 * @returns Generation code or undefined
 */
export function getGenerationCodeById(id: string): string | undefined {
  return generationsConfig.find(g => g.id === id)?.code
}