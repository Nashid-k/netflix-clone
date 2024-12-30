import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'modal-slide-in': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(70px) scale(0.95) perspective(500px) rotateX(5deg)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1) perspective(500px) rotateX(0)' 
          }
        },
        'modal-slide-out': {
          '0%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1) perspective(500px) rotateX(0)' 
          },
          '100%': { 
            opacity: '0', 
            transform: 'translateY(70px) scale(0.95) perspective(500px) rotateX(5deg)' 
          }
        },
        'backdrop-fade-in': {
          '0%': { 
            opacity: '0',
            backdropFilter: 'blur(0px)'
          },
          '100%': { 
            opacity: '1',
            backdropFilter: 'blur(8px)'
          }
        },
        'backdrop-fade-out': {
          '0%': { 
            opacity: '1',
            backdropFilter: 'blur(8px)'
          },
          '100%': { 
            opacity: '0',
            backdropFilter: 'blur(0px)'
          }
        },
        'scale-fade-in': {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.9)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          }
        },
        'scale-fade-out': {
          '0%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
          '100%': { 
            opacity: '0', 
            transform: 'scale(0.9)' 
          }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-in-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-down': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        'card-hover': {
          '0%': { 
            transform: 'rotateY(0) scale(1)',
            boxShadow: '0 0 0 rgba(0,0,0,0)'
          },
          '100%': { 
            transform: 'rotateY(10deg) scale(1.05)',
            boxShadow: '10px 10px 20px rgba(0,0,0,0.2)'
          }
        },
        'pulse': {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(0.95)'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      },
      animation: {
        'modal-slide-in': 'modal-slide-in 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'modal-slide-out': 'modal-slide-out 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'backdrop-fade-in': 'backdrop-fade-in 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'backdrop-fade-out': 'backdrop-fade-out 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-fade-in': 'scale-fade-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-fade-out': 'scale-fade-out 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-down': 'fade-in-down 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2.5s infinite linear',
        'card-hover': 'card-hover 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      backgroundImage: {
        'shimmer': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
        'gradient-modal': 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
      backdropBlur: {
        xs: '2px',
        md: '6px',
        lg: '8px',
      },
      transitionDelay: {
        '0': '0ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      scale: {
        '98': '.98',
        '102': '1.02',
        '103': '1.03',
      },
      screens: {
        'xs': '475px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    tailwindScrollbarHide,
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-lg': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-xl': {
          textShadow: '6px 6px 12px rgba(0, 0, 0, 0.7)',
        },
        '.backdrop-blur-xs': {
          backdropFilter: 'blur(2px)',
        },
        '.backdrop-blur-sm': {
          backdropFilter: 'blur(4px)',
        },
        '.backdrop-saturate': {
          backdropFilter: 'saturate(180%) blur(6px)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}