import { Movie } from './movie'
import { Tv } from './tv'

export interface Person {
  id: number
  name: string
  known_for_department: string
  profile_path: string
}

export interface PersonDetails extends Person {
  birthday: string
  deathday: string | null
  biography: string | null
  place_of_birth: string
}

export interface PersonMovie {
  cast: Array<
    Movie & {
      character: string
    }
  >
  crew: Array<
    Movie & {
      known_for_department: string
      credit_id: string
      job: string
      department: string
    }
  >
}

export interface PersonTv {
  cast: Array<
    Tv & {
      character: string
    }
  >
  crew: Array<
    Tv & {
      known_for_department: string
      credit_id: string
      job: string
      department: string
    }
  >
}
