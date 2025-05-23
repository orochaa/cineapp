import { useMemo } from 'react'
import { Link } from 'react-router'

interface SimilarProps {
  list: (Movie | TvShow)[] | undefined
  type: 'movies' | 'tv'
}

export function Similar(props: SimilarProps): React.JSX.Element {
  const filteredList = useMemo(
    () => props.list?.filter(item => !!item.backdrop_path),
    [props.list]
  )

  if (!filteredList?.length) {
    return <span />
  }

  return (
    <>
      <h3 className="text-title pt-6 pb-4 text-2xl">Similares</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filteredList.map(item => (
          <Link
            key={item.id}
            to={`/${props.type}/${item.id}`}
            className="transition-all hover:brightness-75"
            style={{
              background: '#090B10AA',
              boxShadow: '0 0 3px 5px 4px #121214',
            }}
          >
            <img
              src={''.concat(
                import.meta.env.VITE_API_IMAGE_URL,
                '/w300' as BackdropSize,
                item.backdrop_path
              )}
              alt={item.name}
              style={{ filter: 'brightness(0.9)' }}
            />
            <div className="px-4 py-2">
              <h3 className="line-clamp-1 font-bold text-ellipsis text-zinc-300 sm:text-xl">
                {item.title ?? item.name}
              </h3>
              <p className="line-clamp-3 text-sm text-ellipsis text-zinc-400">
                {item.overview ?? 'Sem informações sobre 🙁'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
