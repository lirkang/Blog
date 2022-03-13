import formatDate from 'utils/formatDate'
import {
  EditFilled,
  EyeFilled,
  MessageFilled,
  ClockCircleFilled,
  AppstoreFilled
} from '@ant-design/icons'

import './index.scss'
import { ArticleInterface } from 'types/article'

export interface ArticleInfoInterface extends ArticleInterface {
  simple: boolean
}

const ArticleInfo = ({
  visit_count,
  comment_count,
  nickname,
  create_at,
  simple = false,
  category
}: ArticleInfoInterface) => {
  return (
    <div className='article-info'>
      {simple && <EditFilled className='article-info__icon' />}
      <div className='article-info__author'>{nickname}</div>

      {simple && (
        <>
          <EyeFilled className='article-info__icon' />
          <div className='article-info__visit'>{visit_count}</div>

          <MessageFilled className='article-info__icon' />
          <div className='article-info__comment'>{comment_count}</div>
        </>
      )}

      {simple && <AppstoreFilled className='article-info__icon' />}
      <div className='article-info__introduce'>{category}</div>

      {simple && <ClockCircleFilled className='article-info__icon' />}
      <div className='article-info__date'>{formatDate(create_at)}</div>
    </div>
  )
}

export default ArticleInfo
