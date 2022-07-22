import { IMovie } from '@/domain/api'
import { Carousel, Header, Main } from '../components'
import { useFetch } from '../hooks'
import { useGenre } from '../hooks/use-genre'

export function MoviesPage () {
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
        <Carousel title="Populares" list={trending} />
        <Carousel title="Bem Avaliados" list={topRated} />
        <Carousel title="Em Breve" list={upcoming} />
        <Carousel title="Ação" list={action} />
        <Carousel title="Aventura" list={adventure} />
        <Carousel title="Animação" list={animation} />
        <Carousel title="Comédia" list={comedy} />
        <Carousel title="Crime" list={crime} />
        <Carousel title="Documentário" list={documentary} />
        <Carousel title="Drama" list={drama} />
        <Carousel title="Familia" list={family} />
        <Carousel title="Fantasia" list={fantasy} />
        <Carousel title="História" list={history} />
        <Carousel title="Terror" list={horror} />
        <Carousel title="Suspense" list={mystery} />
        <Carousel title="Romance" list={romance} />
        <Carousel title="Ficção Cientifica" list={sciFi} />
        <Carousel title="Faroeste" list={western} />
      </Main>
    </>
  )
}
