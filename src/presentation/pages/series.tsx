import { ITv } from '@/domain/api'
import { CarouselGenre, Header, Main, SelectGenre, SelectGenreValue } from '@/presentation/components'
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
        <CarouselGenre type="tv" genre="Populares" selectedGenre={genre} list={trending} />
        <CarouselGenre type="tv" genre="Bem Avaliados" selectedGenre={genre}list={topRated} />
        <CarouselGenre type="tv" genre="Atuais" selectedGenre={genre} list={current} />
        <CarouselGenre type="tv" genre="actionAdventure" selectedGenre={genre} list={actionAdventure} />
        <CarouselGenre type="tv" genre="animation" selectedGenre={genre} list={animation} />
        <CarouselGenre type="tv" genre="crime" selectedGenre={genre} list={crime} />
        <CarouselGenre type="tv" genre="documentary" selectedGenre={genre} list={documentary} />
        <CarouselGenre type="tv" genre="drama" selectedGenre={genre} list={drama} />
        <CarouselGenre type="tv" genre="family" selectedGenre={genre} list={family} />
        <CarouselGenre type="tv" genre="kids" selectedGenre={genre} list={kids} />
        <CarouselGenre type="tv" genre="mystery" selectedGenre={genre} list={mystery} />
        <CarouselGenre type="tv" genre="news" selectedGenre={genre} list={news} />
        <CarouselGenre type="tv" genre="reality" selectedGenre={genre} list={reality} />
        <CarouselGenre type="tv" genre="sciFi" selectedGenre={genre} list={sciFi} />
        <CarouselGenre type="tv" genre="soap" selectedGenre={genre} list={soap} />
        <CarouselGenre type="tv" genre="talk" selectedGenre={genre} list={talk} />
        <CarouselGenre type="tv" genre="western" selectedGenre={genre} list={western} />
      </Main>
    </>
  )
}
