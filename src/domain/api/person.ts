import { IMovie, ITv } from '.'

export interface IPersonDetails {
  birthday: string
  known_for_department: string
  deathday: string | null
  id: number
  name: string
  biography: string | null
  place_of_birth: string
  profile_path: string
}

export interface IPersonMovie {
  cast: Array<IMovie & { character: string }>
  crew: Array<{
    id: number
    known_for_department: string
    title: string
    original_name: string
    popularity: number
    backdrop_path: string
    poster_path: string
    credit_id: string
    vote_average: number
    job: string
    department: string
  }>
}

export interface IPersonTv {
  cast: Array<ITv & { character: string }>
  crew: Array<{
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    backdrop_path: string
    poster_path: string
    credit_id: string
    vote_average: number
    job: string
    department: string
  }>
}
