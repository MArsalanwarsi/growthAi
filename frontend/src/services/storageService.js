export const storageService = {
  get(key, fallback = null) {
    if (typeof window === 'undefined') return fallback

    const value = localStorage.getItem(key)
    if (!value) return fallback

    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  },
  set(key, value) {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
  },
  remove(key) {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
}
