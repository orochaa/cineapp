import { IMovie, ITv, BackdropSize } from '@/domain/api'
import { CSSProperties, useMemo } from 'react'
import { Link } from 'react-router-dom'

interface SimilarProps {
  list: Array<IMovie | ITv> | undefined
  type: 'movies' | 'tv'
}

export function Similar (props: SimilarProps) {
  const filteredList = useMemo(
    () => props.list?.filter(item => item.backdrop_path !== null),
    [props.list]
  )

  if (!filteredList?.length) return <span></span>

  return (
    <>
      <h3 className="pt-6 pb-4 text-2xl text-title">Similares</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredList.map(item => (
          <Link
            key={item.id}
            to={`/${props.type}/${item.id}`}
            className="hover:brightness-75 transition-all"
            style={{
              background: '#090B10AA',
              boxShadow: '0 0 3px 5px 4px #121214'
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
              <h3
                className="font-bold sm:text-xl text-zinc-300"
                style={
                  {
                    display: '-webkit-box',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    '-webkit-line-clamp': '1',
                    '-webkit-box-orient': 'vertical'
                  } as CSSProperties
                }
              >
                {item.title}
              </h3>
              <p
                className="text-zinc-400 text-sm"
                style={
                  {
                    display: '-webkit-box',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    '-webkit-line-clamp': '3',
                    '-webkit-box-orient': 'vertical'
                  } as CSSProperties
                }
              >
                {item.overview || 'Sem informações sobre 🙁'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
