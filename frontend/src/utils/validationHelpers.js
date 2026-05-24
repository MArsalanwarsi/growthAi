export function isValidUrl(value) {
  if (!value) return true

  try {
    new URL(value.startsWith('http') ? value : `https://${value}`)
    return true
  } catch {
    return false
  }
}

export function required(value) {
  return Boolean(String(value || '').trim())
}

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
