import { CarouselGenre } from '@/components/carousel/carousel-genre'
import { CarouselPeople } from '@/components/carousel/carousel-people'
import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { useQuery } from '@/hooks/use-query'
import { api } from '@/lib/http'
import { useEffect, useState } from 'react'

interface SearchMultiResult {
  results: ({
    media_type: 'movie' | 'tv' | 'person'
  } & Movie &
    TvShow &
    Person)[]
}

export function SearchPage(): React.JSX.Element {
  const query = useQuery().get('search_query')
  const [movies, setMovies] = useState<Movie[]>([])
  const [series, setSeries] = useState<TvShow[]>([])
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    api
      .get<SearchMultiResult>('/search/multi', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: 'pt-BR',
          query,
        },
      })
      .then(res => {
        const movies: Movie[] = []
        const series: TvShow[] = []
        const people: Person[] = []

        for (const d of res.data.results) {
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
        }
        setMovies(movies)
        setSeries(series)
        setPeople(people)
      })
      .catch(console.error)
  }, [query])

  return (
    <>
      <Header />
      <Main>
        <h2 className="text-3xl">Resultados de {`'${query}'`}:</h2>

        <CarouselGenre
          genre="Filmes"
          list={movies}
          selectedGenre="*"
          type="movies"
        />

        <CarouselGenre
          genre="Séries"
          list={series}
          selectedGenre="*"
          type="tv"
        />

        <CarouselPeople title="Pessoas" list={people} />
      </Main>
    </>
  )
}
