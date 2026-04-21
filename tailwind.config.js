/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Public Sans', 'sans-serif'],
      },
      colors: {
        background: "#f9f9ff",
        surface: "#f9f9ff",
        "surface-dim": "#cfdaf2",
        "surface-bright": "#f9f9ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f0f3ff",
        "surface-container": "#e7eeff",
        "surface-container-high": "#dee8ff",
        "surface-container-highest": "#d8e3fb",
        "on-surface": "#111c2d",
        "on-surface-variant": "#3f484a",
        outline: "#6f797a",
        "outline-variant": "#bfc8c9",
        primary: "#004349",
        "on-primary": "#ffffff",
        "primary-container": "#0d5c63",
        secondary: "#505f76",
        "secondary-container": "#d0e1fb",
      },
    },
  },
  plugins: [],
}