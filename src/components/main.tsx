import type { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

export function Main({ children }: MainProps): React.JSX.Element {
  return (
    <main className="bg-background text-title min-h-screen w-full overflow-hidden">
      <div className="m-auto mt-28 mb-20 w-11/12">{children}</div>
    </main>
  )
}
