<template>
	<div class="not-found">
		<h1>404 Not Found</h1>
		<h2>抱歉，您访问的页面不存在！</h2>
		<el-button type="primary" @click="returnHome">返回首页</el-button>
	</div>
</template>

<script>
	export default {
		methods: {
			returnHome() {
				this.$router.push('/')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.not-found {
		width: 100%;
		height: 100%;
		background: url('./images/404.jpeg');
		background-size: contain;
		padding-left: 60%;
		padding-top: 20%;
		color: white;


		h1 {
			font-size: 36px;
			font-weight: bold;
		}

		h2 {
			font-size: 20px;
			font-weight: bold;
			margin: 10px 0;
		}
	}
</style>