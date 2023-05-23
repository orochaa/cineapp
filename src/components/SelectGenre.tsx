'use client'

import { useState } from 'react'
import Select, { SingleValue } from 'react-select'

type SelectOption = {
  label: string
  value: string
}

interface SelectGenreProps {
  title: string
  options: SelectOption[]
  onSelect?: (option: SelectOption) => void
}

export function SelectGenre(props: SelectGenreProps) {
  const defaultOption = {
    label: 'Gêneros',
    value: '*'
  }
  const [value, setValue] = useState<SingleValue<SelectOption>>(defaultOption)

  const handleClick = (data: SingleValue<SelectOption>) => {
    setValue(data)
    props.onSelect?.(data as SelectOption)
  }

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
        onClick={() => {
          handleClick(defaultOption)
        }}
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
        options={props.options}
        onChange={handleClick}
      />
    </div>
  )
}
