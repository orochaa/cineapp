type BackdropSize = 'w300' | '/w780' | '/w1280' | '/original'

type LogoSize =
  | '/w45'
  | '/w92'
  | '/w154'
  | '/w185'
  | '/w300'
  | '/w500'
  | '/original'

type PosterSize =
  | '/w92'
  | '/w154'
  | '/w185'
  | '/w342'
  | '/w500'
  | '/w780'
  | '/original'

type ProfileSize = 'w45' | '/w185' | '/w500' | '/h632' | '/original'

type StillSize = 'w92' | '/w185' | '/w300' | '/original'

interface Movie {
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
  genre_ids: number[]
}

type MovieGenre =
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

interface MovieDetails extends Movie {
  budget: number
  release_date: string
  revenue: number
  runtime: number
  tagline: string
  genres: { id: number; name: string }[]
}

interface MovieVideo {
  id: string
  name: string
  key: string
}

interface MovieCredits {
  cast: (Person & {
    cast_id: number
    character: string
    credit_id: string
    order: number
  })[]
  crew: (Person & {
    credit_id: string
    job: string
    department: string
  })[]
}

interface MovieProviders {
  BR?: {
    flatrate?: {
      logo_path: string
      provider_id: number
      provider_name: string
    }[]
  }
}

interface Person {
  id: number
  name: string
  known_for_department: string
  profile_path: string
}

interface PersonDetails extends Person {
  birthday: string
  deathday: string | null
  biography: string | null
  place_of_birth: string
}

interface PersonMovie {
  cast: (Movie & {
    character: string
  })[]
  crew: (Movie & {
    known_for_department: string
    credit_id: string
    job: string
    department: string
  })[]
}

interface PersonTv {
  cast: (TvShow & {
    character: string
  })[]
  crew: (TvShow & {
    known_for_department: string
    credit_id: string
    job: string
    department: string
  })[]
}

interface TvShow {
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

type TvShowGenre =
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

interface TvShowDetails extends TvShow {
  tagline: string
  genres: { id: number; name: string }[]
  created_by: {
    id: string
    credit_id: string
    name: string
    profile_path: string
  }[]
  in_production: boolean
  number_of_episodes: number
  number_of_seasons: number
  seasons: {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string | null
    poster_path: string
    season_number: number
  }[]
}

interface TvShowVideo {
  id: string
  name: string
  key: string
}

interface TvShowCredits {
  cast: (Person & {
    cast_id: number
    character: string
    credit_id: string
    order: number
  })[]
  crew: (Person & {
    credit_id: string
    job: string
    department: string
  })[]
}

interface TvShowProviders {
  BR?: {
    flatrate?: {
      logo_path: string
      provider_id: number
      provider_name: string
    }[]
  }
}
