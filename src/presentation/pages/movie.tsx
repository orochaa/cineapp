import {
  LogoSize,
  IMovie,
  IMovieCredits,
  IMovieDetails,
  IMovieProviders,
  IMovieVideo,
  PosterSize
} from '@/domain/api'
import {
  CarouselPeople,
  Header,
  Main,
  Similar,
  VideoPlayer,
  Banner
} from '@/presentation/components'
import { useFetch } from '@/presentation/hooks'
import { MdAttachMoney, MdMoneyOff } from 'react-icons/md'
import { CgAsterisk } from 'react-icons/cg'
import { BsFillPlayFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

export function MoviePage () {
  const { movieId } = useParams()
  const { data: movie } = useFetch<IMovieDetails>(`/movie/${movieId}`)
  const { data: videos } = useFetch<IMovieVideo[]>(`/movie/${movieId}/videos`)
  const { data: credits } = useFetch<IMovieCredits>(`/movie/${movieId}/credits`)
  const { data: similar } = useFetch<IMovie[]>(`/movie/${movieId}/similar`)
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
          {Math.floor((movie?.runtime || 0) / 60)}h
          {Math.floor((movie?.runtime || 0) % 60)}min
        </>
      </Banner>

      <Main>
        <section className="w-full lg:w-9/12 m-auto">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative sm:min-w-[50%] md:min-w-[33%]">
              <img
                src={''.concat(
                  import.meta.env.VITE_API_IMAGE_URL,
                  '/w500' as PosterSize,
                  movie?.poster_path || ''
                )}
                alt={movie?.title}
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
                {movie?.original_title}
              </p>
              <p>
                <span className="text-xl text-slate-400 mr-2">Sinopse:</span>
                {movie?.overview || 'Sem informações sobre 🙁'}
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

          <Similar list={similar} type="movies" />
        </section>
      </Main>
    </>
  )
}
