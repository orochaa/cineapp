export interface ITv {
  id: number
  name: string
  title: string | undefined
  overview: string | null
  backdrop_path: string
  poster_path: string
  first_air_date: string
  last_air_date: string
  origin_country: string[]
  original_language: string
  original_name: string
  popularity: number
  vote_average: number
  vote_count: number
}

export type ITvGenre =
  | 'actionAdventure'
  | 'animation'
  | 'crime'
  | 'documentary'
  | 'drama'
  | 'family'
  | 'kids'
  | 'mystery'
  | 'news'
  | 'reality'
  | 'sciFi'
  | 'soap'
  | 'talk'
  | 'western'

export interface ITvDetails extends ITv {
  tagline: string
  genres: Array<{ id: number; name: string }>
  created_by: Array<{
    id: string
    credit_id: string
    name: string
    profile_path: string
  }>
  in_production: boolean
  number_of_episodes: number
  number_of_seasons: number
  seasons: Array<{
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string | null
    poster_path: string
    season_number: number
  }>
}

export interface ITvVideo {
  id: string
  name: string
  key: string
}

export interface ITvCredits {
  cast: Array<{
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
  }>
  crew: Array<{
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    job: string
    department: string
  }>
}

export interface ITvProviders {
  BR: {
    flatrate?: Array<{
      logo_path: string
      provider_id: number
      provider_name: string
    }>
  }
}
