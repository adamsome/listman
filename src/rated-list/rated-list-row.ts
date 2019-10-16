import { range } from 'ramda'
import { RatedArtifact } from '../rated-artifact'
import {
  RatedListArtifactRow,
  RatedListRatingRow,
  RatedListRow,
  RowMoveEvent,
} from './types'

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

const convertRatedArtifactsToArtifactRows = (
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

const insertRatingRowsIntoArtifactRows = (
  artifactRows: RatedListArtifactRow[],
  maxRating = 4
): RatedListRow[] => {
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

export const convertArtifactsToRatedListRows = (
  ratedArtifacts: RatedArtifact[] | null,
  maxRating = 4
): RatedListRow[] | null => {
  if (ratedArtifacts == null) {
    return null
  }
  const artifactRows = convertRatedArtifactsToArtifactRows(ratedArtifacts)
  return insertRatingRowsIntoArtifactRows(artifactRows, maxRating)
}

export const getRowRating = (row?: RatedListRow | null): number | undefined => {
  if (row) {
    if (row.type === 'rating') {
      return row.rating
    }
    return row.ratedArtifact.rating
  }
}

export const getRatingAt = (
  index: number,
  rows: RatedListRow[]
): number | undefined => getRowRating(rows[index > 0 ? index - 1 : 0])

export const findNextArtifactRow = (
  startIndex: number,
  dir: 'up' | 'down',
  rows: RatedListRow[]
): RatedListArtifactRow => {
  let nextArtifactRow: RatedListArtifactRow | undefined
  for (
    let i = startIndex;
    i < rows.length && i >= 0;
    dir === 'up' ? (i = i + 1) : (i = i - 1)
  ) {
    const row = rows[i]
    if (row && row.type === 'artifact') {
      nextArtifactRow = row
      break
    }
  }
  if (nextArtifactRow) {
    return nextArtifactRow
  }
  throw new Error(
    `Could not find next artifact row starting at index ${startIndex}`
  )
}

export const getArtifactsFromRows = (rows: RatedListRow[]): RatedArtifact[] => {
  const artifactRows = rows.filter(
    r => r.type === 'artifact'
  ) as RatedListArtifactRow[]
  return artifactRows.map(r => r.ratedArtifact)
}

export const reorderArtifactsByRowMove = ({
  rows,
  source,
  target,
}: RowMoveEvent): RatedArtifact[] => {
  const artifacts = getArtifactsFromRows(rows)
  if (!target) {
    return artifacts
  }
  const sourceRow = rows[source]
  if (sourceRow && sourceRow.type === 'artifact') {
    const dir = source > target ? 'up' : 'down'
    let targetRatingIndex = target
    if (dir === 'up') {
      targetRatingIndex = target === 0 ? 0 : target - 1
    }
    const targetRating = getRowRating(rows[targetRatingIndex])

    const sourceArtifactIndex = sourceRow.ordinal - 1
    const targetArtifactIndex =
      findNextArtifactRow(target, dir, rows).ordinal - 1

    artifacts[sourceArtifactIndex] = {
      ...artifacts[sourceArtifactIndex],
      rating: targetRating,
    }

    const artifactToMove = artifacts.splice(sourceArtifactIndex, 1)[0]
    artifacts.splice(targetArtifactIndex, 0, artifactToMove)
    return artifacts
  }
  throw new Error('Not yet implemented')
}
