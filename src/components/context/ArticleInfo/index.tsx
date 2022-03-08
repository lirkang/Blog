import formatDate from '@/utils/formatDate'
import {
	EditFilled,
	EyeFilled,
	MessageFilled,
	ClockCircleFilled
} from '@ant-design/icons'
import { FC } from 'react'

import './index.css'

export interface ArticleInfoInterface {
	visit_count: number
	comment_count: number
	nickname: string
	create_at: string
}

const ArticleInfo: FC<ArticleInfoInterface> = ({
	visit_count,
	comment_count,
	nickname,
	create_at
}) => {
	return (
		<div className='article-item__info'>
			<EditFilled className='article-item-icon' />
			<div className='article-item__author'>{nickname}</div>

			<EyeFilled className='article-item-icon' />
			<div className='article-item__visit'>{visit_count}</div>

			<MessageFilled className='article-item-icon' />
			<div className='article-item__comment'>{comment_count}</div>

			<ClockCircleFilled className='article-item-icon' />
			<div className='article-item__date'>{formatDate(create_at)}</div>
		</div>
	)
}

export default ArticleInfo
