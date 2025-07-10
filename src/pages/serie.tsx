import { CarouselPeople } from '@/components/carousel/carousel-people'
import { Main } from '@/components/main'
import { Similar } from '@/components/similar'
import { Stars } from '@/components/stars'
import { VideoPlayer } from '@/components/video-player'
import { useFetch } from '@/hooks/use-fetch'
import { useCallback, useEffect, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { CgAsterisk } from 'react-icons/cg'
import { useParams } from 'react-router'
import { Banner } from '../components/banner'

export function SeriePage(): React.JSX.Element {
  const { serieId } = useParams()
  const { data: serie } = useFetch<TvShowDetails>(`/tv/${serieId}`)
  const { data: videos } = useFetch<TvShowVideo[]>(`/tv/${serieId}/videos`)
  const { data: credits } = useFetch<TvShowCredits>(`/tv/${serieId}/credits`)
  const { data: similar } = useFetch<TvShow[]>(`/tv/${serieId}/similar`)
  const { data: providers } = useFetch<TvShowProviders>(
    `/tv/${serieId}/watch/providers`
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
  }, [serieId])

  return (
    <Main className="pb-20">
      <Banner media={serie}>
        <>
          <Stars rating={serie?.vote_average} starClassName="size-4" />
          <CgAsterisk />
          {serie?.genres.map(genre => genre.name).join(', ')}
          <CgAsterisk />
          {serie?.number_of_seasons} Seasons
          <CgAsterisk />
          {serie?.number_of_episodes} Episodes
        </>
      </Banner>

      {!!(showVideo && videos) && (
        <div
          className="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-[#000a] transition-all"
          onClick={handleCloseVideo}
        >
          <VideoPlayer
            playing
            url={`https://www.youtube.com/watch?v=${
              videos.find(video => /trailer/i.test(video.name))?.key ??
              videos[0]?.key
            }`}
          />
        </div>
      )}

      <section className="mx-auto flex w-11/12 max-w-6xl flex-col gap-6 py-20 sm:flex-row">
        <div className="flex flex-col gap-6 p-8 sm:flex-row">
          <div className="relative sm:min-w-[50%] md:min-w-[33%]">
            <img
              src={''.concat(
                import.meta.env.VITE_API_IMAGE_URL,
                '/w500' as PosterSize,
                serie?.poster_path ?? ''
              )}
              alt={serie?.title}
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
              <span className="mr-2 text-xl text-slate-400">
                Original Title:
              </span>
              {serie?.original_name}
            </p>
            <p>
              <span className="mr-2 text-xl text-slate-400">Synopsis:</span>
              {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
              {serie?.overview?.trim() || 'No information about 🙁'}
            </p>
            <p>
              <span className="mr-2 text-xl text-slate-400">Created by:</span>
              {serie?.created_by.map(writer => writer.name).join(', ')}
            </p>
            <p>
              <span className="mr-2 text-xl text-slate-400">
                Production Period:
              </span>
              {serie?.first_air_date.split('-').reverse().join('/')}
              {' - '}
              {serie?.last_air_date.split('-').reverse().join('/') ?? '*'}
            </p>
            <p>
              <span className="mr-2 text-xl text-slate-400">Status:</span>
              {serie?.in_production ? 'In production' : 'Ended'}
            </p>
            {!!providers?.BR?.flatrate && (
              <>
                <span className="mr-2 text-xl text-slate-400">
                  Where to watch:
                </span>
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
        </div>
      </section>

      <CarouselPeople title="Cast" list={credits?.cast} />

      <CarouselPeople title="Production" list={credits?.crew} />

      <section className="mx-auto w-11/12 max-w-6xl py-20">
        <h2 className="text-title pt-6 pb-4 text-2xl">Seasons</h2>
        <ul className="space-y-4">
          {serie?.seasons.map(season => (
            <li
              key={season.id}
              className="flex bg-[#090b10] shadow-sm shadow-black"
            >
              <img
                src={''.concat(
                  import.meta.env.VITE_API_IMAGE_URL,
                  '/w185' as PosterSize,
                  season.poster_path
                )}
                alt={season.name}
                className="max-w-[40%] object-contain shadow-inner shadow-slate-900"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold sm:text-xl">
                  {season.name} - {season.episode_count} episodes
                </h3>
                <p className="text-sm text-zinc-300 sm:text-base">
                  {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
                  {season.overview?.trim() || 'No information about 🙁'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-11/12 max-w-6xl">
        <Similar type="tv" list={similar} />
      </section>
    </Main>
  )
}
