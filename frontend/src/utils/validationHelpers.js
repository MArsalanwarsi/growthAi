export function isValidUrl(value) {
  const input = String(value || '').trim()

  if (!input) return true
  if (/\s/.test(input)) return false

  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(input) ? input : `https://${input}`)
    const hostname = url.hostname

    if (!['http:', 'https:'].includes(url.protocol)) return false
    if (!hostname || hostname === 'localhost') return false

    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      return hostname.split('.').every((part) => Number(part) <= 255)
    }

    const labels = hostname.split('.')
    const topLevelDomain = labels.at(-1)

    if (labels.length < 2 || !/^[a-z]{2,}$/i.test(topLevelDomain)) return false

    return labels.every((label) => (
      label.length > 0
      && label.length <= 63
      && /^[a-z0-9-]+$/i.test(label)
      && !label.startsWith('-')
      && !label.endsWith('-')
    ))
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
