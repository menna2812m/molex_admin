<template>
  <div class="row mt-5 pt-5">
    <div class="col-md-6 mb-4">
      <Chartscustomer />
    </div>
    <div class="col-md-6 mb-4">
      <UproveCustomer />
    </div>
    <div class="col-md-6 mb-4">
      <Chartsday />
    </div>
    <div class="col-md-6 mb-4">
      <Chartshour />
    </div>
  </div>
</template>

<script>
import Chartscustomer from "./Chartscustomer.vue";
import UproveCustomer from "./UproveCustomer.vue";
import Chartsday from "./Chartsday.vue";
import Chartshour from "./Chartshour.vue";
export default {
  components: {
    Chartscustomer,
    UproveCustomer,
    Chartsday,
    Chartshour,
  },
};
</script>
