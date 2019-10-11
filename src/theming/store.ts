import { Action, AnyAction, Reducer } from 'redux'

export const LOAD = 'App/LOAD'

export interface ThemingState {
  error: boolean
}

// The initial state of the App
export const initState = {
  error: false,
}

const reducer: Reducer<ThemingState, AnyAction> = (
  state = initState,
  action: Action
) => {
  switch (action.type) {
    case LOAD: {
      const next = {
        ...state,
        error: false,
      }

      return next
    }
    default:
      return state
  }
}

export default reducer
