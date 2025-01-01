<template>
  <canvas id="chartLine" height="300" width="400"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Linechart",
  mounted() {
    const ctx = document.getElementById("chartLine").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Profits",
            data: [20, 420, 210, 354, 580, 320, 480],
            borderWidth: 2,
            backgroundColor: "transparent",
            borderColor: "#6259ca",
            borderWidth: 3,
            pointBackgroundColor: "#ffffff",
            pointRadius: 2,
            tension: 0.4,
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
            display: true,
            grid: {
              color: "rgba(119, 119, 142, 0.2)",
            },
          },

          y: {
            ticks: {
              fontColor: "#77778e",
            },
            display: true,
            grid: {
              color: "rgba(119, 119, 142, 0.2)",
            },
            scaleLabel: {
              display: false,
              labelString: "Thousands",
              fontColor: "rgba(119, 119, 142, 0.2)",
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
