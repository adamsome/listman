import { connectRouter, RouterState } from 'connected-react-router'
import { AnyAction, combineReducers, Reducer } from 'redux'
import ratedArtifact, {
  RatedArtifactFeatureState,
} from '../rated-artifact/reducer'
import ratedList, { RatedListFeatureState } from '../rated-list/reducer'
import theming, { ThemingState } from '../theming/reducer'
import history from './history'

export interface AppState {
  ratedArtifact: RatedArtifactFeatureState
  ratedList: RatedListFeatureState
  router: RouterState
  theming: ThemingState
}

const createReducer = (): Reducer<AppState, AnyAction> =>
  combineReducers<AppState>({
    ratedArtifact,
    ratedList,
    router: connectRouter(history),
    theming,
  })

export default createReducer
