import { Card } from '@/components/card'
import type { CarouselHandles } from '@/components/carousel/carousel'
import { Carousel } from '@/components/carousel/carousel'
import type { SelectGenreValue } from '@/components/select-genre'
import { formatGenre } from '@/lib/format.js'
import type { GenreType } from '@/lib/format.js'
import { useEffect, useMemo, useRef, useState } from 'react'

interface CarouselGenreProps {
  genre: MovieGenre | TvShowGenre | (string & {})
  selectedGenre: SelectGenreValue
  list: (Movie | TvShow)[] | undefined
  type: 'tv' | 'movies'
}

export function CarouselGenre(props: CarouselGenreProps): React.JSX.Element {
  const [visible, setVisible] = useState(true)
  const carouselRef = useRef<CarouselHandles>(null)

  const filteredList = useMemo(
    () => props.list?.filter(person => !!person.backdrop_path),
    [props.list]
  )

  useEffect(() => {
    const isGenreSelected = props.selectedGenre === props.genre
    setVisible(isGenreSelected || props.selectedGenre === '*')
    carouselRef.current?.setGrid(isGenreSelected)
    carouselRef.current?.setAxisX(0)
  }, [props.genre, props.selectedGenre])

  if (!filteredList?.length) {
    return <span />
  }

  return (
    <section className={visible ? 'block' : 'hidden'}>
      <Carousel
        ref={carouselRef}
        title={formatGenre(props.genre as GenreType)}
        cardLength={300}
      >
        {filteredList.map((item, index) => (
          <Card
            key={index}
            uri={`/${props.type}/${item.id}`}
            imageUrl={''.concat(
              import.meta.env.VITE_API_IMAGE_URL,
              '/w300' as BackdropSize,
              item.backdrop_path
            )}
            name={item.title ?? item.name}
            rating={item.vote_average}
          />
        ))}
      </Carousel>
    </section>
  )
}
