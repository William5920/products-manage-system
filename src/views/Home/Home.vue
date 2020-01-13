<template>
	<div class="home">欢迎使用william wong开发的后台</div>
</template>

<script>
	import memoryUtils from '../../utils/memoryUtils'
	export default {
		created() {
			const user = memoryUtils.user
			if(!user || !user._id) {
				this.$router.replace('/login')
				this.$message.error('请登录！')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		font-size: 30px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>