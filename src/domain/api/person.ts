import { IMovie, ITv } from '.'

export interface IPerson {
  id: number
  name: string
  known_for_department: string
  profile_path: string
}

export interface IPersonDetails extends IPerson{
  birthday: string
  deathday: string | null
  biography: string | null
  place_of_birth: string
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
