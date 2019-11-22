<template>
	<div class="admin">
		<el-container>
		  <el-aside width="200px"><LeftNav /></el-aside>
		  <el-container>
		    <Header></Header>
		    <el-main>
		    	<router-view />
		    </el-main>
		    <el-footer>推荐使用谷歌浏览器，可以获得更佳页面操作体验</el-footer>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	import LeftNav from '../../components/Left-nav/Left-nav.vue'
	import Header from '../../components/Header/Header.vue'
	export default {
		components: {
			LeftNav,
			Header
		}
	}
</script>

<style lang="scss" scoped>
.admin {
	height: 100%;
	background-color: #F0F2F5;

	>.el-container {
		height: 100%;
	}

	.el-header, .el-footer {
    background-color: #F0F2F5;
    color: rgba(0,0,0,.5);
    font-size: 14px;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #002140;
    color: rgba(255,255,255,.65);
    text-align: center;
  }
  
  .el-main {
    color: #333;
    margin: 20px;
    padding: 0;
    background-color: #fff;
  }

}

  

</style>