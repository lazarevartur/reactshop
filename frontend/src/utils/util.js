export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export class Storage {
  static save(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  static has(key) {
    return !!localStorage.getItem(key)
  }

  static remove(key) {
    localStorage.removeItem(key)
  }
}

export function capitalaze(str) {
  return str.split(' ').map((w) => {
    return w[0].toUpperCase() + w.substr(1)
  }).join(' ')
}
export function normalazeUrl(str) {
  return str.replace(' ', '').toLowerCase()
}
