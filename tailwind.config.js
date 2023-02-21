/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  daisyui: {
    themes: ['light', 'dark'],
  },
};
