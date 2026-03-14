/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          900: '#1a2332',
          800: '#243040',
          700: '#2e3e4e',
        },
        olive: {
          600: '#4a6741',
          500: '#567d4a',
          400: '#6b8f5e',
        },
        amber: {
          500: '#d4912a',
          400: '#e0a23b',
        },
        whatsapp: '#25D366',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
};
