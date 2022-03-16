import { CommentInterface } from 'types/comment'
import formatDate from 'utils/formatDate'

import './index.scss'

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
        <img
          src={
            'http://localhost:623/public/' +
            (anonymous ? 'defaultCommentAvatar.jpg' : avatar)
          }
          alt='头像'
        />
      </div>

      <div className='comment__main'>
        <div className='comment__detail'>
          <div className='comment__nickname'>
            {anonymous ? '匿名用户' : nickname}
          </div>

          <div className='comment__date'>{formatDate(create_at)}</div>
        </div>

        <div className='comment__content'>{content}</div>
      </div>
    </div>
  )
}

export default ArticleComment
