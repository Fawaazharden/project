/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["C:/Users/nandha/Documents/resimpli-landing/index.html"],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        'ink-soft': '#404040',
        'ink-muted': '#737373',
        paper: '#ffffff',
        'paper-soft': '#fafaf9',
        'paper-warm': '#f5f5f4',
        border: '#e7e5e4',
        'border-strong': '#d6d3d1',
        navy: '#0a2540',
        'navy-hover': '#0c2c52',
        money: '#047857',
        'money-soft': '#ecfdf5',
        danger: '#b91c1c',
        'danger-soft': '#fef2f2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: {
        'content': '72rem',
      },
    },
  },
  plugins: [],
};
