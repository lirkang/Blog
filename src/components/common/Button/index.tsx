import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { ReactElement, useRef, useState } from 'react'

import './index.scss'

export interface ButtonInterface {
  prefix?: ReactElement
  suffix?: ReactElement
  onSearch: (search: string) => void
  placeholder?: string
}

const Button = ({}: ButtonInterface) => {
  return <div></div>
}

export default Button
