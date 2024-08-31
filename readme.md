# Enumeration

Enumeration implementation for javascript.

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
Enumeration :: () -> Enumeration { }
Enumeration :: { [key]: <value> } -> Enumeration { key <=> value }
Enumeration :: [ keys: [], values: [] ] -> Enumeration { key <=> value }
```

#### Example

```javascript
var enumeration = new Enumeration()

enumeration = new Enumeration([[], []])

enumeration = new Enumeration({})

enumeration
  .add('Get', 'GET')
  .add('Post', 'POST')
  .add('Patch', 'PATCH')

enumeration.has('Patch') // => true

enumeration.has('PATCH') // => true

enumeration.get('Get') // => 'GET'

enumeration.get('GET') // => 'Get'

enumeration.bindKeys(0, 1, 2) // => Enumeration { 0 => 'GET', 'GET' => 0, ... }

enumeration.bindValues('a', 'b', 'c') // => Enumeration { 'Get' => 'a', 'a' => 'Get', ... }
```

## License

[MIT](LICENSE)
