'use client'

import { Main } from '@/components/Main'
import { SelectGenre } from '@/components/SelectGenre'
import { CarouselGenre } from '@/components/carousel/CarouselGenre'
import { useFetch } from '@/hooks/use-fetch'
import { useGenre } from '@/hooks/use-genre'
import { formatGenre, movieGenre } from '@/lib/api/genre'
import { Movie, movieSchema } from '@/lib/api/movie'
import { objectKeys } from '@/lib/mappers'
import { useState } from 'react'
import { z } from 'zod'

export default function MoviesPage() {
  const [genre, setGenre] = useState('*')

  const { data: trending } = useFetch<Movie[]>(
    '/trending/movie/week',
    z.array(movieSchema)
  )
  const { data: topRated } = useFetch<Movie[]>(
    '/movie/top_rated',
    z.array(movieSchema)
  )
  const { data: upcoming } = useFetch<Movie[]>(
    '/movie/upcoming',
    z.array(movieSchema)
  )
  const action = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.action,
    schema: z.array(movieSchema)
  })
  const adventure = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.adventure,
    schema: z.array(movieSchema)
  })
  const animation = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.animation,
    schema: z.array(movieSchema)
  })
  const comedy = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.comedy,
    schema: z.array(movieSchema)
  })
  const crime = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.crime,
    schema: z.array(movieSchema)
  })
  const documentary = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.documentary,
    schema: z.array(movieSchema)
  })
  const drama = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.drama,
    schema: z.array(movieSchema)
  })
  const family = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.family,
    schema: z.array(movieSchema)
  })
  const fantasy = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.fantasy,
    schema: z.array(movieSchema)
  })
  const history = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.history,
    schema: z.array(movieSchema)
  })
  const horror = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.horror,
    schema: z.array(movieSchema)
  })
  const mystery = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.mystery,
    schema: z.array(movieSchema)
  })
  const romance = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.romance,
    schema: z.array(movieSchema)
  })
  const sciFi = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.sciFi,
    schema: z.array(movieSchema)
  })
  const western = useGenre<Movie[]>({
    type: 'movie',
    genreId: movieGenre.western,
    schema: z.array(movieSchema)
  })

  return (
    <Main>
      <SelectGenre
        title="Filmes"
        onSelect={option => setGenre(option.value)}
        options={objectKeys(movieGenre).map(key => {
          const option = formatGenre(key)
          return {
            label: option,
            value: key
          }
        })}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="Populares"
        type="movies"
        list={trending}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="Bem Avaliados"
        type="movies"
        list={topRated}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="Em Breve"
        type="movies"
        list={upcoming}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="action"
        type="movies"
        list={action}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="adventure"
        type="movies"
        list={adventure}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="animation"
        type="movies"
        list={animation}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="comedy"
        type="movies"
        list={comedy}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="crime"
        type="movies"
        list={crime}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="documentary"
        type="movies"
        list={documentary}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="drama"
        type="movies"
        list={drama}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="family"
        type="movies"
        list={family}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="fantasy"
        type="movies"
        list={fantasy}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="history"
        type="movies"
        list={history}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="horror"
        type="movies"
        list={horror}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="mystery"
        type="movies"
        list={mystery}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="romance"
        type="movies"
        list={romance}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="sciFi"
        type="movies"
        list={sciFi}
      />
      <CarouselGenre
        selectedGenre={genre}
        genre="western"
        type="movies"
        list={western}
      />
    </Main>
  )
}
