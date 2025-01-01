<template>
  <div class="card custom-card border-0 card-chart">
    <div class="card-header p-3 bg-transparent">
      <h4 class="mb-0">العملاء</h4>
    </div>
    <div class="card-body py-0">
      <div class="d-flex justify-content-between">
        <p>
          <span style="color: #fe91ba" class="fs-5">
            {{ myList.total }}
          </span>
          عميل
        </p>
        <!-- <p style="color: #d1f1c0" class="fs-5">20%</p> -->
      </div>
      <div class="row">
        <canvas id="chartDonut"></canvas>
      </div>
      <div class="d-flex justify-content-center py-3">
        <div class="text-center px-2 text-muted">
          قام بالشراء
          <i class="typcn typcn-media-record payed"></i>
          <span class="d-block">
            {{ myList.total_buyers }}
          </span>
        </div>
        <div class="text-center px-2 text-muted">
          لم يشتري بعد
          <i class="typcn typcn-media-record notpayed"></i>
          <span class="d-block">
            {{ myList.total_not_buyer_yet }}
          </span>
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
  props: {
    myList: Array,
  },
  components: {},
  data() {
    return {
      activity: activity,
    };
  },
  mounted() {
        var ctx = document.getElementById("chartDonut").getContext("2d");
        const data = {
          datasets: [
            {
              data: [this.myList.total_buyers, this.myList.total_not_buyer_yet],
              backgroundColor: ["#a3a1fb", "#edecfe"],
            },
          ],
        };

        const myChart = new Chart(ctx, {
          type: "doughnut",
          data: data,
          options: {
            responsive: true,

            cutout: "85%",
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

        myChart;
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
.payed {
  color: #a3a1fb;
}
.notpayed {
  color: #edecfe;
}
</style>
<style>
#chartDonut {
  height: 200px !important;
  width: 220px !important;
  margin: 0 auto;
}
</style>
