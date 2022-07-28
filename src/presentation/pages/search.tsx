import { IMovie, IPerson, ITv } from '@/domain/api'
import { api } from '@/infra/http'
import { CarouselGenre, CarouselPeople, Header, Main } from '@/presentation/components'
import { useQuery } from '@/presentation/hooks'
import { useEffect, useState } from 'react'

export function SearchPage () {
  const query = useQuery().get('query')
  const [movies, setMovies] = useState<IMovie[]>([])
  const [series, setSeries] = useState<ITv[]>([])
  const [people, setPeople] = useState<IPerson[]>([])

  useEffect(() => {
    api
      .get('/search/multi', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: 'pt-BR',
          query
        }
      })
      .then(res => {
        const movies: IMovie[] = []
        const series: ITv[] = []
        const people: IPerson[] = []
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
      <Header />
      <Main>
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

        <CarouselPeople
          title="Pessoas"
          list={people}
        />
      </Main>
    </>
  )
}
