export interface RatedListRating {
  type: 'rating'
  rating?: number
}

export interface RatedListArtifact {
  type: 'artifact'
  id: string
  title: string
  subtitle?: string
  description?: string
  rating?: number
  image?: string
  firstInRating?: boolean
  lastInRating?: boolean
}

export type RatedListItem = RatedListRating | RatedListArtifact
