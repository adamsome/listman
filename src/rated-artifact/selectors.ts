import { AppState } from '../store/root'

export const selectRatedArtifactsByID = (state: AppState) =>
  state.ratedArtifact.byID
