/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function dateFormate(time) {
	if(!time) {
		return '请输入时间！'
	}
	let date = new Date(time)
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	month = month < 10 ? '0' + month : month
	let day = date.getDate()
	day = day < 10 ? '0' + day : day
	let hour = date.getHours()
	hour  = hour < 10 ? '0' + hour : hour
	let minutes = date.getMinutes()
	minutes  = minutes < 10 ? '0' + minutes : minutes
	let seconds = date.getSeconds()
	seconds  = seconds < 10 ? '0' + seconds : seconds

	return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}` 
}