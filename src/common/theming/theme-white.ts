import {
  BASE_THEME_ANIMATIONS,
  BASE_THEME_FONTS,
  BASE_THEME_SPACE,
  Theme,
} from './theming'

const THEME_WHITE: Theme = {
  name: 'White',
  mode: 'light',

  body: 'hsl(0, 0%, 13%)',
  bodyInverse: 'hsl(0, 0%, 88%)',
  strong: 'hsl(0, 0%, 13%)',
  subtle: 'hsl(247, 5%, 67%)',
  hint: 'hsl(0, 0%, 76%)',

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
    content: 'hsl(0, 0%, 100%)',
    contentDim: 'hsl(257, 26%, 95%)',
    contentLit: 'hsl(257, 26%, 75%)',
  },

  border: {
    body: 'hsl(252, 12%, 92%)',
    content: 'hsl(252, 12%, 92%)',
  },

  space: BASE_THEME_SPACE,
  font: BASE_THEME_FONTS,
  animation: BASE_THEME_ANIMATIONS,
}

export default THEME_WHITE
