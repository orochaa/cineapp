import { Home } from '@/pages/home'
import { MoviePage } from '@/pages/movie'
import { MoviesPage } from '@/pages/movies'
import { PersonPage } from '@/pages/person'
import { SearchPage } from '@/pages/search'
import { SeriePage } from '@/pages/serie'
import { SeriesPage } from '@/pages/series'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

export function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={import.meta.env.VITE_BASE_URI || ''}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="person/:personId" element={<PersonPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="movies">
            <Route path="" element={<MoviesPage />} />
            <Route path=":movieId" element={<MoviePage />} />
          </Route>
          <Route path="tv">
            <Route path="" element={<SeriesPage />} />
            <Route path=":serieId" element={<SeriePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
