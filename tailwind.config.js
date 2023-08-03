/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      backgroundImage: {
        "card-back": "url('src/assets/bg-card-back.png')",
        "card-front": "url('src/assets/bg-card-front.png')",
      },
    },
  },
  plugins: [],
};
