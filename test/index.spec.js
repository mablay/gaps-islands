import { test } from 'zora'
import { mergeIslands, findGaps, findIslands } from '../index.js'
import { fixtures } from './fixtures.js'

for (const fixture of fixtures) {
  const { name, copyRanges, copyResults } = fixture
  test(`Islands (${name})`, t => {
    const ranges = copyRanges().map(({ start, end }) => ({ start, end }))
    const result = mergeIslands(ranges)
    const expected = copyResults()
      .filter(r => r.type === 'island')
      .map(({ start, end }) => ({ start, end }))
    t.deepEqual(result, expected, 'islands')
  })

  test(`Merged islands (${name})`, t => {
    const ranges = copyRanges()
    const result = mergeIslands(ranges, (a, b) => a.value + b.value)
    const expected = copyResults()
      .filter(r => r.type === 'island')
      .map(({ start, end, value }) => ({ start, end, value }))
    t.deepEqual(result, expected, 'island volumes')
  })

  test(`Gaps (${name})`, t => {
    const ranges = copyRanges().map(({ start, end }) => ({ start, end }))
    const result = findGaps(ranges)
    const expected = copyResults()
      .filter(r => r.type === 'gap')
      .map(({ start, end }) => ({ start, end }))
    t.deepEqual(result, expected, 'gaps')
  })
}

test('collect ranges on islands', t => {
  // This is more like a real world scenario
  // because the objects you want to apply to
  // the gaps and island problem might have
  // an arbitrary data structure
  const people = [
    { name: 'alice', min: 2, max: 5 },
    { name: 'bob', min: 8, max: 9 },
    { name: 'clair', min: 3, max: 7 },
  ]
  const ranges = people.map(person => ({
    start: person.min,
    end: person.max,
    value: [person.name] // the array part looks weird, but it allows us to aggregate people on islands
  }))
  // look at how range values are combined here. This aggregation step is up to your needs.
  const results = mergeIslands(ranges, (a, b) => [...a.value, ...b.value])
  t.deepEqual(results, [
    { start: 2, end: 7, value: ['alice', 'clair'] },
    { start: 8, end: 9, value: ['bob'] }
  ])
})

test('find islands', t => {
  const events = [
    { min: 2,  max: 6, name: 'foo' },
    { min: 4,  max: 8, name: 'bar' },
    { min: 12, max: 16, name: 'baz' },
  ]
  
  // find overlapping ranges
  const islands = findIslands(events, { start: 'min', end: 'max', value: 'name' })
  const expected = [
    { start: 2, end: 8, value: [ 'foo', 'bar' ] },
    { start: 12, end: 16, value: [ 'baz' ] }
  ]
  t.deepEqual(islands, expected)
})