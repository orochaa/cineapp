import { type IMovie, type ITv } from '.'

export interface IPerson {
  id: number
  name: string
  known_for_department: string
  profile_path: string
}

export interface IPersonDetails extends IPerson {
  birthday: string
  deathday: string | null
  biography: string | null
  place_of_birth: string
}

export interface IPersonMovie {
  cast: (IMovie & {
    character: string
  })[]
  crew: (IMovie & {
    known_for_department: string
    credit_id: string
    job: string
    department: string
  })[]
}

export interface IPersonTv {
  cast: (ITv & {
    character: string
  })[]
  crew: (ITv & {
    known_for_department: string
    credit_id: string
    job: string
    department: string
  })[]
}
