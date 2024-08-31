var Symbols = {
  Keys: Symbol('keys'),
  Values: Symbol('values'),
  Entries: Symbol('entries'),
}

export function Enumeration() {
  this[Symbols.Keys] = new Set()
  this[Symbols.Values] = new Set()
  this[Symbols.Entries] = new Map()
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
