<template>
	<div class="rich-text-editor">
		<div id="div1" class="toolbar"></div>
		<div id="div2" class="text"></div>
	</div>
</template>
<script>
	import E from 'wangeditor'
	export default {
		data() {
			return {
				editor: null, // 编辑器对象
				editorContent: '', // 编辑器内容

			}
		},
		props: ['detail'],
		watch: {
			detail: function(newValue, oldValue) {
				// console.log('detail的旧值为'+oldValue, 'detail的新值为'+newValue)
				this.editor.txt.html(newValue)
			},
			editorContent: function(newValue, oldValue) {
				this.$emit('update:detail', newValue)
			}
		},
		mounted() {
			this.editor = new E('#div1', '#div2')
			this.editor.customConfig.debug = true // 设置debug模式方便调试
			this.editor.customConfig.uploadImgServer = '/api' + '/manage/img/upload' // 图片上传的服务器接口
			this.editor.customConfig.uploadImgHooks = {
				success: function (xhr, editor, result) {
					alert('图片插入成功')
					console.log(xhr)
					console.log(result)
				},
				fail: function (xhr, editor, result) {
					alert('图片插入失败')
				},
				error: function (xhr, editor) {
					alert('图片上传失败')
					console.log(xhr)
				},
				customInsert: function (insertImg, result, editor) {
					// console.log(result)
				} // 上传图片时各个阶段的处理函数
			}

			this.editor.customConfig.onblur = (html) => {
				// console.log(html,this)
				this.editorContent = html
			}

			this.editor.create() 
		},

	}
</script>

<style lang="scss" scoped>
	.rich-text-editor {
		width: 80%;
		.toolbar {
            border: 1px solid #ccc;
        }
        .text {
            border: 1px solid #ccc;
            min-height: 200px;
            border-color: none;
        }
	}
</style>