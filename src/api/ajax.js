/*
能发送异步ajax请求的函数的模块
封装ajax库
返回一个promise对象
优化1.通过外层嵌套一个promise来实现统一处理异常
优化2.直接返回响应的数据response.data而不是response
*/
import axios from 'axios'
// import qs from 'qs'
// import { Message } from 'element-ui'


// export default function ajax (url, data = {}, type = 'GET') {
// 	return new Promise((resolve, reject) => {
// 		// 1.发送ajax请求
// 		let promise
// 		if (type === 'GET') {
// 			promise = axios.get(url, { // 发送get请求
// 				params: data
// 			})

// 		} else {
// 			// promise = axios.post(url, data) // 发送post请求
// 			promise = axios({
// 				url:url,
// 				method: 'post',
// 				data: data,
// 				headers:{
// 					'Content-Type':'application/json'
// 				}		
// 			})
// 		}
// 		// 如果成功了调用resolve()
// 		// 如果失败了不调用reject()，而是直接提示错误信息
// 		promise.then(response => resolve(response.data)).catch(error => {
// 			// console.log('请求失败：',error.message)
// 			Message({
// 				message: '请求失败：' + error.message
// 			})
// 		})
// 	})
// }

// 公共的请求路径头部
const BASE_PATH = '/api'

// 创建axios实例，根据项目需要进行实例配置
const service = axios.create({
	baseURL: BASE_PATH,
	timeout: 10000
})

// 根据需要给实例添加请求拦截器和响应拦截器
// 请求拦截器中给请求头添加token等

// 响应拦截器中取出http响应中的data作为接口返回数据
service.interceptors.response.use(function(response) {
	// 对响应数据做点什么
	return response.data
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error)
})

// 导出实例
export default service