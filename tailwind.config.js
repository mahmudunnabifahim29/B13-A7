/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#1f5a49",
          mid: "#2f6f5a",
          light: "#78d2ac"
        },
        slateInk: "#1f2937",
        slateMuted: "#64748b",
        pageBg: "#ebeff3"
      },
      boxShadow: {
        card: "0 1px 0 rgba(15, 23, 42, 0.04), 0 2px 10px rgba(15, 23, 42, 0.04)"
      },
      borderRadius: {
        card: "14px"
      }
    }
  },
  plugins: []
};
