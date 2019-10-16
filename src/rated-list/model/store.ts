import { action as createAction, isType, payload, reducer } from 'ts-action'
import { on } from 'ts-action-immer'
import { HasID } from '../../types'
import { RatedList, RatedListResponse } from '../types'
import { parseRatedListResponse } from './rated-list'

// Actions

export const loadRatedList = createAction(
  '[Rated List] Load',
  payload<HasID & RatedListResponse>()
)

export const setCurrentRatedList = createAction(
  '[Rated List] Set Current',
  payload<HasID & RatedListResponse>()
)

export type Actions =
  | ReturnType<typeof loadRatedList>
  | ReturnType<typeof setCurrentRatedList>

// State

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
