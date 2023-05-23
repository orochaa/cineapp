import { MovieGenre, TvGenre } from '@/domain/api'
import { formatGenre } from '@/helpers'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import Select, { SingleValue } from 'react-select'

export type SelectGenreValue = MovieGenre | TvGenre | '*'

type SelectOption = {
  label: string
  value: SelectGenreValue
}

interface SelectGenreProps {
  title: string
  options: Array<MovieGenre | TvGenre>
  onSet: Dispatch<SetStateAction<SelectGenreValue>>
}

export function SelectGenre(props: SelectGenreProps) {
  const [value, setValue] = useState<SingleValue<SelectOption>>({
    label: 'Gêneros',
    value: '*'
  })

  const handleClick = useCallback((data: SingleValue<SelectOption>) => {
    setValue(data)
    props.onSet(data?.value as SelectGenreValue)
  }, [])

  const hover = {
    option: '#734bd1',
    border: '#6833e4',
    boxShadow: '0 0 10px #9466ff',
    current: '#090B10'
  }

  return (
    <div className="flex flex-1 gap-6">
      <button
        className="text-2xl text-title"
        onClick={() =>
          handleClick({
            label: 'Gêneros',
            value: '*'
          })
        }
      >
        {props.title}
      </button>
      <Select
        styles={{
          container: base => ({
            ...base,
            minWidth: '12rem'
          }),
          control: (base, state) => ({
            ...base,
            background: hover.current,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: state.isFocused ? hover.border : hover.current,
            boxShadow: state.isFocused ? hover.boxShadow : '',
            ':hover': {
              borderColor: hover.border,
              boxShadow: hover.boxShadow
            }
          }),
          singleValue: base => ({
            ...base,
            color: 'white'
          }),
          menuList: base => ({
            ...base,
            background: hover.current,
            border: '2px solid' + hover.border
          }),
          option: base => ({
            ...base,
            background: hover.current,
            color: 'white',
            ':hover': {
              background: hover.option
            }
          })
        }}
        value={value}
        options={props.options.map(value => ({
          label: formatGenre(value),
          value
        }))}
        onChange={data => handleClick(data as SelectOption)}
      />
    </div>
  )
}
