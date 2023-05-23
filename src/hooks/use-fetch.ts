import { api } from '@/lib/api'
import useSWR from 'swr'
import { z } from 'zod'

interface FetchResult<R> {
  data?: R | undefined
  mutate: (data: R | undefined, refetch: boolean) => void
}

/**
 * @param uri Ex: /user
 * @param schema Zod schema
 * @return fetch data
 */
export function useFetch<R = unknown>(
  uri: string,
  schema?: z.ZodType<R>
): FetchResult<R> {
  return useSWR<R>(uri, async (uri: string) => {
    const { data } = await api.get(uri)
    const result = data?.results ?? data
    return schema
      ? schema.safeParse(result).success
        ? result
        : (console.error(result) as R)
      : result
  })
}
