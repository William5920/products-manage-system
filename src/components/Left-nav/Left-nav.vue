<template>
	<div class="left-nav">
		<router-link to="/" class="left-nav-header">
			<i class="el-icon-orange"></i>
			<h1>综合管理系统</h1>
		</router-link>
		<el-menu
		  router
	      :default-active="'/' + this.$route.path.split('/')[1]"
	      class="el-menu-vertical-demo"
	      @open="handleOpen"
	      @close="handleClose"
	      background-color="transparent"
	      text-color="#fff"
	      active-text-color="#ffd04b">
		  
		  <template v-for="(menu, index) in menuList" >

		  	<el-menu-item :index="menu.key" v-if="!menu.children && hasAuthroity(menu)">
		        <i :class="menu.icon"></i>
		        <span slot="title">{{ menu.title }}</span>
	      	</el-menu-item>

	      	<el-submenu :index="menu.key" v-else-if="menu.children && hasAuthroity(menu)">
		        <template slot="title">
		          <i :class="menu.icon"></i>
		          <span>{{ menu.title }}</span>
		        </template>
		        <template v-for="(item, index) in menu.children">
		        	<el-menu-item :index="item.key" v-if="hasAuthroity(item)">
					        <i :class="item.icon"></i>
					        <span slot="title">{{ item.title }}</span>
				    </el-menu-item>
		        </template>
				
	        </el-submenu>

		  </template>

	    </el-menu>
	</div>
</template>

<script>
  import menuList from '../../config/menuConfig'
  import memoryUtils from '../../utils/memoryUtils'
  export default {
  	data() {
  		return {
  			menuList: menuList,
  			userMenu: memoryUtils.user.role.menus
  		}
  	},
  	created() {
  		console.log(this.$route.path.split('/')[1]) // 解决在深路径下left-nav不选中的bug
  	},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      hasAuthroity(menuItem) { // 判断用户是否具有该权限，此函数用于决定在渲染时是否渲染该菜单
      	const {userMenu} = this
      	const username = memoryUtils.user.username
      	// 1.用户是admin
      	// 2.menuItem的key在用户的menus中
      	// 3.menuItem有children且children中其中之一的key在用户的menus中
      	// 4.该menuItem是公开的
      	if(username === 'admin') {
      		return true
      	} else if(userMenu.indexOf(menuItem.key) !== -1) {
      		return true
      	} else if(menuItem.children && !!menuItem.children.find(item => {
      		return userMenu.indexOf(item.key) !== -1
      	})) {
      		return true
      	} else if(menuItem.public === true) {
      		return true
      	}

      	return false
      }
    },
    mounted() {
    	console.log(this.userMenu)
    	console.log(menuList)
    	console.log(memoryUtils.user)
    }
  }
</script>

<style lang="scss">
	.left-nav {
		
		.left-nav-header {
			display: flex;
			align-items: center;
			height: 80px;
			color: white;
			text-decoration: none;
			background-color: rgba(0,0,0,.5);
			font-size: 20px;

			.el-icon-orange {
				color: orange;
				margin: 0 10px;
				font-size: 25px;
			}
		}

		.el-menu-vertical-demo {
			border: 0;

			.el-menu-item {
				padding: 0 0 0 40px;
				text-align: left;
			}

			>.el-submenu {
				.el-submenu__title {
					text-align: left;
				}
				
			}
		}
	}
</style>