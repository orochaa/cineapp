import { CarouselGenre } from '@/components/carousel/CarouselGenre'
import { CarouselPeople } from '@/components/carousel/CarouselPeople'
import { useQuery } from '@/hooks'
import { api } from '@/lib/api'
import { Movie, Person, Tv } from '@/domain/api'
import { useEffect, useState } from 'react'

export function SearchPage() {
  const query = useQuery().get('search_query')
  const [movies, setMovies] = useState<Movie[]>([])
  const [series, setSeries] = useState<Tv[]>([])
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    api
      .get('/search/multi', {
        params: {
          api_key: process.env.VITE_API_KEY,
          language: 'pt-BR',
          query
        }
      })
      .then(res => {
        const movies: Movie[] = []
        const series: Tv[] = []
        const people: Person[] = []
        res.data.results.forEach((d: any) => {
          switch (d.media_type) {
            case 'movie':
              movies.push(d)
              break
            case 'tv':
              series.push(d)
              break
            case 'person':
              people.push(d)
              break
          }
        })
        setMovies(movies)
        setSeries(series)
        setPeople(people)
      })
  }, [query])

  return (
    <>
      <h2 className="text-3xl">Resultados de {`'${query}'`}:</h2>

      <CarouselGenre
        genre="Filmes"
        list={movies}
        selectedGenre="*"
        type="movies"
      />

      <CarouselGenre genre="Séries" list={series} selectedGenre="*" type="tv" />

      <CarouselPeople title="Pessoas" list={people} />
    </>
  )
}
