export interface IMovie {
  backdrop_path: string;
  id: number;
  original_language: string
  original_title: string
  overview: string;
  popularity: number
  poster_path: string;
  release_date: string
  title: string;
  name: string | undefined
  vote_average: number
  vote_count: number
}
