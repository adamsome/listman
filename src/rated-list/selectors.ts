import { createSelector } from 'reselect'
import { RatedArtifact } from '../rated-artifact'
import { AppState } from '../store/root'
import { createRows } from './model/create-rows'
import { initialMaxRating } from './reducer'

export const selectRatedListsByID = (state: AppState) => state.ratedList.byID
export const selectRatedListCurrent = (state: AppState) =>
  state.ratedList.current

export const selectCurrentRatedListMaxRating = createSelector(
  selectRatedListCurrent,
  (current): number =>
    current.list ? current.list.maxRating : initialMaxRating
)

export const selectCurrentRatedListArtifacts = createSelector(
  selectRatedListCurrent,
  (current): RatedArtifact[] | null => (current ? current.artifacts : null)
)

export const selectRatedListRows = createSelector(
  selectCurrentRatedListArtifacts,
  selectCurrentRatedListMaxRating,
  createRows
)
