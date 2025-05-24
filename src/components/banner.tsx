import React from 'react'
import type { ReactNode } from 'react'

interface BannerProps {
  media: MovieDetails | TvShowDetails | undefined
  children: ReactNode
}

export function Banner(props: BannerProps): React.JSX.Element {
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
          width: '100%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, #000000cf, #000000be',
        }}
      />
      <div className="absolute bottom-[10%] left-[5%] rounded-l-sm border-l-4 border-purple-600 bg-[#0003] p-4 sm:max-w-[60%]">
        <div className="flex flex-wrap items-center gap-1 pl-1 text-base text-neutral-300">
          {children}
        </div>
        <h1 className="text-4xl font-bold text-neutral-100 sm:text-6xl">
          {media?.title ?? media?.name}
        </h1>
        <p className="text-base text-neutral-200 sm:text-lg">
          {media?.tagline}
        </p>
      </div>
    </section>
  )
}
