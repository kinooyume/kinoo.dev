/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
      },
      colors: {
        background: "#181927",
        accent: {
          normal: "#f8ba88",
          bright: "#f6b17a",
        },
        white: {
          normal: "#e0e0e0",
          light: "#f6f5f7",
        },
      },
    },
  },
  plugins: [],
};
