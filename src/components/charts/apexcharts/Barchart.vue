<template>
<div>
  <apexchart
    type="bar"
    height="300"
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
          type: "bar",
          height: 300,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "South Korea",
            "Canada",
            "United Kingdom",
            "Netherlands",
            "Italy",
            "France",
            "Japan",
            "United States",
            "China",
            "Germany",
          ],
        },
      },

      series: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
          color: "#6259ca",
        },
      ],
    };
  },
};
</script>

<style></style>
