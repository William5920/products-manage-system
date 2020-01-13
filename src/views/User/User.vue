<template>
	<div class="user">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    	<el-button type="primary" @click="addUser">创建用户</el-button>
		  </div>
		  <div class="body">
		      <el-table
		      	ref="singleTable"
			    :data="users.slice((current_page-1)*page_size, current_page*page_size)"
			    border
			    style="width: 100%"
			    >
			    <el-table-column
			      prop="username"
			      label="用户名"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="email"
			      label="邮箱"
			      min-width="100"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="phone"
			      label="电话"
			      min-width="100"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="create_time"
			      label="注册时间"
			      min-width="100"
			      :formatter="formateDate">
			    </el-table-column>
			    <el-table-column
			      prop="role_id"
			      label="所属角色"
			      min-width="100"
			      :formatter="formateRoleName">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="100"
			      align="center">
			      <template slot-scope="scope">
			        <el-button @click="updateUser(scope.row)" type="text" size="small">修改</el-button>
			        <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
			      </template>
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
		      :total="users.length">
		  </el-pagination>

		  <el-dialog :title="userId?'更新用户':'创建用户'" :visible.sync="dialogAddVisible" width="30%">
			  <el-form :model="newUser" :rules="rules" ref="addForm">
			    <el-form-item label="用户名:" label-width="80px" prop="username">
			      <el-input v-model="newUser.username" autocomplete="off" required></el-input>
			    </el-form-item>
			    <el-form-item label="密码:" label-width="80px" prop="password">
			      <el-input v-model="newUser.password" autocomplete="off" type="password"></el-input>
			    </el-form-item>	
			    <el-form-item label="手机号:" label-width="80px" prop="phone">
			      <el-input v-model="newUser.phone" autocomplete="off" required></el-input>
			    </el-form-item>	
			    <el-form-item label="邮箱:" label-width="80px" prop="email">
			      <el-input v-model="newUser.email" autocomplete="off" required></el-input>
			    </el-form-item>
			    <el-form-item label="角色:" label-width="80px" prop="role_id">
			      <el-select v-model="newUser.role_id" placeholder="请选择角色">
			        <el-option v-for="role in roleOption" :key="role._id" :label="role.name" :value="role._id"></el-option>
			      </el-select>
			    </el-form-item>				    
			  </el-form>

			  <div slot="footer" class="dialog-footer">
			    <el-button @click="cancelAddOrUpdateUser">取 消</el-button>
			    <el-button type="primary" @click="addOrUpdateUser">确 定</el-button>
			  </div>
	      </el-dialog>
		</el-card>
	</div>
</template>

<script>
	import {reqUsersList, reqDeleteUser, reqAddUser, reqUpdateUser} from '../../api'
	import {dateFormate} from '../../utils/dateUtils.js'
	export default {
		data() {
			var checkPhone = (rule, value, callback) => {
				if(value) {
					if(this.isCellPhone(value)) {
						callback()
					} else {
						callback(new Error('手机号格式不正确！'))
					}
				}
			}
			var checkEmail = (rule, value, callback) => {
				if(value) {
					if(this.isEmail(value)) {
						callback()
					} else {
						callback(new Error('邮箱格式不正确！'))
					}
				}
			}
			return {
				users: [],
				roles: {}, // 属性名为role id，属性值为role name的对象
				roleOption: [], // 用于循环生成el-select的选项
				current_page: 1,
				page_size: 3,
				dialogAddVisible: false,
				newUser: {
					username: '',
					password: '',
					phone: '',
					email: '',
					role_id: ''
				},
				rules: {
					username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
					password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
					phone: [{ validator: checkPhone, trigger: 'blur' }],
					email: [{ validator: checkEmail, trigger: 'blur' }]
				},
				userId: '', // 用于存储需要修改的用户
			}
		},
		methods: {
		  formateDate(row, column, cellValue, index) { // 格式化日期
	      	if(!cellValue) {
	      		return ''
	      	}
	      	return dateFormate(cellValue)
	      },
	      formateRoleName(row, column, cellValue, index) { // 格式化角色名
	      	if(!cellValue) {
	      		return ''
	      	}
	      	return this.roles[cellValue]
	      },
	      handlePageSizeChange(val) { // 处理分页器pagesize的变化
	        // console.log(`每页 ${val} 条`);
	        this.page_size = val
	      },
	      handleCurrentPageChange(val) { // 处理分页器currentpage的变化
	        // console.log(`当前页: ${val}`);
	        this.current_page = val
	      },
	      updateUser(user) { // 更新用户,点击“修改”按钮执行
	      	console.log(user)
	      	this.dialogAddVisible = true

	      	this.userId = user._id
	      	const {username, password, phone, email, role_id} = user
	      	this.newUser = {username, password, phone, email, role_id}

	      },
	      deleteUser(user) { // 删除用户
	      	this.$confirm(`确认删除${user.username}吗`, '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(async () => { // 点击确定
	        	const result = await reqDeleteUser(user._id)
	        	if(result.status === 0) {
	        		this.$message({
			            type: 'success',
			            message: '删除成功!'
			          });
	        		this.getUsers()
	        	} else {
	        		this.$message.error('删除失败！')
	        	}
	          
	        }).catch(() => { // 点击取消

	        });
	      },
	      addUser() { // 点击“添加用户”按钮的回调函数
	      	this.dialogAddVisible = true
	      	this.userId = ''
	      	this.newUser = {
					username: '',
					password: '',
					phone: '',
					email: '',
					role_id: ''
				}
	      },
	      cancelAddOrUpdateUser() {
	      	this.dialogAddVisible = false
	      	this.userId = ''
	      	// this.$refs.addForm.resetFields()
	      },
	      async addOrUpdateUser() {
	      	let update = !!this.userId
	      	let result = null
	      	// console.log('userId:'+this.userId)
	      	// console.log(update)
	      	if(update) {
	      		// 更新用户
	      		const {username, phone, email, role_id} = this.newUser
	      		let updateUser = {username, phone, email, role_id}
	      		updateUser._id = this.userId
	      		result = await reqUpdateUser(updateUser)
	      		console.log(result)

	      	} else {
	      		// 添加用户
	      		result = await reqAddUser(this.newUser)
	      		console.log(result)
	      	}
	      	if(result.status === 0) {
	      		this.$message.success(`${update?'更新':'添加'}用户成功！`)
	      		this.getUsers() // 刷新用户列表
	      	} else {
	      		this.$message.error(`${update?'更新':'添加'}用户失败！`)
	      	}

	      	this.dialogAddVisible = false
	      	this.$refs.addForm.resetFields()
	      	
	      },
	      async getUsers() { // 获取所有用户
	      	const result = await reqUsersList()
	      	if(result.status === 0) {
	      		// console.log(result.data)
	      		this.users = result.data.users
	      		// 生成属性名为role id，属性值为role name的数组，在显示时就不用多次遍历
	      		this.roles = result.data.roles.reduce((pre, role) => {
	      			pre[role._id] = role.name
	      			return pre
	      		}, {})
	      		this.roleOption = result.data.roles
	      		// console.log(this.roleOption)
	      	} else {
	      		this.$message.error('获取用户列表失败！')
	      	}
	      },
	      isCellPhone(val) { // 手机号验证器
		      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
		        return false
		      } else {
		        return true
		      }
		  },
		  isEmail(val) { // 邮箱验证器
		  	let emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
		  	if(emailReg.test(val)) {
		  		return true
		  	} else {
		  		return false
		  	}
		  }

		},
		mounted() {
			this.getUsers()
			
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		.el-pagination {
			float: right;
			margin: 10px 0;
		}
		.el-select {
			width: 307.5px;
		}
	}
</style>