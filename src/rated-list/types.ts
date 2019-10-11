import { ArtifactType } from '../rated-artifact'

export type RatedListPeriodUnit = 'month' | 'year' | 'decade' | 'all-time'

export interface RatedList {
  id: string
  type: ArtifactType
  period: string
  periodUnit: RatedListPeriodUnit
  maxRating: number
  subtitle?: string
  text?: string
  layout?: string
  /** Artifacts in the RatedList in order */
  artifactIDs: string[]
}

// View types

export interface RatedListRatingRow {
  type: 'rating'
  id: string
  rating?: number
  occursAfterArtifact: boolean
}

export interface RatedListArtifactRow {
  type: 'artifact'
  id: string
  ordinal: number
  firstInRating: boolean
  lastInRating: boolean
  artifactID: string
  /** TODO: Remove */
  title: string
  subtitle?: string
  description?: string
  rating?: number
  artworkID?: string
}

export type RatedListRow = RatedListRatingRow | RatedListArtifactRow

// Event types

export interface RowMoveEvent {
  id: string
  source: number
  target?: number
}
