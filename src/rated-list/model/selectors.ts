import { createSelector } from 'reselect'
import { AppState } from '../../store/root'
import { initEntityState } from './store'

const selectRatedListByID = (state: AppState) => state.ratedList.byID
const selectSelectedRatedListID = (state: AppState) =>
  state.ratedList.selectedID

export const selectSelectedRatedListState = createSelector(
  selectRatedListByID,
  selectSelectedRatedListID,
  (byID, selectedID) => (selectedID && byID[selectedID]) || initEntityState
)
