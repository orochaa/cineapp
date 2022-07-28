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

export function SeriePage () {
  const { serieId } = useParams()
  const { data: tv } = useFetch<ITvDetails>(`/tv/${serieId}`)
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

      <section className="relative">
        <div
          style={{
            backgroundImage: `url(${
              import.meta.env.VITE_API_IMAGE_URL
            }/original${tv?.backdrop_path})`,
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
          <p className="text-sm sm:text-base text-neutral-300 pl-1 flex flex-wrap items-center gap-1">
            {tv?.first_air_date.split('-').reverse().join('/')}
            <CgAsterisk />
            {tv?.genres.map(genre => genre.name).join(', ')}
            <CgAsterisk />
            {tv?.number_of_seasons} Temporadas
            <CgAsterisk />
            {tv?.number_of_episodes} Episódios
          </p>
          <h1 className="text-4xl sm:text-6xl text-neutral-100 font-bold">
            {tv?.name}
          </h1>
          <p className="text-lg text-neutral-200">{tv?.tagline}</p>
        </div>
      </section>

      <Main>
        <section className="w-full lg:w-9/12 m-auto">
          <div className="flex flex-col sm:flex-row gap-6 p-8">
            <div className="relative sm:min-w-[50%] md:min-w-[33%]">
              <img
                src={''.concat(
                  import.meta.env.VITE_API_IMAGE_URL,
                  '/w500' as PosterSize,
                  tv?.poster_path || ''
                )}
                alt={tv?.title}
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
                {tv?.original_name}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Sinopse:</span>
                {tv?.overview || 'Sem informações sobre 🙁'}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Criado por:</span>
                {tv?.created_by.map(writer => writer.name).join(', ')}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">
                  Período de Produção:
                </span>
                {tv?.first_air_date.split('-').reverse().join('/')}
                {' - '}
                {tv?.last_air_date.split('-').reverse().join('/') || '*'}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Status:</span>
                {tv?.in_production ? 'Em produção' : 'Encerrado'}
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
            {tv?.seasons.map(season => (
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
