import { action } from '@storybook/addon-actions'
import React from 'react'
import ActionText from './ActionText'
import { Size, SIZES } from './theming'

export default {
  component: ActionText,
  title: 'ActionText',
  excludeStories: ['actions', 'createNumbers'],
}

export const actions = {
  onClick: action('onClick'),
}

const createProps = (size: Size = 'body', lit = false) => ({
  ...actions,
  lit,
  size,
})

export const createNumbers = (size: Size) => {
  const unlitProps = createProps(size)
  const litProps = createProps(size, true)
  return (
    <>
      <ActionText {...litProps}>1</ActionText>
      <ActionText {...litProps}>8</ActionText>
      <ActionText {...litProps}>24</ActionText>
      <ActionText {...unlitProps}>70</ActionText>
      <ActionText size={size}>194</ActionText>
      <ActionText {...litProps}>534</ActionText>
      <ActionText {...litProps}>1462</ActionText>
    </>
  )
}

export const numbers = () => (
  <div>
    {SIZES.map((s, i) => (
      <div key={i} style={{ marginBottom: '1rem' }}>
        {createNumbers(s)}
      </div>
    ))}
  </div>
)
