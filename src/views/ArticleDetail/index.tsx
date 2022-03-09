import request from '@/api/request'
import ArticleInfo from '@/components/context/ArticleInfo'
import { ArticleInterface, defaultArticle } from '@/interface/article'
import { StoreInterface } from '@/interface/redux'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MarkDown from 'react-markdown'
import './index.css'
import { stringify } from '@/utils/query'
import { CommentInterface } from '@/interface/comment'
import ArticleComment from '@/components/context/Comment'

const ArticleDetail = () => {
	const [searchParams] = useSearchParams()
	const [article, setArticle] = useState<ArticleInterface>(defaultArticle)
	const [comment, setComment] = useState<CommentInterface[]>([])
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

	useEffect(() => {
		if (!searchParams.has('id')) return navigate('/')

		getArticleDetail()
		getCommentOfArticle()
	}, [])

	return (
		<div className='article-detail'>
			<div className='article-detail__title'>{article.title}</div>

			<ArticleInfo
				comment_count={article.comment_count}
				create_at={article.create_at}
				visit_count={article.visit_count}
				nickname={article.nickname}
			/>

			<div className='article-detail__content'>
				<MarkDown children={article.content} skipHtml />
			</div>

			<div className='article-comment__container'>
				<span className='article-comment__title'>全部评论</span>
				{comment.map(item => (
					<ArticleComment {...item} key={item.id} />
				))}
			</div>

			<div className='article-comment__input'>
				<input type='text' />
			</div>
		</div>
	)
}

export default connect(({}: StoreInterface) => ({}), {})(ArticleDetail)
