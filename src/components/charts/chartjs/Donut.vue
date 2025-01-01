<template>
  <canvas id="chartDonut"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Donut",
  mounted() {
    var ctx = document.getElementById("chartPie");
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          data: [20, 20, 30, 5, 25],
          backgroundColor: [
            "#6259ca",
            "#53caed",
            "#01b8ff",
            "#f16d75",
            "#29ccbb",
          ],
        },
      ],
    };
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
    });
    myChart;
  },
};
</script>

<style>
  #chartDonut {
        height: 300px !important;
        width: 300px !important;
        margin: 0 auto;
    }
</style>
