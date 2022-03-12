import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { HeaderMenu } from 'types/heder'
import { PlusCircleFilled } from '@ant-design/icons'

import 'styles/header.scss'

import { stringify } from 'utils/query'
import Input from 'components/common/Input'

const Header = ({ menus }: { menus: HeaderMenu[] }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const search = (value: string) => {
    if (!value && !searchParams.has('search')) return

    const { pathname } = location

    if (pathname === '/article') setSearchParams({ search: value })
    else navigate({ pathname: `/article${stringify({ search: value })}` })
  }

  const replace = (path: string) => {
    if (path === location.pathname) return
    else navigate(path)
  }

  return (
    <div className='header'>
      <div className='header-menu'>
        {menus.map(({ title, icon, path }) => (
          <div
            className={
              'header-menu__item transition' +
              (location.pathname === path ? ' is-active' : '')
            }
            key={path}
            onClick={() => replace(path)}
          >
            <span className='header-menu__icon'>{icon}</span>
            <span className='header-menu__title'>{title}</span>
          </div>
        ))}
      </div>

      <Input onSearch={value => search(value)} placeholder='搜索...' />

      {location.pathname !== '/article/write' && (
        <div
          className='header-button transition'
          onClick={() => navigate('/article/write')}
        >
          <PlusCircleFilled />
        </div>
      )}
    </div>
  )
}

export default Header
