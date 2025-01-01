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
          top: "6",
          right: "0",
          bottom: "17",
          left: "32",
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgba(119, 119, 142, 0.2)",
            },
          },
          axisLabel: {
            fontSize: 10,
            color: "#77778e",
          },
        },
        tooltip: {
          show: true,
          showContent: true,
          alwaysShowContent: true,
          triggerOn: "mousemove",
          trigger: "axis",
          axisPointer: {
            label: {
              show: false,
            },
          },
        },
        yAxis: {
          type: "category",
          data: ["2014", "2015", "2016", "2017", "2018"],
          splitLine: {
            lineStyle: {
              color: "rgba(119, 119, 142, 0.2)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#c0dfd8",
            },
          },
          axisLabel: {
            fontSize: 10,
            color: "#77778e",
          },
        },
        series: [
          {
            name: "sales",
            type: "bar",
            data: [10, 15, 9, 18, 10, 15],
            color:[ '#6259ca']
          },
          {
            name: "profit",
            type: "line",
            smooth: true,
            data: [8, 5, 25, 10, 10],
            color: "#c0dfd8",
          },
          {
            name: "growth",
            type: "bar",
            data: [10, 14, 10, 15, 9, 25],
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
