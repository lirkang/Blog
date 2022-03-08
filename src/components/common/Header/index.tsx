import { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { HeaderMenu } from '../types/heder'
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons'
import './index.css'
import { parser, stringify } from '@/utils/query'
import Toptip from '../Toptip'

export interface HeaderInterface {
	menus: HeaderMenu[]
}

const Header: FC<HeaderInterface> = ({ menus }): ReactElement => {
	const navigate = useNavigate()
	const InputRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState('')
	const [hover, setHover] = useState('')
	const [focus, setFocus] = useState('')
	const [searchParams, setSearchParams] = useSearchParams()
	const location = useLocation()

	const search = () => {
		if (!value && !searchParams.has('search')) return

		const { pathname } = location

		if (pathname === '/article') {
			setSearchParams({ search: value })
		} else {
			navigate({ pathname: `/article${stringify({ search: value })}` })
		}
	}

	const replace = (path: string) => {
		if (path === location.pathname) return
		else navigate(path)
	}

	useEffect(() => {
		if (location.pathname !== '/article') setValue('')
		if (!parser(location.search).search) setSearchParams({})
	}, [location.pathname])

	useEffect(() => {
		if (searchParams.has('search')) setValue(searchParams.get('search')!)
	}, [])

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

			<div
				onMouseEnter={() => setHover('is-hover')}
				onMouseLeave={() => setHover('')}
				className={`header-input transition ${hover} ${focus}`}
				onClick={() => {
					InputRef.current?.focus()
				}}
			>
				<SearchOutlined onClick={search} className='header-input__searcher' />

				<Toptip direction='bottom' title={'按下回车搜索'}>
					<input
						onFocus={() => {
							setFocus('is-focus')
							setHover('')
						}}
						onBlur={() => setFocus('')}
						onKeyUp={({ keyCode }) => keyCode === 13 && search()}
						value={value}
						onChange={({ target }) => setValue(target.value)}
						ref={InputRef}
						type='text'
						placeholder='搜索标题...'
					/>
				</Toptip>

				<CloseCircleOutlined
					onClick={() => setValue('')}
					className={'header-input__cleaner' + (value ? ' is-valuable' : '')}
				/>
			</div>
		</div>
	)
}

export default Header
