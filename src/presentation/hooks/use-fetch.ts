import useSWR from 'swr'
import { api } from '@/infra/http'

export function useFetch<T = undefined> (uri: string) {
  const { data, error, mutate } = useSWR<T>(uri, async uri => {
    const res = await api.get(uri, {
      params: {
        api_key: import.meta.env.API_TOKEN,
        language: 'pt-BR'
      }
    })
    return res.data
  })
  return { data, error, mutate }
}
