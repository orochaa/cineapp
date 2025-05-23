import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...classNames: ClassValue[]): string {
  return twMerge(clsx(...classNames))
}

export type GenreType = MovieGenre | TvShowGenre

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
