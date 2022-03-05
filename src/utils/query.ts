interface ParamsInterface {
	[prop: string]: string | number
}

export function stringify(params: ParamsInterface, flag = true): string {
	if (!params) return ''

	let string = ''

	Object.keys(params).forEach(key => {
		const param = `${key}=${params[key]}`

		string += string === '' ? param : `&${param}`
	})

	return flag ? '?' + string : string
}

export function parser(string: string): ParamsInterface {
	if (!string) return {}

	const paramsObj = string
		.split('?')[1]
		.split('&')
		.map(item => {
			const [key, value] = item.split('=')

			return { [key]: value }
		})

	const params: ParamsInterface = {}

	paramsObj.forEach(item => {
		Object.keys(item).forEach(key => (params[key] = item[key]))
	})

	return params
}
