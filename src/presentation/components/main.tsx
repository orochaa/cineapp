export function Main ({ children }: { children: any }) {
  return (
    <main className="w-full min-h-screen overflow-hidden bg-background text-title">
      <div className="w-11/12 m-auto pt-4 pb-20">{children}</div>
    </main>
  )
}
