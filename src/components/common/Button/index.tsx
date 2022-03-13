import { LoadingOutlined } from '@ant-design/icons'
import './index.scss'

export interface ButtonInterface {
  onClick?: () => void
  text?: string
  loading?: boolean
}

const Button = ({
  onClick = () => {},
  text,
  loading = false
}: ButtonInterface) => {
  return (
    <div
      onClick={() => !loading && onClick()}
      className={`button ${loading ? 'is-loading' : ''}`}
    >
      {loading && <LoadingOutlined />}
      {text}
    </div>
  )
}

export default Button
