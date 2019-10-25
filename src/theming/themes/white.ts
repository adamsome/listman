import { Theme } from '../theming'

const whiteTheme: Partial<Theme> = {
  'id': 'white',
  'name': 'White',
  'mode': 'light',

  'body': 'hsl(0, 0%, 13%)',
  'body-inverse': 'hsl(0, 0%, 88%)',
  'strong': 'hsl(0, 0%, 13%)',
  'subtle': 'hsl(247, 5%, 67%)',
  'hint': 'hsl(0, 0%, 76%)',

  'primary': 'hsl(206, 73%, 47%)',
  'primary-lit': 'hsl(206, 73%, 36%)',
  'secondary': 'hsl(177, 100%, 35%)',
  'secondary-lit': 'hsl(177, 100%, 24%)',
  'warning': 'hsl(7.1, 87.4%, 56.5%)',
  'warning-lit': 'hsl(7.1, 87.4%, 45.5%)',

  'bg-body': 'hsl(0, 0%, 100%)',
  'bg-body-dim': 'hsl(257, 26%, 95%)',
  'bg-body-lit': 'hsl(257, 26%, 75%)',
  'bg-content': 'hsl(0, 0%, 100%)',
  'bg-content-dim': 'hsl(257, 26%, 95%)',
  'bg-content-lit': 'hsl(257, 26%, 75%)',

  'border-body': 'hsl(252, 12%, 92%)',
  'border-content': 'hsl(252, 12%, 92%)',
  'border-focus': 'hsla(206, 71%, 83%, 0.5)',
}

export default whiteTheme
