<template>
	<div class="login">
		<div class="login-header">
			<i class="el-icon-orange"></i>
			<h1>综合管理系统</h1>
		</div>
		<div class="login-content">
			<h2>用户登录</h2>
			<div class="login-form">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" label-position="left">
				  <el-form-item label="用户名" prop="username" >
				    <el-input v-model="ruleForm.username"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="password">
				    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
				  </el-form-item>
				  
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')" class="el-button">登录</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
  import { reqLogin } from '../../api'
  import memoryUtils from '../../utils/memoryUtils'
  import storageUtils from '../../utils/storageUtils'
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 12, message: '用户名长度为4-12', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是字母、数字或下划线组成"}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 12, message: '密码长度为4-12', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]+$/, message: "密码必须是字母或数字组成"}
          ],

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {

            const {username, password} = this.ruleForm
            // console.log(username, password)
			const result = await reqLogin(username, password)
			console.log(result)
            if (result.meta.status === 200) {
              this.$message.success(result.meta.msg)
              this.$router.replace('/')
              memoryUtils.user = result.data.user // 将用户数据保存到内存中去，方便其他组件使用
              storageUtils.saveUser(result.data.user) // 将用户数据保存到localStirage中去，以维持登录状态
            } else {
              this.$message({
                message: '登录失败：' + result.meta.msg
              })
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    created() {
    	const user = memoryUtils.user
    	if(user && user._id) {
    		this.$router.replace('/')
    	}
    }
  }
</script>

<style lang="scss" scoped>
	.login {
		width: 100%;
		height: 100%;
		background-image: url('./images/loginBg.jpeg');
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		.login-header {
			height: 80px;
			display: flex;
			align-items: center;
			background-color: rgba(21, 20, 13, 0.5);
			.el-icon-orange {
				font-size: 40px;
				color: orange;
				margin: 0 20px 0 50px;
			}
			h1 {
				font-size: 30px;
				color: white;
			}
		}

		.login-content {
			width: 400px;
			background-color: #fff;
			margin: 50px auto;
			padding: 20px 40px;
			h2 {
				font-size: 30px;
				font-weight: bold;
				text-align: center;
			}

			.login-form {
				width: 100%;
				margin-top: 10px;

        .el-button {
          width: 100%;
        }
			}
		}
	}
</style>