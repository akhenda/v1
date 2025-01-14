const baseConfig = require("@v1/expo/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {},
  },
  plugins: [],
}
