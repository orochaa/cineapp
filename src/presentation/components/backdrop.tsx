import { IMovie, ITv } from '@/domain/api'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from './rating'

interface BackdropProps {
  size: 'w300' | 'w780' | 'w1280' | 'original'
  className?: string
  backdrop: ITv | IMovie | undefined
  title: string | undefined
}

export function Backdrop (props: BackdropProps) {
  const [hover, onHover] = useState(false)
  const { backdrop, title } = props
  const boxWidth = parseInt(props.size.replace(/\D/gi, ''))
  const heightProportion = (16 / 10) - 1
  const boxHeight = boxWidth * heightProportion
  return (
    <>
      {backdrop ? (
        <Link
          to={`/movies/${backdrop.id}`}
          className={`relative text-title ${props.className}`}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        >
          <img
            src={`${import.meta.env.VITE_API_IMAGE_URL}/${props.size}${
              backdrop.backdrop_path
            }`}
            alt={title}
            style={{
              transition: 'all 0.3s ease',
              filter: hover ? 'brightness(0.3)' : 'brightness(0.8)'
            }}
          />
          <div
            className="
            absolute inset-0
            flex items-end justify-between
            p-6 transition-all
            opacity-0 hover:opacity-100
          "
          >
            <h3>{title}</h3>
            <Rating rate={backdrop.vote_average} size={40} />
          </div>
        </Link>
      ) : (
        <div className={props.className} style={{
          display: 'block',
          height: boxHeight,
          width: !/\s?w-/i.test(props.className as string) ? boxWidth : '',
          background: '#8884'
        }}></div>
      )}
    </>
  )
}
