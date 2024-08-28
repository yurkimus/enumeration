# Functions

Enumeration implementation to use with javascript.

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
Enumeration :: Enumeration -> Enumeration
Enumeration :: any[] -> Enumeration
Enumeration :: any[] -> any[] -> Enumeration
```

#### Example

```javascript
new Enumeration(['a', 'b']) // => Enumeration { 'a' => 'a', 'b' => 'b' }

Enumeration.of([0, 1]) // => Enumeration { 0 => 0, 1 => 1 }

new Enumeration([0, 1]).has(1) // => true

new Enumeration([0, 1]).get(1) // => 1

new Enumeration([0, 1], ['a', 'b']).get('a') // => 1

new Enumeration([0, 1], ['a', 'b']).get(1) // => 'a'

new Enumeration(['a', 'b']).bindKeys([0, 1]) // => Enumeration { 0 => 'a', 1 => 'b', 'a' => 0, 'b' => 1 }

new Enumeration([0, 1]).bindValues(['a', 'b']) // => Enumeration { 0 => 'a', 1 => 'b', 'a' => 0, 'b' => 1 }

Array.from(Enumeration.of([0, 1]).keys()) // => [0, 1]

Array.from(Enumeration.of([0, 1], ['a', 'b']).values()) // => ['a', 'b']

Array.from(Enumeration.of([0, 1], ['a', 'b']).entries()) // => [ [0, 'a'], ['a', 0], [1, 'b'], ['b', 1] ]

[...new Enumeration([0, 1], ['a', 'b'])] // => [ [0, 'a'], ['a', 0], [1, 'b'], ['b', 1] ]
```

## License

[MIT](LICENSE)
