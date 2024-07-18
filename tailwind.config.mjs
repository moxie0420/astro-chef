/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        kitchen: {
          bg: "#f4f1de",
          fg: "#3d405b",
          primary: "#81b29a",
          secondary: "#e07a5f",
          accent: "#f2cc8f",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
