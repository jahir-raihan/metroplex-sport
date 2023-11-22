/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./html/*.{html,js}'],
  theme: {
    extend: {
      width:{
        'login-width': '360px',
        'full': '100%',
      },
    
    },
  },
  plugins: [
    function ({ addVariant }) {
        addVariant('child', '& > *');
        addVariant('child-hover', '& > *:hover');
    }
  ],
}

