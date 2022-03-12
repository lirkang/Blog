import request from 'api/request'
import { ArticleInterface } from 'types/article'
import { StoreInterface } from 'types/redux'
import { setArticle } from 'redux/actions/article'
import { stringify } from 'utils/query'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import ArticleItem from 'components/ArticleItem'

import 'styles/home.scss'

export interface HomeInterface {
  article: ArticleInterface[]
  setArticle: (data: ArticleInterface[]) => void
}

const Home = ({ article, setArticle }: HomeInterface) => {
  const navigate = useNavigate()

  const getArticle = async () => {
    const {
      result: { data }
    } = await request<ArticleInterface[]>(
      `/data/article${stringify({ limit: 5, offset: 0 })}`
    )

    setArticle(data)
  }

  useEffect(() => {
    getArticle()
  }, [])

  return (
    <div className='home'>
      <div className='home-article__container'>
        {article.map(item => (
          <ArticleItem
            key={item.id}
            {...item}
            onClick={id => navigate(`/article/detail?id=${id}}`)}
          />
        ))}
      </div>

      <div className='home-article__tip' onClick={() => navigate('article')}>
        <span>点击跳转查看更多</span>
      </div>
    </div>
  )
}

export default connect(({ article }: StoreInterface) => ({ article }), {
  setArticle
})(Home)
