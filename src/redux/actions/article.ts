import { ArticleEnum } from 'types/action'
import { ArticleInterface } from 'types/article'

export const setArticle = (data: ArticleInterface[]) => ({
	type: ArticleEnum.set,
	data
})
