import { useState } from 'react'
import './index.scss'

export interface SwitchInterface {
  status?: boolean
  onChange?: (check: boolean) => void
}

const Switch = ({ status = false, onChange = () => {} }: SwitchInterface) => {
  const [value, setValue] = useState(false)

  return (
    <div
      onClick={() => setValue(!value)}
      className={'switch ' + (value ? 'is-on' : 'is-off')}
    >
      <div className={'switch-slider ' + (value ? 'is-on' : 'is-off')}></div>
    </div>
  )
}

export default Switch
