import addons from '@storybook/addons'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { themes } from '@storybook/theming'
import React, { useLayoutEffect, useState } from 'react'
import requireContext from 'require-context.macro'
import '../src/index.css'
import { setTheme } from '../src/theming/Themer'

globalThis.log = (msg: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line: no-console
    console.log(msg, ...optionalParams)
  }
}

addParameters({
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.normal },
  },
})

const DARK_MODE_CHANNEL = 'DARK_MODE'

// Get channel to listen to event emitter
const channel = addons.getChannel()
let isStorybookDark = false
channel.on(DARK_MODE_CHANNEL, () => (isStorybookDark = true))

// Create a component that listens for the DARK_MODE event
const ThemeWrapper = (props: { children: React.ReactNode }) => {
  const [isDark, setDark] = useState(isStorybookDark)

  useLayoutEffect(() => {
    // Listen to DARK_MODE event
    channel.on(DARK_MODE_CHANNEL, setDark)
    return () => channel.removeListener(DARK_MODE_CHANNEL, setDark)
  }, [channel, setDark])

  setTheme(isDark ? 'black' : 'white')

  return (
    <div
      style={{
        padding: '1rem',
        color: 'var(--body)',
        background: 'var(--bg-body)',
      }}
    >
      {props.children}
    </div>
  )
}

addDecorator(storyFn => <ThemeWrapper>{storyFn()}</ThemeWrapper>)

// Automatically import all files ending in *.stories.js(x) or .ts(x)
configure(requireContext('../src', true, /\.stories\.(js|ts)x?$/), module)
