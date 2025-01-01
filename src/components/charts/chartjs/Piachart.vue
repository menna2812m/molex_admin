<template><canvas id="chartPie"></canvas></template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Donut",
  mounted() {
    var ctx = document.getElementById("chartDonut");

    const data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    const myChart = new Chart(ctx, {
      type: "pie",
      data: data,
    });
    myChart;
  },
};
</script>

<style setup>
#chartPie {
  height: 300px !important;
  width: 300px !important;
  margin: 0 auto;
}
</style>
