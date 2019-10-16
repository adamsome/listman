import { action, payload } from 'ts-action'
import { RatedListResponse, RowMoveEvent } from './types'
export const loadList = action(
  '[Rated List] Load',
  payload<RatedListResponse>()
)

export const setCurrentList = action(
  '[Rated List] Set Current',
  payload<RatedListResponse>()
)

export const moveCurrentListRow = action(
  '[Rated List] Move Current Row',
  payload<RowMoveEvent>()
)
