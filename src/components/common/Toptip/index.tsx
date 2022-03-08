import { FC } from 'react'

import './index.css'

export interface Toptip {
	title: string | number
	direction?: 'top' | 'bottom'
}

const TopTip: FC<Toptip> = ({ children, title, direction = 'top' }) => {
	return (
		<div className='toptip'>
			<div className={'toptip__children ' + direction}>{children} </div>
			<div className={'toptip-tip transition ' + direction}>{title}</div>
		</div>
	)
}

export default TopTip
