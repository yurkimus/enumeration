import { type } from '@yurkimus/types'

var Symbols = {
  Keys: Symbol('keys'),
  Values: Symbol('values'),
  Entries: Symbol('entries'),
}

export function Enumeration(...init) {
  this[Symbols.Keys] = new Set()
  this[Symbols.Values] = new Set()
  this[Symbols.Entries] = new Map()

  switch (init.length) {
    case 0:
      break

    case 1:
      switch (type(init[0])) {
        case 'Object': {
          for (var key in init[0]) {
            this.add(key, init[0][key])
          }

          break
        }

        case 'Array': {
          if (!(init[0].every(Array.isArray) && init[0].length === 2)) {
            throw new TypeError(
              `Expected array initializer to contain keys and values arrays`,
            )
          }

          for (var index in init[0][0]) {
            this.add(init[0][0][index], init[0][1][index])
          }

          break
        }

        case 'Enumeration': {
          this[Symbols.Keys] = new Set(init[0][Symbols.Keys])
          this[Symbols.Values] = new Set(init[0][Symbols.Values])
          this[Symbols.Entries] = new Map(init[0][Symbols.Entries])

          break
        }

        default:
          throw new TypeError(
            `Initializer of type "${type(init[0])}" is not supported`,
          )
      }

      break

    default:
      throw new TypeError(`Expected Enumeration init to have 0 or 1 argument`)
  }
}

Enumeration.prototype.has = function (value) {
  return this[Symbols.Entries].has(value)
}

Enumeration.prototype.get = function (value) {
  return this[Symbols.Entries].get(value)
}

Enumeration.prototype.add = function (key, value) {
  if (this[Symbols.Keys].has(key)) {
    throw new TypeError('Expected "key" to be unique')
  }

  if (this[Symbols.Values].has(value)) {
    throw new TypeError('Expected "value" to be unique')
  }

  this[Symbols.Keys]
    .add(key)

  this[Symbols.Values]
    .add(value)

  this[Symbols.Entries]
    .set(key, value)
    .set(value, key)

  return this
}

Enumeration.prototype.bindKeys = function (...keys) {
  if (keys.length !== this[Symbols.Values].size) {
    throw new TypeError(
      "Expected provided 'keys' to be the same length with derived 'values'",
    )
  }

  var values = Array.from(this[Symbols.Values]),
    enumeration = new Enumeration()

  for (var index in values) {
    enumeration.set(keys[index], values[index])
  }

  return enumeration
}

Enumeration.prototype.bindValues = function (...values) {
  if (this[Symbols.Keys].size !== values.length) {
    throw new TypeError(
      "Expected provided 'values' to be the same length with derived 'keys'",
    )
  }

  var keys = Array.from(this[Symbols.Keys]),
    enumeration = new Enumeration()

  for (var index in values) {
    enumeration.set(keys[index], values[index])
  }

  return enumeration
}

Enumeration.prototype[Symbol.toStringTag] = 'Enumeration'
