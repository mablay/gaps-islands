# Gaps and Islands

```
      ◼◼◼◼◼             ◼◼◼◼◼◼◼◼◼◼   ◼◼◼          ◼◼◼◼◼
         ◼◼◼◼◼◼◼◼   ◼            ◼◼◼◼◼        ◼◼◼◼◼◼
                          ◼◼◼◼       ◼◼◼   ◼◼◼◼      ◼◼◼◼◼
      ===========   =   ================   ===============
        island      i.       island              island
                 gap gap                gap
```

Calculates gaps and islands from an array of ranges.

```js
import { islands } from '@occami/gaps-islands'
console.log(islands([
  { start: 2, end: 6 },
  { start: 4, end: 8 },
  { start: 12, end: 16 },
]))
/* [
  { start: 2, end: 8 },
  { start: 12, end: 16 } 
] */
```