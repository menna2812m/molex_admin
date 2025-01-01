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
		  left: '25',
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
		  data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
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
            name: "sales",
            type: "bar",
            stack: "Stack",
            data: [14, 18, 20, 14, 29, 21, 25, 14, 24],
            color:[ '#6259ca']
          },
          {
            name: "Profit",
            type: "bar",
            stack: "Stack",
            data: [12, 14, 15, 50, 24, 24, 10, 20, 30],
             color:[ '#53caed']
          },
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
