import { isType, reducer } from 'ts-action'
import { on } from 'ts-action-immer'
import { loadRatedList, setCurrentRatedList } from './actions'
import { parseRatedListResponse } from './converters'
import { RatedList } from './types'

export interface RatedListFeatureState {
  byID: Record<string, RatedList>
  current: RatedList | null
}

const initialState: RatedListFeatureState = {
  byID: {},
  current: null,
}

export const initialMaxRating = 5

const rootReducer = reducer(
  initialState,
  on(loadRatedList, setCurrentRatedList, (state, action) => {
    const { id } = action.payload
    if (isType(action, loadRatedList) || state.byID[id] == null) {
      state.byID[id] = parseRatedListResponse(action.payload)
    }
    state.current = state.byID[id]
  })
)

export default rootReducer
