export interface ArticleInterface {
	readonly id: number
	readonly create_at: string

	readonly nickname: string

	readonly title: string

	readonly comment_count: number

	readonly visit_count: number

	readonly cover: string

	readonly delete: number
	readonly content: string
}

export const defaultArticle: ArticleInterface = {
	id: -1,
	create_at: '',

	nickname: '',

	title: '',

	comment_count: -1,

	visit_count: -1,

	cover: '',

	delete: 0,
	content: ''
}
