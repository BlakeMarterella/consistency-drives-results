/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
	"./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ['Public Sans', ...defaultTheme.fontFamily.sans],
      // sans: ['Nunito Sans', 'sans-serif'],
      // serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        'brand-darkest-blue': {
          DEFAULT: '#02070C'
        },
        'brand-dark-blue:': {
          DEFAULT: '#194779',
        },
        'brand-med-blue': {
          DEFAULT: '#0D3143',
        },
        'brand-light-blue': {
           DEFAULT: '#3DA5D9',
        },
        'brand-white': {
          DEFAULT: '#EFEFEF'
        },
        'brand-light-grey': {
          DEFAULT: '#C0BFBD'
        },
        'black': {
          DEFAULT: "#04080F"
        },
        'navy-blue': {
          DEFAULT: "#21437C"
        },
        'main-blue': {
          DEFAULT: "#507DBC",
          1: "#6363AC",
        },
        'secondary-blue': {
          DEFAULT: "#A1C6EA",
          1: "#B1B1E1"
        },
        'accent-blue': {
            DEFAULT: "#BBD1EA",
            1: "#C4C4E3"
        },
        'secondary-accent-blue': {
            DEFAULT: "#DAE3E5",
            1: "DDDDE4"
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    (process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  ],
}

