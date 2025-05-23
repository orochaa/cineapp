import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdHome, MdSearch, MdTheaters, MdTv } from 'react-icons/md'
import { Link, useNavigate } from 'react-router'

export function Header(): React.JSX.Element {
  const [showSidebar, setShowSidebar] = useState(false)
  const [inputFocus, setInputFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()

      if (inputValue) {
        navigate(`/search?search_query=${inputValue}`)
      } else {
        navigate('/home')
      }
    },
    [inputValue, navigate]
  )

  return window.innerWidth > 450 ? (
    <header className="bg-primary fixed top-0 left-0 z-40 flex w-full gap-4 px-4 py-5 text-white md:gap-10 md:px-9">
      <nav className="font-open flex gap-3 font-semibold md:gap-6">
        <Link to="/home" className="group flex items-center gap-2">
          <MdHome />
          <p className="after:block after:h-0.5 after:w-0 after:rounded-sm after:bg-white after:transition-[width] group-hover:after:w-full">
            Inicio
          </p>
        </Link>
        <Link to="/movies" className="group flex items-center gap-2">
          <MdTheaters />
          <p className="after:block after:h-0.5 after:w-0 after:rounded-sm after:bg-white after:transition-[width] group-hover:after:w-full">
            Filmes
          </p>
        </Link>
        <Link to="/tv" className="group flex items-center gap-2">
          <MdTv />
          <p className="after:block after:h-0.5 after:w-0 after:rounded-sm after:bg-white after:transition-[width] group-hover:after:w-full">
            Séries
          </p>
        </Link>
      </nav>
      <form
        onSubmit={handleSubmit}
        className="bg-background flex items-center gap-4 rounded-sm px-4 py-1"
      >
        <MdSearch size={20} className={inputFocus ? 'text-purple-500' : ''} />
        <input
          type="text"
          placeholder="Pesquisar"
          className="bg-transparent p-1 outline-hidden transition-colors placeholder:text-zinc-500"
          style={{ verticalAlign: 'middle' }}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onChange={event => setInputValue(event.target.value)}
        />
      </form>
    </header>
  ) : (
    <header className="bg-primary fixed top-0 left-0 z-40 flex w-full gap-4 px-9 py-5 text-xl text-white">
      <button
        type="button"
        className="z-50 rounded-sm border border-transparent p-1 active:border-zinc-300"
        onClick={() => setShowSidebar(state => !state)}
      >
        <GiHamburgerMenu size={20} className="bg-transparent outline-hidden" />
      </button>

      <form className="bg-background flex items-center gap-2 rounded-sm px-4 py-1">
        <MdSearch size={20} className={inputFocus ? 'text-purple-500' : ''} />
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-1/2 bg-transparent p-1 align-middle outline-hidden placeholder:text-zinc-500"
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      </form>

      <section
        className={`fixed top-0 left-0 h-screen w-full bg-[#1212145A] transition-opacity ${showSidebar ? 'visible' : 'invisible'} `}
      >
        <div className="bg-primary h-screen w-[85%] overflow-hidden px-4 pt-20">
          <nav className="font-open flex flex-col gap-4 font-semibold">
            <Link
              to="/home"
              className="bg-opacity-60 flex items-center gap-4 rounded-sm bg-slate-900 p-4"
            >
              <MdHome />
              <p>Inicio</p>
            </Link>
            <Link
              to="/movies"
              className="bg-opacity-60 flex items-center gap-4 rounded-sm bg-slate-900 p-4"
            >
              <MdTheaters />
              <p>Filmes</p>
            </Link>
            <Link
              to="/tv"
              className="bg-opacity-60 flex items-center gap-4 rounded-sm bg-slate-900 p-4"
            >
              <MdTv />
              <p>Séries</p>
            </Link>
          </nav>
        </div>
      </section>
    </header>
  )
}
