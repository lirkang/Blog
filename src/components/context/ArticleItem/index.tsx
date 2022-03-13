import { ArticleInterface } from 'types/article'
import ArticleInfo from '../ArticleInfo'

import MarkDown from 'react-markdown'

import './index.scss'

export interface ArticleItemInterface extends ArticleInterface {
  onClick: (id: number) => void
}

const ArticleItem = (props: ArticleItemInterface) => {
  const { id, cover, title, onClick, introduce } = props

  return (
    <div key={id} className='article-item' onClick={() => onClick(id)}>
      <div className='article-item__detail'>
        <div className='article-item__title'>{title}</div>

        <div className='article-item__preview'>{introduce}</div>

        <ArticleInfo simple={false} {...props} />
      </div>

      <div className='article-item__cover'>
        <div>
          <img src={'http://localhost:623/public/' + cover} alt='封面' />
        </div>
      </div>
    </div>
  )
}

export default ArticleItem
