import { AnyAction, combineReducers, Reducer } from 'redux'
import { RatedArtifact } from '../types'

type RatedArtifactsByID = Record<string, RatedArtifact>

export interface RatedArtifactFeatureState {
  byID: RatedArtifactsByID
}

const initState: RatedArtifactFeatureState = {
  byID: {},
}

const entities: Reducer<RatedArtifactsByID, AnyAction> = (
  state = initState.byID,
  _action
) => {
  return state
}

const reducer = combineReducers<RatedArtifactFeatureState>({
  byID: entities,
})

export default reducer
