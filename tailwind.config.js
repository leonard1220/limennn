/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        butter: '#FFFBEB',
        blush: '#FFDFE9',
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        counter: '0.05em',
      },
    },
  },
  plugins: [],
};
