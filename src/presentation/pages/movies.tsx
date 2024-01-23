import { type IMovie } from '@/domain/api'
import {
  CarouselGenre,
  Header,
  Main,
  SelectGenre,
  type SelectGenreValue,
} from '@/presentation/components'
import { useFetch, useGenre } from '@/presentation/hooks'
import { useState } from 'react'

export function MoviesPage(): React.JSX.Element {
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
  const family = useGenre<IMovie[]>('movie', 10_751)
  const fantasy = useGenre<IMovie[]>('movie', 14)
  const history = useGenre<IMovie[]>('movie', 36)
  const horror = useGenre<IMovie[]>('movie', 27)
  const mystery = useGenre<IMovie[]>('movie', 9648)
  const romance = useGenre<IMovie[]>('movie', 10_749)
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
            'western',
          ]}
        />
        <CarouselGenre
          genre="Populares"
          selectedGenre={genre}
          type="movies"
          list={trending}
        />
        <CarouselGenre
          genre="Bem Avaliados"
          selectedGenre={genre}
          type="movies"
          list={topRated}
        />
        <CarouselGenre
          genre="Em Breve"
          selectedGenre={genre}
          type="movies"
          list={upcoming}
        />
        <CarouselGenre
          genre="action"
          selectedGenre={genre}
          type="movies"
          list={action}
        />
        <CarouselGenre
          genre="adventure"
          selectedGenre={genre}
          type="movies"
          list={adventure}
        />
        <CarouselGenre
          genre="animation"
          selectedGenre={genre}
          type="movies"
          list={animation}
        />
        <CarouselGenre
          genre="comedy"
          selectedGenre={genre}
          type="movies"
          list={comedy}
        />
        <CarouselGenre
          genre="crime"
          selectedGenre={genre}
          type="movies"
          list={crime}
        />
        <CarouselGenre
          genre="documentary"
          selectedGenre={genre}
          type="movies"
          list={documentary}
        />
        <CarouselGenre
          genre="drama"
          selectedGenre={genre}
          type="movies"
          list={drama}
        />
        <CarouselGenre
          genre="family"
          selectedGenre={genre}
          type="movies"
          list={family}
        />
        <CarouselGenre
          genre="fantasy"
          selectedGenre={genre}
          type="movies"
          list={fantasy}
        />
        <CarouselGenre
          genre="history"
          selectedGenre={genre}
          type="movies"
          list={history}
        />
        <CarouselGenre
          genre="horror"
          selectedGenre={genre}
          type="movies"
          list={horror}
        />
        <CarouselGenre
          genre="mystery"
          selectedGenre={genre}
          type="movies"
          list={mystery}
        />
        <CarouselGenre
          genre="romance"
          selectedGenre={genre}
          type="movies"
          list={romance}
        />
        <CarouselGenre
          genre="sciFi"
          selectedGenre={genre}
          type="movies"
          list={sciFi}
        />
        <CarouselGenre
          genre="western"
          selectedGenre={genre}
          type="movies"
          list={western}
        />
      </Main>
    </>
  )
}
