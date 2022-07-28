import {
  IPersonMovie,
  IPersonTv,
  IPersonDetails,
  ProfileSize,
  BackdropSize
} from '@/domain/api'
import { Card, Carousel, Header, Main } from '@/presentation/components'
import { useFetch } from '@/presentation/hooks'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export function PersonPage () {
  const { personId } = useParams()
  const { data: person } = useFetch<IPersonDetails>(`/person/${personId}`)
  const { data: movies } = useFetch<IPersonMovie>(
    `/person/${personId}/movie_credits`
  )
  const { data: series } = useFetch<IPersonTv>(`/person/${personId}/tv_credits`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [personId])

  return (
    <>
      <Header />
      <Main>
        <section className="w-full md:w-9/12 m-auto">
          <div className="sm:flex gap-6 p-8">
            <img
              src={''.concat(
                import.meta.env.VITE_API_IMAGE_URL,
                '/w500' as ProfileSize,
                person?.profile_path || ''
              )}
              alt={person?.name}
              className="w-full sm:w-1/2 md:w-1/3 brightness-90 object-cover"
            />

            <div className="flex flex-col gap-2 py-2">
              <h2 className="text-4xl text-slate-300">{person?.name}</h2>
              <p>{person?.biography || 'Sem informações sobre 🙁'}</p>
            </div>
          </div>

          {movies?.cast.length && (
            <Carousel title="Filmes Atuados" cardLength={300}>
              {movies.cast
                .filter(movie => movie.backdrop_path !== null)
                .map(movie => (
                  <Card
                    key={movie.id}
                    uri={`/movie/${movie.id}`}
                    imageUrl={''.concat(
                      import.meta.env.VITE_API_IMAGE_URL,
                      '/w300' as BackdropSize,
                      movie.backdrop_path
                    )}
                    name={movie.title}
                    paragraph={movie.character}
                    rating={movie.vote_average}
                  />
                ))}
            </Carousel>
          )}

          {movies?.crew.length && (
            <Carousel title="Filmes Produzidos" cardLength={300}>
              {movies.crew
                .filter(movie => movie.backdrop_path !== null)
                .map(movie => (
                  <Card
                    key={movie.id}
                    uri={`/movie/${movie.id}`}
                    imageUrl={''.concat(
                      import.meta.env.VITE_API_IMAGE_URL,
                      '/w300' as BackdropSize,
                      movie.backdrop_path
                    )}
                    name={movie.title}
                    paragraph={movie.job}
                    rating={movie.vote_average}
                  />
                ))}
            </Carousel>
          )}

          {series?.cast.length && (
            <Carousel title="Séries Atuadas" cardLength={300}>
              {series.cast
                .filter(serie => serie.backdrop_path !== null)
                .map(serie => (
                  <Card
                    key={serie.id}
                    uri={`/serie/${serie.id}`}
                    imageUrl={''.concat(
                      import.meta.env.VITE_API_IMAGE_URL,
                      '/w300' as BackdropSize,
                      serie.backdrop_path
                    )}
                    name={serie.name}
                    paragraph={serie.character}
                    rating={serie.vote_average}
                  />
                ))}
            </Carousel>
          )}

          {series?.crew.length && (
            <Carousel title="Séries Produzidas" cardLength={300}>
              {series.crew
                .filter(serie => serie.backdrop_path !== null)
                .map(serie => (
                  <Card
                    key={serie.id}
                    uri={`/serie/${serie.id}`}
                    imageUrl={''.concat(
                      import.meta.env.VITE_API_IMAGE_URL,
                      '/w300' as BackdropSize,
                      serie.backdrop_path
                    )}
                    name={serie.name}
                    paragraph={serie.job}
                    rating={serie.vote_average}
                  />
                ))}
            </Carousel>
          )}
        </section>
      </Main>
    </>
  )
}
