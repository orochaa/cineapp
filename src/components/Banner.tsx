import { MovieDetails, TvDetails } from '@/domain/api'

interface BannerProps {
  media: MovieDetails | TvDetails | undefined
  children: any
}

export function Banner(props: BannerProps) {
  const { media, children } = props

  return (
    <section className="relative">
      <div
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_API_IMAGE_URL}/original${media?.backdrop_path})`,
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
      <div className="absolute bottom-[10%] left-[5%] rounded-l-sm border-l-4 border-purple-600 bg-[#0003] p-4 sm:max-w-[60%]">
        <p className="flex flex-wrap items-center gap-1 pl-1 text-sm text-neutral-300 md:text-base">
          {children}
        </p>
        <h1 className="text-4xl font-bold text-neutral-100 sm:text-6xl">
          {media?.title || media?.name}
        </h1>
        <p className="text-base text-neutral-200 sm:text-lg">
          {media?.tagline}
        </p>
      </div>
    </section>
  )
}
