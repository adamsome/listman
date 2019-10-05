import { configure } from '@storybook/react'
import requireContext from 'require-context.macro'

// automatically import all files ending in *.stories.js(x) or .ts(x)
configure(requireContext('../src', true, /\.stories\.(js|ts)x?$/), module)
