/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-accent': 'var(--text-accent)',
        'text-muted': 'var(--text-muted)',
        'text-light': 'var(--text-light)',
        'text-dark': 'var(--text-dark)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(currentColor 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '20px 20px',
      },
    },
  },
  plugins: [],
}