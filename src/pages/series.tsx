import { CarouselGenre } from '@/components/carousel/carousel-genre'
import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { SelectGenre } from '@/components/select-genre'
import type { SelectGenreValue } from '@/components/select-genre'
import { useFetch } from '@/hooks/use-fetch'
import { useGenre } from '@/hooks/use-genre'
import { useState } from 'react'

export function SeriesPage(): React.JSX.Element {
  const [genre, setGenre] = useState<SelectGenreValue>('*')

  const { data: trending } = useFetch<TvShow[]>('/trending/tv/week')
  const { data: topRated } = useFetch<TvShow[]>('/tv/top_rated')
  const { data: current } = useFetch<TvShow[]>('/tv/on_the_air')
  const actionAdventure = useGenre<TvShow[]>('tv', 10_759)
  const animation = useGenre<TvShow[]>('tv', 35)
  const crime = useGenre<TvShow[]>('tv', 80)
  const documentary = useGenre<TvShow[]>('tv', 99)
  const drama = useGenre<TvShow[]>('tv', 18)
  const family = useGenre<TvShow[]>('tv', 10_751)
  const kids = useGenre<TvShow[]>('tv', 10_762)
  const mystery = useGenre<TvShow[]>('tv', 9648)
  const news = useGenre<TvShow[]>('tv', 10_763)
  const reality = useGenre<TvShow[]>('tv', 10_764)
  const sciFi = useGenre<TvShow[]>('tv', 10_765)
  const soap = useGenre<TvShow[]>('tv', 10_766)
  const talk = useGenre<TvShow[]>('tv', 10_767)
  const western = useGenre<TvShow[]>('tv', 37)

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
            'western',
          ]}
        />
        <CarouselGenre
          type="tv"
          genre="Populares"
          selectedGenre={genre}
          list={trending}
        />
        <CarouselGenre
          type="tv"
          genre="Bem Avaliados"
          selectedGenre={genre}
          list={topRated}
        />
        <CarouselGenre
          type="tv"
          genre="Atuais"
          selectedGenre={genre}
          list={current}
        />
        <CarouselGenre
          type="tv"
          genre="actionAdventure"
          selectedGenre={genre}
          list={actionAdventure}
        />
        <CarouselGenre
          type="tv"
          genre="animation"
          selectedGenre={genre}
          list={animation}
        />
        <CarouselGenre
          type="tv"
          genre="crime"
          selectedGenre={genre}
          list={crime}
        />
        <CarouselGenre
          type="tv"
          genre="documentary"
          selectedGenre={genre}
          list={documentary}
        />
        <CarouselGenre
          type="tv"
          genre="drama"
          selectedGenre={genre}
          list={drama}
        />
        <CarouselGenre
          type="tv"
          genre="family"
          selectedGenre={genre}
          list={family}
        />
        <CarouselGenre
          type="tv"
          genre="kids"
          selectedGenre={genre}
          list={kids}
        />
        <CarouselGenre
          type="tv"
          genre="mystery"
          selectedGenre={genre}
          list={mystery}
        />
        <CarouselGenre
          type="tv"
          genre="news"
          selectedGenre={genre}
          list={news}
        />
        <CarouselGenre
          type="tv"
          genre="reality"
          selectedGenre={genre}
          list={reality}
        />
        <CarouselGenre
          type="tv"
          genre="sciFi"
          selectedGenre={genre}
          list={sciFi}
        />
        <CarouselGenre
          type="tv"
          genre="soap"
          selectedGenre={genre}
          list={soap}
        />
        <CarouselGenre
          type="tv"
          genre="talk"
          selectedGenre={genre}
          list={talk}
        />
        <CarouselGenre
          type="tv"
          genre="western"
          selectedGenre={genre}
          list={western}
        />
      </Main>
    </>
  )
}
