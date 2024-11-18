/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      mono: [
        'Monaco',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
    },
    width: {
      1200: '1200px'
    },
    fontSize: {
      12: '12px',
      14: '16px',
      16: '14px',
      18: '18px',
      20: '20px'
    },
    backgroundColor: {
      'blue-1000': '#2865c2',
      'blue-1000-hover': '#00a0e9',
      'bg-white': '#fff'
    },

    maxWidth: {
      1200: '1200px'
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
    },
    boxShadow: {
      custom: '1px 1px 5px 0 rgb(0 0 0 / 10%)',
      custom2: '0px 0px 10px 0px rgba(0, 0, 0, 0.10)'
    },

    container: {
      center: true,
      screens: {
        sm: '50rem'
      }
    },

    extend: {
      screens: {
        sm: '576px', // @media (min-width: 576px)
        md: '768px', // @media (min-width: 768px)
        lg: '1024px', // @media (min-width: 1024px)
        xl: '1200px', // @media (min-width: 1200px)
        '2xl': '1536px' // @media (min-width: 1536px)
      },
      colors: {
        slate: {
          850: 'hsl(222deg 47% 16%)'
        },
        primary: '#5fc3e7'
      }
    }
  },
  plugins: []
};
