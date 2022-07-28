import {
  IPersonMovie,
  IPersonTv,
  IPersonDetails,
  ProfileSize
} from '@/domain/api'
import { CarouselGenre, Header, Main } from '@/presentation/components'
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
          <div className="flex flex-col sm:flex-row gap-6">
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

          <CarouselGenre
            genre="Filmes Atuados"
            selectedGenre="*"
            type="movies"
            list={movies?.cast}
          />

          <CarouselGenre
            genre="Filmes Produzidos"
            selectedGenre="*"
            type="tv"
            list={movies?.crew}
          />

          <CarouselGenre
            genre="Séries Atuadas"
            selectedGenre="*"
            type="tv"
            list={series?.cast}
          />

          <CarouselGenre
            genre="Séries Produzidas"
            selectedGenre="*"
            type="tv"
            list={series?.crew}
          />
        </section>
      </Main>
    </>
  )
}
