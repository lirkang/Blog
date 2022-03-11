import { ResponseInterface } from 'types/response'

export default function request<T>(
	url: string,
	method = 'GET',
	body?: string
): Promise<ResponseInterface<T>> {
	return new Promise(async resolve => {
		const result = await fetch(`http://localhost:623${url}`, {
			method,
			body,
			headers: {}
		}).then(response => response.json())

		console.log(result.msg)

		result.status !== 200
			? resolve({ result: { data: [] }, status: 400, msg: '网络错误' })
			: resolve(result)
	})
}
