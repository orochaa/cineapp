import { IPerson } from './person'

export interface IMovie {
  backdrop_path: string
  id: number
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string
  release_date: string
  title: string
  name: string | undefined
  vote_average: number
  vote_count: number
}

export type IMovieGenre =
  | 'action'
  | 'adventure'
  | 'animation'
  | 'comedy'
  | 'crime'
  | 'documentary'
  | 'drama'
  | 'family'
  | 'fantasy'
  | 'history'
  | 'horror'
  | 'mystery'
  | 'romance'
  | 'sciFi'
  | 'western'

export interface IMovieDetails extends IMovie {
  budget: number
  release_date: string
  revenue: number
  runtime: number
  tagline: string
  genres: Array<{ id: number; name: string }>
}

export interface IMovieVideo {
  id: string
  name: string
  key: string
}

export interface IMovieCredits {
  cast: Array<IPerson & {
    cast_id: number
    character: string
    credit_id: string
    order: number
  }>
  crew: Array<IPerson & {
    credit_id: string
    job: string
    department: string
  }>
}

export interface IMovieProviders {
  BR: {
    flatrate?: Array<{
      logo_path: string
      provider_id: number
      provider_name: string
    }>
  }
}
