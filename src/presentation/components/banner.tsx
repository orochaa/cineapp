import { IMovieDetails, ITvDetails } from '@/domain/api'

interface BannerProps {
  media: IMovieDetails | ITvDetails | undefined
  children: any
}

export function Banner (props: BannerProps) {
  const { media, children } = props

  return (
    <section className="relative">
        <div
          style={{
            backgroundImage: `url(${
              import.meta.env.VITE_API_IMAGE_URL
            }/original${media?.backdrop_path})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: '50% 20%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '80vh',
            width: '100%'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, #000000cf, #000000be'
          }}
        ></div>
        <div className="absolute left-[5%] bottom-[10%] p-4 border-l-4 border-purple-600 bg-[#0003] rounded-l-sm sm:max-w-[60%]">
          <p className="text-sm md:text-base text-neutral-300 pl-1 flex flex-wrap items-center gap-1">
            {children}
          </p>
          <h1 className="text-4xl sm:text-6xl text-neutral-100 font-bold">
            {media?.title || media?.name}
          </h1>
          <p className="text-base sm:text-lg text-neutral-200">{media?.tagline}</p>
        </div>
      </section>
  )
}
