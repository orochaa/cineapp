import { Card } from '@/components/Card'
import { Carousel } from '@/components/carousel/Carousel'
import { formatImageRequest } from '@/lib/request'
import { useMemo } from 'react'

interface ICarouselPerson {
  id: number
  name: string
  character?: string
  profile_path: string
  known_for_department: string
}

interface CarouselPeopleProps {
  title: string
  list: ICarouselPerson[] | undefined
}

export function CarouselPeople(props: CarouselPeopleProps) {
  const filteredList = useMemo(
    () =>
      props.list?.filter(
        (person, index, arr) =>
          arr.findIndex(prev => prev.id === person.id) === index &&
          person.profile_path !== null
      ),
    [props.list]
  )

  if (!filteredList?.length) return <span></span>

  return (
    <Carousel title={props.title} cardLength={185}>
      {filteredList.map(person => (
        <Card
          key={person.id}
          redirect={`/person/${person.id}`}
          imageUrl={formatImageRequest({
            type: 'profile',
            size: '/w185',
            path: person.profile_path
          })}
          height={150}
          width={185}
          name={person.name}
          paragraph={person.character || person.known_for_department}
        />
      ))}
    </Carousel>
  )
}
