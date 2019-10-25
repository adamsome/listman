import React from 'react'
import Starrate from 'react-minor-ui'
import styles from './RatingRow.module.css'
import { RatedListRatingRow } from './types'

type Props = RatedListRatingRow & typeof defaultProps & {}

const defaultProps = {}

const RatingRow = (props: Props) => {
  return (
    <div className={styles.error}>
      <Starrate rating={props.rating} size="huge" disabled />
    </div>
  )
}

RatingRow.defaultProps = defaultProps

export default RatingRow
