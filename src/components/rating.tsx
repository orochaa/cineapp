import React from 'react'

interface RatingProps {
  size: number
  rate: number | undefined
}

export function Rating(props: RatingProps): React.JSX.Element {
  const { size, rate } = props
  let strokeColor = ''
  const dash = (size * 220) / 70

  if (!rate) {
    return <span />
  }

  if (rate >= 8) {
    strokeColor = '#31dd0e'
  } else if (rate >= 6) {
    strokeColor = '#dadd0e'
  } else if (rate >= 4) {
    strokeColor = '#dd720e'
  } else if (rate >= 0) {
    strokeColor = '#d82020'
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="right-1/5 absolute">
        <p
          style={{
            fontSize: (size * 14) / 40,
          }}
        >
          {rate.toFixed(1)}
        </p>
      </div>
      <div
        style={{
          height: size,
          width: size,
          transform: 'rotate(270deg)',
        }}
      >
        <svg className="m-auto block">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2}
            style={{
              width: '100%',
              height: '100%',
              fill: 'transparent',
              transform: 'translate(1px, 1px)',
              strokeWidth: '2px',
              stroke: '#555',
            }}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2}
            style={{
              width: '100%',
              height: '100%',
              fill: 'transparent',
              transform: 'translate(1px, 1px)',
              strokeWidth: '2px',
              stroke: strokeColor,
              strokeDasharray: dash,
              strokeDashoffset: dash - (dash * rate) / 10,
            }}
          />
        </svg>
      </div>
    </div>
  )
}
