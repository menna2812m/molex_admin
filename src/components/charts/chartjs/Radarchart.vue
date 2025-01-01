<template>
  <canvas id="chartLine" height="300" width="400"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Radarchart",
  mounted() {
    const ctx = document.getElementById("chartRadar");
    const myChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          ["Eating", "Dinner"],
          ["Drinking", "Water"],
          "Sleeping",
          ["Designing", "Graphics"],
          "Coding",
          "Cycling",
          "Running",
        ],
        datasets: [
          {
            label: "Data1",
            data: [65, 59, 66, 45, 56, 55, 40],
            borderColor: "rgba(113, 76, 190, 0.9)",
            borderWidth: "1",
            backgroundColor: "rgba(113, 76, 190, 0.5)",
          },
          {
            label: "Data2",
            data: [28, 12, 40, 19, 63, 27, 87],
            borderColor: "rgba(235, 111, 51,0.8)",
            borderWidth: "1",
            backgroundColor: "rgba(235, 111, 51,0.4)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {          
          r:{
            grid: {
              color: "rgba(119, 119, 142, 0.2)",
            },
            angleLines: { color: "rgba(119, 119, 142, 0.2)" },
          },
        },
      },
    });
    myChart;
  },
};
</script>

<style></style>
