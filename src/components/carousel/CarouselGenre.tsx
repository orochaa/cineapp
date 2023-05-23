'use client'

import { Card } from '@/components/Card'
import { Carousel, ICarouselHandles } from '@/components/carousel/Carousel'
import { formatGenre } from '@/lib/api/genre'
import { Movie, MovieGenre } from '@/lib/api/movie'
import { Tv, TvGenre } from '@/lib/api/tv'
import { formatImageRequest } from '@/lib/request'
import { useEffect, useMemo, useRef, useState } from 'react'

interface CarouselGenreProps {
  genre: MovieGenre | TvGenre | Omit<string, MovieGenre | TvGenre>
  selectedGenre: MovieGenre | TvGenre | Omit<string, MovieGenre | TvGenre>
  list: (Movie | Tv)[] | undefined
  type: 'tv' | 'movies'
}

export function CarouselGenre(props: CarouselGenreProps) {
  const [visible, setVisible] = useState(true)
  const carouselRef = useRef<ICarouselHandles>(null)

  const filteredList = useMemo(
    () => props.list?.filter(item => !!item.backdrop_path),
    [props.list]
  )

  useEffect(() => {
    const isGenreSelected = props.selectedGenre === props.genre
    setVisible(isGenreSelected || props.selectedGenre === '*')
    carouselRef.current?.setGrid(isGenreSelected)
    carouselRef.current?.setAxisX(0)
  }, [props.selectedGenre])

  return (
    <section className={visible ? 'block' : 'hidden'}>
      <Carousel title={formatGenre(props.genre as any)} cardLength={300}>
        {filteredList?.map((item, index) => (
          <Card
            key={index}
            redirect={`/${props.type}/${item.id}`}
            imageUrl={formatImageRequest({
              type: 'backdrop',
              size: '/w300',
              path: item.backdrop_path!
            })}
            height={170}
            width={300}
            name={item.title ?? item.name}
            rating={item.vote_average}
          />
        ))}
      </Carousel>
    </section>
  )
}
