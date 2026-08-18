import type { Config } from "tailwindcss"

const config: Config = {
  presets: [require("@cerneo/kalender-tokens/tailwind")],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        display: ["var(--font-manrope)", "Manrope", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        border: "rgb(var(--k-color-border-rgb) / <alpha-value>)",
        input: "rgb(var(--k-color-border-rgb) / <alpha-value>)",
        ring: "rgb(var(--k-color-focus-rgb) / <alpha-value>)",
        background: "rgb(var(--k-color-canvas-rgb) / <alpha-value>)",
        foreground: "rgb(var(--k-color-text-rgb) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--k-color-action-rgb) / <alpha-value>)",
          foreground: "rgb(var(--k-color-text-inverse-rgb) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--k-reference-color-brand-blue-rgb) / <alpha-value>)",
          foreground: "rgb(var(--k-reference-color-neutral-white-rgb) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--k-color-accent-subtle-rgb) / <alpha-value>)",
          foreground: "rgb(var(--k-color-text-rgb) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--k-color-danger-rgb) / <alpha-value>)",
          foreground: "rgb(var(--k-color-text-inverse-rgb) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--k-color-surface-muted-rgb) / <alpha-value>)",
          foreground: "rgb(var(--k-color-text-muted-rgb) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--k-color-surface-raised-rgb) / <alpha-value>)",
          foreground: "rgb(var(--k-color-text-rgb) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--k-color-surface-rgb) / <alpha-value>)",
          foreground: "rgb(var(--k-color-text-rgb) / <alpha-value>)",
        },
        "brand-purple": "rgb(var(--k-reference-color-brand-indigo-rgb) / <alpha-value>)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #22D3EE 0%, #0EA5E9 50%, #312E81 100%)",
      },
      borderRadius: {
        lg: "var(--k-reference-radius-lg)",
        md: "var(--k-reference-radius-md)",
        sm: "var(--k-reference-radius-sm)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
