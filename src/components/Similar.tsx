import { BackdropSize, Movie, Tv } from '@/domain/api'
import { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface SimilarProps {
  list: Array<Movie | Tv> | undefined
  type: 'movies' | 'tv'
}

export function Similar(props: SimilarProps) {
  return (
    <>
      <h3 className="pb-4 pt-6 text-2xl text-title">Similares</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {props.list
          ?.filter(item => item.backdrop_path !== null)
          .map(item => (
            <Link
              key={item.id}
              href={`/${props.type}/${item.id}`}
              className="transition-all hover:brightness-75"
              style={{
                background: '#090B10AA',
                boxShadow: '0 0 3px 5px 4px #121214'
              }}
            >
              <Image
                src={''.concat(
                  process.env.NEXT_PUBLIC_API_IMAGE_URL,
                  '/w300' as BackdropSize,
                  item.backdrop_path
                )}
                width={1920}
                height={1080}
                alt={item.name as string}
                style={{ filter: 'brightness(0.9)' }}
              />
              <div className="px-4 py-2">
                <h3
                  className="font-bold text-zinc-300 sm:text-xl"
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
                  {item.title || item.name}
                </h3>
                <p
                  className="text-sm text-zinc-400"
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
