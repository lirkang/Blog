import { LeftCircleFilled } from '@ant-design/icons'
import Button from 'components/common/Button'
import { useLocation } from 'react-router-dom'
import './index.scss'

const Header = () => {
  const location = useLocation()

  return (
    <div className='header'>
      <div className='header-back'>
        <LeftCircleFilled />
      </div>

      <div className='header-title'>{document.title}</div>

      <div className='header-button'>
        <Button text='评论' />
      </div>
    </div>
  )
}

export default Header
