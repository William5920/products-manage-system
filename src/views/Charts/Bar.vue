<template>
	<div class="bar">
		<el-card class="box-card">
		  <div slot="header" >
		    <el-button type="primary" @click=update>更新</el-button>
		  </div>
		  <div class="body" id="barChart">
		    
		  </div>
		</el-card>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		data() {
			return {
				sales: [5, 20, 36, 10, 10, 20],
				count: [9, 10, 6, 7, 10, 15]
			}
		},
		methods: {
			buildChart() {
				var container = document.getElementById('barChart')
				var barChart = echarts.init(container)
				// 指定图表的配置项和数据
		        var option = {
		            title: {
		                text: '商品品类销量'
		            },
		            tooltip: {},
		            legend: {
		                data:['销量','库存']
		            },
		            xAxis: {
		                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
		            },
		            yAxis: {
		            	// data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		            	// min: 5,
		            	// max: 50
		            },
		            series: [
		            	{
			                name: '销量',
			                type: 'bar',
			                data: this.sales
		            	},
		            	{
		            		name: '库存',
			                type: 'bar',
			                data: this.count
		            	}
		            ]
		        };

				barChart.setOption(option)
			},
			update() {
				
				this.sales = this.sales.map(item => item + 1)
				this.count = this.count.map(item => item - 1)
				
				this.buildChart()
			}
		},
		mounted() {
			this.buildChart()
		}
	}
</script>

<style lang="scss" scoped>
	.bar {
		.el-card {
			#barChart {
				width: 100%;
				height: 400px;
			}
		}
	}
</style>