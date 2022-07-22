import { IMovie, ITv } from '@/domain/api'
import { Banner, Carousel, Header, Main } from '@/presentation/components'
import { useFetch } from '../hooks'

export function Home () {
  const { data: popularMovies } = useFetch<IMovie[]>('/movie/popular')
  const { data: topRatedMovies } = useFetch<IMovie[]>('/movie/top_rated')
  const { data: popularTv } = useFetch<ITv[]>('/tv/popular')
  const { data: topRatedTv } = useFetch<ITv[]>('/tv/top_rated')

  if (!popularMovies || !topRatedMovies || !popularTv || !topRatedTv) {
    return <p>loading...</p>
  }

  return (
    <>
      <Header />
      <Main>
        <h1 className="text-2xl">Em Alta</h1>
        <Banner movie={popularMovies[0]} tv={popularTv[0]} />
        <h2 className="text-xl">Filmes Populares</h2>
        <Carousel list={popularMovies.slice(1, popularMovies.length)} />
        <h2 className="text-xl">Filmes Bem Avaliados</h2>
        <Carousel list={topRatedMovies} />
        <h2 className="text-xl">Séries Populares</h2>
        <Carousel list={popularTv.slice(1, popularTv.length)} />
        <h2 className="text-xl">Séries Bem Avaliados</h2>
        <Carousel list={topRatedTv} />
      </Main>
    </>
  )
}
