'use client'

import { useWindowSize } from '@/hooks/use-window-size'
import {
  Dispatch,
  ForwardRefRenderFunction,
  SetStateAction,
  TouchEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface ICarouselProps {
  title: string
  cardLength: number
  children: any[] | undefined
}

export interface ICarouselHandles {
  setGrid: Dispatch<SetStateAction<boolean>>
  setAxisX: Dispatch<SetStateAction<number>>
}

const CarouselComponent: ForwardRefRenderFunction<
  ICarouselHandles,
  ICarouselProps
> = (props, ref) => {
  const [axisX, setAxisX] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  const [grid, setGrid] = useState(false)
  const [carouselList, setCarouselList] = useState<any[]>([])

  const window = useWindowSize()
  
  const carouselWidth = useMemo(
    () =>
      Math.floor((window.width * 0.9) / props.cardLength) *
      props.cardLength,
    [window.width]
  )

  const carouselListWidth = useMemo(
    () => carouselList.length * props.cardLength,
    [carouselList.length]
  )

  const handleLeftArrowClick = useCallback(() => {
    setAxisX(axisX => axisX + carouselWidth)
  }, [])

  const handleRightArrowClick = useCallback(() => {
    setAxisX(axisX => axisX - carouselWidth)
  }, [])

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
    [touchStart]
  )

  useImperativeHandle(
    ref,
    () => ({
      setGrid,
      setAxisX
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
        carouselList
          .concat(props.children || carouselList)
          .map((item, index) => ({ ...item, key: index }))
      )
    }
  }, [axisX])

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
      <h2 className="pb-4 pt-6 text-2xl text-title">{props.title}</h2>
      <div
        className={
          grid ? 'block' : 'group relative flex items-center overflow-hidden'
        }
      >
        <button
          className={`absolute left-1 z-10 rounded-full bg-gray-700 bg-opacity-30 text-title opacity-0 hover:bg-opacity-60 group-hover:opacity-100 ${
            showLeftArrow ? 'visible' : 'invisible'
          }`}
          onClick={handleLeftArrowClick}
        >
          <MdChevronLeft size={40} />
        </button>
        <ul
          className={`
            flex shrink-0 items-center gap-4 transition-all ease-linear sm:duration-500 sm:ease-in-out
            ${grid ? 'flex-wrap' : 'flex-nowrap'}
          `}
          style={{
            marginLeft: axisX + 'px'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {carouselList}
        </ul>
        <button
          className="absolute right-1 z-10 rounded-full bg-gray-700 bg-opacity-30 text-title opacity-0 hover:bg-opacity-60 group-hover:opacity-100"
          onClick={handleRightArrowClick}
        >
          <MdChevronRight size={40} />
        </button>
      </div>
    </>
  )
}

export const Carousel = forwardRef(CarouselComponent)
