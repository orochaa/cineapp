import { Dispatch, ForwardRefRenderFunction, useCallback, useEffect, useMemo, useState, SetStateAction, useImperativeHandle, forwardRef, TouchEvent } from 'react'
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

const CarouselComponent: ForwardRefRenderFunction<ICarouselHandles, ICarouselProps> = (props, ref) => {
  const [axisX, setAxisX] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  const [grid, setGrid] = useState(false)
  const [carouselList, setCarouselList] = useState<any[]>([])

  const carouselWidth = useMemo(
    () => Math.floor((window.innerWidth * 0.9) / props.cardLength) * props.cardLength,
    [window.innerWidth]
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

  const handleTouchStart = useCallback((event: TouchEvent<HTMLUListElement>) => {
    setTouchStart(event.touches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((event: TouchEvent<HTMLUListElement>) => {
    const actualTouch = event.touches[0].clientX
    const touchDiference = (touchStart - actualTouch) * 1.5
    setAxisX(axisX - touchDiference)
  }, [touchStart])

  useImperativeHandle(ref,
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
      <h2 className="pt-6 pb-4 text-2xl text-title">{props.title}</h2>
      <div
        className={
          grid ? 'block' : 'group relative flex items-center overflow-hidden'
        }
      >
        <button
          className={`absolute left-1 text-title opacity-0 group-hover:opacity-100 z-10 rounded-full bg-gray-700 bg-opacity-30 hover:bg-opacity-60 ${
            showLeftArrow ? 'visible' : 'invisible'
          }`}
          onClick={handleLeftArrowClick}
        >
          <MdChevronLeft size={40} />
        </button>
        <ul
          className={`
            flex shrink-0 items-center gap-4 transition-all sm:duration-500 ease-linear sm:ease-in-out
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
          className="absolute right-1 text-title opacity-0 group-hover:opacity-100 z-10 rounded-full bg-gray-700 bg-opacity-30 hover:bg-opacity-60"
          onClick={handleRightArrowClick}
        >
          <MdChevronRight size={40} />
        </button>
      </div>
    </>
  )
}

export const Carousel = forwardRef(CarouselComponent)
