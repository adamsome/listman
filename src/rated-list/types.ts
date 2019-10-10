export interface RatedListRating {
  type: 'rating'
  id: string
  rating?: number
}

export interface RatedListArtifact {
  type: 'artifact'
  id: string
  ordinal: number
  title: string
  subtitle?: string
  description?: string
  rating?: number
  image?: string
  firstInRating?: boolean
  lastInRating?: boolean
}

export type RatedListItem = RatedListRating | RatedListArtifact

export interface RowMoveEvent {
  id: string
  source: number
  target?: number
}
