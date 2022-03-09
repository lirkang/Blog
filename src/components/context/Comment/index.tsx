import { CommentInterface } from '@/interface/comment'
import formatDate from '@/utils/formatDate'
import { FC } from 'react'
import './index.css'

const ArticleComment: FC<CommentInterface> = ({
	id,
	content,
	create_at,
	nickname,
	avatar,
	anonymous
}) => {
	return (
		<div key={id} className='article-comment'>
			<div className='article-comment__avatar'>
				{anonymous ? (
					<img
						src={'http://localhost:623/public/defaultCommentAvatar.jpg'}
						alt='头像'
					/>
				) : (
					<img src={'http://localhost:623/public/' + avatar} alt='头像' />
				)}
			</div>

			<div className='article-comment__detail'>
				<div className='article-comment__nickname'>
					{anonymous ? '匿名用户' : nickname}
				</div>

				<div className='article-comment__content'>{content}</div>
				<div className='article-comment__date'>{formatDate(create_at)}</div>
			</div>
		</div>
	)
}

export default ArticleComment
