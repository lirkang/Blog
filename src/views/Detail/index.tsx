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
import Input from 'components/common/Input/Text'
import ArticleComment from 'components/context/Comment'
import { SendOutlined } from '@ant-design/icons'
import Switch from 'components/common/Input/Switch'
import Button from 'components/common/Button'
import Upload from 'components/common/Input/Upload'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const [article, setArticle] = useState<ArticleInterface>(defaultArticle)
  const [comment, setComment] = useState<CommentInterface[]>([])
  const [isAnonymous, setAnonymous] = useState(true)
  const [nickname, setNickname] = useState('')
  const [avatarPath, setAvatarPath] = useState('')
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const [avatar, setAvatar] = useState('')

  const getDetail = async () => {
    const { result } = await request<ArticleInterface>(
      `/data/article/${searchParams.get('id')}`
    )

    setArticle(result.data as ArticleInterface)
  }

  const getComment = async () => {
    const { result } = await request<CommentInterface[]>(
      `/data/comment${stringify({ id: searchParams.get('id')! })}`
    )

    setComment(result.data)
  }

  const putComment = async () => {}

  useEffect(() => {
    if (!searchParams.has('id')) return navigate('/')

    getDetail()
    getComment()
  }, [])

  return (
    <div className='article-detail'>
      <div className='article-detail__article-title'>{article.title}</div>

      <ArticleInfo simple {...article} />

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
            <div className='article-detail__form-nickname'>
              <span>名称: </span>

              <Input
                prefix={<SendOutlined />}
                value={nickname}
                onChange={value => setNickname(value)}
                showCleaner
                placeholder='输入名称...'
                onEnter={search => console.log(search)}
              />
            </div>

            <div className='article-detail__form-avatar'>
              <span>头像: </span>

              <Upload
                uploadPath='/data/upload'
                accept='image/*'
                onChange={files => setAvatar(files as string)}
                render={() => (
                  <div className=''>
                    <Button text='上传' />

                    {avatar && (
                      <img
                        onClick={event => event.preventDefault()}
                        src={'http://localhost:623/public/' + avatar}
                        alt='头像'
                      />
                    )}
                  </div>
                )}
              />
            </div>

            <div className='article-detail__form-type'>
              <span>是否为匿名用户: </span>

              <Switch status />
            </div>

            <div className='article-detail__form-button'>
              <Button onClick={putComment} text='发表评论' />
            </div>
          </div>

          <div className='article-detail__form-content'>
            <textarea name='' cols={30} rows={10}></textarea>
          </div>
        </div>
      </form>
    </div>
  )
}

export default connect(({}: StoreInterface) => ({}), {})(Detail)
