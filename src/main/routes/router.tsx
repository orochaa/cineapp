import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, MoviePage, MoviesPage, SeriesPage } from '@/presentation/pages'

export function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="movies">
          <Route path="" element={<MoviesPage />} />
          <Route path=":movieId" element={<MoviePage />} />
        </Route>
        <Route path="tv">
          <Route path="" element={<SeriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
