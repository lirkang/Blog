import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { ReactElement, useRef, useState } from 'react'

import './input.scss'

export interface InputInterface {
  prefix?: ReactElement
  suffix?: ReactElement
  onSearch: (search: string) => void
  placeholder?: string
}

const Input = ({
  prefix = <SearchOutlined />,
  suffix = <CloseCircleOutlined />,
  onSearch,
  placeholder = ''
}: InputInterface) => {
  const InputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [hover, setHover] = useState('')
  const [focus, setFocus] = useState('')

  return (
    <div
      onMouseEnter={() => setHover('is-hover')}
      onMouseLeave={() => setHover('')}
      className={`input ${hover} ${focus}`}
      onClick={() => InputRef.current?.focus()}
    >
      <div className='input__prefix' onClick={() => onSearch(value)}>
        {prefix}
      </div>

      <input
        onFocus={() => setFocus('is-focus')}
        onBlur={() => setFocus('')}
        onKeyUp={({ keyCode }) => keyCode === 13 && onSearch(value)}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        ref={InputRef}
        type='text'
        placeholder={placeholder}
      />

      <div
        onClick={() => setValue('')}
        className={'input__cleaner' + (value ? ' is-valuable' : '')}
      >
        {suffix}
      </div>
    </div>
  )
}

export default Input
