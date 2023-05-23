import { z } from 'zod'
import { Person } from './person'

export const movieSchema = z.object({
  id: z.number(),
  backdrop_path: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string().or(z.null()),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  name: z.string().or(z.undefined()),
  vote_average: z.number(),
  vote_count: z.number()
})

export type Movie = z.infer<typeof movieSchema>

export type MovieGenre =
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

export const movieDetailsSchema = z
  .object({
    budget: z.number(),
    release_date: z.string(),
    revenue: z.number(),
    runtime: z.number(),
    tagline: z.string(),
    genres: z.array(
      z.object({
        id: z.number(),
        name: z.string()
      })
    )
  })
  .merge(movieSchema)

export type MovieDetails = z.infer<typeof movieDetailsSchema>

export interface MovieVideo {
  id: string
  name: string
  key: string
}

export interface MovieCredits {
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

export interface MovieProviders {
  BR: {
    flatrate?: Array<{
      logo_path: string
      provider_id: number
      provider_name: string
    }>
  }
}
