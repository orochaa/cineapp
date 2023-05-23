import { z } from 'zod'

type SafeFetchParams<T> = {
  schema: z.ZodType<T>
  headers?: HeadersInit
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

export async function safeFetch<T>(params: SafeFetchParams<T>): Promise<T> {
  const url =
    'url' in params
      ? params.url
      : `${process.env.NEXT_PUBLIC_API_URL}${params.uri}?language=pt-BR`
  const updateConfig: RequestInit =
    'revalidate' in params
      ? { next: { revalidate: params.revalidate }, cache: 'force-cache' }
      : { cache: params.cache }
  return await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      ...params.headers
    },
    ...updateConfig
  })
    .then(res => res.json())
    .then(data => {
      // console.log({ data })
      return data
    })
    .then(data => params.schema.parse(data?.results ?? data))
}
