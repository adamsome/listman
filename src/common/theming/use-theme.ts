import { useTheme as emotionUseTheme } from 'emotion-theming'
import { Theme } from './theming'

const useTheme = () => emotionUseTheme<Theme>()

export default useTheme
