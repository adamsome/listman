import { RatedList, RatedListResponse } from './types'

export const parseRatedListResponse = (res: RatedListResponse): RatedList => {
  const { artifacts, ...rest } = res
  return {
    ...rest,
    artifactIDs: artifacts.map(artifact => artifact.id),
  }
}
