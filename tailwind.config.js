/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'darkbg': '#15232E',
        'darkitem': '#1F2935',
        'darkinactive': '#2D3743',
        'darkgrey': '#737781',
        'darkred': '#BD374D',
        'lightred': '#FF3D57',
        'darkyellow': '#B28C50',
        'lightyellow': '#FDBF5E',
        'darkblue': '#209AAD',
        'lightblue': '#22CCE2',
        'ctablue': '#0037FA',
        'green': '#09B66D',
      }
    },
  },
  plugins: [],
}

