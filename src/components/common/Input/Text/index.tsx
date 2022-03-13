import { CloseCircleFilled } from '@ant-design/icons'
import { ReactElement, useRef, useState } from 'react'

import './input.scss'

export interface InputInterface {
  prefix?: ReactElement
  onEnter?: (search: string) => void
  onChange?: (value: string) => void
  placeholder?: string
  value?: string
  showCleaner?: boolean
}

const Input = ({
  prefix = <></>,
  onEnter = () => {},
  value = '',
  placeholder = '',
  onChange = () => {},
  showCleaner = false
}: InputInterface) => {
  const InputRef = useRef<HTMLInputElement>(null)
  const [hover, setHover] = useState('')
  const [focus, setFocus] = useState('')

  return (
    <div
      onMouseEnter={() => setHover('is-hover')}
      onMouseLeave={() => setHover('')}
      className={`input ${hover} ${focus}`}
      onClick={() => InputRef.current?.focus()}
    >
      <input
        onFocus={() => setFocus('is-focus')}
        onBlur={() => setFocus('')}
        onKeyUp={({ keyCode }) => keyCode === 13 && onEnter(value)}
        value={value}
        onChange={({ target }) => onChange(target.value)}
        ref={InputRef}
        type='text'
        placeholder={placeholder}
      />

      {showCleaner && (
        <div
          onClick={() => onChange('')}
          className={'input__cleaner' + (value ? ' is-valuable' : '')}
        >
          <CloseCircleFilled />
        </div>
      )}
    </div>
  )
}

export default Input
