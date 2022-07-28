import { Link, useNavigate } from 'react-router-dom'
import { MdHome, MdSearch, MdTheaters, MdTv } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FormEvent, useCallback, useState } from 'react'

export function Header () {
  const [showSidebar, setShowSidebar] = useState(false)
  const [inputFocus, onInputFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
    if (inputValue) {
      navigate(`/search?search_query=${inputValue}`)
    } else {
      navigate('/home')
    }
  }, [inputValue])

  return (
    <>
      {window.innerWidth > 450 ? (
        <header
          className="
            fixed top-0 left-0
            flex gap-4 md:gap-10
            w-full py-5 px-4 md:px-9
            bg-primary text-white z-40
          "
        >
          <nav className="flex gap-3 md:gap-6 font-open font-semibold">
            <Link to="/home" className="group flex items-center gap-2">
              <MdHome />
              <p className="after:block after:w-0 after:h-0.5 after:bg-white after:transition-[width] after:rounded group-hover:after:w-full">
                Inicio
              </p>
            </Link>
            <Link to="/movies" className="group flex items-center gap-2">
              <MdTheaters />
              <p className="after:block after:w-0 after:h-0.5 after:bg-white after:transition-[width] after:rounded group-hover:after:w-full">
                Filmes
              </p>
            </Link>
            <Link to="/tv" className="group flex items-center gap-2">
              <MdTv />
              <p className="after:block after:w-0 after:h-0.5 after:bg-white after:transition-[width] after:rounded group-hover:after:w-full">
                Séries
              </p>
            </Link>
          </nav>
          <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-background py-1 px-4 rounded">
            <MdSearch
              size={20}
              className={inputFocus ? 'text-purple-500' : ''}
            />
            <input
              type="text"
              placeholder="Pesquisar"
              className="bg-transparent outline-none p-1 placeholder:text-zinc-500 transition-colors"
              style={{ verticalAlign: 'middle' }}
              onFocus={() => onInputFocus(true)}
              onBlur={() => onInputFocus(false)}
              onChange={event => setInputValue(event.target.value)}
            />
          </form>
        </header>
      ) : (
        <header className="fixed top-0 left-0 flex gap-4 w-full py-5 px-9 bg-primary text-white text-xl z-40">
          <button
            className="border border-transparent active:border-zinc-300 rounded p-1 z-50"
            onClick={() => setShowSidebar(state => !state)}
          >
            <GiHamburgerMenu
              size={20}
              className="bg-transparent outline-none"
            />
          </button>

          <form className="flex items-center gap-2 bg-background py-1 px-4 rounded">
            <MdSearch
              size={20}
              className={inputFocus ? 'text-purple-500' : ''}
            />
            <input
              type="text"
              placeholder="Pesquisar"
              className="bg-transparent outline-none p-1 placeholder:text-zinc-500 align-middle w-1/2"
              onFocus={() => onInputFocus(true)}
              onBlur={() => onInputFocus(false)}
            />
          </form>

          <section
            className={`
              fixed top-0 left-0
              h-screen w-full
              bg-[#1212145A] transition-[opacity]
              ${showSidebar ? 'visible' : 'invisible'}
            `}
          >
            <div className="h-screen w-[85%] bg-primary pt-[5rem] px-4 overflow-hidden">
              <nav className="flex flex-col gap-4 font-open font-semibold">
                <Link
                  to="/home"
                  className="flex items-center gap-4 bg-slate-900 bg-opacity-60 p-4 rounded"
                >
                  <MdHome />
                  <p>Inicio</p>
                </Link>
                <Link
                  to="/movies"
                  className="flex items-center gap-4 bg-slate-900 bg-opacity-60 p-4 rounded"
                >
                  <MdTheaters />
                  <p>Filmes</p>
                </Link>
                <Link
                  to="/tv"
                  className="flex items-center gap-4 bg-slate-900 bg-opacity-60 p-4 rounded"
                >
                  <MdTv />
                  <p>Séries</p>
                </Link>
              </nav>
            </div>
          </section>
        </header>
      )}
    </>
  )
}
