<template>
  <Pageheader heading="Gallery" maintitle="gallery" subtitle="Pages" />
  <!-- Row -->
  <div class="row row-sm">
    <div class="col-lg-12 col-md-12">
      <div class="card custom-card">
        <div class="card-body">
          <div>
            <h6 class="main-content-label mb-1">Light Gallery</h6>
            <p class="text-muted card-sub-title">
              A customizable, modular, responsive, lightbox gallery plugin for
            </p>
          </div>

          <Basicgallery />
        </div>
      </div>
    </div>
  </div>
  <!-- End Row -->
</template>

<script>
import Basicgallery from "./Basicgallery.vue";
import Pageheader from "../../../Shared/Components/Pageheader/Pageheader.vue";
export default { components: { Basicgallery, Pageheader } };
</script>

<style></style>
