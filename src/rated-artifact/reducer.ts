import { isType, reducer } from 'ts-action'
import { on } from 'ts-action-immer'
import { loadList, setCurrentList } from '../rated-list/actions'
import { RatedArtifact } from './types'

export interface RatedArtifactFeatureState {
  byID: Record<string, RatedArtifact>
}

const initialState: RatedArtifactFeatureState = {
  byID: {},
}

const rootReducer = reducer(
  initialState,
  on(loadList, setCurrentList, (state, action) => {
    action.payload.artifacts.forEach(artifact => {
      const { id } = artifact
      if (isType(action, loadList) || state.byID[id] == null) {
        state.byID[id] = artifact
      }
    })
  })
)

export default rootReducer
