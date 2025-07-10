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
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10_751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10_402: 'Music',
  9648: 'Mystery',
  10_749: 'Romance',
  878: 'Science Fiction',
  10_770: 'TV Movie',
  53: 'Thriller',
  10_752: 'War',
  37: 'Western',
}

export function getGenreNameById(id: number): string | undefined {
  return GenreName[id]
}

export type GenreType = MovieGenre | TvShowGenre

type GenreDictionary = Record<GenreType, string>

const genreDictionary: GenreDictionary = {
  action: 'Action',
  adventure: 'Adventure',
  animation: 'Animation',
  comedy: 'Comedy',
  crime: 'Crime',
  documentary: 'Documentary',
  drama: 'Drama',
  family: 'Family',
  fantasy: 'Fantasy',
  history: 'History',
  horror: 'Horror',
  mystery: 'Mystery',
  romance: 'Romance',
  sciFi: 'Science Fiction',
  western: 'Western',
  actionAdventure: 'Action & Adventure',
  kids: 'Kids',
  news: 'News',
  reality: 'Reality',
  soap: 'Soap',
  talk: 'Talk Shows',
}

export function formatGenre(genre: GenreType): string {
  return genreDictionary[genre] || genre
}
