import { useCallback, useEffect, useMemo } from 'react'
import { THEME_BLACK, THEME_WHITE } from '.'
import useLocalStorage from '../use-local-storage'
import useMedia from '../use-media'
import { Theme } from './theming'

interface ThemeState {
  selectedIndex: number
  themes: Theme[]
}

const THEME_STORAGE_KEY = 'listman-theme'

const INIT_THEME_STATE: ThemeState = {
  selectedIndex: 0,
  themes: [THEME_WHITE, THEME_BLACK],
}

const getDefaultThemeState = (darkThemePreferred = false) => ({
  ...INIT_THEME_STATE,
  selectedIndex: darkThemePreferred ? 1 : 0,
})

const useThemeStore = (): readonly [Theme, () => void] => {
  const darkThemePreferred = useMedia('(prefers-color-scheme: dark)')
  const defaultTheme = useMemo(() => getDefaultThemeState(darkThemePreferred), [
    darkThemePreferred,
  ])
  const [state, setState] = useLocalStorage(THEME_STORAGE_KEY, defaultTheme)

  const getTheme = useCallback((): Theme => {
    if (state != null) {
      const i = state.selectedIndex
      if (i >= 0 && i < state.themes.length) {
        return state.themes[state.selectedIndex]
      }
      // tslint:disable-next-line: no-console
      console.warn('Theme State had no selected index. Resetting.')
      setState(defaultTheme)
    }
    return defaultTheme.themes[defaultTheme.selectedIndex]
  }, [state, setState, defaultTheme])

  const toggleTheme = useCallback(() => {
    setState({
      ...state,
      selectedIndex: (state.selectedIndex + 1) % state.themes.length,
    })
  }, [state, setState])

  useEffect(() => {
    const theme = getTheme()
    document.documentElement.style.setProperty('--body-bg', theme.bg.body)
    document.documentElement.style.setProperty('--body-color', theme.body)
  }, [state, getTheme])

  return [getTheme(), toggleTheme]
}

export default useThemeStore
