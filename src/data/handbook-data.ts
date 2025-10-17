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
      { id: 'communication-tools', title: 'Strumenti di comunicazione', page_id: 2 },
      { id: 'communication-conflicts', title: 'Risolvere conflitti', page_id: 4 },
      { id: 'communication-values', title: 'Valori', page_id: 3 }
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

// ==========================================
// 3. GENERATIONS DATA
// ==========================================

export const generations: Generation[] = [
  {
    id: 'genz',
    title: 'Gen Z',
    ageRange: '14 - 27',
    description: 'Digital natives who value authenticity and work-life integration',
        characterFolder: 'genZ',
    frameStart: 86400,
    frameEnd:  86515,
    framePrefix: 'genZ_'
  },
  {
    id: 'millennial',
    title: 'Millennial',
    ageRange: '28 - 43',
    description: 'Tech-savvy optimists focused on purpose and growth',
    characterFolder: 'millenial_small',
    frameStart: 86400,
    frameEnd:  86519,
    framePrefix: 'millenial_'

  },
  {
    id: 'genx',
    title: 'Gen X',
    ageRange: '44 - 59',
    description: 'Independent and adaptable, bridging traditional and digital approaches',
    characterFolder: 'genx_small',
    frameStart: 86400,
    frameEnd:  86455,
    framePrefix: 'genx_'
  },
  {
    id: 'boomer',
    title: 'Baby Boomer',
    ageRange: '60 - 78',
    description: 'Experience-driven with strong work ethic and traditional values',
        characterFolder: 'millenial_small',
    frameStart: 86400,
    frameEnd:  86519,
    framePrefix: 'millenial_'
  }
]

// ==========================================
// 4. CARDS DATA (organized by theme)
// ==========================================

export const cards: Card[] = [
  
  // ========== COMMUNICATION THEME CARDS ==========
  
  // --- Communication Tools Subtheme ---
  // {
  //   id: 'communication-tools-genz',
  //   title: 'Digital-First Communication',
  //   color: 'blue',
  //   description: 'Preferenza per comunicazione asincrona attraverso strumenti digitali',
  //   themeId: 'communication',
  //   generationId: 'genz',
  //   subThemeId: 'communication-tools',
  //   page_id: 3
  // },
  // {
  //   id: 'communication-tools-millennial',
  //   title: 'Hybrid Communication',
  //   color: 'blue',
  //   description: 'Bilanciamento tra comunicazione digitale e tradizionale',
  //   themeId: 'communication',
  //   generationId: 'millennial',
  //   subThemeId: 'communication-tools',
  //   page_id: 5
  // },
  // {
  //   id: 'communication-tools-genx',
  //   title: 'Balanced Approach',
  //   color: 'blue',
  //   description: 'Approccio equilibrato tra metodi tradizionali e digitali',
  //   themeId: 'communication',
  //   generationId: 'genx',
  //   subThemeId: 'communication-tools',
  //   page_id: 4
  // },
  // {
  //   id: 'communication-tools-boomer',
  //   title: 'Traditional Communication',
  //   color: 'blue',
  //   description: 'Preferenza per comunicazione diretta e face-to-face',
  //   themeId: 'communication',
  //   generationId: 'boomer',
  //   subThemeId: 'communication-tools',
  //   page_id: 1
  // },
  
  // ========== WORK THEME CARDS ==========
  
  // --- Work Values Subtheme ---
  {
    id: 'work-values-genz',
    title: 'Gen Z: Workplace Values',
    color: 'purple',
    description: 'Priorità su flessibilità, purpose aziendale, impatto sociale e benessere mentale',
    themeId: 'work',
    generationId: 'genz',
    subThemeId: 'work-values',
    page_id: 6,
    image: '/images/cards/1.png',
      stereotype: 'Gen Z is often depicted as restless, fixated on technology, and hesitant to adhere to traditional workplace standards. They face criticism for insisting on excessive flexibility and exhibiting a lack of resilience. This characterization fails to recognize their practicality, capacity for adaptation, and deep commitment to equity, openness, and personal wellbeing in their work environments.',
      researchFindings: 'Studies show that Gen Z values openness, adaptability, and mental well-being. As digital natives who are adept with technology, they also desire mentorship and personal connections. Although job security is important, they want it to be accompanied by flexibility and a connection to their core beliefs. They tend to lose interest when organizations do not provide transparency or equity.',
      strategiesAdvice: 'In a marketing agency, Gen Z staff received support through a combination of daily communications on Slack for their tasks and weekly face-to-face mentoring sessions. This blended strategy enabled them to leverage digital tools effectively while also receiving personalized guidance, thereby enhancing both their engagement and performance.'
  },
  {
    id: 'work-values-millennial',
    title: 'Millennial: Workplace Values',
    color: 'purple',
    description: 'Focus su crescita personale, opportunità di carriera e lavoro con significato',
    themeId: 'work',
    generationId: 'millennial',
    subThemeId: 'work-values',
    page_id: 7,
    image: '/images/cards/2.png',
    stereotype: 'Many people characterize Millennials as entitled job-hoppers who are reluctant to commit to a single employer and are focused solely on perks or immediate rewards. They are perceived as being overly reliant on feedback and requesting excessive flexibility. This stereotype overlooks their deep dedication to pursuing meaningful work, fostering inclusion, and engaging in purpose-driven careers that resonate with their personal values.',
      researchFindings: 'Research indicates that Millennials prioritize ongoing education, diversity, and empowering leadership. They look for meaningful work and inclusivity, favoring less rigid organizational structures and teamwork-oriented environments. Studies reveal that they anticipate frequent feedback and a connection between their personal beliefs and the goals of the organization, leading to higher engagement in socially responsible companies.',
      strategiesAdvice: 'Millennials excel in environments that offer chances for advancement, encouraging mentorship, and openness. Companies should promote honest communication and align corporate objectives with social or environmental missions. Providing distinct career paths, continuous learning, and inclusive environments enhances their enthusiasm and commitment.'
  },
  {
    id: 'work-values-genx',
    title: 'Gen X: Workplace Values',
    color: 'purple',
    description: 'Valorizzazione autonomia, efficienza e bilanciamento vita-lavoro',
    themeId: 'work',
    generationId: 'genx',
    subThemeId: 'work-values',
    page_id: 8,
    image: '/images/cards/3.png',
    stereotype: 'Generation X is often viewed as disillusioned and aloof, shying away from loyalty to their employers and favoring independent work. They are frequently characterized as doubtful of authority, reluctant to make commitments, and less involved in collaborative efforts. Although they do appreciate independence, this perception overlooks their flexibility and practical mindset in finding a balance between structure and autonomy.',
      researchFindings: 'Studies indicate that Generation X prioritizes independence, equity, and a balance between work and personal life. Due to experiencing corporate layoffs in their formative years, they are often self-sufficient and wary of making excessive commitments to employers. Nevertheless, they are capable of adjusting to both conventional structures and contemporary collaborative environments, succeeding in settings that merge autonomy with fairness and openness.',
      strategiesAdvice: 'Organizations can assist Gen X by offering flexibility, acknowledging their contributions appropriately, and presenting avenues for advancement. Having clear objectives alongside independence enables them to work efficiently. They are adept at connecting different generations, as they can comprehend established norms while accepting modern collaborative and digital methods.'
  },
  {
    id: 'work-values-boomer',
    title: 'Boomer: Workplace Values',
    color: 'purple',
    description: 'Focus su fedeltà aziendale, etica del lavoro tradizionale e gerarchia',
    themeId: 'work',
    generationId: 'boomer',
    subThemeId: 'work-values',
    page_id: 9,
    image: '/images/cards/4.png',
    stereotype: 'Baby Boomers are frequently depicted as excessively committed to their jobs, associating extended hours with loyalty and showing resistance to flexibility or change. This characterization shows them as inflexible traditionalists clinging to outdated ways. In truth, Boomers have experienced swift cultural and technological transformations and have consistently demonstrated their capacity to adjust to new circumstances when provided with respectful assistance.',
      researchFindings: 'Studies indicate that Baby Boomers prioritize loyalty, respect, and acknowledgment. They perceive their work as a component of their personal identity and are driven by the desire to make significant contributions. They are inclined towards organized settings and value the trust placed in them to handle responsibilities. Research also reveals that they can adapt to digital transformation successfully, provided they receive clear instructions and adequate support systems.',
      strategiesAdvice: 'To maintain the interest of Boomers, organizations ought to acknowledge their longstanding contributions and furnish structured training on new technologies. Engaging them in mentorship allows them to share their expertise and feel appreciated. Positions that highlight their institutional knowledge, strategic advisory roles, and recognition initiatives support ongoing motivation and inclusion.'
  },
  
  // --- Work Motivation Subtheme ---
  {
    id: 'work-motivation-genz',
    title: 'Gen Z: Instant Feedback & Learning',
    color: 'orange',
    description: 'Motivati da riconoscimento immediato e opportunità di apprendimento continuo',
    themeId: 'work',
    generationId: 'genz',
    subThemeId: 'work-motivation',
    page_id: 10,
    stereotype: 'Digital Native',
      researchFindings: 'Gen Z prioritizes flexibility and mental well-being in the workplace.',
      strategiesAdvice: 'Offer remote work options and prioritize mental health resources.'
  },
  {
    id: 'work-motivation-millennial',
    title: 'Millennial: Purpose & Collaboration',
    color: 'orange',
    description: 'Motivati da allineamento valoriale e successi di team',
    themeId: 'work',
    generationId: 'millennial',
    subThemeId: 'work-motivation',
    page_id: 11,
    stereotype: 'Digital Native',
      researchFindings: 'Gen Z prioritizes flexibility and mental well-being in the workplace.',
      strategiesAdvice: 'Offer remote work options and prioritize mental health resources.'
  },
  {
    id: 'work-motivation-genx',
    title: 'Gen X: Results & Autonomy',
    color: 'orange',
    description: 'Motivati da risultati concreti, obiettivi chiari e libertà operativa',
    themeId: 'work',
    generationId: 'genx',
    subThemeId: 'work-motivation',
    page_id: 12,
    stereotype: 'Digital Native',
      researchFindings: 'Gen Z prioritizes flexibility and mental well-being in the workplace.',
      strategiesAdvice: 'Offer remote work options and prioritize mental health resources.'
  },
  {
    id: 'work-motivation-boomer',
    title: 'Boomer: Achievement & Recognition',
    color: 'orange',
    description: 'Motivati da riconoscimenti formali e progressione di carriera',
    themeId: 'work',
    generationId: 'boomer',
    subThemeId: 'work-motivation',
    page_id: 13,
    stereotype: 'Digital Native',
      researchFindings: 'Gen Z prioritizes flexibility and mental well-being in the workplace.',
      strategiesAdvice: 'Offer remote work options and prioritize mental health resources.'
  },
  
  // --- Work Styles Subtheme ---
  {
    id: 'work-styles-genz',
    title: 'Gen Z: Digital & Async',
    color: 'cyan',
    description: 'Collaborazione digitale con comfort per lavoro asincrono e remoto',
    themeId: 'work',
    generationId: 'genz',
    subThemeId: 'work-styles',
    page_id: 14,
    stereotype: 'Digital Native',
      researchFindings: 'Gen Z prioritizes flexibility and mental well-being in the workplace.',
      strategiesAdvice: 'Offer remote work options and prioritize mental health resources.'
  },
  {
    id: 'work-styles-millennial',
    title: 'Millennial: Agile & Open',
    color: 'cyan',
    description: 'Approccio agile con collaborazione cross-funzionale e ambienti aperti',
    themeId: 'work',
    generationId: 'millennial',
    subThemeId: 'work-styles',
    page_id: 15,
    stereotype: 'Digital Native',
      researchFindings: 'Gen Z prioritizes flexibility and mental well-being in the workplace.',
      strategiesAdvice: 'Offer remote work options and prioritize mental health resources.'
  },
  {
    id: 'work-styles-genx',
    title: 'Gen X: Pragmatic & Efficient',
    color: 'cyan',
    description: 'Stile pragmatico bilanciando metodi tradizionali e digitali',
    themeId: 'work',
    generationId: 'genx',
    subThemeId: 'work-styles',
    page_id: 16,
    stereotype: 'Digital Native',
      researchFindings: 'Gen Z prioritizes flexibility and mental well-being in the workplace.',
      strategiesAdvice: 'Offer remote work options and prioritize mental health resources.'
  },
  {
    id: 'work-styles-boomer',
    title: 'Boomer: Structured & Formal',
    color: 'cyan',
    description: 'Preferenza per processi strutturati, comunicazione formale e gerarchie chiare',
    themeId: 'work',
    generationId: 'boomer',
    subThemeId: 'work-styles',
    page_id: 17,
    stereotype: 'Digital Native',
      researchFindings: 'Gen Z prioritizes flexibility and mental well-being in the workplace.',
      strategiesAdvice: 'Offer remote work options and prioritize mental health resources.'
  }
  
  // ========== ADD OTHER THEME CARDS HERE ==========
  // Follow the same pattern for diversity, digital, and intercultural themes
]

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Find all cards for a specific theme
 */
export const getCardsByTheme = (themeId: string): Card[] => {
  return cards.filter(card => card.themeId === themeId)
}

/**
 * Find a specific card by generation and subtheme
 */
export const findCard = (generationId: string, subThemeId: string): Card | undefined => {
  return cards.find(card => 
    card.generationId === generationId && 
    card.subThemeId === subThemeId
  )
}

/**
 * Get theme by ID
 */
export const getThemeById = (themeId: string): Theme | undefined => {
  return handbookData.find(theme => theme.id === themeId)
}