<template>
  <canvas id="chartLine" height="300" width="400"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  name: "Linechart",
  mounted() {
    const ctx = document.getElementById("project").getContext("2d");
    const myChart = new Chart(ctx, {
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
          "Aug",
          "Sep",
          "Oct",
        ],
        datasets: [
          {
            label: "TOTAL BUDGET",
            data: [
              100, 210, 180, 454, 454, 230, 230, 656, 656, 350, 350, 210, 410,
            ],
            borderWidth: 3,
            backgroundColor: "transparent",
            // borderColor: myVarVal,
            borderColor: "#6259ca",

            pointBackgroundColor: "#ffffff",
            pointRadius: 0,
            type: "line",
            tension: "0.4",
          },
          {
            label: "AMOUNT USED",
            data: [
              200, 530, 110, 110, 480, 520, 780, 435, 475, 738, 454, 454, 230,
            ],
            borderWidth: 3,
            backgroundColor: "transparent",
            borderColor: "rgb(183, 179, 220,0.5)",
            pointBackgroundColor: "#ffffff",
            pointRadius: 0,
            type: "line",
            borderDash: [7, 3],
            tension: "0.4",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
        },
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
              fontColor: "#c8ccdb",
            },
            barPercentage: 0.7,
            display: true,
            gridLines: {
              color: "rgba(119, 119, 142, 0.2)",
              zeroLineColor: "rgba(119, 119, 142, 0.2)",
            },
          },

          y: {
            ticks: {
              fontColor: "#77778e",
            },
            display: true,
            gridLines: {
              color: "rgba(119, 119, 142, 0.2)",
              zeroLineColor: "rgba(119, 119, 142, 0.2)",
            },
            ticks: {
              min: 0,
              max: 1050,
              stepSize: 150,
            },
            scaleLabel: {
              display: true,
              labelString: "Thousands",
              fontColor: "transparent",
            },
          },
        },
        legend: {
          display: true,
          width: 30,
          height: 30,
          borderRadius: 50,
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
