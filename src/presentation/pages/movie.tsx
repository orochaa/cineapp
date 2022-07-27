import {
  IMovie,
  IMovieCredits,
  IMovieDetails,
  IMovieProviders,
  IMovieVideo
} from '@/domain/api'
import {
  Card,
  Carousel,
  Header,
  Main,
  VideoPlayer
} from '@/presentation/components'
import { useFetch } from '@/presentation/hooks'
import { MdAttachMoney, MdMoneyOff } from 'react-icons/md'
import { CgAsterisk } from 'react-icons/cg'
import { BsFillPlayFill } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState, CSSProperties } from 'react'

export function MoviePage () {
  const { movieId } = useParams()
  const { data: movie } = useFetch<IMovieDetails>(`/movie/${movieId}`)
  const { data: videos } = useFetch<IMovieVideo[]>(`/movie/${movieId}/videos`)
  const { data: credits } = useFetch<IMovieCredits>(`/movie/${movieId}/credits`)
  const { data: similars } = useFetch<IMovie[]>(`/movie/${movieId}/similar`)
  const { data: providers } = useFetch<IMovieProviders>(
    `/movie/${movieId}/watch/providers`
  )

  const [showVideo, setShowVideo] = useState(false)

  const formatNumber = useCallback((n: number | undefined): string => {
    if (!n) return '?'
    return n
      .toString()
      .split('')
      .reverse()
      .map((n, i) => (i % 3 === 0 ? n + '.' : n))
      .reverse()
      .join('')
      .replace(/\.$/i, '')
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [movieId])

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
            url={`https://www.youtube.com/watch?v=${videos[0].key}`}
          />
        </div>
      )}

      <section className="relative">
        <div
          style={{
            backgroundImage: `url(${
              import.meta.env.VITE_API_IMAGE_URL
            }/original${movie?.backdrop_path})`,
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
          <p className="text-base text-neutral-300 pl-1 flex items-center gap-1">
            {movie?.release_date.split('-').reverse().join('/')}
            <CgAsterisk />
            {movie?.genres.map(genre => genre.name).join(', ')}
            <CgAsterisk />
            {Math.floor((movie?.runtime || 0) / 60)}h
            {Math.floor((movie?.runtime || 0) % 60)}min
          </p>
          <h1 className="text-6xl text-neutral-100 font-bold">
            {movie?.title}
          </h1>
          <p className="text-lg text-neutral-200">{movie?.tagline}</p>
        </div>
      </section>

      <Main>
        <section className="w-9/12 m-auto">
          <div className="flex gap-6 p-8">
            <div className="relative min-w-fit">
              <img
                src={''.concat(
                  import.meta.env.VITE_API_IMAGE_URL,
                  '/w342',
                  movie?.poster_path || ''
                )}
                alt={movie?.title}
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
                {movie?.original_title}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Sinopse:</span>
                {movie?.overview}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Orçamento:</span>
                <MdMoneyOff className="inline text-red-500" size={20} />
                {formatNumber(movie?.budget)}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Receita:</span>
                <MdAttachMoney className="inline text-green-500" size={20} />
                {formatNumber(movie?.revenue)}
              </p>
              {providers?.BR?.flatrate && (
                <>
                  <p className="text-xl text-slate-400 mr-2">Assistir:</p>
                  <div className="flex gap-3">
                    {providers.BR.flatrate.map(provider => (
                      <img
                        key={provider.provider_id}
                        src={''.concat(
                          import.meta.env.VITE_API_IMAGE_URL,
                          '/w45',
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
              ?.filter(actor => actor.profile_path !== null)
              .map((actor, index) => (
                <Card
                  key={index}
                  uri={`/actor/${actor.id}`}
                  imageUrl={''.concat(
                    import.meta.env.VITE_API_IMAGE_URL,
                    '/w185',
                    actor.profile_path
                  )}
                  name={actor.name}
                  paragraph={actor.character}
                />
              ))}
          </Carousel>

          <Carousel title="Produção" cardLength={185}>
            {credits?.crew
              ?.filter(
                (member, index, arr) =>
                  arr.findIndex(a => a.name === member.name) === index &&
                  member.profile_path !== null
              )
              .map((actor, index) => (
                <Card
                  key={index}
                  uri={`/actor/${actor.id}`}
                  imageUrl={''.concat(
                    import.meta.env.VITE_API_IMAGE_URL,
                    '/w185',
                    actor.profile_path
                  )}
                  name={actor.name}
                  paragraph={actor.job}
                />
              ))}
          </Carousel>

          <h2 className="pt-6 pb-4 text-2xl text-title">Similares</h2>
          <div className="grid grid-cols-4 gap-6">
            {similars?.map(movie => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="hover:brightness-75 transition-all"
                style={{
                  background: '#090B10AA',
                  boxShadow: '0 0 3px 5px 4px #121214'
                }}
              >
                <img
                  src={''.concat(
                    import.meta.env.VITE_API_IMAGE_URL,
                    '/w300',
                    movie.backdrop_path
                  )}
                  alt={movie.name}
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
                    {movie.title}
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
                    {movie.overview}
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
