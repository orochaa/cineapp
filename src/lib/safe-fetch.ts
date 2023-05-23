import { z } from 'zod'

type SafeFetchParams<T> = {
  schema: z.ZodType<T>
  headers?: HeadersInit
  params?: Record<string, (string | number)[]>
} & (
  | {
      url: string
    }
  | {
      uri: string
    }
) &
  (
    | {
        revalidate: number
      }
    | {
        cache: 'force-cache' | 'no-store'
      }
  )

export async function safeFetch<T>(data: SafeFetchParams<T>): Promise<T> {
  const params = data.params
    ? Object.entries(data.params)
        .map(([key, value], index) => {
          const mark = index === 0 ? '?' : '&'
          return [mark, key, '=', value.join(',')].join('')
        })
        .join('')
    : '?language=pt-BR'

  const url =
    'url' in data
      ? [data.url, params].join('')
      : [process.env.NEXT_PUBLIC_API_URL, data.uri, params].join('')

  const updateConfig: RequestInit =
    'revalidate' in data
      ? { next: { revalidate: data.revalidate } }
      : { cache: data.cache }

  return await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      ...data.headers
    },
    ...updateConfig
  })
    .then(res => res.json())
    .then(res => {
      // console.log({ res })
      return res
    })
    .then(res => data.schema.parse(res?.results ?? data))
}
