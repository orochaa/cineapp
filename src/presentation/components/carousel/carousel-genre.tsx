import { BackdropSize, IMovie, IMovieGenre, ITv, ITvGenre } from '@/domain/api'
import {
  Card,
  Carousel,
  ICarouselHandles,
  SelectGenreValue
} from '@/presentation/components'
import { formatGenre } from '@/presentation/helpers'
import { useEffect, useMemo, useRef, useState } from 'react'

interface CarouselGenreProps {
  genre: IMovieGenre | ITvGenre | string
  selectedGenre: SelectGenreValue
  list: Array<IMovie | ITv> | undefined
  type: 'tv' | 'movies'
}

export function CarouselGenre (props: CarouselGenreProps) {
  const [visible, setVisible] = useState(true)
  const carouselRef = useRef<ICarouselHandles>(null)

  const filteredList = useMemo(
    () => props.list?.filter(person => person.backdrop_path !== null),
    [props.list]
  )

  useEffect(() => {
    const isGenreSelected = props.selectedGenre === props.genre
    setVisible(isGenreSelected || props.selectedGenre === '*')
    carouselRef.current?.setGrid(isGenreSelected)
    carouselRef.current?.setAxisX(0)
  }, [props.selectedGenre])

  if (!filteredList?.length) return <span></span>

  return (
    <section className={visible ? 'block' : 'hidden'}>
      <Carousel
        ref={carouselRef}
        title={formatGenre(props.genre as any)}
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
            name={item.title || item.name}
            rating={item.vote_average}
          />
        ))}
      </Carousel>
    </section>
  )
}
