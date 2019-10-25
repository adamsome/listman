import { Theme } from '../theming'

const blackTheme: Partial<Theme> = {
  'id': 'black',
  'name': 'Black',
  'mode': 'dark',

  'body': 'hsl(0, 0%, 75%)',
  'body-inverse': 'hsl(0, 0%, 13%)',
  'strong': 'hsl(0, 0%, 88%)',
  'subtle': 'hsl(0, 0%, 45%)',
  'hint': 'hsl(0, 0%, 26%)',

  'primary': 'hsl(206, 73%, 53%)',
  'primary-lit': 'hsl(205, 78%, 70%)',
  'secondary': 'hsl(177, 100%, 35%)',
  'secondary-lit': 'hsl(177, 65%, 57%)',
  'warning': 'hsl(7.1, 87.4%, 56.5%)',
  'warning-lit': 'hsl(7.1, 74%, 70%)',

  'bg-body': 'hsl(0, 0%, 0%)',
  'bg-body-dim': 'hsl(0, 0%, 13%)',
  'bg-body-lit': 'hsl(0, 0%, 26%)',
  'bg-content': 'hsl(0, 0%, 0%)',
  'bg-content-dim': 'hsl(0, 0%, 13%)',
  'bg-content-lit': 'hsl(0, 0%, 26%)',

  'border-body': 'hsl(0, 0%, 13%)',
  'border-content': 'hsl(0, 0%, 13%)',
  'border-focus': 'hsla(206, 43%, 47%, 0.5)',
}

export default blackTheme
