import type {
  BackdropSize,
  IMovie,
  IMovieGenre,
  ITv,
  ITvGenre,
} from '@/domain/api'
import { Card, Carousel } from '@/presentation/components'
import type {
  ICarouselHandles,
  SelectGenreValue,
} from '@/presentation/components'
import { formatGenre } from '@/presentation/helpers/format.js'
import type { GenreType } from '@/presentation/helpers/format.js'
import { useEffect, useMemo, useRef, useState } from 'react'

interface CarouselGenreProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  genre: IMovieGenre | ITvGenre | (string & {})
  selectedGenre: SelectGenreValue
  list: (IMovie | ITv)[] | undefined
  type: 'tv' | 'movies'
}

export function CarouselGenre(props: CarouselGenreProps): React.JSX.Element {
  const [visible, setVisible] = useState(true)
  const carouselRef = useRef<ICarouselHandles>(null)

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

  if (!filteredList?.length) return <span />

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
