import { useRouter } from 'next/router'
import { useCallback } from 'react'

const useUpdateQueryURL = () => {
  const router = useRouter()

  const updateQueryURL = useCallback((updates: Record<string, string | number>) => {
    const pathname = router.pathname
    const searchParams = router.query
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (!value) return
      if (Array.isArray(value)) {
        params.set(key, value[0])
      } else {
        params.set(key, value)
      }
    })

    Object.entries(updates).forEach(([name, value]) => {
      params.set(name, value.toString())
    })

    return `${pathname}?${params.toString()}`
  }, [router.pathname, router.query])

  return { updateQueryURL }

}

export default useUpdateQueryURL
