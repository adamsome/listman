export type ArtifactType = 'movie' | 'tv' | 'album' | 'song' | 'game'

export interface Artifact {
  id: string
  type: ArtifactType
  title: string
  creator?: string
  releaseDate?: string
  publisher?: string
  artworkID?: string
}

export interface RatedArtifact {
  id: string
  artifact: Artifact
  /** Override artifact title */
  title?: string
  /** Override artifact creator */
  creator?: string
  /** Override artifact release date */
  releaseDate?: string
  /** Override artifact publisher */
  publisher?: string
  /** Override artifact artwork */
  artworkID?: string
  text?: string
  rating?: number
  ratedListID?: string
}
