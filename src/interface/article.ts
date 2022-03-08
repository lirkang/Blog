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
