import { action as createAction, payload, reducer } from 'ts-action'
import { on } from 'ts-action-immer'
import { HasID } from '../../types'
import { RatedList, RatedListResponse } from '../types'
import { parseRatedListResponse } from './rated-list'

// Actions

export const selectRatedList = createAction(
  '[Rated List] Select',
  payload<Partial<HasID>>()
)

export const loadRatedList = createAction(
  '[Rated List] Load',
  payload<HasID & RatedListResponse>()
)

export type Actions =
  | ReturnType<typeof loadRatedList>
  | ReturnType<typeof selectRatedList>

// State

export interface RatedListFeatureState {
  byID: Record<string, RatedList>
  selectedID: string | null
}

const initialState: RatedListFeatureState = {
  byID: {},
  selectedID: null,
}

const rootReducer = reducer(
  initialState,
  on(selectRatedList, (state, action) => {
    state.selectedID = action.payload.id || null
  }),
  on(loadRatedList, (state, action) => {
    const { id } = action.payload
    state.byID[id] = parseRatedListResponse(action.payload)
  })
)

export default rootReducer
