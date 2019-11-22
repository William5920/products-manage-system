<template>
	<div class="category">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 36px;">一级分类列表</span>
		    <el-button style="float: right; padding: 10px" type="primary" icon="el-icon-plus" @click="showAddDia">添加</el-button>
		  </div>
		  <el-table
			    :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="name"
			      label="分类名称"
			      min-width="800">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="200">
			      <template slot-scope="scope">
			        <el-button @click="showUpdateDia(scope.row)" type="text" size="small">修改分类</el-button>
			        <el-button type="text" size="small">查看子分类</el-button>
			      </template>
			    </el-table-column>
		  </el-table>
		  <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[3, 5, 6]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="9">
		  </el-pagination>

		  <el-dialog title="添加分类" :visible.sync="dialogAddVisible" width="30%">
			  <el-form :model="addForm">
			  	<el-form-item label="分类目录" :label-width="formLabelWidth">
			      <el-select v-model="addForm.region" placeholder="请选择所属分类" style="width: 100%;">
			        <el-option label="区域一" value="shanghai"></el-option>
			        <el-option label="区域二" value="beijing"></el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item label="分类名称" :label-width="formLabelWidth">
			      <el-input v-model="addForm.name" autocomplete="off"></el-input>
			    </el-form-item>
			    
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogAddVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addCategory">确 定</el-button>
			  </div>
	      </el-dialog>

	      <el-dialog title="修改分类" :visible.sync="dialogUpdateVisible" width="30%">
			  <el-form :model="updateForm">
			    <el-form-item label="分类名称" :label-width="formLabelWidth">
			      <el-input v-model="updateForm.name" autocomplete="off"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogUpdateVisible = false">取 消</el-button>
			    <el-button type="primary" @click="updateCategory">确 定</el-button>
			  </div>
	      </el-dialog>
		</el-card>
	</div>
</template>

<script>
	import { reqCategoryList, reqUpdateCategory } from '../../api'
	export default {
		data() {
	      return {
	        tableData: [], // 表格显示的数据
	        currentPage: 1,
	        pageSize: 5, 
	        dialogAddVisible: false, // 控制添加分类对话框的显示
	        dialogUpdateVisible: false, // 控制更新分类对话框的显示
	        updateForm: { // 更新分类对话框中的表单数据
	        	name: '',
	        	_id: ''
	        },
	        addForm: { // 添加分类对话框中的表单数据
	        	name: '',
	        	region: '' 
	        },
	        formLabelWidth: '80px', // form标签的宽度

	      }
	    },
	    methods: {
	    	getCategoryList() { // 获取分类列表
	    		reqCategoryList().then(res => {
		    		if(res.status === 0) {
		    			this.tableData = res.data
		    			// console.log('获取数据分类成功')
		    		}

		    	}).catch(error => {
		    		this.$message.error('获取数据失败！')
		    	})
	    	},
		    handleSizeChange(val) { // 分页器size改变
	        	this.pageSize = val
	      	},
	      	handleCurrentChange(val) { // 分页器当前页改变
	        	this.currentPage = val
	      	},
	      	showAddDia() { // 显示添加分类对话框
	      		this.dialogAddVisible = true
	      	},
	      	showUpdateDia(category) { // 显示更新分类对话框
	      		this.dialogUpdateVisible = true
	      		console.log(category)
	      		this.updateForm.name = category.name
	      		this.updateForm._id = category._id // 将分类名同步到表单中

	      	},
	      	addCategory() { // 发送请求，添加分类
	      		// 1.
	      		this.dialogAddVisible = false
	      		// 2.
	      		console.log('发送请求，添加分类')
	      		// 3.
	      	},
	      	async updateCategory() { // 发送请求，更新分类
	      		// 1.关闭对话框
	      		this.dialogUpdateVisible = false

	      		// 2.发送更新请求
	      		// console.log('发送请求，更新分类')
	      		// 准备数据
	      		const categoryId = this.updateForm._id
	      		const categoryName = this.updateForm.name
	      		// console.log(categoryId, categoryName)
	      		const result = await reqUpdateCategory(categoryId, categoryName)
	      		if(result.status === 0) {
	      			// 3.重新获取数据
	      			this.getCategoryList()
	      			this.$message.success('更新成功！')
	      		} else {
	      			this.$message.error('更新失败')
	      		}

	      		
	      	}

	    },
	    mounted() {
	    	this.getCategoryList()
	    }
	}
</script>

<style lang="scss" scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  
  table.el-table__body {
  	margin: 0;
  }

  .category {
  	.el-card {
  		width: 100%;

  		.el-pagination {
  			float: right;
  			margin: 10px 0;
  		}
  	}


  }	
</style>