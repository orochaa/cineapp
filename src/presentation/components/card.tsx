import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from './rating'

interface CardProps {
  uri: string
  imageUrl: string
  name: string | undefined
  paragraph?: string
  rating?: number
  className?: string
}

export function Card(props: CardProps): React.JSX.Element {
  const [hover, setHover] = useState(false)

  const boxWidth = Number.parseInt(
    /\/w\d+/i.exec(props.imageUrl)?.shift()?.replace(/\D/g, '') ?? '0'
  )
  const heightProportion = 16 / 10 - 1
  const boxHeight = boxWidth * heightProportion

  return props.name ? (
    <Link
      to={props.uri}
      className={`relative text-title shadow-md shadow-black ${props.className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={props.imageUrl}
        alt={props.name}
        style={{
          transition: 'all 0.3s ease',
          filter: hover ? 'brightness(0.3)' : 'brightness(0.8)',
        }}
      />
      <div
        className="
              absolute inset-0
              flex items-end justify-between
              p-6 opacity-0
              transition-all hover:opacity-100
            "
      >
        <h3 className="text-lg font-semibold">
          {props.name}
          <p className="text-sm text-zinc-400">{props.paragraph}</p>
        </h3>
        {props.rating ? <Rating rate={props.rating} size={40} /> : null}
      </div>
    </Link>
  ) : (
    <div
      className={props.className}
      style={{
        display: 'block',
        height: boxHeight,
        width:
          props.className && /\s?w-/i.test(props.className) ? '' : boxWidth,
        background: '#8884',
      }}
    />
  )
}
