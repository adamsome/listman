import THEME_WHITE from './theme-white'
import { Theme } from './theming'

const LOCAL_STORAGE_NAME = 'listman-theme'

const DEFAULT_THEME = THEME_WHITE

export const setThemeStore = (theme: Theme) => {
  if (!window || !window.localStorage) {
    // tslint:disable-next-line: no-console
    console.error('Cannot update theme, no local storage.')
  }

  window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(theme))
}

export const getThemeStore = (): Theme => {
  if (!window || !window.localStorage) {
    // tslint:disable-next-line: no-console
    console.error('Cannot update theme, no local storage.')
    return DEFAULT_THEME
  }

  const stored = window.localStorage.getItem(LOCAL_STORAGE_NAME)
  if (stored) {
    return JSON.parse(stored) as Theme
  }

  return DEFAULT_THEME
}
