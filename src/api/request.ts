export default function request<T>(
	url: string,
	method = 'GET',
	body?: string
): Promise<T | []> {
	return new Promise(async resolve => {
		const { result, status, msg } = await fetch(
			`http://localhost:623${url}`,
			{
				method,
				body,
				headers: {}
			}
		).then(response => response.json())

		console.log(msg)

		status !== 200 ? resolve([]) : resolve(result)
	})
}
