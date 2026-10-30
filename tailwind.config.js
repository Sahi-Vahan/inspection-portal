/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        donezo: {
          green: '#154D3F',
          greenHover: '#0F382E',
          greenLight: '#E8F5EE',
          greenText: '#154D3F',
          emerald: '#10B981',
          dark: '#0A0E12',
          darkCard: '#12181E',
          darkBorder: '#1E262E',
          lightBg: '#F4F6F8',
          lightCard: '#FFFFFF',
          lightBorder: '#E5E9EB',
          mutedText: '#64748B',
        },
        field: {
          dark: '#0A0E12',
          panel: '#12181E',
          surface: '#1E262E',
          border: '#E5E9EB',
          accent: '#154D3F',
          warn: '#F59E0B',
          good: '#10B981',
          danger: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'donezo': '0 2px 12px -2px rgba(0, 0, 0, 0.04), 0 1px 3px -1px rgba(0, 0, 0, 0.02)',
        'donezo-hover': '0 10px 25px -4px rgba(21, 77, 63, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
