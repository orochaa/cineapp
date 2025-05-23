import { CarouselPeople } from '@/components/carousel/carousel-people'
import { Header } from '@/components/header'
import { Main } from '@/components/main'
import { Similar } from '@/components/similar'
import { VideoPlayer } from '@/components/video-player'
import { useFetch } from '@/hooks/use-fetch'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [serieId])

  return (
    <>
      <Header />

      {showVideo && videos ? (
        <div
          className="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-[#000a] transition-all"
          onClick={() => setShowVideo(false)}
        >
          <VideoPlayer
            playing
            url={`https://www.youtube.com/watch?v=${
              videos.find(video => /trailer/i.test(video.name))?.key ??
              videos[0]?.key
            }`}
          />
        </div>
      ) : null}

      <Banner media={serie}>
        <>
          {serie?.first_air_date.split('-').reverse().join('/')}
          <CgAsterisk />
          {serie?.genres.map(genre => genre.name).join(', ')}
          <CgAsterisk />
          {serie?.number_of_seasons} Temporadas
          <CgAsterisk />
          {serie?.number_of_episodes} Episódios
        </>
      </Banner>

      <Main>
        <section className="m-auto w-full lg:w-9/12">
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
                title="Assistir trailer"
                onClick={() => setShowVideo(true)}
              >
                <BsFillPlayFill className="text-8xl" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="py-2 text-center text-4xl text-slate-300">
                Informações
              </h2>
              <p>
                <span className="mr-2 text-xl text-slate-400">
                  Titulo original:
                </span>
                {serie?.original_name}
              </p>
              <p>
                <span className="mr-2 text-xl text-slate-400">Sinopse:</span>
                {serie?.overview ?? 'Sem informações sobre 🙁'}
              </p>
              <p>
                <span className="mr-2 text-xl text-slate-400">Criado por:</span>
                {serie?.created_by.map(writer => writer.name).join(', ')}
              </p>
              <p>
                <span className="mr-2 text-xl text-slate-400">
                  Período de Produção:
                </span>
                {serie?.first_air_date.split('-').reverse().join('/')}
                {' - '}
                {serie?.last_air_date.split('-').reverse().join('/') ?? '*'}
              </p>
              <p>
                <span className="mr-2 text-xl text-slate-400">Status:</span>
                {serie?.in_production ? 'Em produção' : 'Encerrado'}
              </p>
              {providers?.BR?.flatrate ? (
                <>
                  <p className="mr-2 text-xl text-slate-400">Onde assistir:</p>
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
              ) : null}
            </div>
          </div>

          <CarouselPeople title="Elenco" list={credits?.cast} />

          <CarouselPeople title="Produção" list={credits?.crew} />

          <h2 className="text-title pt-6 pb-4 text-2xl">Temporadas</h2>
          <ul className="flex flex-col gap-4">
            {serie?.seasons.map(season => (
              <li
                key={season.id}
                className="bg-primary flex shadow-sm shadow-black"
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
                    {season.name} - {season.episode_count} episódios
                  </h3>
                  <p className="text-sm text-zinc-300 sm:text-base">
                    {season.overview ?? 'Sem informações sobre 🙁'}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Similar type="tv" list={similar} />
        </section>
      </Main>
    </>
  )
}
