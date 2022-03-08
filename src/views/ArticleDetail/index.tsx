import request from '@/api/request'
import { ArticleInterface } from '@/interface/article'
import { StoreInterface } from '@/interface/redux'
import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

const ArticleDetail = () => {
	const articleRef = useRef<HTMLDivElement>(null)
	const [searchParams, setSearchParams] = useSearchParams()

	const getArticleDetail = async () => {
		if (!searchParams.has('id')) return

		const result = await request<ArticleInterface>(
			`/data/article/${searchParams.get('id')}`
		)
	}

	useEffect(() => {
		getArticleDetail()
	})

	return <div></div>
}

export default connect(({}: StoreInterface) => ({}), {})(ArticleDetail)
