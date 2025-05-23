import { api } from '@/lib/http'
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function useGenre<TResult>(
  type: 'movie' | 'tv',
  genreId: number
): TResult | undefined {
  const [data, setData] = useState<TResult>()

  useEffect(() => {
    api
      .get(`/discover/${type}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: 'pt-BR',
          sort_by: 'popularity.desc',
          page: Math.floor(Math.random() * 10) + 1,
          with_genres: genreId,
        },
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      .then(res => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setData(res.data.results as TResult)
      })
      .catch(console.error)
  }, [genreId, type])

  return data
}
