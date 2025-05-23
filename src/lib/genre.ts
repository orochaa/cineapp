export enum Genre {
  Action = 28,
  Adventure = 12,
  Animation = 16,
  Comedy = 35,
  Crime = 80,
  Documentary = 99,
  Drama = 18,
  Family = 10_751,
  Fantasy = 14,
  History = 36,
  Horror = 27,
  Music = 10_402,
  Mystery = 9648,
  Romance = 10_749,
  ScienceFiction = 878,
  TVMovie = 10_770,
  Thriller = 53,
  War = 10_752,
  Western = 37,
}

const GenreName: Record<number, string> = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'Crime',
  99: 'Documentário',
  18: 'Drama',
  10_751: 'Família',
  14: 'Fantasia',
  36: 'História',
  27: 'Terror',
  10_402: 'Música',
  9648: 'Mistério',
  10_749: 'Romance',
  878: 'Ficção Científica',
  10_770: 'Cinema TV',
  53: 'Suspense',
  10_752: 'Guerra',
  37: 'Faroeste',
}

export function getGenreNameById(id: number): string | undefined {
  return GenreName[id]
}

export type GenreType = MovieGenre | TvShowGenre

type GenreDictionary = Record<GenreType, string>

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

export function formatGenre(genre: GenreType): string {
  return genreDictionary[genre] || genre
}
