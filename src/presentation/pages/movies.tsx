import { IMovie } from '@/domain/api'
import { Carousel, Header, Main, SelectGenre, SelectGenreValue } from '@/presentation/components'
import { useFetch, useGenre } from '@/presentation/hooks'
import { useState } from 'react'

export function MoviesPage () {
  const [genre, setGenre] = useState<SelectGenreValue>('*')

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
        <Carousel genre="Populares" selectedGenre={genre} list={trending} />
        <Carousel genre="Bem Avaliados" selectedGenre={genre} list={topRated} />
        <Carousel genre="Em Breve" selectedGenre={genre} list={upcoming} />
        <Carousel genre="action" selectedGenre={genre} list={action} />
        <Carousel genre="adventure" selectedGenre={genre} list={adventure} />
        <Carousel genre="animation" selectedGenre={genre} list={animation} />
        <Carousel genre="comedy" selectedGenre={genre} list={comedy} />
        <Carousel genre="crime" selectedGenre={genre} list={crime} />
        <Carousel genre="documentary" selectedGenre={genre} list={documentary} />
        <Carousel genre="drama" selectedGenre={genre} list={drama} />
        <Carousel genre="family" selectedGenre={genre} list={family} />
        <Carousel genre="fantasy" selectedGenre={genre} list={fantasy} />
        <Carousel genre="history" selectedGenre={genre} list={history} />
        <Carousel genre="horror" selectedGenre={genre} list={horror} />
        <Carousel genre="mystery" selectedGenre={genre} list={mystery} />
        <Carousel genre="romance" selectedGenre={genre} list={romance} />
        <Carousel genre="sciFi" selectedGenre={genre} list={sciFi} />
        <Carousel genre="western" selectedGenre={genre} list={western} />
      </Main>
    </>
  )
}
