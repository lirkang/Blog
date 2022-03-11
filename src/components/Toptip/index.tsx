import { ReactElement } from 'react'

import 'styles/toptip.css'

export interface ToptipInterface {
	title: string | number
	direction?: 'top' | 'bottom'
	children: ReactElement
}

const TopTip = ({ children, title, direction = 'top' }: ToptipInterface) => {
	return (
		<div className='toptip'>
			<div className={'toptip-children ' + direction}>{children} </div>
			<div className={'toptip__tip transition ' + direction}>{title}</div>
		</div>
	)
}

export default TopTip
