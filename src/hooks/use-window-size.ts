import { useEffect, useState } from 'react'

interface WindowSize {
  windowWidth: number
  windowHeight: number
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return (): void => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}
