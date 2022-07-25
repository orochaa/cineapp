import { IMovie, ITv } from '@/domain/api'
import { Backdrop, Carousel, Header, Loading, Main } from '@/presentation/components'
import { useFetch } from '../hooks'

export function Home () {
  const { data: popularMovies } = useFetch<IMovie[]>('/movie/popular')
  const { data: topRatedMovies } = useFetch<IMovie[]>('/movie/top_rated')
  const { data: popularTv } = useFetch<ITv[]>('/tv/popular')
  const { data: topRatedTv } = useFetch<ITv[]>('/tv/top_rated')

  if (!popularMovies || !popularTv) return <Loading />

  return (
    <>
      <Header />
      <Main>
        <div className="flex gap-2 my-4">
          <Backdrop
            backdrop={popularMovies[0]}
            title={popularMovies[0].title}
            size="w1280"
            className="w-1/2 text-2xl"
          />
          <Backdrop
            backdrop={popularTv[0]}
            title={popularTv[0].name}
            size="w1280"
            className="w-1/2 text-2xl"
          />
        </div>
        <Carousel
          genre="Filmes Populares"
          selectedGenre="*"
          list={popularMovies.slice(1, popularMovies.length)}
        />
        <Carousel
          genre="Filmes Bem Avaliados"
          selectedGenre="*"
          list={topRatedMovies}
        />
        <Carousel
          genre="Séries Populares"
          selectedGenre="*"
          list={popularTv.slice(1, popularTv.length)}
        />
        <Carousel
          genre="Séries Bem Avaliados"
          selectedGenre="*"
          list={topRatedTv}
        />
      </Main>
    </>
  )
}
