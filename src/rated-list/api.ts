import { SAMPLE_CARDS } from '../common/Card/Card.stories'
import { HasID } from '../types'
import { convertSampleCardsToArtifacts } from './RatedListRows.stories'
import { RatedListResponse } from './types'

export const getRatedList = async (
  _aborter: AbortController,
  id: string | HasID
): Promise<RatedListResponse> => {
  const op = 'Get Rated List'
  const _id = typeof id === 'string' ? id : id.id
  trace('api', op, id)
  await new Promise(resolve => setTimeout(resolve, 1000))
  const data = createMockList(_id)
  trace('api', op, id, 'res', data)
  return data
}

const createMockList = (id: string): RatedListResponse => ({
  id,
  type: 'album',
  maxRating: 5,
  period: '2019',
  periodUnit: 'year',
  artifacts: convertSampleCardsToArtifacts(SAMPLE_CARDS),
})
