<template>
    <div class="card custom-card border-0 card-chart">
      <div class="card-header p-3 bg-transparent">
        <h4 class="mb-0">الساعات الاكثر طلبا </h4>
      </div>
      <div class="card-body">
        <div class="row mt-4 pt-1 pb-2">
  <canvas id="chartArea"></canvas>
           
        </div>
      </div>
     
    </div>
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
        labels: ["1-6", "7-12", "13-19", "20-24"],
        datasets: [
            {
      label: " صباحا",
      borderColor: "#a4a3fb",
      borderWidth: "1",
      backgroundColor:  (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0,0,0,160);

              gradient.addColorStop(0, '#d8d8ff');
              gradient.addColorStop(.5, '#e9e9ffb5');
              gradient.addColorStop(1, '#f5f5ff91');

              return gradient;
            },
      data: [30, 25, 20, 35],
      fill: true,
      tension: 0.4,
    },
    {
      label: "مساء",
      backgroundColor:  (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0,0,0,160);

              gradient.addColorStop(0, '#b8f0ff87');
              gradient.addColorStop(.5, '#d6ecffcf');
              gradient.addColorStop(1, '#f5f5ff91');

              return gradient;
            },
      borderColor: "#a8ecff",
      data: [20, 28, 18, 38],
      fill: true,
      tension: 0.4,
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
          intersect: false,
        },
        scales: {
          x: {
            
            ticks: {
              fontColor: "#eaf0f4",
            },
            grid: {
              color: "#eaf0f4",
            },
          },

          y: {
            ticks: {
              beginAtZero: true,
              fontColor: "#eaf0f4",
            },
            grid: {
              color: "#eaf0f4",
            },
          },
        },
        legend: {
          labels: {
            fontColor: "#fff",
          },
        },
      },
    });
    myChart;
  },
  };
  </script>
  
  <style scoped lang="scss">

  .custom-card.card-chart {
    box-shadow: 1px 3px 20px 2px #e6edf0;
    border-radius: 15px;
    .card-header {
      border-bottom: 1px solid #f7fafd;
    }
  }
  </style>
  