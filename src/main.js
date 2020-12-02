import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css' // 重置样式
// import memoryUtils from './utils/memoryUtils'
// import storageUtils from './utils/storageUtils'

// 建立组件时去localStorage中读取用户信息，如果有用户信息，将其存到memoryUtils中
// const user = storageUtils.getUser() 
// if(user && user._id) {
// 	memoryUtils.user = user
// }


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
