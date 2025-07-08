// src/data/handbook-data.ts

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
  }
  
  export const handbookData: Theme[] = [
    {
      id: 'communication',
      title: 'Communication between generations',
      introduction: 'Understanding how different generations communicate is key to building stronger workplace relationships. This chapter explores various communication styles, tools, and strategies to bridge generational gaps.',
      page_id: 1,
      subThemes: [
        { id: 'tools', title: 'Strumenti di comunicazione', page_id: 2 },
        { id: 'conflicts', title: 'Risolvere conflitti', page_id: 4 },
        { id: 'values', title: 'Valori', page_id: 3 }
      ]
    },
    {
      id: 'diversity',
      title: 'Generational diversity from an intersectional point of view',
      introduction: 'Explore how generational differences intersect with other aspects of identity, creating unique perspectives and experiences in the workplace.',
      page_id: 5,
      subThemes: [
        { id: 'sub1', title: 'Identità e diversità', page_id: 1 },
        { id: 'sub2', title: 'Inclusione sul lavoro', page_id: 3 }
      ]
    },
    {
      id: 'digital',
      title: 'How to bridge digital inequality',
      introduction: 'This chapter addresses the digital divide and offers strategies to ensure equal access to technology and digital literacy for all generations.',
      page_id: 2,
      subThemes: [
        { id: 'sub1', title: 'Gap tecnologico', page_id: 4 },
        { id: 'sub2', title: 'Formazione digitale', page_id: 1 },
        { id: 'sub3', title: 'Strumenti collaborativi', page_id: 5 },
        { id: 'sub4', title: 'Accessibilità digitale', page_id: 2 }
      ]
    },
    {
      id: 'intercultural',
      title: 'Generational diversity from an intercultural point of view',
      introduction: 'Understanding the impact of cultural backgrounds on generational perspectives can enhance intercultural communication and collaboration in the workplace.',
      page_id: 3,
      subThemes: [
        { id: 'sub1', title: 'Background culturali', page_id: 5 }
      ]
    },
    {
      id: 'work',
      title: 'Differences in approach to work',
      introduction: 'This chapter explores how different generations approach work, including methodologies, work-life balance, and motivation.',
      page_id: 4,
      subThemes: [
        { id: 'sub1', title: 'Metodologie di lavoro', page_id: 2 },
        { id: 'sub2', title: 'Work-life balance', page_id: 3 },
        { id: 'sub3', title: 'Motivazione e obiettivi', page_id: 1 }
      ]
    }
  ]

  // Aggiungi dopo le interfacce esistenti
export interface Generation {
    id: string
    title: string
    ageRange: string
    description: string
  }
  
  export const generations: Generation[] = [
    {
      id: 'genz',
      title: 'Gen Z',
      ageRange: '14 - 27',
      description: 'Digital natives who value authenticity and work-life integration'
    },
    {
      id: 'millennial',
      title: 'Millennial',
      ageRange: '28 - 43',
      description: 'Tech-savvy optimists focused on purpose and growth'
    },
    {
      id: 'genx',
      title: 'Gen X',
      ageRange: '44 - 59',
      description: 'Independent and adaptable, bridging traditional and digital approaches'
    },
    {
      id: 'boomer',
      title: 'Baby Boomer',
      ageRange: '60 - 78',
      description: 'Experience-driven with strong work ethic and traditional values'
    }
  ]

  export interface Variant {
    id: string
    title: string
    color: string
    description: string
    generationId: string  // specifica per quale generazione è questa variante
    subThemeId: string    // per quale sottotema
    page_id: number
  }

  // Dati delle varianti organizzati per generazione e sottotema
export const variants: Variant[] = [
  // Varianti per Gen Z
  {
    id: 'genz-tools-digital',
    title: 'Digital-First Communication',
    color: 'blue',
    description: 'Preferenza per comunicazione asincrona attraverso strumenti digitali',
    generationId: 'genz',
    subThemeId: 'tools',
    page_id: 3
  },
  {
    id: 'genz-tools-instant',
    title: 'Instant Messaging Priority',
    color: 'green',
    description: 'Focus su messaggistica istantanea e comunicazione rapida',
    generationId: 'genz',
    subThemeId: 'tools',
    page_id: 1
  },

  // Varianti per Millennials
  {
    id: 'millennial-tools-hybrid',
    title: 'Hybrid Communication',
    color: 'blue',
    description: 'Bilanciamento tra comunicazione digitale e tradizionale',
    generationId: 'millennial',
    subThemeId: 'tools',
    page_id: 5
  },
  {
    id: 'millennial-tools-collab',
    title: 'Collaborative Tools',
    color: 'green',
    description: 'Preferenza per strumenti di collaborazione e project management',
    generationId: 'millennial',
    subThemeId: 'tools',
    page_id: 2
  },

  // Varianti per Gen X
  {
    id: 'genx-tools-balanced',
    title: 'Balanced Approach',
    color: 'blue',
    description: 'Approccio equilibrato tra metodi tradizionali e digitali',
    generationId: 'genx',
    subThemeId: 'tools',
    page_id: 4
  },

  // Varianti per Boomers
  {
    id: 'boomer-tools-traditional',
    title: 'Traditional Communication',
    color: 'blue',
    description: 'Preferenza per comunicazione diretta e face-to-face',
    generationId: 'boomer',
    subThemeId: 'tools',
    page_id: 1
  }
]

export interface BookPage {
  id: string;
  title: string;
  themeId: string;
  subThemeId?: string;
  generationId?: string;
  variantId?: string;
  addedAt: number; // timestamp per ordinamento
}