'use client'

import { Main } from '@/components/Main'
import { SelectGenre } from '@/components/SelectGenre'
import { CarouselGenre } from '@/components/carousel/CarouselGenre'
import { movieSchema } from '@/lib/api/movie'
import { genreFetch } from '@/lib/genre-fetch'
import { safeFetch } from '@/lib/safe-fetch'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export default async function MoviesPage() {
  const router = useRouter()

  const [
    trending,
    topRated,
    upcoming,
    action,
    adventure,
    animation,
    comedy,
    crime,
    documentary,
    drama,
    family,
    fantasy,
    history,
    horror,
    mystery,
    romance,
    sciFi,
    western
  ] = await Promise.all([
    safeFetch({
      uri: '/trending/movie/week',
      cache: 'force-cache',
      schema: z.array(movieSchema)
    }),
    safeFetch({
      uri: '/movie/top_rated',
      cache: 'force-cache',
      schema: z.array(movieSchema)
    }),
    safeFetch({
      uri: '/movie/upcoming',
      cache: 'force-cache',
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 28,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 12,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 16,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 35,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 80,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 99,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 18,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 10751,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 14,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 36,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 27,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 9648,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 10749,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 878,
      schema: z.array(movieSchema)
    }),
    genreFetch({
      type: 'movie',
      genreId: 37,
      schema: z.array(movieSchema)
    })
  ])

  return (
    <Main>
      <SelectGenre
        title="Filmes"
        onSelect={genre => {
          router.push(`/movies/genre/${genre}`)
        }}
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
      <CarouselGenre genre="Populares" type="movies" list={trending} />
      <CarouselGenre genre="Bem Avaliados" type="movies" list={topRated} />
      <CarouselGenre genre="Em Breve" type="movies" list={upcoming} />
      <CarouselGenre genre="action" type="movies" list={action} />
      <CarouselGenre genre="adventure" type="movies" list={adventure} />
      <CarouselGenre genre="animation" type="movies" list={animation} />
      <CarouselGenre genre="comedy" type="movies" list={comedy} />
      <CarouselGenre genre="crime" type="movies" list={crime} />
      <CarouselGenre genre="documentary" type="movies" list={documentary} />
      <CarouselGenre genre="drama" type="movies" list={drama} />
      <CarouselGenre genre="family" type="movies" list={family} />
      <CarouselGenre genre="fantasy" type="movies" list={fantasy} />
      <CarouselGenre genre="history" type="movies" list={history} />
      <CarouselGenre genre="horror" type="movies" list={horror} />
      <CarouselGenre genre="mystery" type="movies" list={mystery} />
      <CarouselGenre genre="romance" type="movies" list={romance} />
      <CarouselGenre genre="sciFi" type="movies" list={sciFi} />
      <CarouselGenre genre="western" type="movies" list={western} />
    </Main>
  )
}
