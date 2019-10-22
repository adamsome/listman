import { reducer } from 'ts-action'
import { on } from 'ts-action-immer'
import { RatedArtifact } from '../rated-artifact'
import { loadList, moveCurrentListRow, setCurrentList } from './actions'
import { parseRatedListResponse } from './model/parse-response'
import { reorderArtifactsByRowMove } from './model/reorder-artifacts'
import { RatedList } from './types'

export interface RatedListFeatureState {
  byID: Record<string, RatedList>
  current: {
    list: RatedList | null
    artifacts: RatedArtifact[] | null
  }
}

const initialState: RatedListFeatureState = {
  byID: {},
  current: {
    list: null,
    artifacts: null,
  },
}

export const initialMaxRating = 5

const rootReducer = reducer(
  initialState,
  on(loadList, (state, action) => {
    const { id } = action.payload
    state.byID[id] = parseRatedListResponse(action.payload)
  }),
  on(setCurrentList, (state, action) => {
    const { id } = action.payload
    if (state.byID[id] == null) {
      state.byID[id] = parseRatedListResponse(action.payload)
    }
    state.current.list = state.byID[id]
    state.current.artifacts = action.payload.artifacts
  }),
  on(moveCurrentListRow, (state, { payload }) => {
    if (!state.current.list || !state.current.artifacts) {
      return
    }
    const reorderedArtifacts = reorderArtifactsByRowMove(payload)
    state.current.artifacts = reorderedArtifacts
    state.current.list.artifactIDs = reorderedArtifacts.map(a => a.id)
  })
)

export default rootReducer
