import { HasID } from '../types'
import { createSampleArtifactRows } from './RatedList.stories'
import { RatedListResponse } from './types'

export const getRatedList = (
  id: string | HasID
): Promise<RatedListResponse> => {
  const _id = typeof id === 'string' ? id : id.id
  return Promise.resolve(createMockList(_id))
}

const createMockList = (id: string): RatedListResponse => ({
  id,
  type: 'album',
  maxRating: 5,
  period: '2019',
  periodUnit: 'year',
  artifacts: createSampleArtifactRows().map(row => row.ratedArtifact),
})
