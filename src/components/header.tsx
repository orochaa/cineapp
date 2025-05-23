import { useWindowSize } from '@/hooks/use-window-size'
import { Clapperboard, House, Menu, Search, TvMinimal } from 'lucide-react'
import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router'

export function Header(): React.JSX.Element {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const { windowWidth } = useWindowSize()

  const [isSidebarActive, setIsSidebarActive] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      const fd = new FormData(e.target as HTMLFormElement)
      const search = fd.get('search') as string

      if (search) {
        navigate(`/search?q=${search}`)
      } else {
        navigate('/home')
      }
    },
    [navigate]
  )

  return (
    <div>
      {windowWidth > 640 ? (
        <header className="sticky top-0 left-0 z-30 w-full">
          <div className="bg-header flex items-center gap-8 px-6 py-3">
            <nav className="flex gap-6 font-semibold">
              <Link to="/home" className="group flex items-center gap-2">
                <House size={18} />
                <p className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-white after:transition-[width] group-hover:after:w-full">
                  Inicio
                </p>
              </Link>
              <Link to="/movies" className="group flex items-center gap-2">
                <Clapperboard size={18} />
                <p className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-white after:transition-[width] group-hover:after:w-full">
                  Filmes
                </p>
              </Link>
              <Link to="/tv" className="group flex items-center gap-2">
                <TvMinimal size={18} />
                <p className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-white after:transition-[width] group-hover:after:w-full">
                  Séries
                </p>
              </Link>
            </nav>

            <form
              onSubmit={handleSubmit}
              className="flex w-xs items-center gap-2 rounded-lg bg-slate-800/60 px-3 py-2"
            >
              <Search size={18} className="text-zinc-300" />
              <input
                type="text"
                name="search"
                className="peer block h-full grow outline-hidden placeholder:text-zinc-400"
                placeholder="Pesquisar..."
                defaultValue={query ?? ''}
                autoFocus={!!query}
              />
            </form>
          </div>
        </header>
      ) : (
        <header className="sticky top-0 left-0 z-30 w-full">
          <div className="bg-header mx-auto flex w-11/12 items-center gap-4 py-3">
            <button
              type="button"
              className="relative z-50 h-full p-2"
              onClick={() => setIsSidebarActive(state => !state)}
            >
              <Menu size={24} className="bg-transparent outline-hidden" />
            </button>

            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-xs items-center gap-2 rounded-lg bg-slate-800 px-4 py-3"
            >
              <Search />
              <input
                type="text"
                name="search"
                className="peer block h-full grow outline-hidden placeholder:text-zinc-400"
                placeholder="Pesquisar..."
                defaultValue={query ?? ''}
                autoFocus={!!query}
              />
            </form>
          </div>
          <div
            data-active={isSidebarActive}
            className="bg-header fixed top-0 left-0 z-20 h-svh w-0 overflow-hidden transition-[width] data-active:w-xs"
          >
            <div className="mx-4 mt-28">
              <nav className="space-y-3">
                <Link
                  to="/home"
                  className="flex items-center gap-4 rounded border border-transparent bg-slate-900 p-4 font-semibold hover:border-zinc-600 active:border-zinc-500"
                >
                  <House />
                  Inicio
                </Link>
                <Link
                  to="/movies"
                  className="flex items-center gap-4 rounded border border-transparent bg-slate-900 p-4 font-semibold hover:border-zinc-600 active:border-zinc-500"
                >
                  <Clapperboard />
                  Filmes
                </Link>
                <Link
                  to="/tv"
                  className="flex items-center gap-4 rounded border border-transparent bg-slate-900 p-4 font-semibold hover:border-zinc-600 active:border-zinc-500"
                >
                  <TvMinimal />
                  Séries
                </Link>
              </nav>
            </div>
          </div>
        </header>
      )}

      <Outlet />
    </div>
  )
}
