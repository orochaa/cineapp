import { Stars } from '@/components/stars'
import { Link } from 'react-router'

interface CardProps {
  uri: string
  imageUrl: string
  title: string | undefined
  description?: string
  rating?: number
  containerClassName?: string
}

export function Card(props: CardProps): React.JSX.Element {
  return (
    <Link to={props.uri} className={props.containerClassName}>
      <img
        src={props.imageUrl}
        alt={props.title}
        className="border border-slate-800 object-cover shadow brightness-[85%] transition-all hover:scale-[108%] hover:brightness-[90%]"
      />
      <div className="mt-1 max-w-full">
        <p
          title={props.title}
          className="line-clamp-1 text-lg font-semibold text-ellipsis text-zinc-200"
        >
          {props.title}
        </p>
        <p
          title={props.description}
          className="line-clamp-1 text-sm text-ellipsis text-zinc-400"
        >
          {props.description}
        </p>
        {!!props.rating && (
          <Stars rating={props.rating} starClassName="size-4" />
        )}
      </div>
    </Link>
  )
}
