import { createSelector } from 'reselect'
import { AppState } from '../../store/root'

const selectByID = (state: AppState) => state.ratedList.byID
const selectSelectedID = (state: AppState) => state.ratedList.selectedID

export const selectSelectedRatedList = createSelector(
  selectByID,
  selectSelectedID,
  (byID, selectedID) => (selectedID && byID[selectedID]) || null
)
