import { SiReact } from 'react-icons/si'

export function Footer(): React.JSX.Element {
  return (
    <footer className="bg-zinc-950">
      <div className="mx-auto w-11/12 py-8 text-base text-zinc-300">
        <div className="flex items-center gap-2">
          <img
            title="Cineapp"
            src="/assets/movie.png"
            alt="movie.png"
            className="float-left size-12"
          />
          <div>
            <p className="items-center gap-2 sm:flex">
              Projeto feito em{' '}
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiReact
                  title="React"
                  className="inline-block size-6 text-blue-400"
                />
              </a>{' '}
              com dados consumidos da{' '}
              <a
                title="The Movie Database"
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline"
              >
                <img
                  src="/assets/tmdb.svg"
                  alt="tmdb.svg"
                  className="inline-block h-4"
                />
              </a>
            </p>
            <p>
              Este projeto usa a TMDB API, mas não é aprovado ou certificado
              pela TMDB.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
