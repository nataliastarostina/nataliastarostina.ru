module.exports = {
  content: [
    "./*.html",
    "./*.js",
    "./articles/*.html",
    "./articles/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Lora", "serif"],
        sans: ["Manrope", "sans-serif"],
        script: ["Pinyon Script", "cursive"]
      },
      colors: {
        navy: {
          DEFAULT: "#0A192F",
          light: "#112240",
          lighter: "#233554"
        },
        cream: {
          DEFAULT: "#FDFBF7",
          dark: "#F0EBE1"
        },
        powder: "#AECBEB",
        orange: {
          DEFAULT: "#FF8C00",
          hover: "#E67E00"
        }
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
        "spin-very-slow": "spin 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "gradient-flow": "gradient-flow 4s ease infinite",
        "bounce-slow": "bounce-slow 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(-15%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
          }
        }
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".line-clamp-2": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2"
        },
        ".line-clamp-3": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "3"
        },
        ".line-clamp-4": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "4"
        }
      });
    }
  ]
};
