<template>
	<div class="addUpdate">
		<el-card class="box-card">
		  <div slot="header" class="clearfix header">
		    <i class="el-icon-back" @click="$router.back()"></i>
		    	{{$route.params.id ? '更新商品': '添加商品'}}
		  </div>
		  <div class="text item body">

		    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">

			  <el-form-item label="商品名称" prop="name" >
			    <el-input v-model="ruleForm.name" placeholder="商品名称" ></el-input>
			  </el-form-item>

			  <el-form-item label="商品描述" prop="desc" >
			    <el-input v-model="ruleForm.desc" placeholder="商品描述"></el-input>
			  </el-form-item>

			  <el-form-item label="商品价格" prop="price" required>
			  	<el-input placeholder="商品价格" v-model.number="ruleForm.price" type="number">
				  <template slot="append">元</template>
				</el-input>
			  </el-form-item>

			  <el-form-item label="商品分类" prop="categoryId">
			    <el-cascader 
			    :options="options"
			    v-model="ruleForm.categoryId" ></el-cascader>
			  </el-form-item>

			  <el-form-item label="商品图片">
			  	<el-upload
				  action="/api/manage/img/upload"
				  list-type="picture-card"
				  :on-preview="handlePictureCardPreview"
				  :on-remove="handleRemove"
				  :on-success="handleImgSuccess"
				  accept="image/*"
				  name="image"
				  :file-list="imagesList">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			  </el-form-item>
			  
			  <el-form-item label="商品详情" prop="detail">
			  	<RichTextEditor :detail.sync="ruleForm.detail"/>
			  </el-form-item>

			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
			  </el-form-item>
			</el-form>

		  </div>
		</el-card>
	</div>
</template>

<script>
  import {
  	reqCategoryList, 
  	reqProductsById, 
  	reqDeleteImg, 
  	reqAddOrUpdateProduct
  } from '../../api'
  import RichTextEditor from '../../components/RichTextEditor/RichTextEditor.vue'
  export default {
    data() {
      // 进行价格验证的validator
      var checkPrice = (rule, value, callback) => {
      	if(value < 0) {
      		callback(new Error('价格不能小于0'))
      	} else {
      		callback()
      	}
      }

      return {
        ruleForm: {
          name: '',
          desc: '',
          price: null, // 表单数据
          categoryId: '',
          imgs: [], // 商品图片名数组
          detail: '', // 商品详情
        },
        rules: {
          name: [
            { required: true, message: '必须输入商品名称', trigger: 'blur' },
          ],
          desc: [
            { required: true, message: '必须输入商品描述', trigger: 'blur' }
          ],
          price: [
          	{ type: 'number', message: '价格必须为数字值'},
          	{ required: true, message: '必须输入商品价格', trigger: 'blur' },
          	{ validator: checkPrice, trigger: 'blur'}
          ],
          category: [
            { required: true, message: '必须选择商品分类', trigger: 'blur' }
          ], // 表单验证规则
        },

        dialogImageUrl: '', // upload组件数据
        dialogVisible: false, // 控制预览图片时的模态框
        imagesList: [], // 上传的图片（供显示时使用）
        BASE_IMG_URL: 'http://localhost:5000/upload/', // 图片基础地址

        options: [], // 存放cascader的分类数据
        product: {}, // 根据product中是否存在数据来判断组件执行添加商品功能还是更新商品功能
      }
    },
    methods: {
      submitForm(formName) { // 提交表单
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log('submit!');
            console.log(this.ruleForm)
            const {categoryId,name,desc,price,detail,imgs} = this.ruleForm
            const newProduct = {categoryId,name,desc,price,detail,imgs}
            console.log(newProduct)
            if(this.$route.params.id) {
            	newProduct._id = this.$route.params.id
            }

            const result = await reqAddOrUpdateProduct(newProduct)
            if(result.status === 0) {
            	this.$message.success(`${newProduct._id?'更新':'添加'}商品成功！`)
            	this.$router.goBack()
            } else {
            	this.$message.error(`${newProduct._id?'更新':'添加'}商品失败！`)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) { // 重置表单
        this.$refs[formName].resetFields();
      },

      handleRemove(file, fileList) { // 移除图片
        const removeIndex = this.ruleForm.imgs.findIndex(item => item===file.name)
        this.ruleForm.imgs.splice(removeIndex, 1)
        this.imagesList = fileList
      },
      handlePictureCardPreview(file) { // 预览图片
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleImgSuccess(response, file, fileList) {

      	this.ruleForm.imgs.push(response.data.name)
      	this.imagesList.push({
      		name: file.response.data.name,
      		url: file.response.data.url,
      		status: 'success',
      		uid: file.uid
      	})

      },

      async getProductById(id) { // 封装根据商品ID获取商品的函数
      	const result = await reqProductsById(id)
			if(result.status === 0) {
				this.product = result.data
			}
			const {name,categoryId,desc,price,detail} = this.product
			this.ruleForm = {name,categoryId,desc,price,detail}

			if(this.product.imgs) { // 如果有图片，则显示图片
				this.imagesList = this.product.imgs.map(item => ({
					name: item,
					url: this.BASE_IMG_URL + item
				}))

				this.ruleForm.imgs = this.product.imgs // 同时更新表单数据
			}
			
      },
      async getCategoryList() { // 封装获取商品分类列表的函数
      	const result = await reqCategoryList()
    	if(result.status === 0) {
    		this.options = result.data.map(item => ({
    			value: item._id,
    			label: item.name
    		}))
    	} else {
    		this.$message.error('获取分类列表失败！')
    	}
      }
    },
    components: {
    	RichTextEditor
    },
    mounted() {
    	this.getCategoryList() // 获取分类列表
    	if(this.$route.params.id) { // 如果是更新商品，则获取商品的信息
    		this.getProductById(this.$route.params.id)
    	}

    },

  }
</script>

<style lang="scss" scoped>
	.addUpdate {
		.el-card {
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
				.el-input,
				.el-cascader {
					width: 400px;
				}


			}
		}
	}
</style>