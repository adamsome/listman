import { useTheme as emotionUseTheme } from 'emotion-theming'

export type ThemeMode = 'light' | 'dark'

export interface ThemeSpace {
  inset: string
  insetBig: string
  insetHuge: string
  insetSmall: string
  insetTiny: string
  stack: string
  stackBig: string
  stackHuge: string
  stackSmall: string
  stackTiny: string
  borderRadius: string
}

export interface ThemeFonts {
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
  id: string | number
  name: string
  mode: ThemeMode

  body: string
  bodyInverse: string
  strong: string
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

  space: ThemeSpace

  font: ThemeFonts

  animation: ThemeAnimations
}

export interface HasTheme {
  theme: Theme
}

export const useTheme = () => emotionUseTheme<Theme>()

export const BASE_THEME_SPACE: ThemeSpace = {
  inset: '1rem',
  insetBig: '1.5rem',
  insetHuge: '2.25rem',
  insetSmall: '0.5rem',
  insetTiny: '0.25rem',
  stack: '0.75rem',
  stackBig: '1.25rem',
  stackHuge: '2rem',
  stackSmall: '0.5rem',
  stackTiny: '0.25rem',
  borderRadius: '6px',
}

export const BASE_FONT_SIZE = 14

const calcRemFontSize = (size: number, baseSize = BASE_FONT_SIZE): string =>
  `${(size / baseSize).toFixed(6)}rem`

export const BASE_THEME_FONTS: ThemeFonts = {
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

export const BASE_THEME_ANIMATIONS: ThemeAnimations = {
  easing: 'cubic-bezier(0.175, 0.885, 0.335, 1.05)',
}
