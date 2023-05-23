import { z } from 'zod'
import { safeFetch } from './safe-fetch'

interface GenreFetchParams<T> {
  type: 'movie' | 'tv'
  schema: z.ZodType<T>
  genreId: number
}

export async function genreFetch<T>(params: GenreFetchParams<T>): Promise<T> {
  return await safeFetch({
    uri: `/discover/${params.type}`,
    revalidate: 60 * 60 * 24,
    schema: params.schema,
    params: {
      language: ['pt-BR'],
      sort_by: ['popularity.desc'],
      page: [Math.floor(Math.random() * 10) + 1],
      with_genres: [params.genreId]
    }
  })
}
