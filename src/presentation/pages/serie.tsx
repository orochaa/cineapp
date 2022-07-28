import {
  BackdropSize,
  LogoSize,
  PosterSize,
  ProfileSize,
  ITv,
  ITvCredits,
  ITvDetails,
  ITvProviders,
  ITvVideo
} from '@/domain/api'
import {
  Card,
  Carousel,
  Header,
  Main,
  VideoPlayer
} from '@/presentation/components'
import { useFetch } from '@/presentation/hooks'
import { CgAsterisk } from 'react-icons/cg'
import { BsFillPlayFill } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState, CSSProperties } from 'react'

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
        <div className="absolute left-[5%] bottom-[10%] p-4 border-l-4 border-purple-600 bg-[#0003] rounded-l-sm max-w-[60%]">
          <p className="text-base text-neutral-300 pl-1 flex flex-wrap items-center gap-1">
            {tv?.first_air_date.split('-').reverse().join('/')}
            <CgAsterisk />
            {tv?.genres.map(genre => genre.name).join(', ')}
            <CgAsterisk />
            {tv?.number_of_seasons} Temporadas
            <CgAsterisk />
            {tv?.number_of_episodes} Episódios
          </p>
          <h1 className="text-6xl text-neutral-100 font-bold">{tv?.name}</h1>
          <p className="text-lg text-neutral-200">{tv?.tagline}</p>
        </div>
      </section>

      <Main>
        <section className="w-full lg:w-9/12 m-auto">
          <div className="flex gap-6 p-8">
            <div className="relative min-w-fit">
              <img
                src={''.concat(
                  import.meta.env.VITE_API_IMAGE_URL,
                  '/w342' as PosterSize,
                  tv?.poster_path || ''
                )}
                alt={tv?.title}
                style={{
                  filter: 'brightness(0.9)'
                }}
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

          <Carousel title="Elenco" cardLength={185}>
            {credits?.cast
              ?.filter(person => person.profile_path !== null)
              .map(person => (
                <Card
                  key={person.id}
                  uri={`/person/${person.id}`}
                  imageUrl={''.concat(
                    import.meta.env.VITE_API_IMAGE_URL,
                    '/w185' as ProfileSize,
                    person.profile_path
                  )}
                  name={person.name}
                  paragraph={person.character}
                />
              ))}
          </Carousel>

          <Carousel title="Produção" cardLength={185}>
            {credits?.crew
              ?.filter(
                (person, index, arr) =>
                  arr.findIndex(a => a.name === person.name) === index &&
                  person.profile_path !== null
              )
              .map(person => (
                <Card
                  key={person.id}
                  uri={`/person/${person.id}`}
                  imageUrl={''.concat(
                    import.meta.env.VITE_API_IMAGE_URL,
                    '/w185' as ProfileSize,
                    person.profile_path
                  )}
                  name={person.name}
                  paragraph={person.job}
                />
              ))}
          </Carousel>

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
                  className="shadow-inner shadow-slate-900 block"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">
                    {season.name} - {season.episode_count} episódios
                  </h3>
                  <p className="text-zinc-300">
                    {season.overview || 'Sem informações sobre 🙁'}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="pt-6 pb-4 text-2xl text-title">Similares</h2>
          <div className="grid grid-cols-4 gap-6">
            {similar?.map(tv => (
              <Link
                key={tv.id}
                to={`/tv/${tv.id}`}
                className="hover:brightness-75 transition-all"
                style={{
                  background: '#090B10AA',
                  boxShadow: '0 0 3px 5px 4px #121214'
                }}
              >
                <img
                  src={''.concat(
                    import.meta.env.VITE_API_IMAGE_URL,
                    '/w300' as BackdropSize,
                    tv.backdrop_path
                  )}
                  alt={tv.name}
                  style={{ filter: 'brightness(0.9)' }}
                />
                <div className="px-4 py-2">
                  <h3
                    className="font-bold text-xl text-zinc-300"
                    style={
                      {
                        display: '-webkit-box',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '-webkit-line-clamp': '1',
                        '-webkit-box-orient': 'vertical'
                      } as CSSProperties
                    }
                  >
                    {tv.name}
                  </h3>
                  <p
                    className="text-zinc-400"
                    style={
                      {
                        display: '-webkit-box',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '-webkit-line-clamp': '3',
                        '-webkit-box-orient': 'vertical'
                      } as CSSProperties
                    }
                  >
                    {tv.overview || 'Sem informações sobre 🙁'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Main>
    </>
  )
}
