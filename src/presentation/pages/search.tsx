import { type IMovie, type IPerson, type ITv } from '@/domain/api'
import {
  CarouselGenre,
  CarouselPeople,
  Header,
  Main,
} from '@/presentation/components'
import { useQuery } from '@/presentation/hooks'
import { api } from '@/infra/http'
import { useEffect, useState } from 'react'

interface SearchMultiResult {
  results: ({
    media_type: 'movie' | 'tv' | 'person'
  } & IMovie &
    ITv &
    IPerson)[]
}

export function SearchPage(): React.JSX.Element {
  const query = useQuery().get('search_query')
  const [movies, setMovies] = useState<IMovie[]>([])
  const [series, setSeries] = useState<ITv[]>([])
  const [people, setPeople] = useState<IPerson[]>([])

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
        const movies: IMovie[] = []
        const series: ITv[] = []
        const people: IPerson[] = []

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
