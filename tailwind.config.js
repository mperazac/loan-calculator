/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  keyframes: {
    slideDownAndFade: {
      from: { opacity: 0, transform: 'translateY(-2px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    slideLeftAndFade: {
      from: { opacity: 0, transform: 'translateX(2px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    slideUpAndFade: {
      from: { opacity: 0, transform: 'translateY(2px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    slideRightAndFade: {
      from: { opacity: 0, transform: 'translateX(2px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
  },
  animation: {
    slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
