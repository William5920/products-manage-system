<template>
	<div class="left-nav">
		<router-link to="/" class="left-nav-header">
			<i class="el-icon-orange"></i>
			<h1>综合管理系统</h1>
		</router-link>
		<el-menu
		  router
	      :default-active="$route.path"
	      class="el-menu-vertical-demo"
	      @open="handleOpen"
	      @close="handleClose"
	      background-color="transparent"
	      text-color="#fff"
	      active-text-color="#ffd04b">
		  
		  <template v-for="(menu, index) in menuList" >

		  	<el-menu-item :index="menu.key" v-if="!menu.children">
		        <i :class="menu.icon"></i>
		        <span slot="title">{{ menu.title }}</span>
	      	</el-menu-item>

	      	<el-submenu :index="menu.key" v-else>
		        <template slot="title">
		          <i :class="menu.icon"></i>
		          <span>{{ menu.title }}</span>
		        </template>

		        <el-menu-item :index="item.key" v-for="(item, index) in menu.children" >
			        <i :class="item.icon"></i>
			        <span slot="title">{{ item.title }}</span>
		      	</el-menu-item>
	        </el-submenu>

		  </template>
	      <!-- <el-menu-item index="/home">
	        <i class="el-icon-menu"></i>
	        <span slot="title">首页</span>
	      </el-menu-item>
	      <el-submenu index="/category" >
	        <template slot="title">
	          <i class="el-icon-shopping-cart-2"></i>
	          <span>商品</span>
	        </template>
	        <el-menu-item index="/category">
	          <i class="el-icon-notebook-1"></i>
	          <span>品类管理</span>
	        </el-menu-item>
	        <el-menu-item index="/product">
	          <i class="el-icon-present"></i>
	          <span>商品管理</span>
	        </el-menu-item>
	      </el-submenu>
	      <el-menu-item index="/user">
	        <i class="el-icon-user"></i>
	        <span slot="title">用户管理</span>
	      </el-menu-item>
	      <el-menu-item index="/role">
	        <i class="el-icon-s-check"></i>
	        <span slot="title">角色管理</span>
	      </el-menu-item>
	      <el-submenu index="/bar" >
	        <template slot="title">
	          <i class="el-icon-picture-outline"></i>
	          <span>图形图表</span>
	        </template>
	        <el-menu-item index="/bar">
	          <i class="el-icon-data-analysis"></i>
	          <span>柱形图</span>
	        </el-menu-item>
	        <el-menu-item index="/line">
	          <i class="el-icon-data-line"></i>
	          <span>折线图</span>
	        </el-menu-item>
	        <el-menu-item index="/pie">
	          <i class="el-icon-pie-chart"></i>
	          <span>饼图</span>
	        </el-menu-item>
	      </el-submenu> -->
	    </el-menu>
	</div>
</template>

<script>
  import menuList from '../../config/menuConfig'
  export default {
  	data() {
  		return {
  			menuList
  		}
  	},
  	created() {
  		// console.log(menuList)
  	},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
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