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
Enumeration :: { [key]: <value> } -> Enumeration { key <=> value }
Enumeration :: [ keys: [] ] -> Enumeration { key <=> value }
Enumeration :: [ keys: [], values: [] ] -> Enumeration { key <=> value }
Enumeration :: Map<key, value> -> Enumeration { key <=> value }
Enumeration :: Enumeration -> Enumeration { key <=> value }
```

#### Example

```javascript
let Colors, HEXs, RGBs, XYZs, ABCs

// Standard Enumeration with the values assigned the same as the provided keys
Colors = new Enumeration([
  ['Red', 'Green', 'Blue'],
])

// Enumeration with the provided values for each key
Colors = new Enumeration([
  ['Red', 'Green', 'Blue'],
  ['Red', 'Green', 'Blue'],
])

// Constructing with the static method 'of'
Colors = Enumeration
  .of([['Red', 'Green', 'Blue']])

// Array initializer
Colors = Enumeration
  .of([['Red', 'Green', 'Blue']])

// Object initializer
Colors = Enumeration
  .of({ Red: 'Red', Green: 'Green', Blue: 'Blue' })

// Map initializer
Colors = Enumeration
  .of(new Map([['Red', 'Red'], ['Green', 'Green'], ['Blue', 'Blue']]))

// Enumeration initializer (copy)
Colors = Enumeration
  .of(Colors)

// Creating a new Enumeration with the provided values (Enumeration keys are preserved)
HEXs = Colors
  .bindValues(['#ff0000', '#008000', '#0000ff'])

// Creating a new Enumeration with the provided values, associating meta-keys
RGBs = Colors
  .bindValues(['rgb(255 0 0)', 'rgb(0 128 0)', 'rgb(0 0 255)'])
  .associateKeys(['R', 'G', 'B'])

XYZs = RGBs
  .bindValues(['255 0 0', '0 128 0', '0 0 255'])
  .associateKeys(['X', 'Y', 'Z'])

// Creating a new Enumeration with the provided keys (Enumeration values are preserved)
ABCs = Colors
  .bindKeys(['A', 'B', 'C'])

console.log(
  'Colors',
  Colors,
) // => Enumeration { 'Red' <=> 'Red', 'Green' <=> 'Green', 'Blue' <=> 'Blue' }

console.log(
  "Colors.get('Red')",
  Colors.get('Red'),
) // => 'Red'

console.log('\n')

console.log(
  'HEXs',
  HEXs,
) // => Enumeration { 'Red' <=> '#ff0000', 'Green' <=> '#008000', 'Blue' <=> '#0000ff' }

console.log(
  "HEXs.get('#ff0000')",
  // You can get an own key of enumeration by the assigned value to it
  HEXs.get('#ff0000'),
) // => 'Red'

console.log(
  "HEXs.get('Red')",
  HEXs.get('Red'),
) // => '#ff0000'

console.log('\n')

console.log(
  'RGBs',
  RGBs,
) // => Enumeration { 'Red', 'R' <=> 'rgb(255 0 0)', 'Green', 'G' <=> 'rgb(0 128 0)', 'Blue', 'B' <=> 'rgb(0 0 255)' }

console.log(
  "RGBs.get('rgb(255 0 0)')",
  RGBs.get('rgb(255 0 0)'),
) // => 'Red'

console.log(
  // You can get an assigned value to enumeration with either owned or associated keys
  "RGBs.get('Red')",
  RGBs.get('Red'),
) // => 'rgb(255 0 0)'

console.log(
  "RGBs.get('R')",
  RGBs.get('R'),
) // => 'rgb(255 0 0)'

console.log('\n')

console.log(
  'XYZs',
  XYZs,
) // => Enumeration { 'Red', 'R', 'X' <=> '255 0 0', 'Green', 'G', 'Y' <=> '0 128 0', 'Blue', 'B', 'Z' <=> '0 0 255' }

console.log(
  "XYZs.get('255 0 0')",
  XYZs.get('255 0 0'),
) // => 'Red'

console.log(
  "XYZs.get('Red')",
  XYZs.get('Red'),
) // => '255 0 0'

console.log(
  // Associated keys are being inherited
  "XYZs.get('R')",
  XYZs.get('R'),
) // => '255 0 0'

console.log(
  "XYZs.get('X')",
  XYZs.get('X'),
) // => '255 0 0'

console.log('\n')

console.log(
  'ABCs',
  ABCs,
) // => Enumeraion { 'A' <=> 'Red', 'B' <=> 'Green', 'C' <=> 'Blue', }

console.log(
  "ABCs.get('A')",
  ABCs.get('A'),
) // => 'Red'

console.log('\n')

// 'has' method available
console.log(
  "HEXs.has('Red')",
  HEXs.has('Red'),
) // => true

// Iteration happens over owned keys and values only
console.log(
  '[...HEXs.keys()]',
  [...HEXs.keys()],
) // => [ 'Red', 'Green', 'Blue' ]

console.log(
  '[...HEXs.values()]',
  [...HEXs.values()],
) // => [ '#ff0000', '#008000', '#0000ff' ]

console.log(
  '[...HEXs.entries()]',
  [...HEXs.entries()],
) // => [ [ 'Red', '#ff0000' ], [ 'Green', '#008000' ], [ 'Blue', '#0000ff' ] ]

// Symbol.iterator
console.log(
  '[...HEXs]',
  [...HEXs],
) // => [ [ 'Red', '#ff0000' ], [ 'Green', '#008000' ], [ 'Blue', '#0000ff' ] ]

// Symbol.toStringTag
console.log(
  'HEXs[Symbol.toStringTag]',
  HEXs[Symbol.toStringTag],
) // => 'Enumeration'

// Type
console.log(
  'Object.prototype.toString.call(HEXs)',
  Object.prototype.toString.call(HEXs),
) // => '[object Enumeration]'
```

## License

[MIT](LICENSE)
