import { IMovie, ITv } from '@/domain/api'
import { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Backdrop } from './backdrop'

interface CarouselProps {
  list: Array<IMovie | ITv>
}

export function Carousel ({ list }: CarouselProps) {
  const [axisX, setAxisX] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const filteredList = list.filter(item => item.backdrop_path !== null)

  const handleLeftArrowClick = () => {
    let x = axisX + Math.round(window.innerWidth * 0.78)

    if (x >= 0) {
      x = 0
      setShowLeftArrow(false)
    } else {
      setShowRightArrow(true)
    }

    setAxisX(x)
  }

  const handleRightArrowClick = () => {
    const listWidth = filteredList.length * 310
    let x = axisX - Math.round(window.innerWidth * 0.78)

    if (window.innerWidth - listWidth > x) {
      const blankSpace = window.innerWidth > 800 ? 80 : 16

      x = window.innerWidth - listWidth - blankSpace
      setShowRightArrow(false)
    } else {
      setShowLeftArrow(true)
    }

    setAxisX(x)
  }

  useEffect(() => {
    const paddingLeft = window.innerWidth > 800 ? 80 : 28
    const listWidth = filteredList.length * 310

    if (window.innerWidth - paddingLeft > listWidth) {
      setShowRightArrow(false)
    }
  }, [filteredList.length])

  return (
    <section className="group relative flex items-center overflow-hidden py-4">
      <button
        className={`absolute left-1 opacity-0 text-title group-hover:opacity-100 z-10 rounded-full bg-gray-700 bg-opacity-30 hover:bg-opacity-60 ${
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
        className={`absolute right-1 opacity-0 text-title group-hover:opacity-100 z-10 rounded-full bg-gray-700 bg-opacity-30 hover:bg-opacity-60 ${
          showRightArrow ? 'visible' : 'invisible'
        }`}
        onClick={handleRightArrowClick}
      >
        <MdChevronRight size={40} />
      </button>
    </section>
  )
}
