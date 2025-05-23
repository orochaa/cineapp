import { CarouselGenre } from '@/components/carousel/carousel-genre'
import { Main } from '@/components/main'
import { Stars } from '@/components/stars'
import { useFetch } from '@/hooks/use-fetch'
import { getGenreNameById } from '@/lib/genre'
import { CgAsterisk } from 'react-icons/cg'
import { Link } from 'react-router'

export function Home(): React.JSX.Element {
  const { data: popularMovies } = useFetch<Movie[]>('/movie/popular')
  const { data: topRatedMovies } = useFetch<Movie[]>('/movie/top_rated')
  const { data: popularTv } = useFetch<TvShow[]>('/tv/popular')
  const { data: topRatedTv } = useFetch<TvShow[]>('/tv/top_rated')

  if (!popularMovies?.length || !popularTv?.length) {
    return <Main> </Main>
  }

  return (
    <Main className="pb-20">
      <Link
        to={`/movies/${popularMovies[0].id}`}
        className="relative w-full overflow-hidden bg-black"
      >
        <img
          src={`${import.meta.env.VITE_API_IMAGE_URL}/w1280/${popularMovies[0].backdrop_path}`}
          alt={popularMovies[0].title}
          className="ml-auto aspect-video w-full object-cover lg:w-2/3"
        />
        <div className="absolute bottom-0 left-0 flex w-full items-center bg-gradient-to-t from-black via-black to-transparent py-12 lg:h-full lg:w-2/3 lg:bg-gradient-to-r lg:px-28">
          <div className="mx-auto w-11/12 space-y-1.5 lg:w-full">
            <h2 className="text-5xl font-semibold">
              {popularMovies[0]?.title}
            </h2>
            <div className="flex items-center gap-1 pl-1 text-sm text-neutral-300">
              <Stars
                rating={popularMovies[0]?.vote_average}
                starClassName="size-4"
              />
              <CgAsterisk />
              {popularMovies[0]?.genre_ids
                .map(genreId => getGenreNameById(genreId))
                .join(', ')}
              <CgAsterisk />
              {new Date(popularMovies[0]?.release_date).toLocaleDateString()}
            </div>
            <p className="text-pretty">{popularMovies[0]?.overview}</p>
          </div>
        </div>
      </Link>
      <CarouselGenre
        genre="Filmes Populares"
        type="movies"
        selectedGenre="*"
        list={popularMovies.slice(1)}
      />
      <CarouselGenre
        genre="Filmes Bem Avaliados"
        type="movies"
        selectedGenre="*"
        list={topRatedMovies}
      />
      <CarouselGenre
        genre="Séries Populares"
        type="tv"
        selectedGenre="*"
        list={popularTv}
      />
      <CarouselGenre
        genre="Séries Bem Avaliadas"
        type="tv"
        selectedGenre="*"
        list={topRatedTv}
      />
    </Main>
  )
}
