import { cn } from '@/lib/format'
import type { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
  className?: string
}

export function Main(props: MainProps): React.JSX.Element {
  return (
    <main className={cn('bg-background min-h-svh w-full', props.className)}>
      {props.children}
    </main>
  )
}
