import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import type { Dispatch, ReactNode, SetStateAction, TouchEvent } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface CarouselProps {
  title: string
  cardLength: number
  children: ReactNode[] | undefined
}

export interface CarouselHandles {
  setGrid: Dispatch<SetStateAction<boolean>>
  setAxisX: Dispatch<SetStateAction<number>>
}

export const Carousel = forwardRef<CarouselHandles, CarouselProps>(
  (props, ref) => {
    const [axisX, setAxisX] = useState(0)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [touchStart, setTouchStart] = useState(0)

    const [grid, setGrid] = useState(false)
    const [carouselList, setCarouselList] = useState<ReactNode[]>([])

    const carouselWidth = useMemo(
      () =>
        Math.floor((window.innerWidth * 0.9) / props.cardLength) *
        props.cardLength,
      [props.cardLength]
    )

    const carouselListWidth = useMemo(
      () => carouselList.length * props.cardLength,
      [carouselList.length, props.cardLength]
    )

    const handleLeftArrowClick = useCallback(() => {
      setAxisX(axisX => axisX + carouselWidth)
    }, [carouselWidth])

    const handleRightArrowClick = useCallback(() => {
      setAxisX(axisX => axisX - carouselWidth)
    }, [carouselWidth])

    const handleTouchStart = useCallback(
      (event: TouchEvent<HTMLUListElement>) => {
        setTouchStart(event.touches[0].clientX)
      },
      []
    )

    const handleTouchMove = useCallback(
      (event: TouchEvent<HTMLUListElement>) => {
        const actualTouch = event.touches[0].clientX
        const touchDiference = (touchStart - actualTouch) * 1.5
        setAxisX(axisX - touchDiference)
      },
      [axisX, touchStart]
    )

    useImperativeHandle(
      ref,
      () => ({
        setGrid,
        setAxisX,
      }),
      []
    )

    useEffect(() => {
      if (axisX >= 0) {
        setAxisX(0)
        setShowLeftArrow(false)
      } else {
        setShowLeftArrow(true)
      }

      const nextRight = Math.abs(axisX - carouselWidth * 2)

      if (nextRight >= carouselListWidth) {
        setCarouselList(carouselList =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          [...carouselList, ...(props.children ?? carouselList)].map(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
            (item, index) => ({ ...(item as any), key: index })
          )
        )
      }
    }, [axisX, carouselListWidth, carouselWidth, props.children])

    useEffect(() => {
      setAxisX(0)
    }, [grid])

    useEffect(() => {
      if (props.children) {
        setCarouselList(props.children)
      }
    }, [props.children])

    return (
      <>
        <h2 className="text-title m-6 mb-4 text-2xl font-semibold">
          {props.title}
        </h2>
        <div className={grid ? 'block' : 'relative flex overflow-hidden'}>
          <button
            type="button"
            data-active={showLeftArrow}
            className="invisible absolute bottom-0 left-0 z-10 flex h-full w-16 items-center justify-center bg-gradient-to-r from-zinc-950/90 via-zinc-950/80 to-transparent opacity-0 transition hover:opacity-100 data-active:visible"
            onClick={handleLeftArrowClick}
          >
            <MdChevronLeft size={40} className="text-title" />
          </button>
          <ul
            className={`flex shrink-0 items-start gap-4 pl-6 transition-all ease-linear sm:duration-500 sm:ease-in-out ${grid ? 'flex-wrap' : 'flex-nowrap'} `}
            style={{
              marginLeft: `${axisX}px`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {carouselList}
          </ul>
          <button
            type="button"
            className="absolute right-0 bottom-0 z-10 flex h-full w-16 items-center justify-center bg-gradient-to-r from-transparent via-zinc-950/80 to-zinc-950/90 opacity-0 transition hover:opacity-100"
            onClick={handleRightArrowClick}
          >
            <MdChevronRight size={40} />
          </button>
        </div>
      </>
    )
  }
)
