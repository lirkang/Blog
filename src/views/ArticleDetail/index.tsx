import request from 'api/request'
import ArticleInfo from 'components/context/ArticleInfo'
import { ArticleInterface, defaultArticle } from 'types/article'
import { StoreInterface } from 'types/redux'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MarkDown from 'react-markdown'

import 'styles/article-detail.scss'

import { stringify } from 'utils/query'
import { CommentInterface } from 'types/comment'
import ArticleComment from 'components/Comment'
import Input from 'components/Input'
import { SendOutlined } from '@ant-design/icons'

const ArticleDetail = () => {
  const [searchParams] = useSearchParams()
  const [article, setArticle] = useState<ArticleInterface>(defaultArticle)
  const [comment, setComment] = useState<CommentInterface[]>([])
  const [isAnonymous, setAnonymous] = useState(true)
  const [nickname, setNickname] = useState('')
  const [avatarPath, setAvatarPath] = useState('')
  const navigate = useNavigate()

  const getArticleDetail = async () => {
    const { result } = await request<ArticleInterface>(
      `/data/article/${searchParams.get('id')}`
    )

    setArticle(result.data as ArticleInterface)
  }

  const getCommentOfArticle = async () => {
    const { result } = await request<CommentInterface[]>(
      `/data/comment${stringify({ id: searchParams.get('id')! })}`
    )

    setComment(result.data)
  }

  const putComment = async () => {}

  useEffect(() => {
    if (!searchParams.has('id')) return navigate('/')

    getArticleDetail()
    getCommentOfArticle()
  }, [])

  return (
    <div className='article-detail'>
      <div className='article-detail__article-title'>{article.title}</div>

      <ArticleInfo
        comment_count={article.comment_count}
        create_at={article.create_at}
        visit_count={article.visit_count}
        nickname={article.nickname}
      />

      <div className='article-detail__article-content'>
        <MarkDown children={article.content} skipHtml />
      </div>

      <div className='article-detail__comment-container'>
        <span className='article-detail__comment-title'>全部评论</span>
        {comment.map(item => (
          <ArticleComment {...item} key={item.id} />
        ))}
      </div>

      <form onSubmit={event => event.preventDefault()}>
        <div className='article-detail__form'>
          <div className='article-detail__form-user_info'>
            <label htmlFor='用户名' className='article-detail__form-nickname'>
              <span>名称: </span>

              <Input
                prefix={<SendOutlined />}
                placeholder='输入评论...'
                onSearch={search => console.log(search)}
              />
            </label>

            <label htmlFor='头像' className='article-detail__form-avatar'>
              <span>头像: </span>

              {avatarPath ? (
                <img src={avatarPath} alt='头像' />
              ) : (
                <input type='file' accept='image/*' />
              )}
            </label>

            <label
              htmlFor='是否为匿名用户'
              className='article-detail__form-type'
            >
              <span>是否为匿名用户: </span>

              <input
                type='checkbox'
                checked={isAnonymous}
                onChange={() => setAnonymous(!isAnonymous)}
              />
            </label>

            <label htmlFor='发表评论' className='article-detail__form-button'>
              <input type='submit' onClick={putComment} value='发表评论' />
            </label>
          </div>

          <label htmlFor='评论内容' className='article-detail__form-content'>
            <textarea name='' cols={30} rows={10}></textarea>
          </label>
        </div>
      </form>
    </div>
  )
}

export default connect(({}: StoreInterface) => ({}), {})(ArticleDetail)
