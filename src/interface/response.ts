export class ResponseInterface<T> {
	constructor(
		public readonly result: T,
		public readonly status: number,
		public readonly msg: number
	) {}
}
