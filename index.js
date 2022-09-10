/**
 * @typedef RangeType
 * @property {number|Date} start begining of the range
 * @property {number|Date} end end of the range
 * @property {any} [value] optional data property
 */
/** @typedef {Object.<string, any> & RangeType} Range */

/**
 * Discovers gaps and islands in an array or ranges.
 * A range has a *start*, *end* and optionally a *value* property.
 * @param {Range[]} ranges array of ranges
 * @param {Function} [reducer] reduces the value property of ranges that get merged into islands
 * @returns {Range[]}
 */
export function mergeIslands (ranges, reducer) {
  const sorted = ranges
    .map(({ start, end, value }) => {
      if (value === undefined) {
        return { start, end }
      }
      return { start, end, value }
    })
    .sort(startComperator)
  const results = []
  let island = sorted.shift()
  if (island === undefined) {
    return results
  }
  for (const range of sorted) {
    if (range.start <= island.end) {
      if (typeof reducer === 'function') {
        island.value = reducer(island, range)
      }
      if (island.end < range.end) {
        island.end = range.end
      }
    } else {
      results.push(island)
      island = range
    }
  }
  results.push(island)
  return results
}

/**
 * Lists gaps between ranges
 * @param {Range[]} ranges array of ranges
 * @returns {Range[]} the gaps between ranges.
 * Gaps don't have value properties
 */
export function findGaps (ranges) {
  const isl = mergeIslands(ranges)
  if (isl.length < 2) return []
  const res = []
  for (let i = 1; i < isl.length; i++) {
    res.push({
      start: isl[i - 1].end,
      end: isl[i].start
    })
  }
  return res
}

/**
 * Sort comperator acting on the start property of a range object.
 * If both start values are identical, the end values are compared.
 * @param {Range} a
 * @param {Range} b
 * @returns {number}
 */
function startComperator (a, b) {
  if (a.start !== b.start) return a.start > b.start ? 1 : -1
  if (a.end !== b.end) return a.end > b.end ? 1 : -1
  return 0
}
