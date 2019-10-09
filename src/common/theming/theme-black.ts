import {
  BASE_THEME_ANIMATIONS,
  BASE_THEME_FONTS,
  BASE_THEME_SHADOW,
  BASE_THEME_SPACE,
  Theme,
} from './theming'

const THEME_BLACK: Theme = {
  id: 'black',
  name: 'Black',
  mode: 'dark',

  body: 'hsl(0, 0%, 75%)',
  bodyInverse: 'hsl(0, 0%, 13%)',
  strong: 'hsl(0, 0%, 88%)',
  subtle: 'hsl(0, 0%, 45%)',
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
    focus: 'hsla(206, 43%, 47%, 0.5)',
  },

  shadow: BASE_THEME_SHADOW,
  space: BASE_THEME_SPACE,
  font: BASE_THEME_FONTS,
  animation: BASE_THEME_ANIMATIONS,
}

export default THEME_BLACK
