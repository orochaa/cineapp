import useSWR from 'swr'
import { api } from '@/infra/http'

export function useFetch<T = undefined> (uri: string) {
  const { data, error, mutate } = useSWR<T>(uri, async uri => {
    const res = await api.get(uri, {
      params: {
        api_key: import.meta.env.VITE_API_TOKEN,
        language: 'pt-BR'
      }
    })
    return res.data.results
  })
  return { data, error, mutate }
}
