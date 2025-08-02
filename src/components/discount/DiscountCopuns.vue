<template>
  <section class="mt-5 pt-5">
    <div class="d-flex justify-content-between align-items-center">
      <Tabscopuns
        @customEvent="handleCustomEvent"
        v-if="perminlocal.includes('coupons-store')"
      />
      <!-- <Fillter /> -->
    </div>
    <section
      class="position-relative"
      style="height: 100vh; display: grid; place-items: center"
      v-if="loading"
    >
      <section class="cate"></section>
      <progress class="pure-material-progress-circular" />
    </section>
    <section v-else>
      <div class="card custom-card border-0 mg-b-20" v-if="myList.length > 0">
        <div class="card-body p-0">
          <div
            class="table-responsive border-0 rounded border-bottom-0 px-4 mb-0"
          >
            <table class="table text-nowrap text-md-nowrap mg-b-0">
              <tr>
                <td class="text-muted">عنوان الكوبون</td>
                <td class="text-muted">تاريخ بداية الكوبون</td>
                <td class="text-muted">تاريخ انتهاء الكوبون</td>
              </tr>
              <tr
                v-for="(item, index) in myList"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td class="py-4" @click="singlecopun(item.id)">
                  {{ item.code }}
                </td>
                <td>
                  {{ item.start_date }}
                </td>
                <td>
                  {{ item.end_date }}
                </td>

                <td>
                  <label
                    class="custom-switch justify-content-center w-100"
                    v-if="perminlocal.includes('coupons-toggle')"
                  >
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      :checked="item.is_active"
                      @change="toggleactive(item.id)"
                    />
                    <span class="custom-switch-description"> </span>
                    <span class="custom-switch-indicator"></span>
                  </label>
                </td>
                <td>
                  <button
                    class="btn me-2"
                    @click="del(item.id, index, item.code)"
                    v-if="perminlocal.includes('coupons-destroy')"
                  >
                    <i class="fe fe-trash text-danger"></i>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <section
        class="position-relative"
        style="height: 100vh; display: grid; place-items: center"
        v-else
      >
        <div
          style="background: #fd601f; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد كوبونات حتي الان
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { useToast } from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import Fillter from "./Fillter.vue";
import Tabscopuns from "./Tabscopuns.vue";
import crudDataService from "../../Services/crudDataService.js";
export default {
  components: {
    Multiselect,
    Fillter,
    Tabscopuns,
  },
  data() {
    return {
      ShowModel: false,
      myList: [],
      loading: false,
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    async toggleactive(id) {
      let res = await crudDataService.create(`coupons/${id}/toggle`, "");
      const toast = useToast();
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    handleCustomEvent(data) {
      this.myList = data;
    },
    async copuns() {
      this.loading = true; // Start loading
      try {
        let res = await crudDataService.getAll("coupons");
        this.myList = res.data.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    singlecopun(id) {
      if (this.perminlocal.includes("coupons-show")) {
        this.$router.push({ name: "SingleCopun", params: { id } });
      }
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف الكوبون `,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal.fire({
              title: "تم الحذف بنجاح!",
              icon: "success",
              confirmButtonText: "تم", // ✅ Custom OK button text
            });
            crudDataService.delete("coupons", `${data}`).then(() => {
              this.myList.splice(index, 1);
            });
          }
        });
    },
  },
  mounted() {
    this.copuns();
  },
};
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0px 3px 3px 0px #e6edf0;
}
.list_item:not(:last-child) {
  border-bottom: 1px solid #e8e7ff;
}
.table-responsive .table > :not(caption) > * > * {
  border-bottom: 0px solid #e8e8f7 !important;
}
</style>
