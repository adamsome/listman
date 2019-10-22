import { range } from 'ramda'

export const moveArrayInPlace = <T>(
  source: number,
  target: number,
  arr: T[]
): T[] => {
  const toMove = arr.splice(source, 1)[0]
  return arr.splice(target, 0, toMove)
}

export const rangeInclusive = (source: number, target: number): number[] =>
  source < target ? range(source, target + 1) : range(target, source + 1)
