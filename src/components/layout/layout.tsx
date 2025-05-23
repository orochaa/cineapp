import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Outlet } from 'react-router'

export function Layout(): React.JSX.Element {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
