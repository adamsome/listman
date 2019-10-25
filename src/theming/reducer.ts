import { reducer } from 'ts-action'
import { on } from 'ts-action-immer'
import { setThemeID } from './actions'

export type ThemingState = string | null

export const initialState: ThemingState = null

const rootReducer = reducer(
  initialState as ThemingState,
  on(setThemeID, (_, action) => {
    return action.payload.id
  })
)

export default rootReducer
