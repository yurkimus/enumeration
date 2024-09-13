import { is, type } from '@yurkimus/types'

var Symbols = {
  Keys: Symbol('keys'),
  Values: Symbol('values'),
  Entries: Symbol('entries'),
  AssociationKeys: Symbol('associationKeys'),
  AssociationsEntries: Symbol('associationsEntries'),
}

export function Enumeration(...parameters) {
  this[Symbols.Keys] =
    this[Symbols.Values] =
    this[Symbols.Entries] =
    this[Symbols.AssociationKeys] =
    this[Symbols.AssociationsEntries] =
      null

  switch (parameters.length) {
    case 1:
      switch (type(parameters[0])) {
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

              this[Symbols.Keys] = this[Symbols.Values] = new Set()
              this[Symbols.Entries] = new Map()

              for (let key of keys) {
                this[Symbols.Keys]
                  .add(key)

                this[Symbols.Entries]
                  .set(key, key)
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

              this[Symbols.Keys] = new Set()
              this[Symbols.Values] = new Set()
              this[Symbols.Entries] = new Map()

              for (let index in keys) {
                this[Symbols.Keys]
                  .add(keys[index])

                this[Symbols.Values]
                  .add(values[index])

                this[Symbols.Entries]
                  .set(keys[index], values[index])
                  .set(values[index], keys[index])
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

          this[Symbols.Keys] = new Set()
          this[Symbols.Values] = new Set()
          this[Symbols.Entries] = new Map()

          for (let property in object) {
            this[Symbols.Keys]
              .add(property)

            this[Symbols.Values]
              .add(object[property])

            this[Symbols.Entries]
              .set(property, object[property])
              .set(object[property], property)
          }

          break
        }

        case 'Map': {
          let map = parameters[0]

          this[Symbols.Keys] = new Set()
          this[Symbols.Values] = new Set()
          this[Symbols.Entries] = new Map()

          for (let [key, value] of map) {
            this[Symbols.Keys]
              .add(key)

            this[Symbols.Values]
              .add(value)

            this[Symbols.Entries]
              .set(key, value)
              .set(value, key)
          }

          break
        }

        case 'Enumeration': {
          let enumeration = parameters[0]

          this[Symbols.Keys] = new Set(enumeration[Symbols.Keys])
          this[Symbols.Values] = new Set(enumeration[Symbols.Values])
          this[Symbols.Entries] = new Map(enumeration[Symbols.Entries])

          if (enumeration[Symbols.AssociationKeys]) {
            this[Symbols.AssociationKeys] = new Set(
              enumeration[Symbols.AssociationKeys],
            )

            this[Symbols.AssociationsEntries] = new Set(
              enumeration[Symbols.AssociationsEntries],
            )
          }

          break
        }

        default:
          break
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

Enumeration.prototype.has = function (proeprty) {
  let symbols = [Symbols.Entries, Symbols.AssociationsEntries]

  return symbols
    .map((symbol) => this[symbol])
    .some((map) => map?.has(proeprty))
}

Enumeration.prototype.get = function (property) {
  if (this.has(property)) {
    return new Map([
      ...(this[Symbols.AssociationsEntries] ?? []),
      ...this[Symbols.Entries],
    ])
      .get(property)
  } else {
    throw new ReferenceError(`Property '${property}' is not defined.`)
  }
}

Enumeration.prototype.bindKeys = function (keys) {
  if (!is('Array', keys)) {
    throw new TypeError(
      "Provided 'keys' must be of type 'Array'",
    )
  }

  if (!(keys.length === this[Symbols.Values].size)) {
    throw new TypeError(
      "Provided 'keys' must be the same length with derived 'values'",
    )
  }

  return new Enumeration([
    keys,
    Array.from(this[Symbols.Values]),
  ])
    .associateKeys(keys)
}

Enumeration.prototype.bindValues = function (values) {
  if (!is('Array', values)) {
    throw new TypeError(
      "Provided 'values' must be of type 'Array'",
    )
  }

  if (this[Symbols.Keys].size !== values.length) {
    throw new TypeError(
      "Provided 'values' must be the same length with derived 'keys'",
    )
  }

  let enumeration = new Enumeration([
    Array.from(this[Symbols.Keys]),
    values,
  ])

  if (this[Symbols.AssociationKeys]) {
    enumeration
      .associateKeys(Array.from(this[Symbols.AssociationKeys]))
  }

  return enumeration
}

Enumeration.prototype.associateKeys = function (parameter) {
  switch (type(parameter)) {
    case 'Array': {
      if (!(this[Symbols.Keys].size === parameter.length)) {
        throw new TypeError(
          "Provided Array 'keys' must have the same length with derived 'keys'",
        )
      }

      let values = Array.from(this[Symbols.Values])

      if (!this[Symbols.AssociationKeys]) {
        this[Symbols.AssociationKeys] = new Set()
        this[Symbols.AssociationsEntries] = new Map()
      }

      for (let index in parameter) {
        this[Symbols.AssociationKeys]
          .add(parameter[index])

        this[Symbols.AssociationsEntries]
          .set(parameter[index], values[index])
          .set(values[index], parameter[index])
      }

      break
    }

    case 'Enumeration': {
      if (!(this[Symbols.Keys].size === parameter[Symbols.Keys].size)) {
        throw new TypeError(
          "Provided Enumeration 'keys' must have the same length with derived 'keys'",
        )
      }

      let keys = Array.from(parameter[Symbols.Keys]),
        associationKeys = Array.from(parameter[Symbols.AssociationKeys] ?? []),
        values = Array.from(this[Symbols.Values])

      if (!this[Symbols.AssociationKeys]) {
        this[Symbols.AssociationKeys] = new Set()
        this[Symbols.AssociationsEntries] = new Map()
      }

      for (let index in keys) {
        this[Symbols.AssociationKeys]
          .add(keys[index])

        this[Symbols.AssociationsEntries]
          .set(keys[index], values[index])
          .set(values[index], keys[index])
      }

      for (let index in associationKeys) {
        this[Symbols.AssociationKeys]
          .add(associationKeys[index])

        this[Symbols.AssociationsEntries]
          .set(associationKeys[index], values[index])
          .set(values[index], associationKeys[index])
      }

      break
    }

    default:
      throw new TypeError(
        `Failed keys association on 'Enumeration': required 1 argument of type 'Array' or 'Enumeration'`,
      )
  }

  return this
}

Enumeration.prototype.keys = function* () {
  yield* this[Symbols.Keys][Symbol.iterator]()
}

Enumeration.prototype.values = function* () {
  yield* this[Symbols.Values][Symbol.iterator]()
}

Enumeration.prototype.entries =
  Enumeration.prototype[Symbol.iterator] =
    function* () {
      yield* this[Symbols.Entries][Symbol.iterator]()
    }

Enumeration.prototype[Symbol.toStringTag] = 'Enumeration'
