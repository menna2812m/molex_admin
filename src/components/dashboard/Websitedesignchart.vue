<template>
  <canvas id="bar-chart" height="100"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Barchart",
  mounted() {
    const ctx = document.getElementById("bar-chart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        datasets: [
          {
            label: "Total Project",

            backgroundColor: "#6259ca",
            borderColor: "#6259ca ",
            borderRadius: 50,
            borderWidth: 1,
            data: [89, 59, 76, 56, 58, 73, 59, 87, 45, 54, 59, 76, 56],
            barThickness: 5,
          },
          {
            label: "On Going",
            backgroundColor: "rgba(204, 204, 204, 0.2)",
            borderColor: "rgba(204, 204, 204, 0.2)",
            data: [66, 59, 76, 56, 58, 65, 59, 85, 23, 32, 59, 76, 56],
            barThickness: 5,
            borderRadius: 50,
          },
        ],
      },
      options: {
        // tooltips: {
        //   displayColors: true,
        // },
        cornerRadius: 400,
        maintainAspectRatio: false,
        legend: { display: false },
        layout: {
          padding: {
            top: 0,
            bottom: 0,
          },
        },
        scales: {
          x: {
            barThickness: 3,
            categoryPercentage: 4,
            barPercentage: 4,
            stacked: true,
            display: false,
            gridLines: {
              display: false,
            },
          },

          y: {
            stacked: true,
            ticks: {
              beginAtZero: false,
            },
            display: false,
            gridLines: {
              display: false,
            },
            type: "linear",
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: "bottom", display: false },
      },
    });
    myChart;
  },
};
</script>

<style>
#bar-chart {
  height: 100px !important;
  /* width: 300px !important; */
  margin: 0 auto;
}
@media (max-width: 575px) {
  #bar-chart {
    width: 200px !important;
  }
}
</style>
