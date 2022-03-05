export class ActionInterface<T, D> {
	constructor(public readonly type: T, public readonly data: D) {}
}

export enum ArticleEnum {
	set = 'SET_ARTICLE',
	delete = 'DELETE_ARTICLE',
	update = 'UPDATE_ARTICLE'
}
