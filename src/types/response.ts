export interface ResponseInterface<T> {
  readonly result: {
    readonly data: T | []
    readonly total?: number
    readonly token?: string
  }

  readonly status: number
  readonly msg: string
}
