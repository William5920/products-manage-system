<template>
	<div class="detail">
		<el-card class="box-card">
		  <div slot="header" class="clearfix header">
		    
		    	<i class="el-icon-back" @click="$router.back()"></i>
		    	商品详情
		    
		  </div>
		  <div class="body">
		    <div class="info">
		    	<span class="title">商品名称：</span>
		    	<span class="content">{{product.name}}</span>
		    </div>
		    <el-divider></el-divider>
		    <div class="info">
		    	<span class="title">商品描述：</span>
		    	<span class="content">{{product.desc}}</span>
		    </div>
		    <el-divider></el-divider>
		    <div class="info">
		    	<span class="title">商品价格：</span>
		    	<span class="content">{{product.price}}元</span>
		    </div>
		    <el-divider></el-divider>
		    <div class="info">
		    	<span class="title">所属分类：</span>
		    	<span class="content">{{category}}</span>
		    </div>
		    <el-divider></el-divider>
		    <div class="info">
		    	<span class="title">商品图片：</span>
		    	<span class="content">
		    		<img :src="BASE_IMG_URL + img" alt="" v-for="img in product.imgs" :key="img">
		    		
		    	</span>
		    </div>
		    <el-divider></el-divider>
		    <div class="info">
		    	<span class="title">商品详情：</span>
		    	<span class="content" v-html="product.detail"></span>
		    </div>

		  </div>
		</el-card>
	</div>
</template>

<script>
	import {reqProductsById, reqCategoryById} from '../../api'
	export default {
		data() {
			return {
				id: this.$route.params.id, // 商品id
				product: {},
				BASE_IMG_URL: 'http://localhost:5000/upload/', // 图片基础地址
				category: ''
			}
		},
		methods: {
			
		},
		async created() {
			const result = await reqProductsById(this.id)
			if(result.meta.status === 200) {
				this.product = result.data
			}
			const categoryResult = await reqCategoryById(this.product.categoryId)
			if(categoryResult.meta.status === 200) {
				this.category = categoryResult.data.name
			}
		},
	}
</script>

<style lang="scss" scoped>
	.detail {
		.box-card {
			.header {
				display: flex;
				align-items: center;
				font-size: 22px;
				.el-icon-back {
					color: orange;
					font-size: 28px;
					margin-right: 5px;
				}
			}
			.body {
				.info {
					.title {
						font-weight: 700;
					}
					.content {
						img {
							width: 100px;
							height: 100px;
							border: 1px solid orange;
							vertical-align: middle;
							margin-right: 5px;
						}
					}

					&:last-child {
						display: flex;
					}
				}
			}
		}
	}
</style>