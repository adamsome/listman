import { range } from 'ramda'
import { RatedArtifact } from '../../rated-artifact'
import {
  RatedListArtifactRow,
  RatedListRatingRow,
  RatedListRow,
} from '../types'

/**
 * Converts a list of rated artifacts into a list of artifact rows sorted by
 * rating with rating rows separating artifacts of different ratings.
 * @param ratedArtifacts Rated artifacts to convert.
 * @param maxRating Maximum rating to separate artifacts with.
 */
export const createRows = (
  ratedArtifacts: RatedArtifact[] | null,
  maxRating = 4
): RatedListRow[] | null => {
  if (ratedArtifacts == null) {
    return null
  }
  const artifactRows = createArtifactRows(ratedArtifacts)
  return insertRatingRows(artifactRows, maxRating)
}

const rowByRatingDesc = (
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

const createArtifactRows = (
  ratedArtifacts: RatedArtifact[]
): RatedListArtifactRow[] =>
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
    .sort(rowByRatingDesc)
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

const createRatingRow = (
  rating: number,
  prevGroupArtifactCount: number
): RatedListRatingRow => ({
  type: 'rating',
  id: String(rating),
  rating,
  occursAfterArtifact: prevGroupArtifactCount > 0,
})

const insertRatingRows = (
  artifactRows: RatedListArtifactRow[],
  maxRating = 4
): RatedListRow[] => {
  // Group the artifacts into a separate array containing the same ratings
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
      const rating = createRatingRow(i, prevGroupArtifactCount)
      prevGroupArtifactCount = artifacts.length
      return [...list, rating, ...artifacts]
    },
    [] as RatedListRow[]
  )
}
