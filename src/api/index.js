/*
根据接口文档定义ajax接口请求函数
包含应用中所有接口请求函数的模块
每一个函数返回一个promise对象
*/

import ajax from './ajax'
import jsonp from 'jsonp'
import { Message } from 'element-ui'

const BASE_URL = '/api'

// 登录
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', {username, password}, 'POST')

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
export const reqCategoryList = () => ajax(BASE_URL + '/manage/category/list')
// 添加分类
export const reqAddCategory = (categoryName) => ajax(BASE_URL + '/manage/category/add', {categoryName}, 'POST')
// 更新分类
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE_URL + '/manage/category/update', {categoryId, categoryName}, 'POST')
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE_URL + '/manage/product/list', {pageNum, pageSize})
// 获取搜索商品数据
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchKey}) => ajax(BASE_URL + '/manage/product/search',{pageNum, pageSize,[searchType]:searchKey} )
// 根据商品id获取商品数据
export const reqProductsById = (productId) => ajax(BASE_URL + '/manage/product/info',{productId})
// 根据分类ID获取分类
export const reqCategoryById = (categoryId) => ajax(BASE_URL + '/manage/category/info', {categoryId})
// 更新产品上下架的状态
export const reqUpdateStatus = (productId, status) => ajax(BASE_URL + '/manage/product/updateStatus', {productId, status}, 'POST')
// 删除图片
export const reqDeleteImg = (name) => ajax(BASE_URL + '/manage/img/delete', {name}, 'POST')
// 添加或更新商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE_URL + '/manage/product/' + (product._id?'update':'add'), product, 'POST')





