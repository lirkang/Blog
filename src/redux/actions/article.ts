import { ArticleEnum } from '@/interface/action'
import { ArticleInterface } from '@/interface/article'

export const setArticle = (data: ArticleInterface[]) => ({
	type: ArticleEnum.set,
	data
})
