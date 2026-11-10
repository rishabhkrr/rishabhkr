import type { Config } from 'tailwindcss';

/** Colours are CSS variables (see globals.css) so light/dark share one class set. */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  // `dark:` = explicit toggle, or system dark when the visitor hasn't chosen light
  darkMode: [
    'variant',
    ['&:is([data-theme="dark"] *)', '@media (prefers-color-scheme: dark) { &:not([data-theme="light"] *) }'],
  ],
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        surface: v('surface'),
        'surface-2': v('surface-2'),
        fg: v('fg'),
        muted: v('muted'),
        line: v('line'),
        accent: v('accent'),
        'accent-ink': v('accent-ink'),
        'accent-soft': v('accent-soft'),
        ok: v('ok'),
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '70ch',
        site: '72rem',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        ping: { '75%, 100%': { transform: 'scale(2.2)', opacity: '0' } },      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        ping: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
