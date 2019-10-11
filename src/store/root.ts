import { connectRouter, RouterState } from 'connected-react-router'
import { AnyAction, combineReducers, Reducer } from 'redux'
import ratedArtifact, {
  RatedArtifactFeatureState,
} from '../rated-artifact/model'
import ratedList, { RatedListFeatureState } from '../rated-list/model'
import theming, { ThemingState } from '../theming/store'
import history from './history'

export interface State {
  ratedArtifact: RatedArtifactFeatureState
  ratedList: RatedListFeatureState
  router: RouterState
  theming: ThemingState
}

const createReducer = (): Reducer<State, AnyAction> =>
  combineReducers<State>({
    ratedArtifact,
    ratedList,
    router: connectRouter(history),
    theming,
  })

export default createReducer
