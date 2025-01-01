<template>
  <canvas id="chartLine" height="300" width="400"></canvas>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "Areachart",
  mounted() {

    var ctx = document.getElementById("chartArea");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
      label: "Data 1 ",
      borderColor: "rgba(235, 111, 51 ,0.9)",
      borderWidth: "1",
      backgroundColor: "rgba(	235, 111, 51, 0.7)",
      pointHighlightStroke: "rgba(235, 111, 51 ,1)",
      data: [16, 32, 18, 26, 42, 33, 44],
      fill: true,
      tension: 0.4,
    },
    {
      label: "Data 2",
      backgroundColor: "rgba(113, 76, 190, 0.5)",
      borderColor: "rgba(113, 76, 190, 0.9)",
      data: [22, 44, 67, 43, 76, 45, 12],
      fill: true,
      tension: 0.4,
      // borderDash: [5, 5],
    },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          x: {
            ticks: {
              fontColor: "#77778e",
            },
            grid: {
              color: "rgba(119, 119, 142, 0.2)",
            },
          },

          y: {
            ticks: {
              beginAtZero: true,
              fontColor: "#77778e",
            },
            grid: {
              color: "rgba(119, 119, 142, 0.2)",
            },
          },
        },
        legend: {
          labels: {
            fontColor: "#77778e",
          },
        },
      },
    });
    myChart;
  },
};
</script>

<style></style>
