import { useEffect, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '.'
import useLocalStorage from '../common/hooks/use-local-storage'
import useMedia from '../common/hooks/use-media'
import { setThemeID } from './actions'
import { selectTheming } from './selectors'

const THEME_STORAGE_KEY = 'listman-theme'

const defaultProps = {}

export const setTheme = (themeID: string | null) => {
  const { id, name, mode, ...theme } = getTheme(themeID)
  for (const key in theme) {
    if (theme.hasOwnProperty(key)) {
      const value = (theme as any)[key]
      document.documentElement.style.setProperty(`--${key}`, value)
    }
  }
}

const Theme = () => {
  const didInitialDispatch = useRef(false)
  const didInitialSelect = useRef(false)

  const preferDark = useMedia('(prefers-color-scheme: dark)')
  const [persistedThemeID, setPersistedThemeID] = useLocalStorage<string>(
    THEME_STORAGE_KEY
  )

  const themeID = useSelector(selectTheming)
  const dispatch = useDispatch()

  // On init only, set the theme to the persisted local store value or,
  // if not set, use the 'prefers-color-scheme' media query
  useEffect(() => {
    if (!didInitialDispatch.current) {
      dispatch(
        setThemeID({ id: persistedThemeID || (preferDark ? 'black' : 'white') })
      )
      didInitialDispatch.current = true
    }
  }, [dispatch, persistedThemeID, preferDark, themeID])

  // Only after the initial theme is set, persist the theme
  // when it changes in state
  useEffect(() => {
    if (didInitialSelect.current) {
      setPersistedThemeID(themeID)
    } else if (themeID) {
      didInitialSelect.current = true
    }
  }, [themeID, setPersistedThemeID])

  // When the theme changes in state, load the theme and set the CSS variables
  useLayoutEffect(() => setTheme(themeID), [themeID])

  return null
}

Theme.defaultProps = defaultProps

export default Theme
