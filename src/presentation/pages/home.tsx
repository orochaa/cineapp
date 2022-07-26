import { IMovie, ITv } from '@/domain/api'
import { Card, CarouselGenre, Header, Main } from '@/presentation/components'
import { useFetch } from '@/presentation/hooks'

export function Home () {
  const { data: popularMovies } = useFetch<IMovie[]>('/movie/popular')
  const { data: topRatedMovies } = useFetch<IMovie[]>('/movie/top_rated')
  const { data: popularTv } = useFetch<ITv[]>('/tv/popular')
  const { data: topRatedTv } = useFetch<ITv[]>('/tv/top_rated')

  if (!popularMovies?.length || !popularTv?.length) return <Main> </Main>

  return (
    <>
      <Header />
      <Main>
        <div className="flex gap-2 my-4">
          <Card
            imageUrl={''.concat(
              import.meta.env.VITE_API_IMAGE_URL,
              '/w1280',
              popularMovies[0].backdrop_path
            )}
            name={popularMovies[0].title}
            rating={popularMovies[0].vote_average}
            uri={`/movies/${popularMovies[0].id}`}
            className="w-1/2 text-2xl"
          />
          <Card
            imageUrl={''.concat(
              import.meta.env.VITE_API_IMAGE_URL,
              '/w1280',
              popularTv[0].backdrop_path
            )}
            name={popularTv[0].name}
            rating={popularTv[0].vote_average}
            uri={`/tv/${popularTv[0].id}`}
            className="w-1/2 text-2xl"
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
    </>
  )
}
