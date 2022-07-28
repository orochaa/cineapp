import { api } from '@/infra/http'
import { useEffect, useState } from 'react'

export function useGenre<T> (type: 'movie' | 'tv', genreId: number) {
  const [data, setData] = useState<T>()

  useEffect(() => {
    (async () => {
      const res = await api.get(`/discover/${type}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: 'pt-BR',
          sort_by: 'popularity.desc',
          page: Math.floor(Math.random() * 10) + 1,
          with_genres: genreId
        },
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      setData(res.data.results)
    })()
  }, [])

  return data
}
