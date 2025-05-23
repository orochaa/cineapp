import { useMemo } from 'react'
import { useLocation } from 'react-router'

export function useQuery(): URLSearchParams {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}
