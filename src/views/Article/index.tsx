import request from '@/api/request'
import Pagination from '@/components/common/Pagination'
import { ArticleInterface } from '@/interface/article'
import { StoreInterface } from '@/interface/redux'
import { setArticle } from '@/redux/actions/article'
import { stringify } from '@/utils/query'
import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import MarkDown from 'react-markdown'
import Toptip from '@/components/common/Toptip'

import './index.css'

export interface ArticlePropInterface {
	article: ArticleInterface[]
	setArticle: (data: ArticleInterface[]) => void
}

const Article: FC<ArticlePropInterface> = ({ article, setArticle }) => {
	const [total, setTotal] = useState(0)
	const [index, setIndex] = useState(0)
	const [size, setSize] = useState(15)
	const [searchParams, setSearchParams] = useSearchParams()

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
			{article.map(
				({
					title,
					id,
					username,
					nickname,
					visit_count,
					comment_count,
					create_at,
					cover,
					content
				}) => (
					<div key={id} className='article-item'>
						<div className='article-item__header'>
							<div className='article-item__title'>{title}</div>
						</div>

						<div className='article-item__detail'>
							<div className='article-item__main'>
								<div className='article-item__preview'></div>

								<div className='article-item__info'>
									<Toptip title={'访问数量'}>
										<div className='article-item__visit'>{visit_count}</div>
									</Toptip>

									<Toptip title={'评论数量'}>
										<div className='article-item__comment'>{comment_count}</div>
									</Toptip>

									<Toptip title={'作者'}>
										<div className='article-item__author'>{nickname}</div>
									</Toptip>

									<Toptip title={'发表时间'}>
										<div className='article-item__date'>{create_at}</div>
									</Toptip>
								</div>
							</div>

							<div className='article-item__cover'>
								<img src={cover} alt='封面' />
							</div>
						</div>
					</div>
				)
			)}

			<Pagination
				size={size}
				index={index}
				change={getArticle}
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
