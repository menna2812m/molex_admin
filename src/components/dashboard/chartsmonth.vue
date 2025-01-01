<template>
  <div class="card custom-card border-0 card-chart">
    <div class="card-header p-3 bg-transparent">
      <h4 class="mb-0">ملخص الشهر</h4>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-5 m-auto">
          <div class="d-grid w-100 place-items-center">
            <div class="d-flex justify-content-between align-items-center pb-5">
              <h6 class="w-50">
                <i class="typcn typcn-media-record frist"></i>
                الطلبات
              </h6>
              <h6 class="w-50">
                <i class="typcn typcn-media-record second"></i>
                المبيعات
              </h6>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="w-50">
                <i class="typcn typcn-media-record third"></i>
                هدف الشهر
              </h6>
              <h6 class="w-50">
                <i class="typcn typcn-media-record fourth"></i>
                الزيارات
              </h6>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <vue-echarts :option="option" style="height: 300px" />
        </div>
      </div>
    </div>
    <div class="card-footer p-3 bg-transparent">
      <h5 class="mb-0">المزيد من التقارير &gt;</h5>
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
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
            data: [100, 150, 50, 50, 40, 80, 50],
            color: ["#ffda83"],
          },
          {
            name: "Profit",
            type: "bar",
            stack: "Stack",
            data: [100, 300, 100, 100, 60, 140, 50],
            color: ["#ff73b4"],
          },
          {
            name: "Pro",
            type: "bar",
            stack: "Stack",
            data: [200, 60, 70, 70, 80, 100, 50],
            color: ["#56d9fe"],
          },
          {
            name: "yellow",
            type: "bar",
            stack: "Stack",
            data: [100, 200, 200, 200, 140, 200, 50],
            color: ["#a3a1fb"],
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
    border-bottom: 1px solid #d7d3d33c;
  }
  .card-footer {
    border-top: 1px solid #d7d3d33c;
    background-color: #f0f5fb !important;
    color: #fb99bf;
    text-align: center;
  }
  .frist{
    color: #ffda83;
  }
  .second{
    color: #ff73b4;
  }
  .third{
    color: #56d9fe;
  }
  .fourth{
    color: #a3a1fb;
  }
}
</style>
