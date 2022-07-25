import { ITv } from '@/domain/api'
import { Carousel, Header, Main, SelectGenre, SelectGenreValue } from '@/presentation/components'
import { useFetch, useGenre } from '@/presentation/hooks'
import { useState } from 'react'

export function SeriesPage () {
  const [genre, setGenre] = useState<SelectGenreValue>('*')

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
        <SelectGenre
          title="Séries"
          onSet={setGenre}
          options={[
            'actionAdventure',
            'animation',
            'crime',
            'documentary',
            'drama',
            'family',
            'kids',
            'mystery',
            'news',
            'reality',
            'sciFi',
            'soap',
            'talk',
            'western'
          ]}
        />
        <Carousel genre="Populares" selectedGenre={genre} list={trending} />
        <Carousel genre="Bem Avaliados" selectedGenre={genre}list={topRated} />
        <Carousel genre="Atuais" selectedGenre={genre} list={current} />
        <Carousel genre={'actionAdventure'} selectedGenre={genre} list={actionAdventure} />
        <Carousel genre={'animation'} selectedGenre={genre} list={animation} />
        <Carousel genre={'crime'} selectedGenre={genre} list={crime} />
        <Carousel genre={'documentary'} selectedGenre={genre} list={documentary} />
        <Carousel genre={'drama'} selectedGenre={genre} list={drama} />
        <Carousel genre={'family'} selectedGenre={genre} list={family} />
        <Carousel genre={'kids'} selectedGenre={genre} list={kids} />
        <Carousel genre={'mystery'} selectedGenre={genre} list={mystery} />
        <Carousel genre={'news'} selectedGenre={genre} list={news} />
        <Carousel genre={'reality'} selectedGenre={genre} list={reality} />
        <Carousel genre={'sciFi'} selectedGenre={genre} list={sciFi} />
        <Carousel genre={'soap'} selectedGenre={genre} list={soap} />
        <Carousel genre={'talk'} selectedGenre={genre} list={talk} />
        <Carousel genre={'western'} selectedGenre={genre} list={western} />
      </Main>
    </>
  )
}
