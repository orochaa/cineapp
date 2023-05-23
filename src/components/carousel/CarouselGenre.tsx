import { Card } from '@/components/Card'
import { Carousel } from '@/components/carousel/Carousel'
import { formatGenre } from '@/lib/api/genre'
import { Movie, MovieGenre } from '@/lib/api/movie'
import { Tv, TvGenre } from '@/lib/api/tv'
import { formatImageRequest } from '@/lib/request'

interface CarouselGenreProps {
  genre: MovieGenre | TvGenre | string
  list: (Movie | Tv)[]
  type: 'tv' | 'movies'
}

export function CarouselGenre(props: CarouselGenreProps) {
  return (
    <section>
      <Carousel title={formatGenre(props.genre as any)} cardLength={300}>
        {props.list
          .filter(person => !!person.backdrop_path)
          .map((person, index) => (
            <Card
              key={index}
              redirect={`/${props.type}/${person.id}`}
              imageUrl={formatImageRequest({
                type: 'backdrop',
                size: '/w300',
                path: person.backdrop_path!
              })}
              height={170}
              width={300}
              name={person.title ?? person.name}
              rating={person.vote_average}
            />
          ))}
      </Carousel>
    </section>
  )
}
