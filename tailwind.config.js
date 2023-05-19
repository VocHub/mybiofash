module.exports = {

  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter': ['"Inter"', 'sans-serif'],
        'display': ['"Inter"'],
        'body': ['"Inter"'],
      },
      colors: {
        green: {
          DEFAULT: '#3FB0B0',
          hover : '#059669',
          ligth: "#36D28F",
        },
        gray: {
          DEFAULT: '#f5f7ff'
        }
      },
      dropShadow: {
        'white': '0 35px 35px rgba(255, 255, 255, 0.1)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
 ],
}
