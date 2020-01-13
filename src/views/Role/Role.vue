<template>
	<div class="role">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    	<el-button type="primary" @click="dialogAddVisible=true">创建角色</el-button>
		    	<el-button type="primary" :disabled="!currentRole" @click="dialogUpdateVisible=true">设置角色权限</el-button>
		  </div>
		  <div class="body">
		      <el-table
		      	ref="singleTable"
			    :data="roles.slice((current_page-1)*page_size, current_page*page_size)"
			    border
			    style="width: 100%"
			    highlight-current-row
			    @current-change="handleCurrentChange"
			    >
			    <el-table-column
			      prop="name"
			      label="角色名称"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="create_time"
			      label="创建时间"
			      min-width="100"
			      :formatter="farmateDate">
			    </el-table-column>
			    <el-table-column
			      prop="auth_time"
			      label="授权时间"
			      min-width="100"
			      :formatter="farmateDate">
			    </el-table-column>
			    <el-table-column
			      prop="auth_name"
			      label="授权人"
			      min-width="100"
			      align="center">
			    </el-table-column>
			  </el-table>
		  </div>
		  <el-pagination
		      @size-change="handlePageSizeChange"
		      @current-change="handleCurrentPageChange"
		      :current-page="current_page"
		      :page-sizes="[3,4,5]"
		      :page-size="page_size"
		      layout="total, sizes, prev, pager, next"
		      :total="roles.length">
		  </el-pagination>

		  <el-dialog title="添加角色" :visible.sync="dialogAddVisible" width="30%">
			  <el-form :model="addForm">
			    <el-form-item label="角色名称" label-width="80px">
			      <el-input v-model="addForm.roleName" autocomplete="off" required></el-input>
			    </el-form-item>			    
			  </el-form>

			  <div slot="footer" class="dialog-footer">
			    <el-button @click="cancelAddRole">取 消</el-button>
			    <el-button type="primary" @click="addRole">确 定</el-button>
			  </div>
	      </el-dialog>
	      <el-dialog title="设置角色权限" :visible.sync="dialogUpdateVisible" width="30%">
			  <el-form >
			    <el-form-item label="角色名称" label-width="80px">
			      <el-input :value="currentRole?currentRole.name:''" autocomplete="off" required disabled></el-input>
			    </el-form-item>			    
			  </el-form>
			  <el-tree
			  	  ref="tree"
				  :data="menuList"
				  show-checkbox
				  node-key="key"
				  :default-expand-all="true"
				  :default-checked-keys="currentRole?currentRole.menus:[]"
				  :props="defaultProps">
			  </el-tree>

			  <div slot="footer" class="dialog-footer">
			    <el-button @click="cancelUpdateRole">取 消</el-button>
			    <el-button type="primary" @click="updateRole">确 定</el-button>
			  </div>
	      </el-dialog>
		</el-card>
	</div>
</template>

<script>
	import { reqRoleList, reqAddRole, reqUpdateRole } from '../../api'
	import menuList from '../../config/menuConfig.js'
	import {dateFormate} from '../../utils/dateUtils.js'
	export default {
		data() {
	      return {
	        roles: [], // 所有的角色
	        currentRole: null, // 当前选中角色
	        current_page: 1,
	        page_size: 3,
	        dialogAddVisible: false, // 控制添加角色对话框的显示
	        dialogUpdateVisible: false, // 控制设置角色权限对话框的显示
	        addForm: { // 添加分类对话框中的表单数据
	        	roleName: ''
	        },
		    defaultProps: { // el-Tree配置项
	          children: 'children',
	          label: 'title'
	        },
	        menuList: [{
	        	key: 'authority',
	        	title: '平台权限',
	        	children: menuList
	        }], // Tree显示的列表
	      }
    	},
    	methods: {
	      handlePageSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	        this.page_size = val
	      },
	      handleCurrentPageChange(val) {
	        console.log(`当前页: ${val}`);
	        this.current_page = val
	      },
	      setCurrent(row) {
	        this.$refs.singleTable.setCurrentRow(row);
	      },
	      handleCurrentChange(newRow, oldRow) {
	        this.currentRole = newRow;
	        if(this.$refs.tree&&newRow) {
	    			this.$refs.tree.setCheckedKeys(newRow.menus)
	    		}
	      },
	      async getRoles() { // 获取所有的角色列表
	      	const result = await reqRoleList()
	      	if(result.status === 0) {
	      		this.roles = result.data
	      	}
	      },
	      cancelAddRole() { // 取消添加角色
	      	this.dialogAddVisible = false
	      	this.addForm.roleName = ''
	      },
	      async addRole() { // 添加角色
	      	console.log(this.addForm)
	      	// 1.收集数据并验证
	      	if(this.addForm.roleName.trim().length === 0) {
	      		this.$message.error('角色名不能为空！')
	      		return
	      	}
	      	// 2.发送请求
	      	const roleName = this.addForm.roleName
	      	console.log(roleName)
	      	const result = await reqAddRole(roleName)

	      	if(result.status === 0) {
	      		// 3.更新显示列表
	      		this.tableData.push(result.data)
	      		this.$message.success('添加角色成功！')
	      	} else {
	      		this.$message.error('添加角色失败！')
	      	}
	      	// 4.关闭模态框，清空表单
	      	this.dialogAddVisible = false
	      	// this.addForm.roleName = ''
	      	
	      },
	      cancelUpdateRole() { // 取消设置角色权限
	      	this.dialogUpdateVisible = false
	      },
	      async updateRole() { // 设置角色权限
	      	const {_id} = this.currentRole
	      	let role = {_id}
	      	role.auth_time = Date.now()
	      	role.menus = this.$refs.tree.getCheckedKeys(true)
	      	role.auth_name = 'admin'
	      	const result = await reqUpdateRole(role)
	      	if(result.status === 0) {
	      		// 设置权限成功
	      		this.$message.success('设置权限成功！')
	      		this.getRoles()
	      	} else { // 设置权限失败
	      		this.$message.error('设置权限失败！')
	      	}

	      	this.dialogUpdateVisible = false
	      },
	      farmateDate(row, column, cellValue, index) { // 格式化日期
	      	if(!cellValue) {
	      		return ''
	      	}
	      	return dateFormate(cellValue)
	      }
	    },
	    mounted() {
	    	this.getRoles()
	    }
	}
</script>

<style lang="scss" scoped>
	.role {
		.el-pagination {
			float: right;
			margin: 10px 0;
		}
	}
</style>