import type { Config } from "tailwindcss";

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FED11D',
        'secondary': '#DD551B',
        'dark': '#131210',
      },
      fontFamily: {
        rubik: ['var(--font-rubik)'],
        'red-hat': ['var(--font-red-hat-display)'],
      },
    },
  },
  plugins: [],
} satisfies Config;