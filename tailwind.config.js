const BLOG = require('./blog.config');
const { fontFamily } = require('tailwindcss/defaultTheme');
const CJK = require('./lib/cjk');
const fontSansCJK = !CJK()
  ? []
  : [`"Noto Sans CJK ${CJK()}"`, `"Noto Sans ${CJK()}"`];
const fontSerifCJK = !CJK()
  ? []
  : [`"Noto Serif CJK ${CJK()}"`, `"Noto Serif ${CJK()}"`];

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js'],
  // darkMode: BLOG.appearance === 'auto' ? 'media' : 'class', // or 'media' or 'class'
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: '#faf8f7',
        },
        night: {
          DEFAULT: '#292626',
        },
        yellow: {
          DEFAULT: '#f2cb53',
          dark: '#ecc134',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', ...fontFamily.sans, ...fontSansCJK],
        serif: ['"Source Serif"', ...fontFamily.serif, ...fontSerifCJK],
        noEmoji: [
          '"IBM Plex Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
