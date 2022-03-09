import { ArticleInterface } from '@/interface/article'
import { FC } from 'react'
import ArticleInfo from '../ArticleInfo'

import MarkDown from 'react-markdown'

import './index.css'

export interface ArticleItemInterface extends ArticleInterface {
	onClick: (id: number) => void
}

const ArticleItem: FC<ArticleItemInterface> = ({
	id,
	comment_count,
	content,
	cover,
	create_at,
	visit_count,
	nickname,
	title,
	onClick
}) => {
	return (
		<div key={id} className='article-item'>
			<div className='article-item__cover'>
				<img
					src={'http://localhost:623/public/' + cover}
					alt='封面'
					onClick={() => onClick(id)}
				/>
			</div>

			<div className='article-item__detail'>
				<div className='article-item__title' onClick={() => onClick(id)}>
					{title}
				</div>

				<div
					className='article-item__preview transition'
					onClick={() => onClick(id)}
				>
					<MarkDown children={content.slice(0)} skipHtml />
				</div>

				<ArticleInfo
					create_at={create_at}
					nickname={nickname}
					comment_count={comment_count}
					visit_count={visit_count}
				/>
			</div>
		</div>
	)
}

export default ArticleItem
