import { IMovieGenre, ITvGenre } from '@/domain/api'
import { Dispatch, SetStateAction } from 'react'
import Select from 'react-select'
import { formatGenre } from '../helpers'

interface SelectGenreProps {
  title: string
  options: Array<IMovieGenre | ITvGenre>
  onSet: Dispatch<SetStateAction<IMovieGenre | ITvGenre>>
}

export function SelectGenre (props: SelectGenreProps) {
  return (
    <div className="flex flex-1 gap-6">
      <h2 className="text-title text-2xl">{props.title}</h2>
      <Select
        styles={{
          control: (base, state) => ({
            ...base,
            background: '#090B10',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: state.isFocused ? '#00875f' : '#090B10',
            boxShadow: state.isFocused ? '0 0 10px #00875f' : '',
            ':hover': {
              borderColor: '#00875f',
              boxShadow: '0 0 10px #00875f'
            }
          }),
          singleValue: base => ({
            ...base,
            color: 'white'
          }),
          menuList: base => ({
            ...base,
            background: '#090B10',
            border: '2px solid #00875f'
          }),
          option: base => ({
            ...base,
            background: '#090B10',
            color: 'white',
            ':hover': {
              background: '#00875f'
            }
          })
        }}
        options={props.options.map(value => ({
          label: formatGenre(value),
          value
        }))}
        onChange={data => props.onSet(data?.value as IMovieGenre)}
      />
    </div>
  )
}
