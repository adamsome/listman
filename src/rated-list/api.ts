import { SAMPLE_CARDS } from '../common/Card/Card.stories'
import { HasID } from '../types'
import { convertSampleCardsToArtifacts } from './RatedList.stories'
import { RatedListResponse } from './types'

export const getRatedList = async (
  _aborter: AbortController,
  id: string | HasID
): Promise<RatedListResponse> => {
  const _id = typeof id === 'string' ? id : id.id
  await new Promise(resolve => setTimeout(resolve, 1000))
  return createMockList(_id)
}

const createMockList = (id: string): RatedListResponse => ({
  id,
  type: 'album',
  maxRating: 5,
  period: '2019',
  periodUnit: 'year',
  artifacts: convertSampleCardsToArtifacts(SAMPLE_CARDS),
})
