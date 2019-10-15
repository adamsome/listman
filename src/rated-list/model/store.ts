import { combineReducers, Reducer } from 'redux'
import { HasID } from '../../types'
import { RatedList, RatedListResponse } from '../types'

// Actions

export enum ActionTypes {
  Select = '[Rated List] Select',
  Load = '[Rated List] Load',
}

export const Select = (payload: HasID) =>
  ({ type: ActionTypes.Select, payload } as const)

export const load = (payload: HasID & RatedListResponse) =>
  ({ type: ActionTypes.Load, payload } as const)

export type Actions = ReturnType<typeof load> | ReturnType<typeof Select>

// State

export interface RatedListFeatureState {
  byID: Record<string, RatedList>
  selectedID: string | null
}

const byID: Reducer<Record<string, RatedList>, Actions> = (
  state = {},
  action
) => {
  switch (action.type) {
    case ActionTypes.Load:
      const key = action.payload.id
      const { artifacts, ...ratedList } = action.payload
      return {
        ...state,
        [key]: {
          ...ratedList,
          artifactIDs: artifacts.map(a => a.id),
        },
      }
    default:
      return state
  }
}

const selectedID: Reducer<string | null, Actions> = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.Select:
      return action.payload.id
    default:
      return state
  }
}

const reducer = combineReducers<RatedListFeatureState>({
  byID,
  selectedID,
})

export default reducer
