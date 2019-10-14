import React from 'react'
import { RatedArtifact } from '../rated-artifact'
import convertRatedArtifactsToListRows from './convert-artifacts-to-rows'
import RatedList from './RatedList'
import { RowMoveEvent } from './types'

type Props = typeof defaultProps & {
  artifacts: readonly RatedArtifact[]
}

const defaultProps = {
  maxRating: 4,
}

const RatedListContainer = (props: Props) => {
  const { artifacts, maxRating } = props
  const rows = convertRatedArtifactsToListRows(artifacts, maxRating)

  const onMove = (event: RowMoveEvent) => {
    // tslint:disable-next-line: no-console
    console.log('row move', event)
  }
  return <RatedList items={rows} onMove={onMove} />
}

RatedListContainer.defaultProps = defaultProps

export default RatedListContainer
