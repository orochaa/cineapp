import { useCallback, useEffect, useMemo, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { IMovie, IMovieGenre, ITv, ITvGenre } from '@/domain/api'
import { Backdrop, SelectGenreValue } from '@/presentation/components'
import { formatGenre } from '@/presentation/helpers'

interface CarouselProps {
  genre: IMovieGenre | ITvGenre | string
  selectedGenre?: SelectGenreValue
  list: Array<IMovie | ITv> | undefined
}

export function Carousel (props: CarouselProps) {
  const [visible, setVisible] = useState(false)
  const [grid, setGrid] = useState(false)

  const [axisX, setAxisX] = useState(0)
  const [leftArrow, setLeftArrow] = useState(false)

  const [carouselList, setCarouselList] = useState<Array<IMovie | ITv>>([])

  const carouselWidth = useMemo(
    () => Math.floor((window.innerWidth * 0.9) / 310) * 310,
    [window.innerWidth]
  )

  const carouselListWidth = useMemo(
    () => carouselList.length * 310,
    [carouselList.length]
  )

  const handleLeftArrowClick = useCallback(() => {
    setAxisX(axisX => axisX + carouselWidth)
  }, [])

  const handleRightArrowClick = useCallback(() => {
    setAxisX(axisX => axisX - carouselWidth)
  }, [])

  useEffect(() => {
    if (axisX >= 0) {
      setAxisX(0)
      setLeftArrow(false)
    } else {
      setLeftArrow(true)
    }

    const nextRight = Math.abs(axisX - carouselWidth * 2)
    if (nextRight >= carouselListWidth) {
      setCarouselList(carouselList.concat(carouselList))
    }
  }, [axisX, carouselList.length])

  useEffect(() => {
    const isGenreSelected = props.selectedGenre === props.genre
    setVisible(isGenreSelected || props.selectedGenre === '*')
    setGrid(isGenreSelected)
    setAxisX(axisX => (isGenreSelected ? 0 : axisX))
  }, [props.selectedGenre])

  useEffect(() => {
    if (props.list) {
      setCarouselList(
        props.list.filter(item => item.backdrop_path !== null)
      )
    }
  }, [props.list, props.selectedGenre])

  return (
    <section className={visible ? 'block' : 'hidden'}>
      <h2 className="pt-6 pb-4 text-2xl text-title">
        {formatGenre(props.genre as any)}
      </h2>
      <div
        className={
          grid ? 'block' : 'group relative flex items-center overflow-hidden'
        }
      >
        <button
          className={`absolute left-1 text-title opacity-0 group-hover:opacity-100 z-10 rounded-full bg-gray-700 bg-opacity-30 hover:bg-opacity-60 ${
            leftArrow ? 'visible' : 'invisible'
          }`}
          onClick={handleLeftArrowClick}
        >
          <MdChevronLeft size={40} />
        </button>
        <ul
          className={`
            flex shrink-0 items-center gap-4 transition-all duration-500
            ${grid ? 'flex-wrap' : 'flex-nowrap'}
          `}
          style={{
            marginLeft: axisX + 'px'
          }}
        >
          {carouselList.map((item, index) => (
            <Backdrop
              key={index}
              backdrop={item}
              size="w300"
              title={item?.title || (item?.name as string)}
              className="text-lg"
            />
          ))}
        </ul>
        <button
          className="absolute right-1 text-title opacity-0 group-hover:opacity-100 z-10 rounded-full bg-gray-700 bg-opacity-30 hover:bg-opacity-60"
          onClick={handleRightArrowClick}
        >
          <MdChevronRight size={40} />
        </button>
      </div>
    </section>
  )
}
