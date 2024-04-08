import { api } from '@/infra/http'
import useSWR from 'swr'
import type { KeyedMutator } from 'swr'

interface FetchResult<TResult> {
  data: TResult | undefined
  error: unknown
  mutate: KeyedMutator<TResult>
}

export function useFetch<TResult>(uri: string): FetchResult<TResult> {
  const { data, error, mutate } = useSWR<TResult, Error, string>(
    uri,
    async uri => {
      const res = await api.get<TResult>(uri, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: 'pt-BR',
        },
      })

      return res.data && typeof res.data === 'object' && 'results' in res.data
        ? (res.data.results as TResult)
        : res.data
    }
  )

  return { data, error, mutate }
}
