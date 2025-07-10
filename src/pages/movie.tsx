import { Banner } from '@/components/banner'
import { CarouselPeople } from '@/components/carousel/carousel-people'
import { Main } from '@/components/main'
import { Similar } from '@/components/similar'
import { Stars } from '@/components/stars'
import { VideoPlayer } from '@/components/video-player'
import { useFetch } from '@/hooks/use-fetch'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BsFillPlayFill } from 'react-icons/bs'
import { CgAsterisk } from 'react-icons/cg'
import { MdAttachMoney, MdMoneyOff } from 'react-icons/md'
import { useParams } from 'react-router'

const formatCurrency = (n: number | undefined): string => {
  return n === undefined ? '?' : n.toLocaleString()
}

export function MoviePage(): React.JSX.Element {
  const { movieId } = useParams()
  const { data: movie } = useFetch<MovieDetails>(`/movie/${movieId}`)
  const { data: videos } = useFetch<MovieVideo[]>(`/movie/${movieId}/videos`)
  const { data: credits } = useFetch<MovieCredits>(`/movie/${movieId}/credits`)
  const { data: similar } = useFetch<Movie[]>(`/movie/${movieId}/similar`)
  const { data: providers } = useFetch<MovieProviders>(
    `/movie/${movieId}/watch/providers`
  )

  const [showVideo, setShowVideo] = useState(false)

  const handleCloseVideo = useCallback(() => {
    setShowVideo(false)
  }, [])

  const handleShowVideo = useCallback(() => {
    setShowVideo(true)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [movieId])

  return (
    <Main className="pb-20">
      <Banner media={movie}>
        <>
          <Stars rating={movie?.vote_average} starClassName="size-4" />
          <CgAsterisk />
          {movie?.genres.map(genre => genre.name).join(', ')}
          <CgAsterisk />
          {new Date(movie?.release_date ?? '').toLocaleDateString()}
        </>
      </Banner>

      {!!(showVideo && videos) &&
        createPortal(
          <div
            className="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-[#000a] transition-all"
            onClick={handleCloseVideo}
          >
            <VideoPlayer
              playing
              url={`https://www.youtube.com/watch?v=${videos.find(video => /trailer/i.test(video.name))?.key}`}
            />
          </div>,
          document.body
        )}

      <section className="mx-auto flex w-11/12 max-w-6xl flex-col gap-6 py-20 sm:flex-row">
        <div className="relative sm:min-w-[50%] md:min-w-[33%]">
          <img
            src={''.concat(
              import.meta.env.VITE_API_IMAGE_URL,
              '/w500' as PosterSize,
              movie?.poster_path ?? ''
            )}
            alt={movie?.title}
            className="block w-full max-w-fit brightness-90"
          />
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center bg-[#0005] opacity-0 transition-opacity duration-300 hover:opacity-100"
            title="Watch trailer"
            onClick={handleShowVideo}
          >
            <BsFillPlayFill className="text-8xl" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="py-2 text-center text-4xl text-slate-300">
            Information
          </h2>
          <p>
            <span className="mr-2 text-xl text-slate-400">Original Title:</span>
            {movie?.original_title}
          </p>
          <p>
            <span className="mr-2 text-xl text-slate-400">Synopsis:</span>
            {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
            {movie?.overview?.trim() || 'No information about 🙁'}
          </p>
          <p>
            <span className="mr-2 text-xl text-slate-400">Budget:</span>
            <MdMoneyOff className="inline text-red-500" size={20} />
            {formatCurrency(movie?.budget)}
          </p>
          <p>
            <span className="mr-2 text-xl text-slate-400">Revenue:</span>
            <MdAttachMoney className="inline text-green-500" size={20} />
            {formatCurrency(movie?.revenue)}
          </p>
          {!!providers?.BR?.flatrate && (
            <>
              <p className="mr-2 text-xl text-slate-400">Where to watch:</p>
              <div className="flex gap-3">
                {providers.BR.flatrate.map(provider => (
                  <img
                    key={provider.provider_id}
                    src={''.concat(
                      import.meta.env.VITE_API_IMAGE_URL,
                      '/w45' as LogoSize,
                      provider.logo_path || ''
                    )}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    className="rounded-xs"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CarouselPeople title="Cast" list={credits?.cast} />

      <CarouselPeople title="Production" list={credits?.crew} />
      <div className="mx-auto w-11/12">
        <Similar list={similar} type="movies" />
      </div>
    </Main>
  )
}
