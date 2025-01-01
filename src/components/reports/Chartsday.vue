<template>
    <div class="card custom-card border-0 card-chart">
      <div class="card-header p-3 bg-transparent">
        <h4 class="mb-0">الايام الاكثر طلبا </h4>
      </div>
      <div class="card-body">
        <div class="row mt-4">
            <vue-echarts :option="option" style="height: 300px" />

        </div>
      </div>
     
    </div>
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
            top: "10",
            right: "0",
            bottom: "17",
            left: "25",
          },
          tooltip: {
            show: false,
            showContent: false,
            alwaysShowContent: false,
            triggerOn: "mousemove",
            trigger: "axis",
            axisPointer: {
              label: {
                show: false,
              },
            },
          },
          xAxis: {
            data: ["السبت", "الاحد", "الاتنين", "التلاثاء", "الاربعاء", "الخميس", "الجمعه"],
            axisLine: {
              lineStyle: {
                color: "rgba(119, 119, 142, 0.2)",
              },
            },
            axisLabel: {
              fontSize: 10,
              color: "#ffc6db",
            },
          },
          yAxis: {
            splitLine: {
              lineStyle: {
                color: "rgba(119, 119, 142, 0.2)",
              },
            },
  
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
          series: [
            {
              name: "sales",
              type: "bar",
              stack: "Stack",
              data: [200, 500, 250, 420, 400, 700, 500],
              color: ["#6295d5"],
            },
            
          ],
        },
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
  .echarts {
    width: 100%;
    height: 100%;
  }
  .custom-card.card-chart {
    box-shadow: 1px 3px 20px 2px #e6edf0;
    border-radius: 15px;
    .card-header {
      border-bottom: 1px solid #f7fafd;
    }
  }
  </style>
  