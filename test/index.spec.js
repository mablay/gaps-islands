import { test } from 'zora'
import { islands, gaps } from '../index.js'
import { fixtures } from './fixtures.js'

for (const fixture of fixtures) {
  const { name, copyRanges, copyResults } = fixture
  test(`Islands (${name})`, t => {
    const ranges = copyRanges().map(({ start, end }) => ({ start, end }))
    const result = islands(ranges)
    const expected = copyResults()
      .filter(r => r.type === 'island')
      .map(({ start, end }) => ({ start, end }))
    t.deepEqual(result, expected, 'islands')
  })

  test(`Merged islands (${name})`, t => {
    const ranges = copyRanges()
    const result = islands(ranges, (a, b) => a.value + b.value)
    const expected = copyResults()
      .filter(r => r.type === 'island')
      .map(({ start, end, sum }) => ({ start, end, value: sum }))
    t.deepEqual(result, expected, 'island volumes')
  })

  test(`Gaps (${name})`, t => {
    const ranges = copyRanges().map(({ start, end }) => ({ start, end }))
    const result = gaps(ranges)
    const expected = copyResults()
      .filter(r => r.type === 'gap')
      .map(({ start, end }) => ({ start, end }))
    t.deepEqual(result, expected, 'gaps')
  })
}
