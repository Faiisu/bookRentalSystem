/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure it scans all components
    theme: {
      extend: {},
    },
    plugins: [],
  };


  module.exports = {
    theme: {
      extend: {
        fontFamily: {
          animeace: ['AnimeAce', 'sans-serif'], // ✅ Add this line
        },
      },
    },
    plugins: [],
  };