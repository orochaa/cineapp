import { IMovie, ITv } from '@/domain/api'
import { Banner, Carousel, Header, Main } from '@/presentation/components'
import { useFetch } from '../hooks'

export function Home () {
  const { data: popularMovies } = useFetch<IMovie[]>('/movie/popular')
  const { data: topRatedMovies } = useFetch<IMovie[]>('/movie/top_rated')
  const { data: popularTv } = useFetch<ITv[]>('/tv/popular')
  const { data: topRatedTv } = useFetch<ITv[]>('/tv/top_rated')

  return (
    <>
      <Header />
      <Main>
        <Banner movie={popularMovies ? popularMovies[0] : undefined} tv={popularTv ? popularTv[0] : undefined} />
        <Carousel title="Filmes Populares" list={popularMovies?.slice(1, popularMovies.length)} />
        <Carousel title="Filmes Bem Avaliados" list={topRatedMovies} />
        <Carousel title="Séries Populares" list={popularTv?.slice(1, popularTv.length)} />
        <Carousel title="Séries Bem Avaliados" list={topRatedTv} />
      </Main>
    </>
  )
}
