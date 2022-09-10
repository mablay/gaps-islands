function createFixture (str) {
  return str.split('\n')
    .map(line => ({
      start: line.indexOf('◼'),
      end: line.lastIndexOf('◼')
    }))
    .map(line => ({ ...line, value: line.end - line.start }))
    .filter(line => line.start >= 0 && line.end >= 0)
}

/**
 * @typedef RangesFixture
 * @property {number|Date} start
 * @property {number|Date} end
 * @property {any} [value]
 */
/** 
 * @typedef IoGType
 * @property {'island'|'gap'} type
 */
/** @typedef {RangesFixture & IoGType} ResultsFixture */
/**
 * @typedef Fixture
 * @property {string} name
 * @property {function():RangesFixture[]} copyRanges
 * @property {function():ResultsFixture[]} copyResults
 */
/** @type {Fixture[]} */
export const fixtures = [
  {
    name: 'zero length island in the middle',
    copyRanges: () => createFixture(` 
      |         |     |              |
      |         |     ◼◼◼◼◼◼◼◼◼◼     |
      |  ◼◼◼◼◼◼◼◼     |              |
      |         |     |            ◼◼◼
      |         |  ◼  |              |
      |         |     |   ◼◼◼◼       |
      ◼◼◼◼◼     |     |              |
      |         |     |        ◼◼◼◼◼ |
      |  ◼◼◼◼◼  |     |              |
      |         |     |              |`),
    copyResults: () => [
      { start: 6, end: 16, type: 'island', value: 15 },
      { start: 16, end: 19, type: 'gap' },
      { start: 19, end: 19, type: 'island', value: 0 },
      { start: 19, end: 22, type: 'gap' },
      { start: 22, end: 37, type: 'island', value: 18 }
    ]
  },
  {
    name: 'empty fixture',
    copyRanges: () => [],
    copyResults: () => []
  },
  {
    name: 'simple islands',
    copyRanges: () => createFixture(`
      ◼◼◼◼
            ◼◼◼◼
                  ◼◼◼◼`),
    copyResults: () => ([
      { start: 6, end: 9, type: 'island', value: 3 },
      { start: 9, end: 12, type: 'gap' },
      { start: 12, end: 15, type: 'island', value: 3 },
      { start: 15, end: 18, type: 'gap' },
      { start: 18, end: 21, type: 'island', value: 3 }
    ])
  },
  {
    name: 'touching islands',
    copyRanges: () => createFixture(`
      ◼◼◼◼
         ◼◼◼◼
            ◼◼◼◼`),
    copyResults: () => ([
      { start: 6, end: 15, type: 'island', value: 9 },
    ])
  },
  {
    name: 'identical islands',
    copyRanges: () => createFixture(`
      ◼◼◼◼
      ◼◼◼◼
      ◼◼◼◼`),
    copyResults: () => ([
      { start: 6, end: 9, type: 'island', value: 9 },
    ])
  },
  {
    name: 'date ranges',
    copyRanges: () => [
      { start: new Date('2000-01-01T15:00:00.000Z'), end: new Date('2000-01-01T16:00:00.000Z') },
      { start: new Date('2000-01-01T12:00:00.000Z'), end: new Date('2000-01-01T13:00:00.000Z') },
      { start: new Date('2000-01-01T19:00:00.000Z'), end: new Date('2000-01-01T20:00:00.000Z') },
      { start: new Date('2000-01-01T12:30:00.000Z'), end: new Date('2000-01-01T15:30:00.000Z') }
    ].map(range => ({ ...range, value: range.end.getTime() - range.start.getTime() })),
    copyResults: () => [
      { start: new Date('2000-01-01T12:00:00.000Z'), end: new Date('2000-01-01T16:00:00.000Z'), type: 'island', value: 3600e3 * 5 },
      { start: new Date('2000-01-01T16:00:00.000Z'), end: new Date('2000-01-01T19:00:00.000Z'), type: 'gap' },
      { start: new Date('2000-01-01T19:00:00.000Z'), end: new Date('2000-01-01T20:00:00.000Z'), type: 'island', value: 3600e3 },
    ]
  }
]
