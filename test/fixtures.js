function createFixture (str) {
  return str.split('\n')
    .map(line => ({
      start: line.indexOf('◼'),
      end: line.lastIndexOf('◼')
    }))
    .map(line => ({ ...line, value: line.end - line.start }))
    .filter(line => line.start >= 0 && line.end >= 0)
}

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
      { start: 6, end: 16, type: 'island', sum: 15 },
      { start: 16, end: 19, type: 'gap' },
      { start: 19, end: 19, type: 'island', sum: 0 },
      { start: 19, end: 22, type: 'gap' },
      { start: 22, end: 37, type: 'island', sum: 18 }
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
    copyResults: () => [
      { start: 6, end: 9, type: 'island', sum: 3 },
      { start: 9, end: 12, type: 'gap' },
      { start: 12, end: 15, type: 'island', sum: 3 },
      { start: 15, end: 18, type: 'gap' },
      { start: 18, end: 21, type: 'island', sum: 3 }
    ]
  },
  {
    name: 'touching islands',
    copyRanges: () => createFixture(`
      ◼◼◼◼
         ◼◼◼◼
            ◼◼◼◼`),
    copyResults: () => [
      { start: 6, end: 15, type: 'island', sum: 9 },
    ]
  },
  {
    name: 'identical islands',
    copyRanges: () => createFixture(`
      ◼◼◼◼
      ◼◼◼◼
      ◼◼◼◼`),
    copyResults: () => [
      { start: 6, end: 9, type: 'island', sum: 9 },
    ]
  }
]
