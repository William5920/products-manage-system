<template>
	<div class="home">
		<el-card>
		  <div slot="header" >
		    <!-- <span>大盘看板</span> -->
		    <el-date-picker
		      v-model="date"
		      type="daterange"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
		    </el-date-picker>
		  </div>
		  <div class="card-body">
		    <div class="chart" id="linechart"></div>
		    <div class="progress">
		    	<el-card>
		    		<div slot="header">项目进度</div>
		    		  <el-timeline>
					    <el-timeline-item
					      v-for="(activity, index) in activities"
					      :key="index"
					      :icon="activity.icon"
					      :type="activity.type"
					      :color="activity.color"
					      :size="activity.size"
					      :timestamp="activity.timestamp">
					      {{activity.content}}
					    </el-timeline-item>
					  </el-timeline>
		    	</el-card>
		    </div>
		  </div>
		</el-card>
	</div>
</template>

<script>
	import memoryUtils from '../../utils/memoryUtils'
	import echarts from 'echarts'
	export default {
		data() {
			return {
				date: '',
				activities: [{
		          content: '新版本迭代会',
		          timestamp: '2018-04-12 20:46',
		          size: 'large',
		          type: 'primary',
		          icon: 'el-icon-more'
		        }, {
		          content: '完成网页设计初版',
		          timestamp: '2018-04-03 20:46',
		          color: '#0bbd87'
		        }, {
		          content: '联调接口 功能验收',
		          timestamp: '2018-04-03 20:46',
		          size: 'large'
		        }, {
		          content: '登录功能设计',
		          timestamp: '2018-04-03 20:46'
		        }]
			}
		},
		methods: {
			buildChart() {
				var container = document.getElementById('linechart')
				var chart = echarts.init(container)
				var option = {
				    title: {
				        text: '堆叠区域图'
				    },
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
				    legend: {
				        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
				    },
				    toolbox: {
				        feature: {
				            saveAsImage: {}
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
				            boundaryGap: false,
				            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: [
				        {
				            name: '邮件营销',
				            type: 'line',
				            stack: '总量',
				            areaStyle: {},
				            data: [120, 132, 101, 134, 90, 230, 210]
				        },
				        {
				            name: '联盟广告',
				            type: 'line',
				            stack: '总量',
				            areaStyle: {},
				            data: [220, 182, 191, 234, 290, 330, 310]
				        },
				        {
				            name: '视频广告',
				            type: 'line',
				            stack: '总量',
				            areaStyle: {},
				            data: [150, 232, 201, 154, 190, 330, 410]
				        },
				        {
				            name: '直接访问',
				            type: 'line',
				            stack: '总量',
				            areaStyle: {},
				            data: [320, 332, 301, 334, 390, 330, 320]
				        },
				        {
				            name: '搜索引擎',
				            type: 'line',
				            stack: '总量',
				            label: {
				                normal: {
				                    show: true,
				                    position: 'top'
				                }
				            },
				            areaStyle: {},
				            data: [820, 932, 901, 934, 1290, 1330, 1320]
				        }
				    ]
				};
				chart.setOption(option)

			}
		},
		mounted() {
			const user = memoryUtils.user
			if(!user || !user._id) {
				this.$router.replace('/login')
				this.$message.error('请登录！')
			}

			this.buildChart()
		}
	}
</script>

<style lang="scss">
	.home {
		.el-range-separator {
			padding: 0!important;
		}
 
		.card-body {
			display: flex;
			.chart {
				
				width: 800px;
				height: 400px;
				/*background-color: yellow;*/
			}

			.progress {
				width: 300px;
				height: 400px;
				margin-left: 40px;
			}
		}

	}
</style>