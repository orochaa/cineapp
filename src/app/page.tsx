import { Card } from '@/components/Card'
import { Main } from '@/components/Main'
import { CarouselGenre } from '@/components/carousel/CarouselGenre'
import { Movie, movieSchema } from '@/lib/api/movie'
import { Tv, tvSchema } from '@/lib/api/tv'
import { formatImageRequest } from '@/lib/request'
import { safeFetch } from '@/lib/safe-fetch'
import { z } from 'zod'

export default async function Home() {
  const daily = 60 * 60 * 24
  const [popularMovies, popularTv, topRatedMovies, topRatedTv] =
    await Promise.all([
      safeFetch<Movie[]>({
        uri: '/movie/popular',
        schema: z.array(movieSchema),
        revalidate: daily
      }),
      safeFetch<Tv[]>({
        uri: '/tv/popular',
        schema: z.array(tvSchema),
        revalidate: daily
      }),
      safeFetch<Movie[]>({
        uri: '/movie/top_rated',
        schema: z.array(movieSchema),
        revalidate: daily
      }),
      safeFetch<Tv[]>({
        uri: '/tv/top_rated',
        schema: z.array(tvSchema),
        revalidate: daily
      })
    ])

  return (
    <Main>
      <div className="my-4 flex flex-col gap-2 sm:flex-row">
        <Card
          imageUrl={formatImageRequest({
            type: 'backdrop',
            size: '/w1280',
            path: popularMovies[0].backdrop_path
          })}
          height={405}
          width={870}
          name={popularMovies[0].title}
          rating={popularMovies[0].vote_average}
          redirect={`/movies/${popularMovies[0].id}`}
          className="text-2xl sm:w-1/2"
        />
        <Card
          imageUrl={formatImageRequest({
            type: 'backdrop',
            size: '/w1280',
            path: popularTv[0].backdrop_path
          })}
          height={405}
          width={870}
          name={popularTv[0].name}
          rating={popularTv[0].vote_average}
          redirect={`/tv/${popularTv[0].id}`}
          className="text-2xl sm:w-1/2"
        />
      </div>
      <CarouselGenre
        genre="Filmes Populares"
        type="movies"
        selectedGenre="*"
        list={popularMovies?.slice(1, popularMovies.length)}
      />
      <CarouselGenre
        genre="Filmes Bem Avaliados"
        type="movies"
        selectedGenre="*"
        list={topRatedMovies}
      />
      <CarouselGenre
        genre="Séries Populares"
        type="tv"
        selectedGenre="*"
        list={popularTv?.slice(1, popularTv.length)}
      />
      <CarouselGenre
        genre="Séries Bem Avaliados"
        type="tv"
        selectedGenre="*"
        list={topRatedTv}
      />
    </Main>
  )
}
