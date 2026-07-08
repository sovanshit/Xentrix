/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#8B5CF6",
        accent: "#06B6D4",
        dark: "#09090B",
        card: "#111827",
        muted: "#9CA3AF"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        plex: ["'IBM Plex Sans'", "sans-serif"]
      },
      backgroundImage: {
        "aurora":
          "radial-gradient(circle at 20% 20%, rgba(79,70,229,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(139,92,246,0.3), transparent 45%), radial-gradient(circle at 50% 80%, rgba(6,182,212,0.25), transparent 40%)"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        gradientMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradientMove: "gradientMove 8s ease infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite"
      },
      boxShadow: {
        glow: "0 0 40px rgba(79,70,229,0.35)",
        card: "0 8px 32px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};
