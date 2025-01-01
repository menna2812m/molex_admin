<template>
    <div class="card custom-card border-0 card-chart">
          <div class="card-header p-3 bg-transparent">
           
            <h4 class="mb-0">رضا العملاء </h4>
          </div>
          <div class="card-body" >
              <div class="d-flex justify-content-between">
                
              <!-- <p>
                <span style="color: #fe91ba" class="fs-5">
                  80%
                  </span>
                راضين
              </p> -->
              <!-- <p style="color: #d1f1c0" class="fs-5">20%</p> -->
            </div>
            <div class="row py-1">
              <div class="col-md-6">
                <div v-for="(item , i ) in myList.satisfaction" :key="i">
                  <div class="fs-6 py-2 text-muted">
                      <i class="fas fa-circle-notch" :class="'star'+item.rating"></i>
                      
                      
                      {{ item.count }} تقييم {{ item.rating }} نجوم
                  </div>
                </div>
                                
              </div>
              <div class="col-md-6">
                  <canvas id="chart"></canvas>
              </div>
            </div>
          </div>
      
        </div>
  </template>
  
  <script>
import activity from "../../assets/img/activity.png";
  import Chart from "chart.js/auto";
  export default {
    name: "Donut",
    props:{
    myList:Array,
   
  },
    components: {
      
    },
    data() {
      return {
      activity: activity,
      };
    },
    mounted() {
        const counts = this.myList.satisfaction.map(item => item.count);
   var ctx2 = document.getElementById("chart");
  
      const myChar = new Chart(ctx2, {
        type: "doughnut",
        data:   
        {
          datasets: [
          {
            data: counts,
            backgroundColor: [
              "#ff8373",
              "#ffda83",
              "#55d8fe",
              "#a3a0fb",
              "#a4dea4",
            ],
          },
        ],
          },
        
        options: {
          legend: {
            display: false,
          },
          layout: {
            padding: 0,
          },
          hover: { mode: null },
          plugins: {
            tooltip: {
              enabled: false, // <-- this option disables tooltips
            },
          },
        },
      });
      myChar;
    }
      
   
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
 
  .star1{
    color: #ff8373;
  }
  .star2{
    color: #ffda83;

  }
  .star3{
    color: #55d8fe;

  }
  .star4{
      color: #a3a0fb;
  }
  .star5{
    color: #a4dea4;
  }
  </style>
 
  