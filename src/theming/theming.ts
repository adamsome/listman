import blackTheme from './themes/black'
import whiteTheme from './themes/white'

export type ThemeMode = 'light' | 'dark'

export interface Theme {
  'id': string | number
  'name': string
  'mode': ThemeMode

  'body': string
  'body-inverse': string
  'strong': string
  'subtle': string
  'hint': string

  'primary': string
  'primary-lit': string
  'secondary': string
  'secondary-lit': string
  'warning': string
  'warning-lit': string

  'bg-body': string
  'bg-body-lit': string
  'bg-body-dim': string
  'bg-content': string
  'bg-content-lit': string
  'bg-content-dim': string

  'border-body': string
  'border-content': string
  'border-focus': string

  'shadow': string

  'space-inset': string
  'space-inset-big': string
  'space-inset-huge': string
  'space-inset-small': string
  'space-inset-tiny': string
  'space-stack': string
  'space-stack-big': string
  'space-stack-huge': string
  'space-stack-small': string
  'space-stack-tiny': string
  'space-border-radius': string

  'font-family': string
  'font-weight': number
  'font-weight-bold': number
  'font-weight-black': number
  'font-size-tiny': string
  'font-size-small': string
  'font-size-body': string
  'font-size-big': string
  'font-size-huge': string

  'animation-easing': string
}

const BASE_FONT_SIZE = 14

const DEFAULTS: Partial<Theme> = {
  'shadow': '0 1px 2px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.2)',

  'space-inset': '1rem',
  'space-inset-big': '1.5rem',
  'space-inset-huge': '2.25rem',
  'space-inset-small': '0.5rem',
  'space-inset-tiny': '0.25rem',
  'space-stack': '0.75rem',
  'space-stack-big': '1.25rem',
  'space-stack-huge': '2rem',
  'space-stack-small': '0.5rem',
  'space-stack-tiny': '0.25rem',
  'space-border-radius': '6px',

  'animation-easing': 'cubic-bezier(0.175, 0.885, 0.335, 1.05)',
}

const calcRemFontSize = (size: number, baseSize = BASE_FONT_SIZE): string =>
  `${(size / baseSize).toFixed(6)}rem`

const DEFAULT_FONTS: Partial<Theme> = {
  'font-family':
    `-apple-system, '.SFNSText-Regular', ` +
    `'San Francisco', BlinkMacSystemFont, ` +
    `'Segoe UI', 'Helvetica Neue', Helvetica, Arial, ` +
    `'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', ` +
    `sans-serif`,
  'font-weight': 400,
  'font-weight-bold': 700,
  'font-weight-black': 900,
  'font-size-tiny': calcRemFontSize(11),
  'font-size-small': calcRemFontSize(12),
  'font-size-body': calcRemFontSize(14),
  'font-size-big': calcRemFontSize(16),
  'font-size-huge': calcRemFontSize(24),
}

const getThemeByID = (themeID: string = 'white'): Partial<Theme> => {
  switch (themeID) {
    case 'black':
      return blackTheme
    case 'white':
    default:
      return whiteTheme
  }
}

const applyThemeDefaults = (theme: Partial<Theme>): Theme => {
  return {
    ...DEFAULTS,
    ...DEFAULT_FONTS,
    ...theme,
  } as Theme
}

export const getTheme = (themeID?: string | null): Theme =>
  applyThemeDefaults(getThemeByID(themeID || undefined))

export type Size = 'tiny' | 'small' | 'body' | 'big' | 'huge'

export type HasSize = {
  size: Size
}

export const SIZES: Size[] = ['tiny', 'small', 'body', 'big', 'huge']
export const DEFAULT_SIZE_PROP: HasSize = { size: 'body' }

export const getTextBorderRadius = (size: Size): string => {
  switch (size) {
    case 'tiny':
      return '3px'
    case 'small':
      return '4px'
    case 'big':
      return '6px'
    case 'huge':
      return '6px'
    default:
      return '5px'
  }
}

export const calcTextInsetPadding = (size: Size): string =>
  `calc(var(--font-size-${size}) / 5 + 0.21rem)`

export const calcTextHeight = (size: Size): string =>
  `calc(var(--font-size-${size}) + 0.5rem)`
