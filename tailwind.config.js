/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0B0B0F',
          800: '#15151C',
          700: '#1B1B23',
          border: '#292933',
        },
        brand: {
          violet: '#8B5CF6',
          violetHover: '#A78BFA',
          violetGlow: '#7C3AED',
          pink: '#8B5CF6',
          purple: '#8B5CF6',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          subtext: '#A1A1AA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
