import { IMovie } from '@/domain/api'
import {
  Carousel,
  Header,
  Main,
  ISelectGenre,
  SelectGenre
} from '@/presentation/components'
import { useFetch, useGenre } from '@/presentation/hooks'
import { useState } from 'react'
import { formatGenre } from '../helpers'

export function MoviesPage () {
  const [genre, setGenre] = useState<ISelectGenre>('*')

  const { data: trending } = useFetch<IMovie[]>('/trending/movie/week')
  const { data: topRated } = useFetch<IMovie[]>('/movie/top_rated')
  const { data: upcoming } = useFetch<IMovie[]>('/movie/upcoming')
  const action = useGenre<IMovie[]>('movie', 28)
  const adventure = useGenre<IMovie[]>('movie', 12)
  const animation = useGenre<IMovie[]>('movie', 16)
  const comedy = useGenre<IMovie[]>('movie', 35)
  const crime = useGenre<IMovie[]>('movie', 80)
  const documentary = useGenre<IMovie[]>('movie', 99)
  const drama = useGenre<IMovie[]>('movie', 18)
  const family = useGenre<IMovie[]>('movie', 10751)
  const fantasy = useGenre<IMovie[]>('movie', 14)
  const history = useGenre<IMovie[]>('movie', 36)
  const horror = useGenre<IMovie[]>('movie', 27)
  const mystery = useGenre<IMovie[]>('movie', 9648)
  const romance = useGenre<IMovie[]>('movie', 10749)
  const sciFi = useGenre<IMovie[]>('movie', 878)
  const western = useGenre<IMovie[]>('movie', 37)

  return (
    <>
      <Header />
      <Main>
        <SelectGenre
          title="Filmes"
          onSet={setGenre}
          options={[
            'action',
            'adventure',
            'animation',
            'comedy',
            'crime',
            'documentary',
            'drama',
            'family',
            'fantasy',
            'history',
            'horror',
            'mystery',
            'romance',
            'sciFi',
            'western'
          ]}
        />
        <Carousel genre="Populares" list={trending} />
        <Carousel genre="Bem Avaliados" list={topRated} />
        <Carousel genre="Em Breve" list={upcoming} />
        <Carousel genre="action" list={action} />
        <Carousel genre="adventure" list={adventure} />
        <Carousel genre="animation" list={animation} />
        <Carousel genre="comedy" list={comedy} />
        <Carousel genre="crime" list={crime} />
        <Carousel genre="documentary" list={documentary} />
        <Carousel genre="drama" list={drama} />
        <Carousel genre="family" list={family} />
        <Carousel genre="fantasy" list={fantasy} />
        <Carousel genre="history" list={history} />
        <Carousel genre="horror" list={horror} />
        <Carousel genre="mystery" list={mystery} />
        <Carousel genre="romance" list={romance} />
        <Carousel genre="sciFi" list={sciFi} />
        <Carousel genre="western" list={western} />
      </Main>
    </>
  )
}
