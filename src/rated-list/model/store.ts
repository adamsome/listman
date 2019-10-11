import { combineReducers, Reducer } from 'redux'
import { AppError, HasID } from '../../types'
import { RatedList, RatedListResponse } from '../types'

// Actions

export enum ActionTypes {
  Fetch = '[Rated List] Fetch',
  FetchSuccess = '[Rated List] Fetch Success',
  FetchError = '[Rated List] Fetch Error',
}

export const Fetch = (payload: HasID) =>
  ({ type: ActionTypes.Fetch, payload } as const)

export const FetchSuccess = (payload: HasID & RatedListResponse) =>
  ({ type: ActionTypes.FetchSuccess, payload } as const)

export const FetchError = (payload: HasID & AppError) =>
  ({ type: ActionTypes.FetchError, payload } as const)

export type Actions =
  | ReturnType<typeof Fetch>
  | ReturnType<typeof FetchSuccess>
  | ReturnType<typeof FetchError>

// State

interface RatedListState {
  ratedList?: RatedList
  loading: boolean
  error?: AppError
}

type RatedListsByID = Record<string, RatedListState>

export interface RatedListFeatureState {
  byID: RatedListsByID
}

const initState: RatedListFeatureState = {
  byID: {},
}

const ratedList: Reducer<RatedList | undefined, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypes.FetchSuccess:
      return {
        ...action.payload,
        artifactIDs: action.payload.artifacts.map(a => a.id),
      }
    case ActionTypes.FetchError:
      return undefined
    default:
      return state
  }
}

const loading: Reducer<boolean, Actions> = (state = false, action) => {
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

const error: Reducer<AppError | undefined, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypes.Fetch:
    case ActionTypes.FetchSuccess:
      return undefined
    case ActionTypes.FetchError:
      return action.payload
    default:
      return state
  }
}

const ratedListState = combineReducers<RatedListState>({
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

const reducer = combineReducers<RatedListFeatureState>({
  byID,
})

export default reducer
