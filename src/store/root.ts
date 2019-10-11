import { connectRouter, RouterState } from 'connected-react-router'
import { AnyAction, combineReducers, Reducer } from 'redux'
import theming, { ThemingState } from '../theming/store'
import history from './history'

export interface State {
  theming: ThemingState
  router: RouterState
}

const createReducer = (): Reducer<State, AnyAction> =>
  combineReducers<State>({
    theming,
    router: connectRouter(history),
  })

export default createReducer
