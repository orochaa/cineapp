import { IMovie, ITv } from '@/domain/api'
import { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Backdrop } from './backdrop'

interface CarouselProps {
  title: string
  list: Array<IMovie | ITv> | undefined
}

export function Carousel (props: CarouselProps) {
  const [axisX, setAxisX] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const filteredList = props.list ? props.list.filter(item => item.backdrop_path !== null) : []

  const carouselWidth = Math.floor((window.innerWidth * 0.9) / 310) * 310
  const listWidth = filteredList.length * 310

  const handleLeftArrowClick = () => {
    setAxisX(axisX => axisX + carouselWidth)
  }

  const handleRightArrowClick = () => {
    setAxisX(axisX => axisX - carouselWidth)
  }

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

  return (
    <section>
      <h2 className="pt-6 pb-4 text-2xl text-title">{props.title}</h2>
      <div className="group relative flex items-center overflow-hidden">
        <button
          className={`absolute left-1 text-title opacity-0 group-hover:opacity-100 z-10 rounded-full bg-gray-700 bg-opacity-30 hover:bg-opacity-60 ${
            showLeftArrow ? 'visible' : 'invisible'
          }`}
          onClick={handleLeftArrowClick}
        >
          <MdChevronLeft size={40} />
        </button>
        <ul
          className="flex items-center gap-4 transition-all duration-500"
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
