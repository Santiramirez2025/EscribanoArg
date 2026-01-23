import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ========================================================================
      // COLORES
      // ========================================================================
      colors: {
        // Primary - Azul marino (confianza, autoridad legal)
        primary: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#102a43",
          950: "#0a1929",
        },
        // Accent - Ámbar dorado (premium, CTA)
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // Semantic colors
        success: {
          light: "#d1fae5",
          DEFAULT: "#10b981",
          dark: "#047857",
        },
        error: {
          light: "#fee2e2",
          DEFAULT: "#ef4444",
          dark: "#dc2626",
        },
        warning: {
          light: "#fef3c7",
          DEFAULT: "#f59e0b",
          dark: "#d97706",
        },
      },

      // ========================================================================
      // TIPOGRAFÍA
      // ========================================================================
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },

      // ========================================================================
      // ESPACIADO
      // ========================================================================
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },

      // ========================================================================
      // BORDER RADIUS (App-style: más redondeado)
      // ========================================================================
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ========================================================================
      // SOMBRAS (Suaves, estilo app premium)
      // ========================================================================
      boxShadow: {
        "soft-sm": "0 1px 2px 0 rgb(0 0 0 / 0.03)",
        "soft-md": "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.03)",
        "soft-lg": "0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.03)",
        "soft-xl": "0 20px 25px -5px rgb(0 0 0 / 0.06), 0 8px 10px -6px rgb(0 0 0 / 0.03)",
        "soft-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.15)",
        "glow-amber": "0 0 40px -10px rgb(245 158 11 / 0.3)",
        "glow-primary": "0 0 40px -10px rgb(16 42 67 / 0.3)",
      },

      // ========================================================================
      // ANIMACIONES
      // ========================================================================
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "slide-in-up": "slideInUp 0.3s ease-out",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "shimmer": "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245, 158, 11, 0.4)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(245, 158, 11, 0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

      // ========================================================================
      // TRANSICIONES
      // ========================================================================
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: {
        "250": "250ms",
        "400": "400ms",
      },

      // ========================================================================
      // BACKGROUNDS
      // ========================================================================
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #102a43 0%, #243b53 50%, #102a43 100%)",
        "gradient-accent": "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
      },

      // ========================================================================
      // Z-INDEX
      // ========================================================================
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },

      // ========================================================================
      // ASPECT RATIO
      // ========================================================================
      aspectRatio: {
        "4/3": "4 / 3",
        "3/4": "3 / 4",
        "3/2": "3 / 2",
      },
    },
  },
  plugins: [],
};

export default config;