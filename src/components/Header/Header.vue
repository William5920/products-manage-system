<template>
	<div class="header">
		<div class="header-top">
			<span>欢迎，{{ user.username }}</span>
			<a href="javascript:" @click="logout">退出</a>
		</div>
		<div class="header-bottom">
			<div class="header-bottom-left">{{title}}</div>
			<div class="header-bottom-right">
				<span>{{ currentTime }}</span>
				<img :src="dayPicUrl" alt="">
				<span>{{weatherText}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { dateFormate } from '../../utils/dateUtils'
	import { reqWeather } from '../../api'
	import menuConfig from '../../config/menuConfig'
	import memoryUtils from '../../utils/memoryUtils'
	import storageUtils from '../../utils/storageUtils'
	export default {
		data() {
			return {
				currentTime: '', // 当前时间
				intervalId: null, // 更新时间的定时器id
				dayPicUrl: '', // 天气图片url
				weatherText: '', // 天气文本
				title: '', // 标题
				user: memoryUtils.user // 用户信息
			}
		},
		methods: {
			getTime() {
				this.intervalId = setInterval(this.time(), 1000)
			},
			time() { // 为了解决时间延时1s加载的问题，先在setInterval的第一个参数中调用一下dateFormate，再把函数引用传给形参
				this.currentTime = dateFormate(Date.now())
				return this.time
			},
			async getWeather(city) { // 获取天气信息
				const {dayPictureUrl, weather} = await reqWeather(city)
				this.dayPicUrl = dayPictureUrl
				this.weatherText = weather
			},
			getTitle() { // 根据路由获取title
				menuConfig.forEach(item => {
					if(item.key === this.$route.path) {
						this.title = item.title
					} else if(item.children) {
						item.children.find(cItem => {
							if(cItem.key === this.$route.path) {
								this.title = cItem.title
								return true
							}
						})
					}
				})
			},
			logout() { // 退出
				
				this.$confirm('确认退出吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => { // 确认退出
		          // 1.清除用户数据
		          
		          storageUtils.deleteUser() // 删除localStorage中的数据
		          memoryUtils.user = {} // 删除memoryUtils中的数据

				  // 2.跳转到登录界面
				  this.$router.replace('/login')
		        }).catch(() => { // 取消退出
		          console.log('取消退出！')         
		        });
			}
			
		},
		watch: {
			$route: function() {
				this.getTitle()
			}
		},
		created() {

			this.getTime()
			this.getWeather('北京')
			this.getTitle()
		},
		beforeDestroy() {
			clearInterval(this.intervalId)
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		background-color: #fff;
	    color: rgba(0,0,0,.5);
	    font-size: 14px;
	    height: 80px;
		.header-top {
			height: 40px;
			line-height: 40px;
			text-align: right;
			border-bottom: 3px solid #ffcc99;
			padding-right: 20px;

			a {
				text-decoration: none;
				margin-left: 10px;
			}
		}

		.header-bottom {
			display: flex;
			align-items: center;
			height: 40px;
			

			.header-bottom-left {
				width: 25%;
				text-align: center;
				font-size: 20px;
				position: relative;


				&::after {
					content: '';
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: 100%;
					border-width: 20px;
					border-style: solid;
					border-color: white transparent transparent transparent;
				}
			}

			.header-bottom-right {
				/*display: flex;
				align-items: center;*/
				width: 75%;
				text-align: right;
				padding-right: 20px;
				img {
					vertical-align: middle;
					width: 30px;
					height: 20px;
					margin: 0 10px;
				}
				span {
					vertical-align: middle;
				}
			}
		}
	}
</style>