import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { HeaderMenu } from 'types/heder'
import {
	CloseCircleOutlined,
	PlusCircleFilled,
	SearchOutlined
} from '@ant-design/icons'

import 'styles/header.css'

import { stringify } from 'utils/query'

const Header = ({ menus }: { menus: HeaderMenu[] }) => {
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

		if (pathname === '/article') setSearchParams({ search: value })
		else navigate({ pathname: `/article${stringify({ search: value })}` })
	}

	const replace = (path: string) => {
		if (path === location.pathname) return
		else navigate(path)
	}

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

				<CloseCircleOutlined
					onClick={() => setValue('')}
					className={'header-input__cleaner' + (value ? ' is-valuable' : '')}
				/>
			</div>

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
