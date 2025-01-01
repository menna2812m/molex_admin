<template>
  <div class="page-header">
    <div>
      <h2 class="main-content-title tx-24 mg-b-5">{{ heading }}</h2>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;"></a>{{ maintitle }}</li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ subtitle }}
        </li>
      </ol>
    </div>
    <!-- <div class="d-flex">
      <div class="justify-content-center">
        <button type="button" class="btn btn-white btn-icon-text my-2 me-2">
          <i class="fe fe-download me-2"></i> Import
        </button>
        <button type="button" class="btn btn-white btn-icon-text my-2 me-2">
          <i class="fe fe-filter me-2"></i> Filter
        </button>
        <button type="button" class="btn btn-primary my-2 btn-icon-text">
          <i class="fe fe-download-cloud me-2"></i> Download Report
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Page-header",
  props: ["heading", "maintitle", "subtitle"],
};
</script>

<style></style>
