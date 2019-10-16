import { range } from 'ramda'
import { RatedArtifact } from '../rated-artifact'
import {
  RatedList,
  RatedListArtifactRow,
  RatedListRatingRow,
  RatedListResponse,
  RatedListRow,
} from './types'

// Response

export const parseRatedListResponse = (res: RatedListResponse): RatedList => {
  const { artifacts, ...rest } = res
  return {
    ...rest,
    artifactIDs: artifacts.map(artifact => artifact.id),
  }
}

// Rated List Rows

const byRatingDesc = (
  a: RatedListArtifactRow,
  b: RatedListArtifactRow
): number => {
  if (b.ratedArtifact.rating == null) {
    return -1
  }
  if (a.ratedArtifact.rating == null) {
    return 1
  }
  return b.ratedArtifact.rating
    .toString()
    .localeCompare(a.ratedArtifact.rating.toString())
}

const convertRatedArtifactsToArtifactRows = (
  ratedArtifacts: readonly RatedArtifact[]
): readonly RatedListArtifactRow[] =>
  ratedArtifacts
    .map<RatedListArtifactRow>(ratedArtifact => ({
      type: 'artifact',
      id: ratedArtifact.id,
      // Temporary, will be set after sorting, below
      ordinal: -1,
      // Temporary will be set after grouping by rating
      firstInRating: false,
      lastInRating: false,
      ratedArtifact,
    }))
    .sort(byRatingDesc)
    .map((row, i) => ({
      ...row,
      ordinal: i + 1,
    }))

const setArtifactRowFirstAndLast = (artifacts: RatedListArtifactRow[] = []) => {
  if (artifacts.length > 0) {
    artifacts[0].firstInRating = true
    artifacts[artifacts.length - 1].lastInRating = true
  }
  return artifacts
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

const insertRatingRowsIntoArtifactRows = (
  artifactRows: readonly RatedListArtifactRow[],
  maxRating = 4
): readonly RatedListRow[] => {
  const groups: RatedListArtifactRow[][] = range(0, maxRating + 1).map(_ => [])
  const artifactRowsByGroup = artifactRows
    .reduce((acc, row) => {
      const rating = row.ratedArtifact.rating || 0
      acc[rating] = [...acc[rating], row]
      return acc
    }, groups)
    .map(setArtifactRowFirstAndLast)

  // Reverse order and flatten groups and artifacts into a single list
  let prevGroupArtifactCount = 0
  return artifactRowsByGroup.reduceRight(
    (list, artifacts, i) => {
      const rating = createRating(i, prevGroupArtifactCount)
      prevGroupArtifactCount = artifacts.length
      return [...list, rating, ...artifacts]
    },
    [] as RatedListRow[]
  )
}

export const convertArtifactsToRatedListRows = (
  ratedArtifacts: readonly RatedArtifact[] | null,
  maxRating = 4
): readonly RatedListRow[] | null => {
  if (ratedArtifacts == null) {
    return null
  }
  const artifactRows = convertRatedArtifactsToArtifactRows(ratedArtifacts)
  return insertRatingRowsIntoArtifactRows(artifactRows, maxRating)
}
