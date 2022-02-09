import { pathToRegexp } from "./path-regex.mjs";

export default function createPattern(path='') {
  const keys = []
  const reg = pathToRegexp(path, keys)

  return function match(path='') {
    const result = {}
    const matches =reg.exec(path)
    if (matches) {
      result.path = matches.shift()
      matches.forEach((match, index) => {
        const key = keys[index]
        const prop = key.name
        const value = decodeValue(match)
        if (value) {
          result[prop] = value
        }
      })
    }

    return result
  }
}

function decodeValue(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return value
  }

  try {
    return decodeURIComponent(value)
  } catch (error) {
    if (error instanceof URIError) {
      error.message = 'Failed to decode param \'' + value + '\''
    }

    throw error
  }
}