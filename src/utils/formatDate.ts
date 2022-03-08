export default function formatDate(dateNum: string | number) {
	function formatNumber(number: number) {
		return ('' + number).length === 1 ? '0' + number : number
	}

	const date = new Date(dateNum)
	const today = new Date()

	const year =
		date.getFullYear() === today.getFullYear() ? '' : date.getFullYear() + '/'

	const month = date.getMonth() + 1

	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()

	return `${year}${formatNumber(month)}/${formatNumber(day)} ${formatNumber(
		hour
	)}:${formatNumber(minute)}`
}
