import { createSelector } from 'reselect'
import { RatedArtifact } from '../../rated-artifact'
import { selectRatedArtifactsByID } from '../../rated-artifact/model/selectors'
import { AppState } from '../../store/root'
import convertArtifactsToRatedListRows from './rated-list-rows'
import { initialMaxRating } from './store'

export const selectRatedListsByID = (state: AppState) => state.ratedList.byID
export const selectRatedList = (state: AppState) => state.ratedList.current

export const selectRatedListMaxRating = createSelector(
  selectRatedList,
  (list): number => (list ? list.maxRating : initialMaxRating)
)

export const selectRatedListArtifacts = createSelector(
  selectRatedList,
  selectRatedArtifactsByID,
  (list, artifactsByID): RatedArtifact[] | null => {
    if (list == null) {
      return null
    }
    const ids = list ? list.artifactIDs : []
    const artifacts = ids.map(id => artifactsByID[id])
    return artifacts.filter(artifact => artifact != null)
  }
)

export const selectRatedListRows = createSelector(
  selectRatedListArtifacts,
  selectRatedListMaxRating,
  convertArtifactsToRatedListRows
)
