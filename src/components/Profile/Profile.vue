<template>
  <section class="mt-5 pt-5">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <h4 class="mb-0">الملف الشخصي</h4>
          </div>
          <div class="row align-items-center justify-content-center pt-3">
            <div class="col-12">
              <div class="d-flex align-items-center m-2 p-2 border rounded">
                <i class="fe fe-user mx-1"></i>
                <p class="mb-0">
                  {{ items.name ? items.name : "لايوجد" }}
                </p>
              </div>

              <div class="d-flex align-items-center m-2 p-2 border rounded">
                <i class="fe fe-phone mx-1"></i>
                <p class="mb-0">
                  {{ items.phone ? items.phone : "لايوجد" }}
          </p>
           </div>
           <div class="d-flex align-items-center m-2 p-2 border rounded">
                <i class="fe fe-mail mx-1"></i>
                <p class="mb-0">
                  {{ items.email ? items.email : "لايوجد" }}
          </p>
           </div>
            </div>
          </div>
        </div>
  </section>
</template>

<script>
import crudDataService from "../../Services/crudDataService.js";
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getprofile() {
      const res = await crudDataService.getAll("profile");
      this.items = res.data.data;
    },
  },
  mounted() {
    this.getprofile();
  },
};
</script>
