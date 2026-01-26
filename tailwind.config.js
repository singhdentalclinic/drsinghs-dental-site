/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9", // Sky blue
        secondary: "#0f172a", // Slate 900
        muted: "#f1f5f9", // Slate 100
        "text-primary": "#1e293b", // Slate 800
        "text-secondary": "#64748b", // Slate 500
        success: "#22c55e", // Green 500
        conversion: "#f59e0b", // Amber 500
        "conversion-foreground": "#ffffff",
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        cta: ["Inter", "sans-serif"],
        instagram: ["'Geist Mono'", "monospace"],
        script: ["'Amsterdam Handwriting'", "cursive"],
        "monotype-corsiva": ["'Monotype Corsiva'", "cursive"],
      },
      boxShadow: {
        "elevation-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "elevation-md":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "elevation-lg":
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        "elevation-xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      transitionDuration: {
        normal: "300ms",
        fast: "150ms",
      },
      animation: {
        "pulse-subtle": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
