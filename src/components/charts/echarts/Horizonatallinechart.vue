<template>
  <vue-echarts :option="option" style="height: 300px" />
</template>

<script>
import { VueEcharts } from "vue3-echarts";
export default {
  name: "EchartsLine",
  components: {
    VueEcharts,
  },
  data() {
    return {
      option: {
        grid: {
		  top: '6',
		  right: '0',
		  bottom: '17',
		  left: '32',
		},
		tooltip: {
			show: true,
			showContent: true,
			alwaysShowContent: true,
			triggerOn: 'mousemove',
			trigger: 'axis',
			axisPointer:
			{
				label: {
					show: false,
				}
			}
		},
		xAxis: {
		  type: 'value',
		  axisLine: {
			lineStyle: {
			  color: 'rgba(119, 119, 142, 0.2)'
			}
		  },
		  axisLabel: {
			fontSize: 10,
			color: '#77778e'
		  }
		},
		yAxis: {
		  type: 'category',
		  data: [ '2014', '2015', '2016', '2017', '2018'],
		  splitLine: {
			lineStyle: {
			  color: 'rgba(119, 119, 142, 0.2)'
			}
		  },
		  axisLine: {
			lineStyle: {
			  color: 'rgba(119, 119, 142, 0.2)'
			}
		  },
		  axisLabel: {
			fontSize: 10,
			color: '#77778e'
		  }
		},
        series: [
            {
		  name: 'sales',
		  type: 'line',
		  smooth: true,
		  data: [12, 25, 12, 35, 12, 38],
		  color:[ '#6259ca']
		},
		{
		  name: 'Profit',
		  type: 'line',
		  smooth: true,
		  size:10,
		  data: [8, 12, 28, 10, 10, 12],
		  color:[ '#53caed']
		}
        ],
      },
    };
  },
};
</script>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
