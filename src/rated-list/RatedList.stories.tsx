import { range } from 'ramda'
import React from 'react'
import { SAMPLE_ROWS } from '../common/Row/Row.stories'
import sampleArtImage from '../common/Row/sample-art.png'
import RatedList from './RatedList'
import { RatedListArtifact, RatedListItem, RatedListRating } from './types'

export default {
  component: RatedList,
  title: 'RatedList',
  excludeStories: ['SHORT_LIST'],
}

const getSampleRating = (i: number) => {
  if (i === 0) {
    return 4
  }
  if (i <= 2) {
    return 2
  }
  if (i <= 5) {
    return 1
  }
}

const byRatingDesc = (a: RatedListItem, b: RatedListItem): number => {
  if (b.rating == null) {
    return -1
  }
  if (a.rating == null) {
    return 1
  }
  return b.rating.toString().localeCompare(a.rating.toString())
}

const createRating = (rating: number): RatedListRating => ({
  type: 'rating',
  rating,
})

const setFirstAndLastInRatingList = (artifacts: RatedListArtifact[] = []) => {
  if (artifacts.length > 0) {
    artifacts[0].firstInRating = true
    artifacts[artifacts.length - 1].lastInRating = true
  }
  return artifacts
}

const createListItems = (maxRating = 4) => {
  const sampleArtifacts = Object.keys(SAMPLE_ROWS)
    .map<RatedListArtifact>((id, i) => {
      const row = SAMPLE_ROWS[id]
      const image = sampleArtImage
      const rating = getSampleRating(i)
      // Temporarily set to a dummy number
      const ordinal = -1
      return { type: 'artifact', id, image, rating, ordinal, ...row }
    })
    .sort(byRatingDesc)
    .map((artifact, i) => ({ ...artifact, ordinal: i + 1 }))

  const groups: RatedListArtifact[][] = range(0, maxRating + 1).map(_ => [])
  const itemsByGroup = sampleArtifacts
    // Group the artifacts by their rating
    .reduce((acc, artifact) => {
      const rating = artifact.rating || 0
      acc[rating] = [...acc[rating], artifact]
      return acc
    }, groups)
    .map(setFirstAndLastInRatingList)

  // Reverse order and flatten groups and artifacts into a single list
  return itemsByGroup.reduceRight(
    (list, artifacts, i) => [...list, createRating(i), ...artifacts],
    [] as RatedListItem[]
  )
}

export const SHORT_LIST: RatedListItem[] = [
  {
    type: 'rating',
    rating: 2,
  },
]

export const empty = () => <RatedList items={[]} />
export const shortList = () => <RatedList items={SHORT_LIST} />
export const fullList = () => <RatedList items={createListItems()} />
