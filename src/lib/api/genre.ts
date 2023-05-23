import { MovieGenre } from './movie'
import { TvGenre } from './tv'

type GenreTypes = MovieGenre | TvGenre

type GenreDictionary = Record<GenreTypes, string>

export function formatGenre(genre: MovieGenre | TvGenre): string {
  const genreDictionary: GenreDictionary = {
    action: 'Ação',
    adventure: 'Aventura',
    animation: 'Animação',
    comedy: 'Comédia',
    crime: 'Crime',
    documentary: 'Documentário',
    drama: 'Drama',
    family: 'Familia',
    fantasy: 'Fantasia',
    history: 'Historia',
    horror: 'Terror',
    mystery: 'Suspense',
    romance: 'Romance',
    sciFi: 'Ficção Cientifica',
    western: 'Faroeste',
    actionAdventure: 'Ação e Aventura',
    kids: 'Infantil',
    news: 'Noticias',
    reality: 'Reality',
    soap: 'Novelas',
    talk: 'TalkShows'
  }
  return genreDictionary[genre] || genre
}

export const movieGenre: Record<MovieGenre, number> = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  mystery: 9648,
  romance: 10749,
  sciFi: 878,
  western: 37,
}

export const tvGenre: Record<TvGenre, number> = {
  actionAdventure: 10759,
  animation: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  kids: 10762,
  mystery: 9648,
  news: 10763,
  reality: 10764,
  sciFi: 10765,
  soap: 10766,
  talk: 10767,
  western: 37
}