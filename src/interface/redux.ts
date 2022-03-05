import { ArticleInterface } from './article'

export class StoreInterface {
	constructor(public readonly article: ArticleInterface[]) {}
}
