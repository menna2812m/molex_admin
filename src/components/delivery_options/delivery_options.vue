<template>
  <section class="mt-5 pt-5">
    <div class="pos-relative">
      <button
        @click="ShowModel = true"
        class="btn-add me-0 mb-4"
        v-if="perminlocal.includes('delivery_options-store')"
      >
        <i class="fe fe-plus"></i>
        خيار توصيل جديد
      </button>
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
            class="table-responsive border-0 rounded border-bottom-0 mb-0"
          >
            <table class="table  table-bordered text-nowrap text-md-nowrap mg-b-0">
              <tr>
                <td class="text-muted">الاسم</td>
                <td class="text-muted">الوصف </td>
                <td class="text-muted">السعر </td>
                <td class="text-muted">التفعيل</td>
              </tr>
              <tr
                v-for="(item, index) in myList"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td>
                  {{ item.name?.ar }}
                </td>
                <td>
                  {{ item.description?.ar }}
                </td>
                <td>
                  {{ item.price }}
                </td>

                <td>
                  <label
                    class="custom-switch justify-content-start w-100"
                    v-if="perminlocal.includes('delivery_options-toggle')"
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
                    @click="edit(item)"
                    v-if="perminlocal.includes('delivery_options-update')"
                  >
                    <i class="fe fe-edit-2 text-info"></i>
                  </button>
                  <button
                    class="btn me-2"
                    @click="del(item.id, index, item.name.ar)"
                    v-if="perminlocal.includes('delivery_options-destroy')"
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
          style="background: #e66239; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد خيار توصيل حتي الان
        </div>
      </section>
    </section>

    <teleport to="body">
      <b-modal id="add" v-model="ShowModel" hide-footer title="اضافة توصيل">
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="add">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>  الاسم عربي </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.name.ar"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>  الاسم انجليزي </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.name.en"
                  />
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الوصف عربي  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.description.ar"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الوصف انجليزي  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.description.en"
                  />
                </div>
              </div>
              <div class="col-12 mb-3">
                <label>السعر  </label>
                <input
                  type="number"
                  name=""
                  class="form-control"
                  v-model="formData.price"
                />
              </div>
          
           
            </div>
            <button class="btn btn-primary m-auto mt-3 d-block" type="submit">
              اضافة
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
    <teleport to="body">
      <b-modal
        id="add"
        v-model="ShowEditModel"
        hide-footer
        title="تعديل خيار التوصيل"
      >
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم عربي  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.name.ar"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم انجليزي  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.name.en"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الوصف عربي  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.description.ar"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الوصف انجليزي  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.description.en"
                  />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="mt-1">
                  <label>السعر  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.price"
                  />
                </div>
              </div>
            
            </div>
            <button class="btn btn-primary m-auto mt-3 d-block" type="submit">
              تعديل
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import { useToast } from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import axios from "axios";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      changeedit: true,
      ShowModel: false,
      ShowEditModel: false,
      myList: [],
      id: null,
      loading: false,
      formData: {
        name:{ar:'',en:''},
        price: "",
        description: {ar:'',en:''},
      },
      EditData: {
        name:{ar:'',en:''},
        price: "",
        description:{ar:'',en:''},
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    async toggleactive(id) {
      let res = await crudDataService.create(
        `delivery_options/${id}/toggle`,
        ""
      );
      const toast = useToast();
      if (res.data.status) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    async edit(data) {
      this.id = data.id;
      this.ShowEditModel = true;
      this.EditData.name.ar = data.name.ar;
      this.EditData.name.en = data.name.en;
      this.EditData.description.ar = data.description.ar;
      this.EditData.description.en = data.description.en;
      this.EditData.price = data.price;
    },
    async update() {
      let res = await crudDataService.create(
        `delivery_options/${this.id}?_method=put`,
        this.EditData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(this.EditData);
      this.ShowEditModel = false;
      this.delivery_options();
    },
    async delivery_options() {
      this.loading = true; // Start loading

      try {
        let res = await crudDataService.getAll("delivery_options");
        this.myList = res.data.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    async add() {
      console.log(this.formData);

      let res = await crudDataService
        .create(`delivery_options`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.delivery_options();
          this.ShowModel = false;
          (this.formData.name = ""),
            (this.formData.description = ""),
            (this.formData.price = "")
        });
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف خيار التوصيل `,
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
            crudDataService.delete("delivery_options", `${data}`).then(() => {
              this.myList.splice(index, 1);
            });
          }
        });
    },
  },
  mounted() {
    this.delivery_options();
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
