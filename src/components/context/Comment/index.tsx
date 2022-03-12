import { CommentInterface } from 'types/comment'
import formatDate from 'utils/formatDate'

import 'styles/comment.scss'

const ArticleComment = ({
  id,
  content,
  create_at,
  nickname,
  avatar,
  anonymous
}: CommentInterface) => {
  return (
    <div key={id} className='comment'>
      <div className='comment__avatar'>
        {anonymous ? (
          <img
            src={'http://localhost:623/public/defaultCommentAvatar.jpg'}
            alt='头像'
          />
        ) : (
          <img src={'http://localhost:623/public/' + avatar} alt='头像' />
        )}
      </div>

      <div className='comment__detail'>
        <div className='comment__nickname'>
          {anonymous ? '匿名用户' : nickname}
        </div>

        <div className='comment__content'>{content}</div>
        <div className='comment__date'>{formatDate(create_at)}</div>
      </div>
    </div>
  )
}

export default ArticleComment
