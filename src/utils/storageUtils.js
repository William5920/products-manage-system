/*
	封装操作localStorage的函数，用于将用户信息存储到localStorage中，已实现维持登录状态
*/
const USER_KEY = 'user_key'
export default {
	saveUser(user) {
		// 存储用户
		localStorage.setItem(USER_KEY, JSON.stringify(user))
	},
	getUser() {
		// 获取用户信息
		return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
	},
	deleteUser() {
		// 删除用户
		localStorage.removeItem(USER_KEY)
	}
}