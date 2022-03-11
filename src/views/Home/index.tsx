import request from 'api/request'
import { ArticleInterface } from 'types/article'
import { StoreInterface } from 'types/redux'
import { setArticle } from 'redux/actions/article'
import { stringify } from 'utils/query'
import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { useNavigate } from 'react-router-dom'

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
			`/data/article${stringify({ limit: 10, offset: 0 })}`
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
					<div key={item.id}>{item.content}</div>
				))}
			</div>
		</div>
	)
}

export default connect(({ article }: StoreInterface) => ({ article }), {
	setArticle
})(Home)
