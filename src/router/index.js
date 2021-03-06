import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login.vue'
import Admin from '../views/Admin/Admin.vue'
import Home from '../views/Home/Home.vue'
import Category from '../views/Category/Category.vue'
import ProductHome from '../views/Product/Home.vue'
import ProductAddUpdate from '../views/Product/AddUpdate.vue'
import ProductDetail from '../views/Product/Detail.vue'
import User from '../views/User/User.vue'
import Role from '../views/Role/Role.vue'
import Bar from '../views/Charts/Bar.vue'
import Line from '../views/Charts/Line.vue'
import Pie from '../views/Charts/Pie.vue'
import NotFound from '../views/NotFound/NotFound.vue'


Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: Login
	  },
	{
		path: '/',
		component: Admin,
		children: [
			{
				path: '',
				redirect: 'home'
			},
			{
				path: 'home',
				component: Home
			},
			{
				path: 'category',
				component: Category
			},
			{
				path: 'product',
				component: ProductHome
			},
		{
			path: 'product/addupdate',
			component: ProductAddUpdate
		},
		{
			path: 'product/addupdate/:id',
			component: ProductAddUpdate
		},
		{
			path: 'product/detail/:id',
			component: ProductDetail,
		},
			{
				path: 'user',
				component: User
			},
			{
				path: 'role',
				component: Role
			},
			{
				path: 'charts/bar',
				component: Bar
			},
			{
				path: 'charts/line',
				component: Line
			},
			{
				path: 'charts/pie',
				component: Pie
			},
		{
			path: '*',
			component: NotFound
		}
		]
	},
  
  	
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
