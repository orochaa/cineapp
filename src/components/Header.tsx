'use client'

import { FormEvent, useCallback, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdHome, MdSearch, MdTheaters, MdTv } from 'react-icons/md'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [inputFocus, onInputFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const router = useRouter()

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      if (inputValue) {
        router.push(`/search?search_query=${inputValue}`)
      } else {
        router.push('/home')
      }
    },
    [inputValue]
  )

  return (
    <>
      {window.innerWidth > 450 ? (
        <header
          className="
            fixed left-0 top-0
            z-40 flex w-full
            gap-4 bg-primary px-4 py-5
            text-white md:gap-10 md:px-9
          "
        >
          <nav className="flex gap-3 font-open font-semibold md:gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <MdHome />
              <p className="after:block after:h-0.5 after:w-0 after:rounded after:bg-white after:transition-[width] group-hover:after:w-full">
                Inicio
              </p>
            </Link>
            <Link href="/movies" className="group flex items-center gap-2">
              <MdTheaters />
              <p className="after:block after:h-0.5 after:w-0 after:rounded after:bg-white after:transition-[width] group-hover:after:w-full">
                Filmes
              </p>
            </Link>
            <Link href="/tv" className="group flex items-center gap-2">
              <MdTv />
              <p className="after:block after:h-0.5 after:w-0 after:rounded after:bg-white after:transition-[width] group-hover:after:w-full">
                Séries
              </p>
            </Link>
          </nav>
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 rounded bg-background px-4 py-1"
          >
            <MdSearch
              size={20}
              className={inputFocus ? 'text-purple-500' : ''}
            />
            <input
              type="text"
              placeholder="Pesquisar"
              className="bg-transparent p-1 outline-none transition-colors placeholder:text-zinc-500"
              style={{ verticalAlign: 'middle' }}
              onFocus={() => onInputFocus(true)}
              onBlur={() => onInputFocus(false)}
              onChange={event => setInputValue(event.target.value)}
            />
          </form>
        </header>
      ) : (
        <header className="fixed left-0 top-0 z-40 flex w-full gap-4 bg-primary px-9 py-5 text-xl text-white">
          <button
            className="z-50 rounded border border-transparent p-1 active:border-zinc-300"
            onClick={() => setShowSidebar(state => !state)}
          >
            <GiHamburgerMenu
              size={20}
              className="bg-transparent outline-none"
            />
          </button>

          <form className="flex items-center gap-2 rounded bg-background px-4 py-1">
            <MdSearch
              size={20}
              className={inputFocus ? 'text-purple-500' : ''}
            />
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-1/2 bg-transparent p-1 align-middle outline-none placeholder:text-zinc-500"
              onFocus={() => onInputFocus(true)}
              onBlur={() => onInputFocus(false)}
            />
          </form>

          <section
            className={`
              fixed left-0 top-0
              h-screen w-full
              bg-[#1212145A] transition-[opacity]
              ${showSidebar ? 'visible' : 'invisible'}
            `}
          >
            <div className="h-screen w-[85%] overflow-hidden bg-primary px-4 pt-[5rem]">
              <nav className="flex flex-col gap-4 font-open font-semibold">
                <Link
                  href="/home"
                  className="flex items-center gap-4 rounded bg-slate-900 bg-opacity-60 p-4"
                >
                  <MdHome />
                  <p>Inicio</p>
                </Link>
                <Link
                  href="/movies"
                  className="flex items-center gap-4 rounded bg-slate-900 bg-opacity-60 p-4"
                >
                  <MdTheaters />
                  <p>Filmes</p>
                </Link>
                <Link
                  href="/tv"
                  className="flex items-center gap-4 rounded bg-slate-900 bg-opacity-60 p-4"
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
