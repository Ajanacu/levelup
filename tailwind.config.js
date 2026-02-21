/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050816',
        panel: '#0D1117',
        border: '#1C2333',
        neon: '#00FF94',
        'neon-dim': '#00CC76',
        plasma: '#7C3AED',
        'plasma-light': '#A855F7',
        amber: '#F59E0B',
        danger: '#EF4444',
        muted: '#8B9CC8',
        card: '#111827',
      },
      fontFamily: {
        display: ['"Courier New"', 'Courier', 'monospace'],
        body: ['Georgia', 'serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'slide-up': 'slideUp 0.5s ease forwards',
        'glow-expand': 'glowExpand 0.4s ease forwards',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { textShadow: '0 0 8px #00FF94, 0 0 20px #00FF94' },
          '50%': { textShadow: '0 0 2px #00FF94' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowExpand: {
          '0%': { boxShadow: '0 0 0px #00FF94' },
          '100%': { boxShadow: '0 0 20px #00FF94, 0 0 40px #00FF9444' },
        },
      },
      boxShadow: {
        neon: '0 0 20px #00FF9444, 0 0 40px #00FF9422',
        plasma: '0 0 20px #7C3AED44, 0 0 40px #7C3AED22',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
