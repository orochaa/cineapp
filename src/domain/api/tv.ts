export interface ITv {
  id: number
  name: string
  title: string | undefined
  overview: string
  backdrop_path: string
  poster_path: string
  first_air_date: string
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
