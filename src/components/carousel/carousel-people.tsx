import { Card } from '@/components/card'
import { Carousel } from '@/components/carousel/carousel'
import React, { useMemo } from 'react'

interface CarouselPerson {
  id: number
  name: string
  character?: string
  profile_path: string
  known_for_department: string
}

interface CarouselPeopleProps {
  title: string
  list: CarouselPerson[] | undefined
}

export function CarouselPeople(props: CarouselPeopleProps): React.JSX.Element {
  const filteredList = useMemo(
    () =>
      props.list?.filter(
        (person, index, arr) =>
          arr.findIndex(prev => prev.id === person.id) === index &&
          person.profile_path
      ),
    [props.list]
  )

  if (!filteredList?.length) {
    return <span />
  }

  return (
    <Carousel title={props.title} cardLength={185}>
      {filteredList.map(person => (
        <Card
          key={person.id}
          uri={`/person/${person.id}`}
          imageUrl={''.concat(
            import.meta.env.VITE_API_IMAGE_URL,
            '/w185' as ProfileSize,
            person.profile_path
          )}
          name={person.name}
          paragraph={person.character ?? person.known_for_department}
        />
      ))}
    </Carousel>
  )
}
