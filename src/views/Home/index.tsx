import request from '@/api/request'
import { ArticleInterface } from '@/interface/article'
import { StoreInterface } from '@/interface/redux'
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
	const [pagesize, setPageSize] = useState(15)
	const [pageIndex, setPageIndex] = useState(0)
	const navigate = useNavigate()

	const getArticle = async () => {
		const result = await request<ArticleInterface[]>(
			`/data/article${stringify({ limit: pagesize, offset: pageIndex })}`
		)

		setArticle(result)
	}

	const getArticleDetail = (id: number) => {
		navigate(`/article/${id}`)
	}

	const deleteArticle = async (id: number) => {
		await request('/data/article', 'delete', stringify({ id }))
	}

	useEffect(() => {
		getArticle()
	}, [])

	return (
		<div className='home'>
			{article.map(item => (
				<div onClick={() => getArticleDetail(item.id)} key={item.id}>
					{item.id}
				</div>
			))}
		</div>
	)
}

export default connect(({ article }: StoreInterface) => ({ article }), {
	setArticle
})(Home)
