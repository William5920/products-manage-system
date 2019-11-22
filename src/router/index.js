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


Vue.use(VueRouter)

const routes = [
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
  			path: 'bar',
  			component: Bar
  		},
  		{
  			path: 'line',
  			component: Line
  		},
  		{
  			path: 'pie',
  			component: Pie
  		},
  	]
  },
  {
    path: '/login',
    component: Login
  },
  	
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
