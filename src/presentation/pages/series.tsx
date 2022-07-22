import { ITv } from '@/domain/api'
import { Carousel, Header, Main } from '../components'
import { useFetch } from '../hooks'
import { useGenre } from '../hooks/use-genre'

export function SeriesPage () {
  const { data: trending } = useFetch<ITv[]>('/trending/tv/week')
  const { data: topRated } = useFetch<ITv[]>('/tv/top_rated')
  const { data: current } = useFetch<ITv[]>('/tv/on_the_air')
  const actionAdventure = useGenre<ITv[]>('tv', 10759)
  const animation = useGenre<ITv[]>('tv', 35)
  const crime = useGenre<ITv[]>('tv', 80)
  const documentary = useGenre<ITv[]>('tv', 99)
  const drama = useGenre<ITv[]>('tv', 18)
  const family = useGenre<ITv[]>('tv', 10751)
  const kids = useGenre<ITv[]>('tv', 10762)
  const mystery = useGenre<ITv[]>('tv', 9648)
  const news = useGenre<ITv[]>('tv', 10763)
  const reality = useGenre<ITv[]>('tv', 10764)
  const sciFi = useGenre<ITv[]>('tv', 10765)
  const soap = useGenre<ITv[]>('tv', 10766)
  const talk = useGenre<ITv[]>('tv', 10767)
  const western = useGenre<ITv[]>('tv', 37)

  return (
    <>
      <Header />
      <Main>
        <Carousel title="Populares" list={trending} />
        <Carousel title="Bem Avaliados" list={topRated} />
        <Carousel title="Atuais" list={current} />
        <Carousel title="Ação e Aventura" list={actionAdventure} />
        <Carousel title="Animação" list={animation} />
        <Carousel title="Crime" list={crime} />
        <Carousel title="Documentário" list={documentary} />
        <Carousel title="Drama" list={drama} />
        <Carousel title="Familia" list={family} />
        <Carousel title="Kids" list={kids} />
        <Carousel title="Suspense" list={mystery} />
        <Carousel title="Noticia" list={news} />
        <Carousel title="Reality" list={reality} />
        <Carousel title="Ficção Cientifica" list={sciFi} />
        <Carousel title="Novela" list={soap} />
        <Carousel title="TalkShow" list={talk} />
        <Carousel title="Faroeste" list={western} />
      </Main>
    </>
  )
}
