export type Size = 'tiny' | 'small' | 'normal' | 'big' | 'huge'

export type HasSize = {
  size: Size
}

export const DEFAULT_SIZE_PROP: HasSize = { size: 'normal' }
export const SIZES: Size[] = ['tiny', 'small', 'normal', 'big', 'huge']

export const getIconWidth = (size: Size) => {
  switch (size) {
    case 'tiny':
      return '0.75rem'
    case 'small':
      return '1.0rem'
    case 'normal':
      return '1.5rem'
    case 'big':
      return '2rem'
    case 'huge':
      return '3rem'
  }
}
