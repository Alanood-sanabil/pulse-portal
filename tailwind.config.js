/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#FFFFFF',
          surface: '#FFFFFF',
          card: '#FAFAFA',
          elevated: '#F5F4F0',
        },
        border: {
          DEFAULT: '#E4E2DC',
          subtle: '#EEECE6',
        },
        text: {
          DEFAULT: '#1A1A1A',
          muted: '#6B6B6B',
          dim: '#A8A8A8',
        },
        amber: {
          DEFAULT: '#2563EB',
          light: '#EFF6FF',
          dim: '#1E3A8A',
          subtle: 'rgba(37,99,235,0.10)',
        },
        pulse: {
          green: '#2563EB',
          'green-subtle': 'rgba(37,99,235,0.10)',
          red: '#DC2626',
          'red-subtle': 'rgba(220,38,38,0.10)',
          blue: '#2563EB',
          'blue-subtle': 'rgba(37,99,235,0.10)',
          purple: '#7C3AED',
          'purple-subtle': 'rgba(124,58,237,0.10)',
          orange: '#EA580C',
          'orange-subtle': 'rgba(234,88,12,0.10)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        panel: '0 8px 30px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        modal: '0 20px 60px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.06)',
      },
      animation: {
        'slide-in-right': 'slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.2s ease-out',
        'toast-in': 'toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        toastIn: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
