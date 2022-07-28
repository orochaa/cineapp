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
  cast: Array<IMovie & {
    character: string
  }>
  crew: Array<IMovie & {
    known_for_department: string
    credit_id: string
    job: string
    department: string
  }>
}

export interface IPersonTv {
  cast: Array<ITv & {
    character: string
  }>
  crew: Array<ITv & {
    known_for_department: string
    credit_id: string
    job: string
    department: string
  }>
}
