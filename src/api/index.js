/*
根据接口文档定义ajax接口请求函数
包含应用中所有接口请求函数的模块
每一个函数返回一个promise对象
*/

import ajax from './ajax'
import jsonp from 'jsonp'
import { Message } from 'element-ui'


// 登录
export const reqLogin = (username, password) => ajax({
	method: 'post',
	url: '/login',
	data: {
		username,
		password
	}
})

// 发送jsonp请求获取天气数据
export const reqWeather = (city) => {
	return new Promise((resolve, reject) => {
		const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
		jsonp(url, {}, (error, data) => {
			if (!error && data.error===0) {
				const {dayPictureUrl, weather} = data.results[0].weather_data[0]
				resolve({dayPictureUrl, weather})
			} else {
				Message.error('请求天气数据出错！')
			}
		})
	})
	
}

// 获取分类列表
export const reqCategoryList = () => ajax({
	method: 'get',
	url: '/category/list'
})
// 添加分类
export const reqAddCategory = (categoryName) => ajax('/manage/category/add', {categoryName}, 'POST')
// 更新分类
export const reqUpdateCategory = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')
// 获取商品分页列表
export const reqProducts = () => ajax({
	method: 'get',
	url: '/product/list'
})
// 获取搜索商品数据
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchKey}) => ajax('/manage/product/search',{pageNum, pageSize,[searchType]:searchKey} )
// 根据商品id获取商品数据
export const reqProductsById = (productId) => ajax({
	method: 'get',
	url: '/product/info',
	params: {productId}
})
// 根据分类ID获取分类
export const reqCategoryById = (categoryId) => ajax({
	method: 'get',
	url: '/category/info',
	params: {categoryId}
})
// 更新产品上下架的状态
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')
// 删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')
// 添加商品
export const reqAddProduct = (product) => ajax({
	method: 'post',
	url: '/product',
	data: product
})
// 更新商品
export const reqUpdateProduct = (product) => ajax({
	method: 'put',
	url: '/product',
	data: product
})

// 删除商品
export const reqDeleteProduct = (productId) => ajax({
	method: 'delete',
	url: `/product/${productId}`
})
// 获取角色列表
export const reqRoleList = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')
// 设置角色权限
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')
// 获取用户列表
export const reqUsersList = () => ajax('/manage/user/list')
// 删除用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete',{userId}, 'POST' )
// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')
// 更新用户
export const reqUpdateUser = (user) => ajax('/manage/user/update', user, 'POST')




