import request from '@/api/request'
import Pagination from '@/components/common/Pagination'
import { ArticleInterface } from '@/interface/article'
import { StoreInterface } from '@/interface/redux'
import { setArticle } from '@/redux/actions/article'
import { stringify } from '@/utils/query'
import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import './index.css'
import ArticleItem from '@/components/context/ArticleItem'

export interface ArticlePropInterface {
	article: ArticleInterface[]
	setArticle: (data: ArticleInterface[]) => void
}

const Article: FC<ArticlePropInterface> = ({ article, setArticle }) => {
	const [total, setTotal] = useState(0)
	const [index, setIndex] = useState(0)
	const [size, setSize] = useState(15)
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()

	const getArticle = async () => {
		const {
			result: { data, total }
		} = await request<ArticleInterface[]>(
			`/data/article${stringify({
				limit: size,
				offset: index,
				search: searchParams.get('search') || ''
			})}`
		)

		setTotal(total!)

		setArticle(data)
	}

	useEffect(() => {
		getArticle()
	}, [index, size, searchParams.get('search')])

	return (
		<div className='article'>
			{article.map(item => (
				<ArticleItem
					onClick={id => navigate(`/article/detail${stringify({ id })}`)}
					{...item}
					key={item.id}
				/>
			))}

			<Pagination
				size={size}
				index={index}
				changeIndex={index => setIndex(index)}
				changeSize={size => setSize(size)}
				total={total}
			/>
		</div>
	)
}

export default connect(({ article }: StoreInterface) => ({ article }), {
	setArticle
})(Article)
