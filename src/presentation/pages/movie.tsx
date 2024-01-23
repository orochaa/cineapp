import {
  type IMovie,
  type IMovieCredits,
  type IMovieDetails,
  type IMovieProviders,
  type IMovieVideo,
  type LogoSize,
  type PosterSize,
} from '@/domain/api'
import {
  Banner,
  CarouselPeople,
  Header,
  Main,
  Similar,
  VideoPlayer,
} from '@/presentation/components'
import { useFetch } from '@/presentation/hooks'
import { useEffect, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { CgAsterisk } from 'react-icons/cg'
import { MdAttachMoney, MdMoneyOff } from 'react-icons/md'
import { useParams } from 'react-router-dom'

const formatCurrency = (n: number | undefined): string => {
  return n === undefined ? '?' : n.toLocaleString('pt-br')
}

export function MoviePage(): React.JSX.Element {
  const { movieId } = useParams()
  const { data: movie } = useFetch<IMovieDetails>(`/movie/${movieId}`)
  const { data: videos } = useFetch<IMovieVideo[]>(`/movie/${movieId}/videos`)
  const { data: credits } = useFetch<IMovieCredits>(`/movie/${movieId}/credits`)
  const { data: similar } = useFetch<IMovie[]>(`/movie/${movieId}/similar`)
  const { data: providers } = useFetch<IMovieProviders>(
    `/movie/${movieId}/watch/providers`
  )

  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [movieId])

  return (
    <>
      <Header />

      {showVideo && videos && (
        <div
          className="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-[#000a] transition-all"
          onClick={() => setShowVideo(false)}
        >
          <VideoPlayer
            playing
            url={`https://www.youtube.com/watch?v=${
              videos.find(video => /trailer/i.test(video.name))?.key
            }`}
          />
        </div>
      )}

      <Banner media={movie}>
        <>
          {movie?.release_date.split('-').reverse().join('/')}
          <CgAsterisk />
          {movie?.genres.map(genre => genre.name).join(', ')}
          <CgAsterisk />
          {Math.floor((movie?.runtime ?? 0) / 60)}h
          {Math.floor((movie?.runtime ?? 0) % 60)}min
        </>
      </Banner>

      <Main>
        <section className="m-auto w-full lg:w-9/12">
          <div className="flex flex-col gap-6 sm:flex-row">
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
                className="
                  absolute inset-0
                  flex items-center justify-center
                  bg-[#0005] opacity-0 transition-opacity
                  duration-300 hover:opacity-100
                "
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
                {movie?.original_title}
              </p>
              <p>
                <span className="mr-2 text-xl text-slate-400">Sinopse:</span>
                {movie?.overview ?? 'Sem informações sobre 🙁'}
              </p>
              <p>
                <span className="mr-2 text-xl text-slate-400">Orçamento:</span>
                <MdMoneyOff className="inline text-red-500" size={20} />
                {formatCurrency(movie?.budget)}
              </p>
              <p>
                <span className="mr-2 text-xl text-slate-400">Receita:</span>
                <MdAttachMoney className="inline text-green-500" size={20} />
                {formatCurrency(movie?.revenue)}
              </p>
              {providers?.BR.flatrate && (
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

          <Similar list={similar} type="movies" />
        </section>
      </Main>
    </>
  )
}
