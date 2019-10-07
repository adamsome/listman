import { BASE_ANIMATIONS, BASE_FONTS, Theme } from './theming'

const THEME_BLACK: Theme = {
  name: 'Black',
  mode: 'dark',

  body: 'hsl(0, 0%, 88%)',
  bodyInverse: 'hsl(0, 0%, 13%)',
  subtle: 'hsl(0, 0%, 50%)',
  hint: 'hsl(0, 0%, 26%)',

  primary: 'hsl(206, 73%, 53%)',
  primaryLit: 'hsl(205, 78%, 70%)',
  secondary: 'hsl(177, 100%, 35%)',
  secondaryLit: 'hsl(177, 65%, 57%)',
  warning: 'hsl(7.1, 87.4%, 56.5%)',
  warningLit: 'hsl(7.1, 74%, 70%)',

  bg: {
    body: 'hsl(0, 0%, 0%)',
    bodyDim: 'hsl(0, 0%, 13%)',
    bodyLit: 'hsl(0, 0%, 26%)',
    content: 'hsl(0, 0%, 0%)',
    contentDim: 'hsl(0, 0%, 13%)',
    contentLit: 'hsl(0, 0%, 26%)',
  },

  border: {
    body: 'hsl(0, 0%, 13%)',
    content: 'hsl(0, 0%, 13%)',
  },

  font: BASE_FONTS,
  animation: BASE_ANIMATIONS,
}

export default THEME_BLACK
