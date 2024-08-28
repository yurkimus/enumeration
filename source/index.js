var Symbols = {
  Keys: Symbol('keys'),
  Values: Symbol('values'),
  Entries: Symbol('entries'),
}

export function Enumeration(...init) {
  this[Symbols.Keys] =
    this[Symbols.Values] =
    this[Symbols.Entries] =
      null

  switch (init.length) {
    case 1:
      if (init[0] instanceof Enumeration) {
        if (
          new Set(
            Object
              .values(Symbols)
              .map((symbol) => init[0][symbol]),
          ).size === 1
        ) {
          this[Symbols.Keys] =
            this[Symbols.Values] =
            this[Symbols.Entries] =
              init[0][Symbols.Keys]
        } else {
          this[Symbols.Keys] = init[0][Symbols.Keys]
          this[Symbols.Values] = init[0][Symbols.Values]
          this[Symbols.Entries] = init[0][Symbols.Entries]
        }
      } else if (Array.isArray(init[0])) {
        this[Symbols.Keys] =
          this[Symbols.Values] =
          this[Symbols.Entries] =
            new Set(init[0])
      } else {
        throw new TypeError("Expected 'init[0]' to be an Array or Enumeration")
      }

      break

    case 2:
      if (
        [init[0], init[1]].every(Array.isArray)
      ) {
        this[Symbols.Keys] = new Set(init[0])
        this[Symbols.Values] = new Set(init[1])

        var keys = Array.from(this[Symbols.Keys]),
          values = Array.from(this[Symbols.Values])

        this[Symbols.Entries] = new Map(keys
          .flatMap((key, index) => [
            [key, values[index]],
            [values[index], key],
          ]))
      } else {
        throw new TypeError("Expected 'init[0]' and 'init[1]' to be an Array")
      }

      break

    default:
      throw new TypeError("Expected 'init' to have 1 or 2 arguments")
  }
}

Enumeration.of = function (...init) {
  return new Enumeration(...init)
}

Enumeration.prototype.has = function (value) {
  return this[Symbols.Keys].has(value) || this[Symbols.Values].has(value)
}

Enumeration.prototype.get = function (value) {
  if (this[Symbols.Entries] instanceof Set) {
    return this.has(value) ? value : undefined
  }

  return this[Symbols.Entries].get(value)
}

Enumeration.prototype.bindKeys = function (keys) {
  if (!Array.isArray(keys)) {
    throw new TypeError("Expected 'keys' to be an Array")
  }

  if (keys.length !== this[Symbols.Values].size) {
    throw new TypeError(
      "Expected provided 'keys' to be the same length with derived 'values'",
    )
  }

  return new Enumeration(keys, Array.from(this[Symbols.Values]))
}

Enumeration.prototype.bindValues = function (values) {
  if (!Array.isArray(values)) {
    throw new TypeError("Expected 'values' to be an Array")
  }

  if (this[Symbols.Keys].size !== values.length) {
    throw new TypeError(
      "Expected provided 'values' to be the same length with derived 'keys'",
    )
  }

  return new Enumeration(Array.from(this[Symbols.Keys]), values)
}

Enumeration.prototype.keys = function* () {
  for (var key of this[Symbols.Keys].values()) yield key
}

Enumeration.prototype.values = function* () {
  for (var value of this[Symbols.Values].values()) yield value
}

Enumeration.prototype.entries =
  Enumeration.prototype[Symbol.iterator] =
    function* () {
      for (var entry of this[Symbols.Entries]) yield entry
    }

Enumeration.prototype[Symbol.toStringTag] = 'Enumeration'
