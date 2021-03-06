<template>
	<div class="product">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>
		    	<el-select v-model="searchType" placeholder="请选择搜索方式">
			      <el-option label="按名称搜索" value="productName"></el-option>
			      <el-option label="按描述搜索" value="productDesc"></el-option>
			    </el-select>
		    </span>
		    <span>
		    	<el-input v-model="searchKey" placeholder="关键字" style="width: 200px; margin: 0 10px;"></el-input>
		    </span>
		    <span>
		    	<el-button type="primary" icon="el-icon-search" @click="getSearchProducts">搜索</el-button>
		    </span>
		    <el-button style="float: right; padding: 12px" type="primary" icon="el-icon-plus" @click="$router.push('/product/addUpdate')">添加商品</el-button>
		  </div>
		    <el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="name"
			      label="商品名称"
			      min-width="200">
			    </el-table-column>
			    <el-table-column
			      prop="desc"
			      label="商品描述"
			      min-width="200">
			    </el-table-column>
			    <el-table-column
			      prop="price"
			      label="价格"
			      min-width="80"
			      align="center"
			      :formatter="formatPrice">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="状态"
			      min-width="80"
			      align="center">
			      <template slot-scope="scope">
			      	<span>{{scope.row.status===1?'在售':'已下架'}}</span>
			        <el-button 
			        @click="changeStatus(scope.row)" 
			        :type="scope.row.status===1?'danger':'success'" 
			        style="padding: 4px;margin-left: 10px;" 
			        size="small"
			        >
			    		{{scope.row.status===1?'下架':'上架'}}
					</el-button>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="120"
			      align="center">
			      <template slot-scope="scope">
			        <el-button @click="showDetail(scope.row)" type="text" size="small">详情</el-button>
			        <el-button type="text" size="small" @click="updateProduct(scope.row)">修改</el-button>
					<el-button type="text" size="small" @click="deleteProduct(scope.row._id)">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageNum"
		      :page-sizes="[2, 3, 5, 6]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		</el-card>
	</div>
</template>

<script>
	import {reqProducts, reqSearchProducts, reqUpdateStatus, reqDeleteProduct} from '../../api'
	export default {
		data() {
			return {
				searchType: 'productName',
				searchKey: '',
				tableData: [],
		        pageNum: 1,
		        pageSize: 3,
		        total: 0, // 商品总数量
			}
		},
		methods: {
			// 获取商品列表
			async getProducts(pageNum, pageSize) {
				const {searchType, searchKey} = this
				let result = {}

				if(searchType && searchKey) { // 是否通过搜索获取商品数据
					result = await reqSearchProducts({pageNum, pageSize, searchType, searchKey})
				} else {
					result = await reqProducts()
				}
				console.log('商品列表', result)
				if(result.meta.status === 200) {
					this.total = result.data.list.length
					this.tableData = result.data.list
				} else {
					this.$message.error('获取商品数据失败！')
				}
			},
			// 页面数量改变
			handleSizeChange(val) {
				this.pageSize = val
				this.getProducts(this.pageNum, val)
	          console.log(`每页 ${val} 条`);
	        },
			// 当前页变化
			handleCurrentChange(val) {
				this.pageNum = val
				this.getProducts(val, this.pageSize)
	          console.log(`当前页: ${val}`);
	        },
	        // 给价格加上¥
	        formatPrice(row, column, cellValue, index) {
	        	// console.log(row, column, cellValue, index)
	        	return '¥ ' + cellValue
	        },
	        // 改变商品上下架状态
	        async changeStatus(product) {
	        	console.log(product)
	        	const productId = product._id
	        	const newStatus = product.status === 1 ? 2 : 1
	        	console.log(newStatus)
	        	const result = await reqUpdateStatus(productId, newStatus)
	        	if(result.status === 0) {
	        		this.$message.success('更新状态成功！')
	        		const {pageNum, pageSize} = this
	        		this.getProducts(pageNum, pageSize)
	        		console.log('新的数据',this.tableData)
	        	} else {
	        		this.$message.error('更新状态失败！')
	        	}
	        },
	        // 获取搜索商品数据
	        getSearchProducts() {
	        	this.pageNum = 1
	        	this.getProducts(1, this.pageSize)
	        },
	        // 跳转商品详情页
	        showDetail(product) {
	        	console.log(product._id)
	        	this.$router.push('/product/detail/' + product._id)
	        },
	        // 跳转到修改商品的AddUpdate组件
	        updateProduct(product) {
	        	this.$router.push('/product/addUpdate/' + product._id)
			},
			// 删除商品
			async deleteProduct(id) {
				const res = await reqDeleteProduct(id)
				console.log('删除商品反馈', res)
				if(res.meta.status === 200) {
					this.$message.success('删除成功！')
					this.getProducts(1, this.pageSize)
				}
			}

		},
		created() {
			this.getProducts(1, this.pageSize)
		}
	}
</script>

<style lang="scss" scoped>
	.product {
		.el-pagination {
			float: right;
			margin: 10px 0;
		}
	}
</style>