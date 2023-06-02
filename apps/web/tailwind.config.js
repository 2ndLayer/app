/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', '../../packages/{ui,components}/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-monasans)', 'sans-serif'],
        cartograph: ['var(--font-cartograph)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

