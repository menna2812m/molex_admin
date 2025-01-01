<template>
  <div>
    <apexchart
      type="radialBar"
      height="150"
      width="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },

  data: function () {
    return {
      chartOptions: {
        chart: {
        //   height: 350,
          type: "radialBar",
        },
        plotOptions: {
              radialBar: {
                startAngle: 0,
                endAngle: 360,
                offsetX: 0,
                offsetY: 0,
                hollow: {
                  // margin: 5,
                  size: '60%',
                  background: 'transparent',
                },
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    show: true,
                    offsetY: 5,
                    fontSize: '16px',
                    fontWeight: 600,
                  }
                }
              }
            },
            colors: ["#6259ca"],
            legend: {
              show: false,
              floating: true,
              fontSize: '56px',
              position: 'left',
              offsetX: 160,
              offsetY: 1,
              labels: {
                useSeriesColors: true,
              },
              
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                    show: false
                }
              }
            }]
          
      },
      series: [75],
    };
  },
};
</script>

<style></style>
