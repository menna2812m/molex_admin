<template>
  <canvas id="chartLine" height="300" width="400"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Barchart2",
  mounted() {
    var ctx = document.getElementById("chartBar2");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Data1",
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: "#6259ca",
            borderWidth: "0",
            backgroundColor: "#6259ca",
          },
          {
            label: "Data2",
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: "#53caed",
            borderWidth: "0",
            backgroundColor: "#53caed",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
