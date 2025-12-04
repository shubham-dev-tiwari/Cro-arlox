/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Add your custom colors here (e.g. #385179, #f5f5f5)
      colors: {
        primary: "#385179",
        bg: "#f5f5f5",
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(105deg, #f5f5f5 30%, #e3eafc 100%)',
      },
    },
  },
  plugins: [],
}
