import { is, type } from '@yurkimus/types'

var Symbols = {
  Entries: Symbol('entries'),
  Associate: Symbol('associate'),
  Associations: Symbol('associations'),
}

export var Enumeration = function Enumeration(...parameters) {
  this[Symbols.Entries] = this[Symbols.Associations] = null

  switch (parameters.length) {
    case 1:
      switch (type(parameters[0])) {
        case 'Set': {
          let set = parameters[0]

          this[Symbols.Entries] = []
          this[Symbols.Associations] = []

          for (let key of set) {
            this[Symbols.Entries]
              .push([key, key])
          }

          break
        }

        case 'Array': {
          let array = parameters[0]

          if (!array.every(is('Array'))) {
            throw new TypeError(
              `Failed to construct 'Enumeration': Every entry of the array initializer must be an array.`,
            )
          }

          switch (array.length) {
            case 1: {
              let keys = array[0]

              this[Symbols.Entries] = []
              this[Symbols.Associations] = []

              for (let key of keys) {
                this[Symbols.Entries]
                  .push([key, key])
              }

              break
            }

            case 2: {
              let keys = array[0],
                values = array[1]

              if (!(keys.length === values.length)) {
                throw new TypeError(
                  `Failed to construct 'Enumeration': When initializing enumeration with both keys and values, they related arrays have must the same length.`,
                )
              }

              this[Symbols.Entries] = []
              this[Symbols.Associations] = []

              for (let index in keys) {
                this[Symbols.Entries]
                  .push([keys[index], values[index]])
              }

              break
            }

            default:
              throw new TypeError(
                `Failed to construct 'Enumeration': Array initializer must have 1 or 2 entries of type array.`,
              )
          }

          break
        }

        case 'Object': {
          let object = parameters[0]

          this[Symbols.Entries] = []
          this[Symbols.Associations] = []

          for (let property in object) {
            this[Symbols.Entries]
              .push([property, object[property]])
          }

          break
        }

        case 'Map': {
          let map = parameters[0]

          this[Symbols.Entries] = []
          this[Symbols.Associations] = []

          for (let [key, value] of map) {
            this[Symbols.Entries]
              .push([key, value])
          }

          break
        }

        case 'Enumeration': {
          let enumeration = parameters[0]

          this[Symbols.Entries] = Array.from(enumeration[Symbols.Entries])
          this[Symbols.Associations] = Array.from(
            enumeration[Symbols.Associations],
          )

          break
        }

        default:
          throw new TypeError(
            `Failed to construct 'Enumeration': Enumeration initializer must be of type: 'Set', 'Array', 'Object', 'Map' or 'Enumeration'.`,
          )
      }

      break

    default:
      throw new TypeError(
        `Failed to construct 'Enumeration': 1 or more arguments required, but ${parameters.length} present.`,
      )
  }
}

Enumeration.of = function (...parameters) {
  return new Enumeration(...parameters)
}

Enumeration.prototype.has = function (key) {
  return this[Symbols.Entries]
    .concat(this[Symbols.Associations])
    .some((entry) => entry[0] === key || entry[1] === key)
}

Enumeration.prototype.get = function (key) {
  console.log('[Enumeration.prototype.get]', key)

  if (this.has(key)) {
    let entries = this[Symbols.Entries]
        .concat(this[Symbols.Associations]),
      entry = entries
        .find((entry) => entry[0] === key || entry[1] === key),
      index = entry.findIndex((item) => item === key)

    console.log('entry', entry)

    console.log('index', index)

    switch (index) {
      case 0:
        let found = entries
          .filter((entry) => entry[0] === key)
          .map((entry) => entry[1])

        switch (found.length) {
          case 1:
            return found[0]

          default:
            return found
        }

      case 1:
        return entry[0]
    }
  } else {
    throw new ReferenceError(`Enumeration key '${key}' is not defined.`)
  }
}

Enumeration.prototype[Symbols.Associate] = function (keys, values) {
  for (let index in keys) {
    this[Symbols.Associations]
      .push([keys[index], values[index]])
  }

  return this
}

Enumeration.prototype.bindKeys = function (keys) {
  if (!is('Array', keys)) {
    throw new TypeError(
      "Provided 'keys' must be of type 'Array'",
    )
  }

  let ownKeys = this[Symbols.Entries].map((entry) => entry[0]),
    ownValues = this[Symbols.Entries].map((entry) => entry[1])

  if (!(keys.length === ownValues.length)) {
    throw new TypeError(
      "Provided 'keys' must be the same length with the owned 'values'",
    )
  }

  return new Enumeration([keys, ownValues])
    [Symbols.Associate](ownKeys, ownValues)
}

Enumeration.prototype.bindValues = function (values) {
  if (!is('Array', values)) {
    throw new TypeError(
      "Provided 'values' must be of type 'Array'",
    )
  }

  let ownKeys = this[Symbols.Entries].map((entry) => entry[0])

  if (!(ownKeys.length === values.length)) {
    throw new TypeError(
      "Provided 'values' must be the same length with the owned 'keys'",
    )
  }

  return new Enumeration([ownKeys, values])
}

Enumeration.prototype.keys = function* () {
  yield* this[Symbols.Entries]
    .map((entry) => entry[0])
    .filter((item, index, items) => items.indexOf(item) === index)
    [Symbol.iterator]()
}

Enumeration.prototype.values = function* () {
  yield* this[Symbols.Entries]
    .map((entry) => entry[1])
    [Symbol.iterator]()
}

Enumeration.prototype.entries =
  Enumeration.prototype[Symbol.iterator] =
    function* () {
      yield* this[Symbols.Entries]
        [Symbol.iterator]()
    }

Enumeration.prototype[Symbol.toStringTag] = 'Enumeration'
