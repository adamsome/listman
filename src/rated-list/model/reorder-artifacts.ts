import { RatedArtifact } from '../../rated-artifact'
import { moveArrayInPlace, rangeInclusive } from '../../utils/collections'
import { RatedListArtifactRow, RatedListRow, RowMoveEvent } from '../types'

export const reorderArtifactsByRowMove = ({
  source,
  target,
  rows,
}: RowMoveEvent): RatedArtifact[] => {
  const artifacts = getArtifactsFromRows(rows)
  if (!target) {
    return artifacts
  }

  const dir = source > target ? 'up' : 'down'
  const sourceRow = rows[source]
  if (sourceRow && sourceRow.type === 'artifact') {
    // Get the new rating at the target, or directly above target if moving up
    let targetRatingIndex = target
    if (dir === 'up') {
      targetRatingIndex = target === 0 ? 0 : target - 1
    }
    const newRating = getRowRating(rows[targetRatingIndex])

    const sourceArtifactIndex = sourceRow.ordinal - 1
    const targetArtifactIndex =
      findNextArtifactRow(target, dir, rows).ordinal - 1

    setArtifactRating(sourceArtifactIndex, newRating, artifacts)
    moveArrayInPlace(sourceArtifactIndex, targetArtifactIndex, artifacts)
  } else {
    // Use the source rating row's rating as the new rating to set unless
    // we are moving it down, then use the rating above
    let newRating = sourceRow.rating
    if (dir === 'down') {
      newRating = newRating === undefined ? 1 : newRating + 1
    }
    // Set the rating of the artifact corresponding to each artifact row between
    // the source and target.
    rangeInclusive(source, target).forEach(i => {
      const row = rows[i]
      if (row.type === 'artifact') {
        setArtifactRating(row.ordinal - 1, newRating, artifacts)
      }
    })
  }
  return artifacts
}

const getRowRating = (row?: RatedListRow | null): number | undefined => {
  if (row) {
    if (row.type === 'rating') {
      return row.rating
    }
    return row.ratedArtifact.rating
  }
}

const setArtifactRating = (
  index: number,
  value: number | undefined,
  artifacts: RatedArtifact[]
): void => {
  artifacts[index] = {
    ...artifacts[index],
    rating: value,
  }
}

const findNextArtifactRow = (
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

const getArtifactsFromRows = (rows: RatedListRow[]): RatedArtifact[] => {
  const artifactRows = rows.filter(
    r => r.type === 'artifact'
  ) as RatedListArtifactRow[]
  return artifactRows.map(r => r.ratedArtifact)
}
