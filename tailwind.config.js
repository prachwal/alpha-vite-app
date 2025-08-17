import tailwindcss from "@tailwindcss/vite";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light theme
        light: {
          bg: "#ffffff",
          surface: "#f8fafc",
          primary: "#3b82f6",
          secondary: "#64748b",
          accent: "#8b5cf6",
          text: "#1e293b",
          muted: "#64748b",
          border: "#e2e8f0",
        },
        // Dark theme
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          primary: "#60a5fa",
          secondary: "#94a3b8",
          accent: "#a78bfa",
          text: "#f1f5f9",
          muted: "#94a3b8",
          border: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        // Custom CSS variables for dynamic spacing
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
      },
    },
  },
  plugins: [tailwindcss],
};
