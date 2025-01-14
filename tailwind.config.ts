import type { Config } from 'tailwindcss';

export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#64113F',
        'main-dark': '#3D0A26',
        secondary: '#F5F7DC',
        error: '#EA2B1F',
        'error-dark': '#A51F17',
        disabled: '#231C07',
      },
    },
  },
  plugins: [],
} satisfies Config;
