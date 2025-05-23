import { CarouselGenre } from '@/components/carousel/carousel-genre'
import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { SelectGenre } from '@/components/select-genre'
import type { SelectGenreValue } from '@/components/select-genre'
import { useFetch } from '@/hooks/use-fetch'
import { useGenre } from '@/hooks/use-genre'
import { useState } from 'react'

export function MoviesPage(): React.JSX.Element {
  const [genre, setGenre] = useState<SelectGenreValue>('*')

  const { data: trending } = useFetch<Movie[]>('/trending/movie/week')
  const { data: topRated } = useFetch<Movie[]>('/movie/top_rated')
  const { data: upcoming } = useFetch<Movie[]>('/movie/upcoming')
  const action = useGenre<Movie[]>('movie', 28)
  const adventure = useGenre<Movie[]>('movie', 12)
  const animation = useGenre<Movie[]>('movie', 16)
  const comedy = useGenre<Movie[]>('movie', 35)
  const crime = useGenre<Movie[]>('movie', 80)
  const documentary = useGenre<Movie[]>('movie', 99)
  const drama = useGenre<Movie[]>('movie', 18)
  const family = useGenre<Movie[]>('movie', 10_751)
  const fantasy = useGenre<Movie[]>('movie', 14)
  const history = useGenre<Movie[]>('movie', 36)
  const horror = useGenre<Movie[]>('movie', 27)
  const mystery = useGenre<Movie[]>('movie', 9648)
  const romance = useGenre<Movie[]>('movie', 10_749)
  const sciFi = useGenre<Movie[]>('movie', 878)
  const western = useGenre<Movie[]>('movie', 37)

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
