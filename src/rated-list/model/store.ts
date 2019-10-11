import { combineReducers, Reducer } from 'redux'
import { AppError, HasID } from '../../types'
import { RatedList, RatedListResponse } from '../types'

// Actions

export enum ActionTypes {
  Select = '[Rated List] Select',
  Fetch = '[Rated List] Fetch',
  FetchSuccess = '[Rated List] Fetch Success',
  FetchError = '[Rated List] Fetch Error',
}

export const Select = (payload: HasID) =>
  ({ type: ActionTypes.Select, payload } as const)

export const Fetch = (payload: HasID) =>
  ({ type: ActionTypes.Fetch, payload } as const)

export const FetchSuccess = (payload: HasID & RatedListResponse) =>
  ({ type: ActionTypes.FetchSuccess, payload } as const)

export const FetchError = (payload: HasID & AppError) =>
  ({ type: ActionTypes.FetchError, payload } as const)

export type Actions =
  | ReturnType<typeof Select>
  | ReturnType<typeof Fetch>
  | ReturnType<typeof FetchSuccess>
  | ReturnType<typeof FetchError>

// State

interface EntityState {
  ratedList: RatedList | null
  loading: boolean
  error: AppError | null
}

export const initEntityState: EntityState = {
  ratedList: null,
  loading: false,
  error: null,
}

type RatedListsByID = Record<string, EntityState>

export interface RatedListFeatureState {
  byID: RatedListsByID
  selectedID: string | null
}

export const initState: RatedListFeatureState = {
  byID: {},
  selectedID: null,
}

const ratedList: Reducer<RatedList | null, Actions> = (
  state = initEntityState.ratedList,
  action
) => {
  switch (action.type) {
    case ActionTypes.FetchSuccess:
      return {
        ...action.payload,
        artifactIDs: action.payload.artifacts.map(a => a.id),
      }
    case ActionTypes.FetchError:
      return null
    default:
      return state
  }
}

const loading: Reducer<boolean, Actions> = (
  state = initEntityState.loading,
  action
) => {
  switch (action.type) {
    case ActionTypes.Fetch:
      return true
    case ActionTypes.FetchSuccess:
    case ActionTypes.FetchError:
      return false
    default:
      return state
  }
}

const error: Reducer<AppError | null, Actions> = (
  state = initEntityState.error,
  action
) => {
  switch (action.type) {
    case ActionTypes.Fetch:
    case ActionTypes.FetchSuccess:
      return null
    case ActionTypes.FetchError:
      return action.payload
    default:
      return state
  }
}

const ratedListState = combineReducers<EntityState>({
  ratedList,
  loading,
  error,
})

const byID: Reducer<RatedListsByID, Actions> = (
  state = initState.byID,
  action
) => {
  switch (action.type) {
    case ActionTypes.Fetch:
    case ActionTypes.FetchSuccess:
    case ActionTypes.FetchError:
      const key = action.payload.id
      return {
        ...state,
        [key]: ratedListState(state[key], action),
      }
    default:
      return state
  }
}

const selectedID: Reducer<string | null, Actions> = (
  state = initState.selectedID,
  action
) => {
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
