<template>
  <section class="mt-5 pt-5" v-if="items.length > 0">
    <div
      class="border p-3 mb-3 d-flex justify-content-between align-items-center"
      style="border-radius: 8px"
    >
      <h4 class="mb-0">طرق الدفع</h4>
    </div>
    <div class="card custom-card border-0 mg-b-20">
      <div class="card-body p-0">
        <div class="table-responsive border-item rounded border-bottom-0 mb-0">
          <table class="table table-bordered text-nowrap text-md-nowrap mg-b-0">
            <tr>
              <td class="text-muted">الطريقة</td>
              <td class="text-muted text-center">الحالة</td>
            </tr>
            <tr
              v-for="(item, index) in items"
              :key="index"
              class="list_item py-3 w-100 align-items-center justify-content-between"
            >
              <td style="cursor: pointer">
                {{ item.name }}
              </td>
              <td>
                <label
                  class="custom-switch justify-content-center w-100"
                  v-if="perminlocal.includes('payment_methods-toggle')"
                >
                  <input
                    type="checkbox"
                    name="custom-switch-checkbox"
                    class="custom-switch-input border-bottom-0"
                    :checked="item.is_active"
                    @change="toggleactive(item.id)"
                  />
                  <span class="custom-switch-description"> </span>
                  <span class="custom-switch-indicator"></span>
                </label>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
  <section
    class="position-relative"
    style="height: 100vh; display: grid; place-items: center"
    v-else
  >
    <section class="cate"></section>
    <progress class="pure-material-progress-circular" />
  </section>
</template>

<script>
import { useToast } from "vue-toastification";
import crudDataService from "../../Services/crudDataService.js";
export default {
  data() {
    return {
      items: [],
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    async getpayment() {
      const res = await crudDataService.getAll("payment_methods");
      this.items = res.data.data.data;
    },
    async toggleactive(id) {
      let res = await crudDataService.create(
        `payment_methods/${id}/toggle`,
        ""
      );
      const toast = useToast();
      if (res.status == 200) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
  },
  mounted() {
    this.getpayment();
  },
};
</script>
<style>
.border-item.table-responsive .table > :not(caption) > * > * {
  border-bottom: none !important;
}
</style>
