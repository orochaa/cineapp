export function Main ({ children }: { children: any }) {
  return (
    <main className="w-full overflow-hidden bg-background text-title">
      <div className="w-11/12 m-auto py-4">{children}</div>
    </main>
  )
}
