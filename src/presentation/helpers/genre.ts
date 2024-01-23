import { type IMovieGenre, type ITvGenre } from '@/domain/api'

export type GenreType = IMovieGenre | ITvGenre

type GenreDictionary = Record<GenreType, string>

export function formatGenre(genre: GenreType): string {
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
    talk: 'TalkShows',
  }

  return genreDictionary[genre] || genre
}
