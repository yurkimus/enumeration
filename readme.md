# Enumeration prototype

JavaScript's Enumeration implementation

Enumeration is a two-way bound collection of keys related to values and values
to keys.

Example:

```javascript
var HttpMethods = new Enumeration([
  ['Get', 'GET'],
  ['Post', 'POST'],
])

var HttpMethodLogs = HttpMethods.bindValues(
  (...parameters) => console.log('This is "GET"'),
  (...parameters) => console.log('This is "POST"'),
)

var request = new Request('http://localhost')

var log = HttpMethodLogs.get(HttpMethods.get(request.method))

log(...[]) // => 'This is "GET"'
```

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
// Making instance
var enumeration = new Enumeration()

enumeration = new Enumeration({})

enumeration = new Enumeration([[], []])

enumeration = Enumeration.of()

enumeration = Enumeration.of({})

enumeration = Enumeration.of([[], []])

// Assigning new key-value pairs
enumeration
  .add('Get', 'GET')
  .add('Post', 'POST')
  .add('Patch', 'PATCH')

// Check value on presence
enumeration.has('Patch') // => true
enumeration.has('PATCH') // => true

// Get a related value assigned to a key or a value
enumeration.get('Get') // => 'GET'
enumeration.get('GET') // => 'Get'

// Create new Enumeration based on derived keys
enumeration.bindKeys(0, 1, 2) // => Enumeration { 0 => 'GET', 'GET' => 0, ... }

// Create new Enumeration based on derived values
enumeration.bindValues('a', 'b', 'c') // => Enumeration { 'Get' => 'a', 'a' => 'Get', ... }

// Iterator protocol available
[...enumeration]

// Accesing all the keys
enumeration.keys() // => Iterator { ... }

[...enumeration.keys()]

Array.from(enumeration.keys())

// Accesing all the values
enumeration.values() // => Iterator { ... }

[...enumeration.values()]

Array.from(enumeration.values())

// Accesing all the entries
enumeration.entries() // => Iterator { ... }

[...enumeration.entries()]

Array.from(enumeration.entries())
```

## License

[MIT](LICENSE)
