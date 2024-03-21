/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      colors:{        
        'DeepGray': '#252523',
        'TextWhite':'#e5eaf5'
      }        
    },
  },
  plugins: [],
  darkMode: 'class',
}

