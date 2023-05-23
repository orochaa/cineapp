import { z } from 'zod'
import { Person } from './person'

export const tvSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string().optional(),
  overview: z.string().nullable(),
  backdrop_path: z.coerce.string(),
  poster_path: z.string(),
  first_air_date: z.string(),
  last_air_date: z.string().optional(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  vote_average: z.number(),
  vote_count: z.number()
})

export type Tv = z.infer<typeof tvSchema>

export type TvGenre =
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

export interface TvDetails extends Tv {
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

export interface TvVideo {
  id: string
  name: string
  key: string
}

export interface TvCredits {
  cast: Array<
    Person & {
      cast_id: number
      character: string
      credit_id: string
      order: number
    }
  >
  crew: Array<
    Person & {
      credit_id: string
      job: string
      department: string
    }
  >
}

export interface TvProviders {
  BR: {
    flatrate?: Array<{
      logo_path: string
      provider_id: number
      provider_name: string
    }>
  }
}
