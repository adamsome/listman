export type ThemeMode = 'light' | 'dark'

interface ThemeFonts {
  family: string
  weight: number
  weightBold: number
  weightBlack: number
  size: {
    tiny: string
    small: string
    body: string
    big: string
    huge: string
  }
}

export interface ThemeAnimations {
  easing: string
}

export interface Theme {
  name: string
  mode: ThemeMode

  body: string
  bodyInverse: string
  subtle: string
  hint: string

  primary: string
  primaryLit: string
  secondary: string
  secondaryLit: string
  warning: string
  warningLit: string

  bg: {
    body: string
    bodyLit: string
    bodyDim: string
    content: string
    contentLit: string
    contentDim: string
  }

  border: {
    body: string
    content: string
  }

  font: ThemeFonts

  animation: ThemeAnimations
}

const calcRemFontSize = (size: number, baseSize = 14): string =>
  `${(size / baseSize).toFixed(6)}rem`

export const BASE_FONTS: ThemeFonts = {
  family:
    `-apple-system, '.SFNSText-Regular', ` +
    `'San Francisco', BlinkMacSystemFont, ` +
    `'Segoe UI', 'Helvetica Neue', Helvetica, Arial, ` +
    `'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', ` +
    `sans-serif`,
  weight: 400,
  weightBold: 700,
  weightBlack: 900,
  size: {
    tiny: calcRemFontSize(11),
    small: calcRemFontSize(12),
    body: calcRemFontSize(14),
    big: calcRemFontSize(16),
    huge: calcRemFontSize(18),
  },
}

export const BASE_ANIMATIONS: ThemeAnimations = {
  easing: 'cubic-bezier(0.175, 0.885, 0.335, 1.05)',
}
