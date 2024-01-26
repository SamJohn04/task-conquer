import type { Config } from 'tailwindcss'

/* 
    --foreground-color: #000000;
    --primary-color: #5680E9;
    --secondary-color: #59EBCB;
    --background-color: #C1C8E4;
    --gradient-start-color: #8860D0;
    --gradient-end-color: #84CEEB;
*/

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: "#5680E9",
        secondary: "#8860D0",
        background: "#C1C8E4",
        foreground: "#000000",
        gradientStart: "#59EBCB",
        gradientEnd: "#84CEEB",
      },
    },
  },
  plugins: [],
}
export default config
