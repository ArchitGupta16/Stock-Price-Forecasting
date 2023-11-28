/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(40, 2, 120, 0.8)', // Replace with your desired shadow color
      },
    },
  },
  plugins: [],
};
