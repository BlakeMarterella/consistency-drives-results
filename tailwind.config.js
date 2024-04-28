/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	"./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'black': {
          DEFAULT: "#04080F"
        },
        'main-blue': {
          DEFAULT: "#507DBC",
          0: "#6363AC",
        },
        'secondary-blue': {
          DEFAULT: "#A1C6EA",
          0: "#B1B1E1"
        },
        'accent-blue': {
            DEFAULT: "#BBD1EA",
            0: "#C4C4E3"
        },
        'secondary-accent-blue': {
            DEFAULT: "#DAE3E5",
            0: "DDDDE4"
        }
      }
    },
  },
  plugins: [],
}

