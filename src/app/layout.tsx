import { Header } from '@/components/Header'
import { Main } from '@/components/Main'
import { Inter } from 'next/font/google'
import './global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cineapp'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
