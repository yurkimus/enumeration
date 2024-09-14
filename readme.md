# Enumeration Prototype

JavaScript's Enumeration implementation

Enumeration is a two-way bound collection of keys related to values and values
to keys.

## Table of Contents

- [Installation](#installation)
- [Exports](#exports)
  - [Enumeration](#Enumeration)
- [License](#license)

## Installation

### npm

```
npm install @yurkimus/enumeration
```

### urls

```
"@yurkimus/enumeration": "npm:@yurkimus/enumeration"
```

```
"@yurkimus/enumeration": "github:yurkimus/enumeration"
```

```
"@yurkimus/enumeration": "https://raw.githubusercontent.com/yurkimus/enumeration/main/source/index.js"
```

## Exports

### Enumeration

#### Definition

```
EnumerationInit ::
  | Set
  | [ keys: [] ]
  | [ keys: [], values: [] ]
  | { key: value }
  | Map<key, value>
  | Enumeration

Enumeration :: EnumerationInit -> Enumeration { key <=> value }

Enumeration.prototype.of :: EnumerationInit -> Enumeration { key <=> value }

Enumeration.prototype.has :: key -> boolean

Enumeration.prototype.get :: key ->
  | *
  | ReferenceError

Enumeration.prototype.keys :: () -> iterableIterator<*>

Enumeration.prototype.values :: () -> iterableIterator<*>

Enumeration.prototype.entries :: () -> iterableIterator<[*, *]>

Enumeration.prototype[Symbol.iterator] :: () -> iterableIterator<[*, *]>
```

#### Example

```javascript
let Colors = new Enumeration(new Set(['Red', 'Green', 'Blue']))

let CSSColors = Colors
  .bindValues(['red', 'green', 'blue'])

let RGBs = Colors
  .bindValues(['rgb(255 0 0)', 'rgb(0 128 0)', 'rgb(0 0 255)'])
  .bindKeys(['R', 'G', 'B'])

console.log('Colors', Colors) // => Enumeration { 'Red' <=> 'Red', 'Green' <=> 'Green', 'Blue' <=> 'Blue' }

console.log('CSSColors', CSSColors) // => Enumeration { 'Red' <=> 'red', 'Green' <=> 'green', 'Blue' <=> 'blue' }

console.log('RGBs', RGBs) // => Enumeration { 'Red', 'R' <=> 'rgb(255 0 0)', 'Green', 'G' <=> 'rgb(0 128 0)', 'Blue', 'B' <=> 'rgb(0 0 255)' }

/**
 * Enumeration provides 'has' method to lookup for the presence of the key in entries (both keys and values)
 */
console.log("RGBs.has('R')", RGBs.has('R')) // => true

console.log("RGBs.has('Red')", RGBs.has('Red')) // => true

console.log("RGBs.has('rgb(255 0 0)')", RGBs.has('rgb(255 0 0)')) // => true

/**
 * Enumeration provides 'get' method to get an assigned or associated value
 */
console.log("RGBs.get('R')", RGBs.get('R')) // => 'rgb(255 0 0)'

console.log("RGBs.get('Red')", RGBs.get('Red')) // => 'rgb(255 0 0)'

console.log("RGBs.get('rgb(255 0 0)')", RGBs.get('rgb(255 0 0)')) // => 'R'

/**
 * When multiple values being assigned to the same key, it return an array if the key were provided
 *
 * Bindings are created with preserved order and amount of keys/values
 */
let MediaTypes = new Enumeration([
  ['javascript', 'javascript'],
  ['text/javascript', 'application/javascript'],
]).bindKeys(['js', 'js'])

console.log('MediaTypes', MediaTypes)

// Owned key check
console.log("MediaTypes.has('javascript')", MediaTypes.has('javascript'))

// Associated key check
console.log("MediaTypes.has('js')", MediaTypes.has('js'))

console.log(
  "MediaTypes.has('text/javascript')",
  MediaTypes.has('text/javascript'),
)

console.log(
  "MediaTypes.has('application/javascript')",
  MediaTypes.has('application/javascript'),
)

console.log("MediaTypes.get('javascript')", MediaTypes.get('javascript')) // => ['text/jabvascript', 'application/javascript']

console.log("MediaTypes.get('js')", MediaTypes.get('js')) // => ['text/jabvascript', 'application/javascript']

/**
 * iteration happens with owned keys/values only
 */
console.log('[...RGBs.keys()]', [...RGBs.keys()]) // => [ 'R', 'G', 'B' ]

console.log('[...RGBs.values()]', [...RGBs.values()]) // => [ 'rgb(255 0 0)', 'rgb(0 128 0)', 'rgb(0 0 255)' ]

console.log('[...RGBs.entries()]', [...RGBs.entries()]) // => [ [ 'R', 'rgb(255 0 0)' ], [ 'G', 'rgb(0 128 0)' ], [ 'B', 'rgb(0 0 255)' ] ]

console.log('[...RGBs]', [...RGBs]) // => [ [ 'R', 'rgb(255 0 0)' ], [ 'G', 'rgb(0 128 0)' ], [ 'B', 'rgb(0 0 255)' ] ]
```

## License

[MIT](LICENSE)
