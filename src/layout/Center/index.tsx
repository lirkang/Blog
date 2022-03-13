import Header from 'components/context/Header'
import { ReactElement } from 'react'

export interface CenterInterface {
  children: ReactElement
  className: string
}

const Center = ({ children, className }: CenterInterface) => {
  return (
    <div className={className}>
      <Header />

      <div>{children}</div>
    </div>
  )
}

export default Center
