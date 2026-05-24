import { useCallback, useState } from 'react'

export function useApi(apiFn) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const execute = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)

      try {
        const result = await apiFn(...args)
        setData(result)
        return result
      } catch (apiError) {
        setError(apiError)
        throw apiError
      } finally {
        setLoading(false)
      }
    },
    [apiFn],
  )

  return { data, error, execute, loading }
}
