import { action } from '@storybook/addon-actions'
import { range } from 'ramda'
import React from 'react'
import { SAMPLE_CARDS } from '../common/Card/Card.stories'
import sampleArtImage from '../common/Card/sample-art.png'
import RatedList from './RatedList'
import { RatedListArtifactRow, RatedListRatingRow, RatedListRow } from './types'

export default {
  component: RatedList,
  title: 'RatedList',
  excludeStories: ['actions', 'SHORT_LIST'],
}

export const actions = {
  onMove: action('onMove'),
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

const byRatingDesc = (a: RatedListRow, b: RatedListRow): number => {
  if (b.rating == null) {
    return -1
  }
  if (a.rating == null) {
    return 1
  }
  return b.rating.toString().localeCompare(a.rating.toString())
}

const createRating = (
  rating: number,
  prevGroupArtifactCount: number
): RatedListRatingRow => ({
  type: 'rating',
  id: String(rating),
  rating,
  occursAfterArtifact: prevGroupArtifactCount > 0,
})

const setFirstAndLastInRatingList = (
  artifacts: RatedListArtifactRow[] = []
) => {
  if (artifacts.length > 0) {
    artifacts[0].firstInRating = true
    artifacts[artifacts.length - 1].lastInRating = true
  }
  return artifacts
}

const createListItems = (maxRating = 4) => {
  const sampleArtifacts = Object.keys(SAMPLE_CARDS)
    .map<RatedListArtifactRow>((id, i) => {
      const row = SAMPLE_CARDS[id]
      const artifactID = 'a_' + id
      const artifact = {
        artworkID: sampleArtImage,
        rating: getSampleRating(i),
        ...row,
      }
      // Temporarily set to a dummy number
      const ordinal = -1
      return {
        type: 'artifact',
        id,
        ordinal,
        // Temporarily set, will be overriden by 'setFirstAndLast...' fn
        firstInRating: false,
        lastInRating: false,
        artifactID,
        ...artifact,
      }
    })
    .sort(byRatingDesc)
    .map((artifact, i) => ({ ...artifact, ordinal: i + 1 }))

  const groups: RatedListArtifactRow[][] = range(0, maxRating + 1).map(_ => [])
  const itemsByGroup = sampleArtifacts
    // Group the artifacts by their rating
    .reduce((acc, artifact) => {
      const rating = artifact.rating || 0
      acc[rating] = [...acc[rating], artifact]
      return acc
    }, groups)
    .map(setFirstAndLastInRatingList)

  // Reverse order and flatten groups and artifacts into a single list
  let prevGroupArtifactCount = 0
  return itemsByGroup.reduceRight(
    (list, artifacts, i) => {
      const rating = createRating(i, prevGroupArtifactCount)
      prevGroupArtifactCount = artifacts.length
      return [...list, rating, ...artifacts]
    },
    [] as RatedListRow[]
  )
}

export const SHORT_LIST: RatedListRow[] = [
  {
    type: 'rating',
    id: '2',
    rating: 2,
    occursAfterArtifact: false,
  },
  {
    type: 'artifact',
    id: '1',
    artifactID: 'a1',
    title: 'Title',
    ordinal: 1,
    firstInRating: true,
    lastInRating: true,
  },
]

export const empty = () => <RatedList items={[]} {...actions} />
export const shortList = () => <RatedList items={SHORT_LIST} {...actions} />
export const fullList = () => (
  <RatedList items={createListItems()} {...actions} />
)
