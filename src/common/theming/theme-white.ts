import { BASE_ANIMATIONS, BASE_FONTS, Theme } from './theming'

const THEME_WHITE: Theme = {
  name: 'White',
  mode: 'light',

  body: 'hsl(0, 0%, 13%)',
  bodyInverse: 'hsl(0, 0%, 88%)',
  subtle: 'hsl(0, 0%, 39%)',
  hint: 'hsl(0, 0%, 66%)',

  primary: 'hsl(206, 73%, 47%)',
  primaryLit: 'hsl(206, 73%, 36%)',
  secondary: 'hsl(177, 100%, 35%)',
  secondaryLit: 'hsl(177, 100%, 24%)',
  warning: 'hsl(7.1, 87.4%, 56.5%)',
  warningLit: 'hsl(7.1, 87.4%, 45.5%)',

  bg: {
    body: 'hsl(0, 0%, 100%)',
    bodyDim: 'hsl(257, 26%, 95%)',
    bodyLit: 'hsl(257, 26%, 75%)',
    content: 'hsl(257, 26%, 85%)',
    contentDim: 'hsl(257, 26%, 70%)',
    contentLit: 'hsl(257, 26%, 60%)',
  },

  border: {
    body: 'hsl(0, 0%, 96%)',
    content: 'hsl(0, 0%, 76%)',
  },

  font: BASE_FONTS,
  animation: BASE_ANIMATIONS,
}

export default THEME_WHITE
