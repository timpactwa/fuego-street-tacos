import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fuego: '#E63946',
        golden: '#F4A261',
        verde: '#06D6A0',
        charcoal: '#1B1B2E',
        cream: '#FFFBF2',
        muted: '#6B6570',
      },
      fontFamily: {
        display: ['var(--font-pacifico)', 'cursive'],
        body: ['var(--font-nunito)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
