<template>
  <canvas id="chartLine" height="300" width="400"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Barchart",
  mounted() {
    const ctx = document.getElementById("chartBar1").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Sales",
            data: [200, 450, 290, 367, 256, 543, 345],
            borderWidth: 2,
            backgroundColor: "#9877f9",
            borderColor: "#9877f9",
            borderWidth: 2.0,
            pointBackgroundColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
        },
        scales: {
          y: {
            ticks: {
              beginAtZero: true,
              stepSize: 150,
              fontColor: "#77778e",
            },
            grid: {
              color: "rgba(119, 119, 142, 0.2)",
            },
          },

          x: {
            ticks: {
              display: true,
              fontColor: "#77778e",
            },
            grid: {
              display: false,
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
