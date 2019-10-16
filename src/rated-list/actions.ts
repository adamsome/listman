import { action as createAction, payload } from 'ts-action'
import { HasID } from '../types'
import { RatedListResponse } from './types'

export const loadRatedList = createAction(
  '[Rated List] Load',
  payload<HasID & RatedListResponse>()
)

export const setCurrentRatedList = createAction(
  '[Rated List] Set Current',
  payload<HasID & RatedListResponse>()
)
