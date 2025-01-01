<template>
  <div>
    <apexchart
      type="line"
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
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          // text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#6259ca", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.1,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },

      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
          color: "#6259ca",
        },
      ],
    };
  },
};
</script>

<style></style>
