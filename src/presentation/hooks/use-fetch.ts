import useSWR from 'swr'
import { api } from '@/infra/http'

export function useFetch<T> (uri: string) {
  const { data, error, mutate } = useSWR<T>(uri, async uri => {
    const res = await api.get(uri, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        language: 'pt-BR'
      }
    })
    return res.data.results || res.data
  })
  return { data, error, mutate }
}
