export function Main ({ children }: { children: any }) {
  return (
    <main className="w-full min-h-screen overflow-hidden bg-background text-title">
      <div className="w-11/12 m-auto mt-28 mb-20">{children}</div>
    </main>
  )
}
