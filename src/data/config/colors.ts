// Generation Colors
export const generationColors = {
  'genz': {
    primary: '#8B5CF6',      // Purple
    light: '#EDE9FE',
    dark: '#5B21B6',
    ring: '#A78BFA'
  },
  'millennial': {
    primary: '#F59E0B',      // Amber
    light: '#FEF3C7',
    dark: '#B45309',
    ring: '#FBBF24'
  },
  'genx': {
    primary: '#10B981',      // Green
    light: '#D1FAE5',
    dark: '#065F46',
    ring: '#34D399'
  },
  'boomer': {
    primary: '#3B82F6',      // Blue
    light: '#DBEAFE',
    dark: '#1E40AF',
    ring: '#60A5FA'
  }
} as const

// Tailwind Classes
export const generationClasses = {
  'genz': {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
    ring: 'ring-purple-500',
    hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30'
  },
  'millennial': {
    bg: 'bg-amber-50 dark:bg-orange-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
    ring: 'ring-amber-500',
    hover: 'hover:bg-amber-100 dark:hover:bg-amber-900/30'
  },
  'genx': {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-700 dark:text-green-300',
    ring: 'ring-green-500',
    hover: 'hover:bg-green-100 dark:hover:bg-green-900/30'
  },
  'boomer': {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    ring: 'ring-blue-500',
    hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
  }
} as const

export function getGenerationClasses(generationId: string) {
  return generationClasses[generationId as keyof typeof generationClasses] || generationClasses['boomer']
}
