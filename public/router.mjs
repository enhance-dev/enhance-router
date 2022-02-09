import routerParams from './lib/router-params.mjs'
import trim from './lib/trim.mjs'

export default function Router(paths=[]) {
  const listeners = []
  const patterns = []
  window.onpopstate = back
  paths.forEach(path => register({ path }))

  function getRouteData(path) {
    path = trim(path)
    const data = match(path)
    const params = new URLSearchParams(window.location.search)
    data.query = paramsToObject(params.entries())
    data.hash = window.location.hash
    data.path = path
    return data
  }

  function paramsToObject(entries) {
    const results = {}
    for (const [key, value] of entries) {
      results[key] = value
    }
    return results
  }

  function register({ path }) {
    path = trim(path)
    if (path) {
      const matcher = routerParams(path)
      if(matcher) {
        patterns.push({ matcher })
      }
    }
  }

  function navigate(path, data, title) {
    path = trim(path)
    if(shouldNavigate(path)) {
      history.pushState(data, title, path)
      update()
    }
  }

  function subscribe(listener) {
    if (typeof listener === 'function') {
      listeners.push(listener)
    }
  }

  function unsubscribe(listener) {
    listeners.splice(listeners.indexOf(listener), 1)
  }

  function shouldNavigate(path) {
    return path && path !== trim(window.location.pathname)
  }

  function back(event) {
    const data = getRouteData(window.location.pathname)
    data.back = true
    update(data)
  }

  function update(data) {
    data = data || getRouteData(window.location.pathname)
    data && listeners.forEach(listener => listener(data))
  }

  function match(path) {
    let pattern
    let data = {}
    let l = patterns.length
    for(let i=0; i < l; i++) {
      pattern = patterns[i]
      const params = pattern.matcher(path)
      if (params) {
        data = pattern?.data || {}
        data.params = params
        break
      }
    }
    return data
  }

  return {
    navigate,
    register,
    subscribe,
    unsubscribe
  }
}