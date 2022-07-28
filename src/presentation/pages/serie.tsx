import {
  LogoSize,
  PosterSize,
  ITv,
  ITvCredits,
  ITvDetails,
  ITvProviders,
  ITvVideo
} from '@/domain/api'
import {
  CarouselPeople,
  Header,
  Main,
  Similar,
  VideoPlayer
} from '@/presentation/components'
import { useFetch } from '@/presentation/hooks'
import { CgAsterisk } from 'react-icons/cg'
import { BsFillPlayFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Banner } from '../components/banner'

export function SeriePage () {
  const { serieId } = useParams()
  const { data: serie } = useFetch<ITvDetails>(`/tv/${serieId}`)
  const { data: videos } = useFetch<ITvVideo[]>(`/tv/${serieId}/videos`)
  const { data: credits } = useFetch<ITvCredits>(`/tv/${serieId}/credits`)
  const { data: similar } = useFetch<ITv[]>(`/tv/${serieId}/similar`)
  const { data: providers } = useFetch<ITvProviders>(
    `/tv/${serieId}/watch/providers`
  )

  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [serieId])

  return (
    <>
      <Header />

      {showVideo && videos && (
        <div
          className="fixed inset-0 flex items-center justify-center h-screen w-screen bg-[#000a] z-20 transition-all"
          onClick={() => setShowVideo(false)}
        >
          <VideoPlayer
            playing={true}
            url={`https://www.youtube.com/watch?v=${
              videos.find(video => /trailer/i.test(video.name))?.key ||
              videos[0]?.key
            }`}
          />
        </div>
      )}

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
        <section className="w-full lg:w-9/12 m-auto">
          <div className="flex flex-col sm:flex-row gap-6 p-8">
            <div className="relative sm:min-w-[50%] md:min-w-[33%]">
              <img
                src={''.concat(
                  import.meta.env.VITE_API_IMAGE_URL,
                  '/w500' as PosterSize,
                  serie?.poster_path || ''
                )}
                alt={serie?.title}
                className="block brightness-90 w-full max-w-fit"
              />
              <button
                className="
                absolute inset-0
                flex items-center justify-center
                bg-[#0005] transition-opacity duration-300
                opacity-0 hover:opacity-100
              "
                title="Assistir trailer"
                onClick={() => setShowVideo(true)}
              >
                <BsFillPlayFill className="text-8xl" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-4xl text-slate-300 text-center py-2">
                Informações
              </h2>
              <p>
                <span className="text-xl text-slate-400 mr-2">
                  Titulo original:
                </span>
                {serie?.original_name}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Sinopse:</span>
                {serie?.overview || 'Sem informações sobre 🙁'}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Criado por:</span>
                {serie?.created_by.map(writer => writer.name).join(', ')}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">
                  Período de Produção:
                </span>
                {serie?.first_air_date.split('-').reverse().join('/')}
                {' - '}
                {serie?.last_air_date.split('-').reverse().join('/') || '*'}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Status:</span>
                {serie?.in_production ? 'Em produção' : 'Encerrado'}
              </p>
              {providers?.BR?.flatrate && (
                <>
                  <p className="text-xl text-slate-400 mr-2">Onde assistir:</p>
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
                        className="rounded-sm"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <CarouselPeople title="Elenco" list={credits?.cast} />

          <CarouselPeople title="Produção" list={credits?.crew} />

          <h2 className="text-title text-2xl pt-6 pb-4">Temporadas</h2>
          <ul className="flex flex-col gap-4">
            {serie?.seasons.map(season => (
              <li
                key={season.id}
                className="flex bg-primary shadow shadow-black"
              >
                <img
                  src={''.concat(
                    import.meta.env.VITE_API_IMAGE_URL,
                    '/w185' as PosterSize,
                    season.poster_path
                  )}
                  alt={season.name}
                  className="object-contain max-w-[40%] shadow-inner shadow-slate-900"
                />
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {season.name} - {season.episode_count} episódios
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300">
                    {season.overview || 'Sem informações sobre 🙁'}
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
