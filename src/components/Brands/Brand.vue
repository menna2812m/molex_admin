<template>
  <section class="mt-5 pt-5">
    <button
      class="fs-15 btn-add mb-4"
      @click="ShowModel = true"
      v-if="perminlocal.includes('brands-store')"
    >
      <i class="fe fe-plus"></i>
      ماركة جديدة
    </button>
    <section
      class="position-relative"
      style="height: 100vh; display: grid; place-items: center"
      v-if="loading"
    >
      <section class="cate"></section>
      <progress class="pure-material-progress-circular" />
    </section>
    <section v-else>
      <div
        class="row border rounded mb-2 p-2 d-flex align-items-center justify-content-between"
        v-for="(item, index) in items"
        :key="index"
        v-if="items.length > 0"
      >
        <div class="col-md-4">
          <img
            :src="item.image"
            :alt="item.image"
            style="width: 250px; border-radius: 20px"
          />
        </div>
        <div class="col-md-6">
          <h3 @click="singlebrand(item.id)">
            {{ item.name.ar }}
            <span class="fs-6 text-muted"> ({{ item.slug.ar }}) </span>
          </h3>

          <p>
            {{ item.description.ar }}
          </p>
        </div>
        <div class="col-md-2">
          <button
            class="btn me-2"
            @click="del(item.id, index, item.name)"
            v-if="perminlocal.includes('brands-destroy')"
          >
            <i class="fe fe-trash text-danger"></i>
          </button>
          <label
            class="custom-switch justify-content-center"
            v-if="perminlocal.includes('brands-toggle')"
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
          لا يوجد ماركات حتي الان
        </div>
      </section>
    </section>

    <teleport to="body">
      <b-modal
        id="add-page"
        title="اضافة ماركه جديده"
        v-model="ShowModel"
        hide-footer
      >
        <div class="mt-2">
          <form @submit.prevent="add">
            <div class="row">
              <div class="col-12 mb-3">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="اسم الماركة "
                  class="form-control"
                  v-model="formData.name.ar"
                />
              </div>
              <div class="col-12 mb-3">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="اسم الماركة "
                  class="form-control"
                  v-model="formData.name.en"
                />
              </div>
              <div class="col-12 mb-3">
                <label>وصف الماركه عربي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="وصف البراند "
                  class="form-control"
                  v-model="formData.description.ar"
                />
              </div>
              <div class="col-12 mb-3">
                <label> وصف الماركه انجليزي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="وصف البراند "
                  class="form-control"
                  v-model="formData.description.en"
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
              <button class="fs-15 btn-save mx-1" type="submit">اضافة</button>
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
import crudDataService from "../../Services/crudDataService.js";
export default {
  data() {
    return {
      ShowModel: false,
      imageUrl: null,
      items: [],
      formData: {
        name: {
          ar: "",
          en: "",
        },
        description: {
          ar: "",
          en: "",
        },
        image: "",
      },
      loading: false,
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    async toggleactive(id) {
      console.log(id);
      let res = await crudDataService.create(`brands/${id}/toggle`, "");
      const toast = useToast();
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    async add() {
      const toast = useToast();

      let res = await crudDataService
        .create(`brands`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.getAllData();
          this.ShowModel = false;
          (this.formData.name.ar = ""),
            (this.formData.name.en = ""),
            (this.formData.description.ar = ""),
            (this.formData.description.en = ""),
            (this.formData.image = ""),
            (this.imageUrl = "");
          const toast = useToast();
          toast.success(res.data.message, {
            position: "top-center",
            timeout: 5000,
          });
        })
        .catch((error) => {
          // this.ShowModel = false;

          const errorData = error?.data?.errors || {};
          console.log(error);

          const errorMessages = Object.values(errorData)
            .flat()
            .filter((msg) => typeof msg === "string");

          if (errorMessages.length > 0) {
            console.log(errorMessages[0]);

            toast.error(errorMessages[0], {
              position: "top-center",
              timeout: 5000,
            });
          } else {
            toast.error("حدث خطأ ما، يرجى المحاولة مرة أخرى.", {
              position: "top-center",
              timeout: 5000,
            });
          }
        });
    },
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
    async getAllData() {
      this.loading = true; // Start loading

      try {
        let res = await crudDataService.getAll("brands");
        this.items = res.data.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    singlebrand(id) {
      if (this.perminlocal.includes("brands-show")) {
        this.$router.push({ name: "singlebrand", params: { id } });
      }
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name.ar}" هل تريد حذف ماركة`,
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
            crudDataService.delete("brands", `${data}`).then(() => {
              this.items.splice(index, 1);
            });
          }
        });
    },
  },

  mounted() {
    this.getAllData();
  },
};
</script>
<style>
input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}
</style>
