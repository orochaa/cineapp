import { Link } from 'react-router-dom'
import { MdHome, MdSearch, MdTheaters, MdTv } from 'react-icons/md'
import { useState } from 'react'

export function Header () {
  const [inputFocus, onInputFocus] = useState(false)

  return (
    <header className="flex gap-10 w-full py-5 px-9 bg-primary text-white">
      <nav className="flex gap-6 font-open font-semibold">
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
      <form className="flex items-center gap-4 bg-background py-1 px-4 rounded">
        <MdSearch size={20} className={inputFocus ? 'text-purple-500' : ''} />
        <input
          type="text"
          placeholder="Pesquisar"
          className="bg-transparent outline-none p-1 placeholder:text-zinc-500 transition-colors"
          style={{ verticalAlign: 'middle' }}
          onFocus={() => onInputFocus(true)}
          onBlur={() => onInputFocus(false)}
        />
      </form>
    </header>
  )
}
