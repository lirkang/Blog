import { ActionInterface, ArticleEnum } from 'types/action'
import { ArticleInterface } from 'types/article'

export default function article(
	state: ArticleInterface[] = [],
	action: ActionInterface<ArticleEnum, ArticleInterface | number>
): ArticleInterface[] | ArticleInterface {
	const { data, type } = action

	switch (type) {
		case ArticleEnum.set:
			return data as ArticleInterface

		case ArticleEnum.delete:
			return state.filter(({ id }) => id !== data)

		case ArticleEnum.update:
			return state.map(article => {
				if ((article as ArticleInterface).id === (data as ArticleInterface).id)
					return data as ArticleInterface
				else return article
			})

		default:
			return state
	}
}
