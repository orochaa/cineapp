import { IMovie, ITv } from '@/domain/api'
import { Backdrop } from './backdrop'

interface BannerProps {
  movie: IMovie
  tv: ITv
}

export function Banner ({ movie, tv }: BannerProps) {
  return (
    <div className="flex gap-2 my-4">
      <Backdrop
        backdrop={movie}
        title={movie.title}
        size="w1280"
        className="w-1/2 text-2xl"
      />
      <Backdrop
        backdrop={tv}
        title={tv.name}
        size="w1280"
        className="w-1/2 text-2xl"
      />
    </div>
  )
}
