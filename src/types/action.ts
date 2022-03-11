export interface ActionInterface<T, D> {
  readonly type: T
  readonly data: D
}

export enum ArticleEnum {
  set = 'SET_ARTICLE',
  delete = 'DELETE_ARTICLE',
  update = 'UPDATE_ARTICLE'
}

export enum UserEnum {
  set = 'SET_USER',
  clear = 'CLEAR_USER'
}
