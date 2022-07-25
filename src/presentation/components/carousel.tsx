import { IMovie, IMovieGenre, ITv, ITvGenre } from '@/domain/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { formatGenre } from '../helpers'
import { Backdrop } from './backdrop'
import { SelectGenreValue } from './select-genre'

interface CarouselProps {
  genre: IMovieGenre | ITvGenre | string
  selectedGenre?: SelectGenreValue
  list: Array<IMovie | ITv> | undefined
}

export function Carousel (props: CarouselProps) {
  const [visible, setVisible] = useState(false)
  const [grid, setGrid] = useState(false)

  const [axisX, setAxisX] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const { list, genre, selectedGenre } = props
  const filteredList = list
    ? list.filter(item => item.backdrop_path !== null)
    : []

  const carouselWidth = useMemo(() => (
    Math.floor((window.innerWidth * 0.9) / 310) * 310
  ), [window.innerWidth])

  const listWidth = useMemo(() => (
    filteredList.length * 310
  ), [filteredList.length])

  const handleLeftArrowClick = useCallback(() => {
    setAxisX(axisX => axisX + carouselWidth)
  }, [])

  const handleRightArrowClick = useCallback(() => {
    setAxisX(axisX => axisX - carouselWidth)
  }, [])

  useEffect(() => {
    if (axisX >= 0) {
      setAxisX(0)
      setShowLeftArrow(false)
    } else {
      setShowLeftArrow(true)
    }

    const nextRight = Math.abs(axisX - carouselWidth)
    if (nextRight >= listWidth) {
      setShowRightArrow(false)
    } else {
      setShowRightArrow(true)
    }
  }, [axisX, listWidth])

  useEffect(() => {
    setVisible(selectedGenre === genre || selectedGenre === '*')
    setGrid(selectedGenre === genre)
    setAxisX(axisX => selectedGenre === genre ? 0 : axisX)
  }, [selectedGenre])

  return (
    <section className={visible ? 'block' : 'hidden'}>
      <h2 className="pt-6 pb-4 text-2xl text-title">
        {formatGenre(genre as any)}
      </h2>
      <div className={grid ? 'block' : 'group relative flex items-center overflow-hidden'}>
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
            flex items-center gap-4 transition-all duration-500
            ${grid ? 'flex-wrap' : 'flex-nowrap'}
          `}
          style={{
            marginLeft: axisX + 'px'
          }}
        >
          {filteredList.map((item, index) => (
            <Backdrop
              key={index}
              backdrop={item}
              size="w300"
              title={item?.title || (item?.name as string)}
              className="min-w-[300px] text-lg"
            />
          ))}
        </ul>
        <button
          className={`absolute right-1 text-title opacity-0 group-hover:opacity-100 z-10 rounded-full bg-gray-700 bg-opacity-30 hover:bg-opacity-60 ${
            showRightArrow ? 'visible' : 'invisible'
          }`}
          onClick={handleRightArrowClick}
        >
          <MdChevronRight size={40} />
        </button>
      </div>
    </section>
  )
}
