import { type } from '@yurkimus/types'

var Symbols = {
  Keys: Symbol('keys'),
  Values: Symbol('values'),
  Entries: Symbol('entries'),
}

export function Enumeration(...parameters) {
  this[Symbols.Keys] = new Set()
  this[Symbols.Values] = new Set()
  this[Symbols.Entries] = new Map()

  switch (parameters.length) {
    case 0:
      break

    case 1:
      switch (type(parameters[0])) {
        case 'Object': {
          for (var key in parameters[0]) {
            this.add(key, parameters[0][key])
          }

          break
        }

        case 'Array': {
          if (!(parameters[0].every(Array.isArray))) {
            throw new TypeError(
              `Expected array initializer elements to be of type Array`,
            )
          }

          switch (parameters[0].length) {
            case 1: {
              for (var index in parameters[0][0]) {
                this.add(parameters[0][0][index], parameters[0][0][index])
              }

              break
            }

            case 2: {
              for (var index in parameters[0][0]) {
                this.add(parameters[0][0][index], parameters[0][1][index])
              }

              break
            }

            default:
              throw new TypeError(
                `Expected array initializer to have 1 or 2 arrays`,
              )
          }

          break
        }

        case 'Enumeration': {
          this[Symbols.Keys] = new Set(parameters[0][Symbols.Keys])
          this[Symbols.Values] = new Set(parameters[0][Symbols.Values])
          this[Symbols.Entries] = new Map(parameters[0][Symbols.Entries])

          break
        }

        default:
          throw new TypeError(
            `Initializer of type "${type(parameters[0])}" is not supported`,
          )
      }

      break

    default:
      throw new TypeError(
        `Expected Enumeration "parameters" to have 0 or 1 argument`,
      )
  }
}

Enumeration.of = function (...parameters) {
  return new Enumeration(...parameters)
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
    enumeration.add(keys[index], values[index])
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
    enumeration.add(keys[index], values[index])
  }

  return enumeration
}

Enumeration.prototype.keys = function* () {
  yield* this[Symbols.Keys].keys()
}

Enumeration.prototype.values = function* () {
  yield* this[Symbols.Values].keys()
}

Enumeration.prototype.entries = function* () {
  yield* this[Symbols.Entries].entries()
}

Enumeration.prototype[Symbol.iterator] = function () {
  return this[Symbols.Entries][Symbol.iterator]()
}

Enumeration.prototype[Symbol.toStringTag] = 'Enumeration'
