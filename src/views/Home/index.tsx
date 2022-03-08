import request from '@/api/request'
import { ArticleInterface } from '@/interface/article'
import { StoreInterface } from '@/interface/redux'
import { ResponseInterface } from '@/interface/response'
import { setArticle } from '@/redux/actions/article'
import { stringify } from '@/utils/query'
import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { useNavigate } from 'react-router-dom'

export interface HomeInterface {
	article: ArticleInterface[]
	setArticle: (data: ArticleInterface[]) => void
}

const Home: FC<HomeInterface> = ({ article, setArticle }) => {
	const navigate = useNavigate()

	const getArticle = async () => {
		const {
			result: { data }
		} = await request<ArticleInterface[]>(
			`/data/article${stringify({ limit: 10, offset: 0 })}`
		)

		setArticle(data)
	}

	useEffect(() => {
		getArticle()
	}, [])

	return (
		<div className='home'>
			<div className='home_article-container'>
				{article.map(item => (
					<div key={item.id}>{item.content}</div>
				))}
			</div>
		</div>
	)
}

export default connect(({ article }: StoreInterface) => ({ article }), {
	setArticle
})(Home)
