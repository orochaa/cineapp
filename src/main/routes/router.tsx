import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/presentation/pages'

export function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
