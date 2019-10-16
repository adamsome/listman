import { isType, reducer } from 'ts-action'
import { on } from 'ts-action-immer'
import { loadRatedList, setCurrentRatedList } from '../../rated-list/model'
import { RatedArtifact } from '../types'

export interface RatedArtifactFeatureState {
  byID: Record<string, RatedArtifact>
}

const initialState: RatedArtifactFeatureState = {
  byID: {},
}

const rootReducer = reducer(
  initialState,
  on(loadRatedList, setCurrentRatedList, (state, action) => {
    action.payload.artifacts.forEach(artifact => {
      const { id } = artifact
      if (isType(action, loadRatedList) || state.byID[id] == null) {
        state.byID[id] = artifact
      }
    })
  })
)

export default rootReducer
