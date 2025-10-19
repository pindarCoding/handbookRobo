import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Generation backgrounds
    'bg-blue-500', 'bg-blue-600',
    'bg-green-500', 'bg-green-600',
    'bg-orange-500', 'bg-orange-600', 'bg-amber-500', 'bg-amber-600',
    'bg-purple-500', 'bg-purple-600',
    
    // Dark mode variants
    'dark:bg-blue-600', 'dark:bg-blue-700',
    'dark:bg-green-600', 'dark:bg-green-700',
    'dark:bg-orange-600', 'dark:bg-orange-700',
    'dark:bg-amber-600', 'dark:bg-amber-700',
    'dark:bg-purple-600', 'dark:bg-purple-700',
    
    // Borders
    'border-blue-500', 'border-green-500', 'border-orange-500', 'border-amber-500', 'border-purple-500',
    'border-white',

      // Theme/SubTheme left borders
  'border-l-blue-500',
  'border-l-purple-500',
  'border-l-4',
    
    // Rings
    'ring-blue-500', 'ring-green-500', 'ring-orange-500', 'ring-amber-500', 'ring-purple-500',
    
    // Hovers
    'hover:bg-blue-600', 'hover:bg-green-600', 'hover:bg-orange-600', 'hover:bg-amber-600', 'hover:bg-purple-600',
    'dark:hover:bg-blue-700', 'dark:hover:bg-green-700', 'dark:hover:bg-orange-700', 'dark:hover:bg-amber-700', 'dark:hover:bg-purple-700',
  ],
};
export default config;
