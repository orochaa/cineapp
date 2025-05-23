import { cn } from '@/lib/format'
import { Star } from 'lucide-react'
import { useMemo } from 'react'

export interface StarsProps {
  rating: number | undefined
  containerClassName?: string
  starClassName?: string
}

export function Stars(props: StarsProps): React.JSX.Element {
  const ratingBase5 = useMemo(() => {
    const ratingList = Array.from({ length: 5 })

    if (!props.rating) {
      return ratingList
    }

    const ratingBase5 = Math.round((props.rating * 5) / 10)

    return ratingList.fill(true, 0, ratingBase5)
  }, [props.rating])

  return (
    <div className={cn('flex items-center gap-1', props.containerClassName)}>
      {ratingBase5.map((isFilled, i) => (
        <Star
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={cn(
            {
              'fill-yellow-500/90 text-yellow-500/90': isFilled,
              'text-yellow-500/90': !isFilled,
            },
            props.starClassName
          )}
        />
      ))}
    </div>
  )
}
