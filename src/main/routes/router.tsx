import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, MoviesPage } from '@/presentation/pages'

export function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="movies" element={<MoviesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
