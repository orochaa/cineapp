import { api } from '@/infra/http'
import useSWR, { type KeyedMutator } from 'swr'

interface FetchResult<TResult> {
  data: TResult | undefined
  error: unknown
  mutate: KeyedMutator<TResult>
}

export function useFetch<TResult = undefined>(
  uri: string
): FetchResult<TResult> {
  const { data, error, mutate } = useSWR<TResult>(uri, async (uri: string) => {
    const res = await api.get(uri, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        language: 'pt-BR',
      },
    })

    return res.data && typeof res.data === 'object' && 'results' in res.data
      ? res.data.results
      : res.data
  })

  return { data, error, mutate }
}
