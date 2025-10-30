import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // Light mode - Testo NERO
            color: '#1e293b', // slate-800 (quasi nero)
            
            // Headings
            'h1, h2, h3, h4': {
              color: '#0f172a', // slate-900 (nero)
              fontWeight: '700',
            },
            h1: {
              fontSize: '2.25rem', // 36px
              marginTop: '0',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.875rem', // 30px
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.5rem', // 24px
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h4: {
              fontSize: '1.25rem', // 20px
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            
            // Paragraphs
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.75',
            },
            
            // Links
            a: {
              color: '#3b82f6', // blue-500
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#2563eb', // blue-600
              },
            },
            
            // Strong/Bold
            strong: {
              color: '#0f172a', // slate-900
              fontWeight: '600',
            },
            
            // Lists
            'ul, ol': {
              paddingLeft: '1.5rem',
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            
            // Code
            code: {
              color: '#dc2626', // red-600
              backgroundColor: '#f1f5f9', // slate-100
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
              fontSize: '0.875rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            
            // Code blocks
            pre: {
              backgroundColor: '#1e293b', // slate-800
              color: '#e2e8f0', // slate-200
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
              fontSize: '0.875rem',
            },
            
            // Blockquotes
            blockquote: {
              borderLeftColor: '#3b82f6', // blue-500
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              color: '#475569', // slate-600
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            
            // Horizontal rule
            hr: {
              borderColor: '#cbd5e1', // slate-300
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            
            // Tables
            table: {
              width: '100%',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            thead: {
              borderBottomColor: '#cbd5e1', // slate-300
              borderBottomWidth: '2px',
            },
            'thead th': {
              color: '#0f172a', // slate-900
              fontWeight: '600',
              padding: '0.75rem',
              textAlign: 'left',
            },
            'tbody td': {
              padding: '0.75rem',
              borderBottomColor: '#e2e8f0', // slate-200
              borderBottomWidth: '1px',
            },
          },
        },
        
        // Dark mode customization
        invert: {
          css: {
            color: '#e2e8f0', // slate-200
            
            'h1, h2, h3, h4': {
              color: '#f1f5f9', // slate-100
            },
            
            a: {
              color: '#60a5fa', // blue-400
              '&:hover': {
                color: '#93c5fd', // blue-300
              },
            },
            
            strong: {
              color: '#f1f5f9', // slate-100
            },
            
            code: {
              color: '#fca5a5', // red-300
              backgroundColor: '#1e293b', // slate-800
            },
            
            pre: {
              backgroundColor: '#0f172a', // slate-900
              color: '#e2e8f0', // slate-200
            },
            
            blockquote: {
              borderLeftColor: '#60a5fa', // blue-400
              color: '#cbd5e1', // slate-300
            },
            
            hr: {
              borderColor: '#475569', // slate-600
            },
            
            'thead th': {
              color: '#f1f5f9', // slate-100
            },
            
            'tbody td': {
              borderBottomColor: '#475569', // slate-600
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
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