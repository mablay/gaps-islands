# Gaps and Islands

Reduces ranges into gaps and islands.

```
ranges       ├─────┤       ├─┤     ├───────┤   ├──┤
                ├──────┤             ├─┤   ├────┤  
islands      ◼◼◼◼◼◼◼◼◼◼◼   ◼◼◼     ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
gaps                    └─┘   └───┘       
```

Identifying gaps and islands across overlapping ranges is a [classic SQL problem](https://medium.com/analytics-vidhya/sql-classic-problem-identifying-gaps-and-islands-across-overlapping-date-ranges-5681b5fcdb8).
This module answers the same question if your data is stored in an array instead of a database.

## Basic Usage
```js
import { findIslands, findGaps } from '@occami/gaps-islands'
const shifts = [
  { name: 'Alice', start: 2,  end: 6 },
  { name: 'Bob',   start: 4,  end: 8 },
  { name: 'Clair', start: 12, end: 16 }
]

// find overlapping ranges
console.log(findIslands(shifts))
/*[
  { start: 2, end: 8, value: [ { 'Alice', ... }, { 'Bob', ... } ] },
  { start: 12, end: 16, value: [ { 'Clair', ... } ] }
]*/
// see how start: 2 and end: 8 spans the first two 
// records, because they overlap, causing an island. 
// .value aggregates all objects from that island.

// find gaps between ranges
console.log(findGaps(shifts))
/* [{ start: 8, end: 12 }] */
```

## Advanced Usage
If you want fine control over the island reducer, you might want to use `mergeIslands`.
```js
import { mergeIslands } from '@occami/gaps-islands'
const shifts = [
  { name: 'Alice', start: 2,  end: 6 },
  { name: 'Bob',   start: 4,  end: 8 },
  { name: 'Clair', start: 12, end: 16 }
]
// reduce information into islands
// 1. copy data of interest in the range.value property.
const ranges = shifts.map(r => ({ ...r, value: r.end - r.start }))
// 2. define a reducer that merges overlapping ranges into the islands 'value' property.
const reducer = (a, b) => a.value + b.value
// 3. pass the reducer as optional argument.
console.log(mergeIslands(ranges, reducer))
/*[
  { start: 2, end: 8, value: 8 },
  { start: 12, end: 16, value: 4 }
]*/
```
