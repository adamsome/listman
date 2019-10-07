import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import THEME_BLACK from './theme-black'
import THEME_WHITE from './theme-white'
import { Theme } from './theming'

interface ThemeState {
  selectedIndex: number
  themes: Theme[]
}

const LOCAL_STORAGE_NAME = 'listman-theme'

const INIT_THEME_STATE: ThemeState = {
  selectedIndex: 0,
  themes: [THEME_WHITE, THEME_BLACK],
}

const loadThemeState = (): ThemeState => {
  if (!window || !window.localStorage) {
    // tslint:disable-next-line: no-console
    console.error('Cannot update theme, no local storage.')
    return INIT_THEME_STATE
  }

  const stored = window.localStorage.getItem(LOCAL_STORAGE_NAME)
  if (stored) {
    return JSON.parse(stored) as ThemeState
  }

  return INIT_THEME_STATE
}

let _state$: BehaviorSubject<ThemeState>

export const initThemeStore = () => {
  _state$ = new BehaviorSubject<ThemeState>(loadThemeState())
}

export const getThemeState = () => {
  if (!_state$) {
    initThemeStore()
  }

  return _state$.asObservable().pipe(
    map(state => {
      const i = state.selectedIndex
      if (i >= 0 && i < state.themes.length) {
        return state.themes[state.selectedIndex]
      }

      // tslint:disable-next-line: no-console
      console.warn('Theme State had no selected index. Resetting.')
      setLocalStoreState(INIT_THEME_STATE)
      return INIT_THEME_STATE.themes[INIT_THEME_STATE.selectedIndex]
    })
  )
}

const setLocalStoreState = (state: ThemeState) => {
  if (window && window.localStorage) {
    window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(state))
  } else {
    // tslint:disable-next-line: no-console
    console.warn('Cannot update theme, no local storage.')
  }
}

export const toggleTheme = () => {
  const prev = _state$.value
  const next: ThemeState = {
    ...prev,
    selectedIndex: (prev.selectedIndex + 1) % prev.themes.length,
  }
  setLocalStoreState(next)
  _state$.next(next)
}
