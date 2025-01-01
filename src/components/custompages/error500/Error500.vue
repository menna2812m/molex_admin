<template>
  <div class="error-bg signpages text-center row">
    <div class="col-md-12 my-auto">
      <div class="construction1 text-center">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <h1 class="tx-140 mb-0">500</h1>
          </div>
          <div class="col-lg-12">
            <h1>Oops.The Page you are looking for doesn't exit..</h1>
            <h6 class="tx-15 mt-3 mb-4 text-muted">
              You may have mistyped the address or the page may have moved. Try searching
              below.
            </h6>
            <router-link  :to="`${url}admin`"
          
              class="btn ripple btn-success text-center"
            >
              Back to Home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      url: import.meta.env.BASE_URL,
    };
  },
};
</script>

<style></style>
