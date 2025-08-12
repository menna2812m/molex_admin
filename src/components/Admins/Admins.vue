<template>
  <section class="mt-5">
    <div
      class="border p-3 mb-3 d-flex justify-content-between align-items-center"
      style="border-radius: 8px"
    >
      <h4 class="mb-0">المسئولين</h4>
      <button
        class="fs-15 btn-add"
        @click="ShowModel = true"
        v-if="perminlocal.includes('admins-store')"
      >
        <i class="fe fe-plus"></i>
        اضافة مسؤل جديد
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
      <div class="card custom-card border-0 mg-b-20" v-if="items.length > 0">
        <div class="card-body p-0">
          <div
            class="table-responsive border-item rounded border-bottom-0 mb-0"
          >
            <table
              class="table table-bordered text-nowrap text-md-nowrap mg-b-0"
            >
              <tr
                v-for="(item, index) in items"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td>
                  <img
                    :src="item.image"
                    alt=""
                    style="width: 40px; height: 40px; border-radius: 50%"
                  />
                </td>
                <td @click="oneadmin(item.id)" style="cursor: pointer">
                  {{ item.name }}
                </td>
                <td>
                  {{ item.phone }}
                </td>
                <td>
                  {{ item.email }}
                </td>

                <td>
                  <label
                    class="custom-switch justify-content-center w-100"
                    v-if="perminlocal.includes('admins-toggle')"
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
                <td>
                  <button
                    class="btn me-2"
                    @click="del(item.id, index, item.name)"
                    v-if="perminlocal.includes('admins-destroy')"
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
          لا يوجد مسؤولين حتي الان
        </div>
      </section>
    </section>
    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModel"
        hide-footer
        modal-class="admins-model"
      >
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">إضافة مسئول جديد</h6>
          <form @submit.prevent="add">
            <div class="row">
              <div class="col-12 mb-3">
                <label>الاسم</label>
                <input
                  type="text"
                  name=""
                  placeholder="اسم "
                  class="form-control"
                  v-model="formData.name"
                />
              </div>
              <div class="col-12 mb-3">
                <label>البريد الالكتروني </label>
                <input
                  type="email"
                  name=""
                  class="form-control"
                  v-model="formData.email"
                />
              </div>

              <div class="col-12 mb-3">
                <label>رقم الجوال</label>
                <input
                  type="number"
                  name=""
                  class="form-control"
                  v-model="formData.phone"
                />
              </div>
              <div class="col-6 mb-3">
                <label>كلمة السر </label>
                <input
                  type="password"
                  name=""
                  class="form-control"
                  v-model="formData.password"
                />
              </div>
              <div class="col-6 mb-3">
                <label>تاكيد كلمة السر </label>
                <input
                  type="password"
                  name=""
                  class="form-control"
                  v-model="formData.password_confirmation"
                />
              </div>
              <div class="col-12 mb-3">
                <label>الاذن/الادوار</label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="roles"
                  v-model="formData.role_name"
                />
              </div>
              <div class="col-12 mb-3">
                <label>الصوره</label>
                <div class="form-group">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                  />
                  <img :src="imageUrl" alt="صورة" />
                </div>
              </div>
            </div>
            <div class="text-center">
              <button class="fs-15 btn-save mx-1" type="submit">إضافة</button>
              <button class="fs-15 btn-cancel mx-1" @click="ShowModel = false">
                الغاء
              </button>
            </div>
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
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      items: [],
      ShowModel: false,
      imageUrl: null,
      formData: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        image: "",
        role_name: "",
      },
      loading: false,
      roles: [],
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    async getroles() {
      const res = await crudDataService.getAll("roles");
      this.roles = res.data.data.map((ele) => ({
        value: ele.name,
        name: ele.name,
      }));
    },
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
    async getadmins() {
      this.loading = true; // Start loading

      try {
        const res = await crudDataService.getAll("admins");
        this.items = res.data.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    oneadmin(id) {
      if (this.perminlocal.includes("admins-show")) {
        this.$router.push({ name: "OneAdmin", params: { id } });
      }
    },
    async toggleactive(id) {
      let res = await crudDataService.create(`admins/${id}/toggle`, "");
      const toast = useToast();
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    async add() {
      let res = await crudDataService
        .create(`admins`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.getadmins();
          this.ShowModel = false;
          (this.formData.name = ""),
            (this.formData.email = ""),
            (this.formData.password = ""),
            (this.formData.password_confirmation = ""),
            (this.formData.phone = ""),
            (this.formData.image = ""),
            (this.formData.role_name = ""),
            (this.imageUrl = "");
        });
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف المسؤول `,
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
            crudDataService.delete("admins", `${data}`).then(() => {
              this.items.splice(index, 1);
            });
          }
        });
    },
  },
  mounted() {
    this.getadmins();
    this.getroles();
  },
};
</script>
<style lang="scss">
.admins-model {
  &.fade .modal-dialog {
    transform: none !important;
  }
  &.show .modal-dialog {
    transform: none !important;
  }
}
</style>
<style>
.border-item.table-responsive .table > :not(caption) > * > * {
  border-bottom: none !important;
}
#add-page {
  overflow-y: auto;
}
input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}
</style>
