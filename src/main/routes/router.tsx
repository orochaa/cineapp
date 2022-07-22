import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, MoviesPage, SeriesPage } from '@/presentation/pages'

export function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="series" element={<SeriesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
