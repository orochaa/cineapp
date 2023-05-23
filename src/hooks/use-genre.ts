import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { z } from 'zod'

export function useGenre<T>(params: {
  type: 'movie' | 'tv'
  genreId: number
  schema: z.ZodType<T>
}) {
  const [data, setData] = useState<T>()

  useEffect(() => {
    ;(async () => {
      const { data } = await api.get(`/discover/${params.type}`, {
        params: {
          sort_by: 'popularity.desc',
          page: Math.floor(Math.random() * 10) + 1,
          with_genres: params.genreId
        },
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      })
      setData(params.schema.parse(data.results))
    })()
  }, [])

  return data
}
