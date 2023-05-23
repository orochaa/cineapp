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
