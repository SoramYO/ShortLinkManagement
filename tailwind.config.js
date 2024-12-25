import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        "bounce-x": "bounce-x 1s infinite",
      },
    },
  },
  plugins: [typography],
};
