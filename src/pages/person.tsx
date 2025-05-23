import { CarouselGenre } from '@/components/carousel/carousel-genre'
import { Main } from '@/components/main'
import { useFetch } from '@/hooks/use-fetch'
import { useEffect } from 'react'
import { useParams } from 'react-router'

export function PersonPage(): React.JSX.Element {
  const { personId } = useParams()
  const { data: person } = useFetch<PersonDetails>(`/person/${personId}`)
  const { data: movies } = useFetch<PersonMovie>(
    `/person/${personId}/movie_credits`
  )
  const { data: series } = useFetch<PersonTv>(`/person/${personId}/tv_credits`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [personId])

  return (
    <Main className="pt-12 pb-20">
      <section className="mx-auto w-11/12 max-w-6xl pb-20">
        <div className="flex flex-col gap-6 sm:flex-row">
          <img
            src={''.concat(
              import.meta.env.VITE_API_IMAGE_URL,
              '/w500' as ProfileSize,
              person?.profile_path ?? ''
            )}
            alt={person?.name}
            className="w-full object-cover brightness-90 sm:w-1/2 md:w-1/3"
          />

          <div className="flex flex-col gap-2 py-2">
            <h2 className="text-4xl text-slate-300">{person?.name}</h2>
            <p>{person?.biography ?? 'Sem informações sobre 🙁'}</p>
          </div>
        </div>
      </section>

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
    </Main>
  )
}
