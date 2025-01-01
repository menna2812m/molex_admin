<template>
  <!-- Row -->
  <Pageheader heading=" Apexcharts" maintitle="Charts" subtitle="Apexcharts" />
  <div class="row row-sm">
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Area Chart</h6>
            <p class="text-muted card-sub-title">
              Below is the basic area chart example.
            </p>
          </div>
          <Areachart class="morris-wrapper-demo" id="vuechart" />
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Line Chart</h6>
            <p class="text-muted card-sub-title">
              Below is the basic line chart example.
            </p>
          </div>
          <Linechart class="morris-wrapper-demo" id="Linechart" />
        </div>
      </div>
    </div>
  </div>
  <!-- End Row -->

  <!-- Row -->
  <div class="row row-sm">
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Colomn Chart</h6>
            <p class="text-muted card-sub-title">
              Below is the Colomn Chart chart example.
            </p>
          </div>
          <Columnbar class="morris-wrapper-demo" />
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Bar Charts</h6>
            <p class="text-muted card-sub-title">Below is the basic Bar chart example.</p>
          </div>
          <Barchart class="morris-wrapper-demo" />
        </div>
      </div>
    </div>
  </div>
  <!-- End Row -->

  <!-- Row -->
  <div class="row row-sm">
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Timeline Chart</h6>
            <p class="text-muted card-sub-title">
              Below is the basic Timeline Chart example.
            </p>
          </div>
          <Mixedcharts />
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Candlestick Chart</h6>
            <p class="text-muted card-sub-title">
              Below is the basic bar Candlestick chart example.
            </p>
          </div>
          <Candlesickchart />
        </div>
      </div>
    </div>
  </div>
  <!-- End Row -->
</template>

<script>
import Pageheader from "../../../Shared/Components/Pageheader/Pageheader.vue";
import Areachart from "./Areachart.vue";
import Linechart from "./Linechart.vue";
import Columnbar from "./Columnbar.vue";
import Barchart from "./Barchart.vue";
import Timelinechart from "./Mixedcharts.vue";
import Candlesickchart from "./Candlestickchart.vue";
import Mixedcharts from "./Mixedcharts.vue";
export default {
  data() {
    return {
      heading: " Apexcharts",
      maintitle: "Charts",
      subtitle: "Apexcharts",
    };
  },
  components: {
    Pageheader,
    Areachart,
    Linechart,
    Columnbar,
    Barchart,
    Timelinechart,
    Candlesickchart,
    Mixedcharts,
  },
};
</script>

<style></style>
