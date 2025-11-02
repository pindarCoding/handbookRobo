// src/data/handbook-data.ts

/**
 * HANDBOOK DATA STRUCTURE
 * ======================
 * 
 * INDICE:
 * 1. Interfaces
 * 2. Themes Data
 * 3. Generations Data
 * 4. Cards Data (organizzate per tema)
 * 
 * NAMING CONVENTIONS:
 * - Theme IDs: lowercase, no spaces (es: 'communication', 'work')
 * - SubTheme IDs: {themeId}-{descriptor} (es: 'work-values', 'communication-tools')
 * - Card IDs: {themeId}-{subthemeDescriptor}-{generationId} (es: 'work-values-genz')
 * - Generation IDs: lowercase (es: 'genz', 'millennial')
 */

// ==========================================
// 1. INTERFACES
// ==========================================

export interface SubTheme {
  id: string
  title: string
  page_id: number
  markdownFile?: string  
}

export interface Theme {
  id: string
  title: string
  introduction?: string
  page_id: number
  subThemes: SubTheme[]
  reportPdfUrl?: string
}

export interface Generation {
  id: string
  title: string
  ageRange: string
  description: string
  characterFolder?: string  // Nome della cartella del personaggio
  frameStart?: number       // Frame iniziale
  frameEnd?: number        // Frame finale
  framePrefix?: string     // Prefisso del file (se presente)
}

export interface Card {
  id: string
  title: string
  color: string
  description: string
  themeId: string       // NEW: explicit theme reference
  subThemeId: string
  generationId: string
  page_id: number
  image?: string
  stereotype: string
  researchFindings: string
  strategiesAdvice: string
}

export interface BookPage {
  id: string
  title: string
  themeId: string
  subThemeId?: string
  generationId?: string
  cardId?: string
  addedAt: number
}

// ==========================================
// 2. THEMES DATA
// ==========================================

export const handbookData: Theme[] = [
  // THEME 1: COMMUNICATION
  {
    id: 'communication',
    title: 'Communication between generations',
    introduction: 'Understanding how different generations communicate is key to building stronger workplace relationships. This chapter explores various communication styles, tools, and strategies to bridge generational gaps.',
    page_id: 1,
    subThemes: [
      { id: 'communication-tools', title: 'Strumenti di comunicazione', page_id: 2, markdownFile: 'communication-tools.md' },
      { id: 'communication-conflicts', title: 'Risolvere conflitti', page_id: 4, markdownFile: 'communication-conflicts.md' },
      { id: 'communication-values', title: 'Valori', page_id: 3, markdownFile: 'communication-values.md' }
    ]
  },

  // THEME 2: DIVERSITY
  {
    id: 'diversity',
    title: 'Generational diversity from an intersectional point of view',
    introduction: 'Explore how generational differences intersect with other aspects of identity, creating unique perspectives and experiences in the workplace.',
    page_id: 5,
    subThemes: [
      { id: 'diversity-identity', title: 'Identità e diversità', page_id: 1 },
      { id: 'diversity-inclusion', title: 'Inclusione sul lavoro', page_id: 3 }
    ]
  },

  // THEME 3: DIGITAL
  {
    id: 'digital',
    title: 'How to bridge digital inequality',
    introduction: 'This chapter addresses the digital divide and offers strategies to ensure equal access to technology and digital literacy for all generations.',
    page_id: 2,
    subThemes: [
      { id: 'digital-gap', title: 'Gap tecnologico', page_id: 4 },
      { id: 'digital-training', title: 'Formazione digitale', page_id: 1 },
      { id: 'digital-collaboration', title: 'Strumenti collaborativi', page_id: 5 },
      { id: 'digital-accessibility', title: 'Accessibilità digitale', page_id: 2 }
    ]
  },

  // THEME 4: INTERCULTURAL
  {
    id: 'intercultural',
    title: 'Generational diversity from an intercultural point of view',
    introduction: 'Understanding the impact of cultural backgrounds on generational perspectives can enhance intercultural communication and collaboration in the workplace.',
    page_id: 3,
    subThemes: [
      { id: 'intercultural-backgrounds', title: 'Background culturali', page_id: 5 }
    ]
  },

  // THEME 5: WORK
  {
    id: 'work',
    title: 'Differences in approach to work',
    introduction: 'Workplaces today bring together a uniquely diverse mix of generations. Baby Boomers, Generation X, Millennials, and Generation Z collaborate daily, each shaped by the social, economic, and technological environments of their formative years. These influences affect not only how individuals define success but also how they communicate, stay motivated, and approach teamwork. While differences in expectations and styles can sometimes create tension or misunderstanding, they also open valuable opportunities for mutual learning, innovation, and resilience. By exploring generational perspectives on values, motivation, and collaboration, this handbook provides practical insights and strategies to help organizations build inclusive environments where all generations feel recognized, respected, and empowered to contribute their strengths. ',
    page_id: 4,
    reportPdfUrl: '/pdfs/work-report.pdf',
    subThemes: [
      { id: 'work-values', title: 'Workplace Values Across Generations', page_id: 2 },
      { id: 'work-motivation', title: 'Motivation and Demotivation', page_id: 3 },
      { id: 'work-styles', title: 'Work Styles and Collaboration', page_id: 1 }
    ]
  }
]


/**
 * Get theme by ID
 */
export const getThemeById = (themeId: string): Theme | undefined => {
  return handbookData.find(theme => theme.id === themeId)
}