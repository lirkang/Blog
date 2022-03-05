import request from '@/api/request'
import { ArticleInterface } from '@/interface/article'
import { StoreInterface } from '@/interface/redux'
import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

const ArticleDetail = () => {
	const params = useParams()
	const articleRef = useRef<HTMLDivElement>(null)

	const getArticleDetail = async () => {
		const result = await request<ArticleInterface>(`/data/article/${params.id}`)

		articleRef.current!.innerHTML = '' + (result as ArticleInterface).id
	}

	useEffect(() => {
		getArticleDetail()
	})

	return <div ref={articleRef}>123</div>
}

export default connect(({}: StoreInterface) => ({}), {})(ArticleDetail)
