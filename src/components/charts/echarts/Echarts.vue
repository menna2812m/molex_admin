<template>
  <Pageheader heading=" Echarts" maintitle="Charts" subtitle="Echarts" />
  <!-- Row -->
  <div class="row row-sm">
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card overflow-hidden">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Line Chart</h6>
            <p class="text-muted card-sub-title">Below is the basic Bar chart example.</p>
          </div>
          <div>
            <Linechart id="echart1" class="echart-height" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card overflow-hidden">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Combination line & Bar Chart</h6>
            <p class="text-muted card-sub-title">
              Below is the basic combination line & bar chart example.
            </p>
          </div>
          <div>
            <Combinelineandbarcharts id="echart2" class="echart-height" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Row -->

  <!-- Row -->
  <div class="row row-sm">
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card overflow-hidden">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Horizonatal Line Chart</h6>
            <p class="text-muted card-sub-title">
              Below is the basic horizontal line chart example.
            </p>
          </div>
          <div>
            <Horizonatallinechart id="echart3" class="echart-height" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card overflow-hidden">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">
              Horizonatal Combination line & Bar Chart
            </h6>
            <p class="text-muted card-sub-title">
              Below is the basic horizontal combination line & bar chart example.
            </p>
          </div>
          <div>
            <Horizontalcombinationlineandbarchart id="echart4" class="echart-height" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Row -->

  <!-- Row -->
  <div class="row row-sm">
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card overflow-hidden">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Stacked Bar Chart</h6>
            <p class="text-muted card-sub-title">
              Below is the basic Stacked Bar chart example.
            </p>
          </div>
          <div>
            <Stackedbar id="echart5" class="echart-height" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-12">
      <div class="card custom-card overflow-hidden">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Horizonatal Stacked Bar Chart</h6>
            <p class="text-muted card-sub-title">
              Below is the basic horizontal stacked bar chart example.
            </p>
          </div>
          <div>
            <Horizontalstackedbar id="echart6" class="echart-height" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Row -->
</template>

<script>
import Linechart from "./Linechart.vue";
import Pageheader from "../../../Shared/Components/Pageheader/Pageheader.vue";
import Combinelineandbarcharts from "./Combinelineandbarcharts.vue";
import Horizonatallinechart from "./Horizonatallinechart.vue";
import Horizontalcombinationlineandbarchart from "./Horizontalcombinationlineandbarchart.vue";
import Stackedbar from "./Stackedbar.vue";
import Horizontalstackedbar from "./horizontalstackedbar.vue";
export default {
  components: {
    Linechart,
    Pageheader,
    Combinelineandbarcharts,
    Horizonatallinechart,
    Horizontalcombinationlineandbarchart,
    Stackedbar,
    Horizontalstackedbar,
  },
  data() {
    return {
      heading: " Echarts",
      maintitle: "Charts",
      subtitle: "Echarts",
    };
  },
};
</script>

<style></style>
