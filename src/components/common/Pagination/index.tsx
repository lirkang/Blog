import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'

import './index.css'

export interface PaginationInterface {
	changeSize: (size: number) => void
	changeIndex: (size: number) => void
	total: number
	index: number
	size: number
}

const Pagination: FC<PaginationInterface> = ({
	changeIndex,
	changeSize,
	total,
	index,
	size
}) => {
	const [indexLength, setIndexLength] = useState<null[]>([])

	const emitChangeIndex = (currentIndex: number) => {
		if (currentIndex === index) return
		else changeIndex(currentIndex)
	}

	const clickArrow = (flag: boolean, number: number) => {
		if (flag) return
		else changeIndex(index + number)
	}

	useEffect(() => {
		let finalIndex = 1

		if (total > size) {
			finalIndex = (total - (total % size)) / size

			if (total % size) finalIndex += 1
		}

		setIndexLength(new Array(finalIndex).fill(null))
	}, [total, size])

	return (
		<div className='pagination'>
			<div
				onClick={() => clickArrow(index === 0 || total <= size, -1)}
				className={
					'pagination-button arrow' +
					(index === 0 || total <= size ? ' disabled' : '')
				}
			>
				<LeftOutlined />
			</div>

			{indexLength.map((number, currentIndex) => (
				<div
					onClick={() => emitChangeIndex(currentIndex)}
					className={
						'pagination-button' + (index === currentIndex ? ' is-active' : '')
					}
					key={currentIndex}
				>
					{currentIndex + 1}
				</div>
			))}

			<div
				onClick={() =>
					clickArrow(index + 1 === indexLength.length || total <= size, 1)
				}
				className={
					'pagination-button arrow' +
					(index + 1 === indexLength.length || total <= size ? ' disabled' : '')
				}
			>
				<RightOutlined />
			</div>
		</div>
	)
}

export default Pagination
