export function Main({ children }: { children: any }) {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-background text-title">
      <div className="m-auto mb-20 mt-28 w-11/12">{children}</div>
    </main>
  )
}
