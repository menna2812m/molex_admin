<template>
  <section class="mt-5">
    <div class="pos-relative">
      <button
        @click="ShowModel = true"
        class="btn-add me-0 mb-4"
        v-if="perminlocal.includes('special-offer-store')"
      >
        <i class="fe fe-plus"></i>
        اشعار جديد
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
          <div class="table-responsive border-0 rounded border-bottom-0 mb-0">
            <table
              class="table table-bordered text-nowrap text-md-nowrap mg-b-0"
            >
              <tr>
                <td class="text-muted">صورة الاشعار</td>
                <td class="text-muted">عنوان الاشعار</td>
                <td class="text-muted">تفاصيل الاشعار</td>
              </tr>
              <tr
                v-for="(item, index) in myList"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td>
                  <img
                    :src="item.image"
                    alt=""
                    width="150"
                    height="150"
                    class="rounded-circle"
                  />
                </td>
                <td>
                  {{ item.title.ar }}
                </td>
                <td>
                  {{ item.body.ar }}
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
          لا يوجد اشعارات حتي الان
        </div>
      </section>
    </section>
    <teleport to="body">
      <b-modal id="add" v-model="ShowModel" hide-footer title="اضافة اشعار">
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="add">
            <div class="row">
              <div class="col-md-6">
                <div class="mt-1">
                  <label for=""
                    >العنوان عربي <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('title.ar') }"
                    v-model="formData.title.ar"
                    @input="clearFieldError('title.ar')"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="hasFieldError('title.ar')"
                  >
                    {{ getFieldError("title.ar") }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label for=""
                    >العنوان انجليزي <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('title.en') }"
                    v-model="formData.title.en"
                    @input="clearFieldError('title.en')"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="hasFieldError('title.en')"
                  >
                    {{ getFieldError("title.en") }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label for=""
                    >التفاصيل عربي <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('body.ar') }"
                    v-model="formData.body.ar"
                    @input="clearFieldError('body.ar')"
                  />
                  <div class="invalid-feedback" v-if="hasFieldError('body.ar')">
                    {{ getFieldError("body.ar") }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label for=""
                    >التفاصيل انجليزي <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('body.en') }"
                    v-model="formData.body.en"
                    @input="clearFieldError('body.en')"
                  />
                  <div class="invalid-feedback" v-if="hasFieldError('body.en')">
                    {{ getFieldError("body.en") }}
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mt-1">
                  <label for=""
                    >الصورة <span class="text-danger">*</span></label
                  >
                  <input
                    type="file"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('image') }"
                    @change="onFileSelected($event)"
                    accept=".pdf, image/jpeg, image/png"
                  />
                  <div class="invalid-feedback" v-if="hasFieldError('image')">
                    {{ getFieldError("image") }}
                  </div>
                  <img
                    :src="imgurl"
                    style="width: 180px; height: 180px; object-fit: fill"
                    class="m-1"
                    v-if="imgurl.length > 0"
                  />
                </div>
              </div>
            </div>
            <button
              class="btn btn-primary m-auto mt-3 d-block"
              type="submit"
              :disabled="submitting"
            >
              <span
                v-if="submitting"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              {{ submitting ? "جاري الإضافة..." : "اضافة" }}
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>

    <b-pagination
      v-model="page"
      :total-rows="last"
      :per-page="1"
      @click="paginag(page)"
      class="justify-content-end"
    ></b-pagination>
  </section>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";
import { useToast } from "vue-toastification";

export default {
  components: {
    Multiselect,
  },
  mixins: [FormErrorMixin],
  data() {
    return {
      page: 1,
      last: 2,
      ShowModel: false,
      myList: [],
      id: null,
      imgurl: [],
      submitting: false,
      formData: {
        title: {
          ar: "",
          en: "",
        },
        body: {
          ar: "",
          en: "",
        },
        image: "",
      },
      loading: false,
      perminlocal: localStorage.getItem("permissions"),
      // Define fields to watch for auto error clearing
      watchedFields: [
        "formData.title.ar",
        "formData.title.en",
        "formData.body.ar",
        "formData.body.en",
      ],
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      this.clearFieldError("image"); // Clear error when file is selected

      const reader = new FileReader();
      reader.onload = () => {
        this.imgurl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },

    async notification() {
      this.loading = true;
      try {
        let res = await crudDataService.getAll("special-offer");
        this.myList = res.data.data.data;
        this.last = res.data.data.last_page;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.toast.error("فشل في تحميل البيانات");
      } finally {
        this.loading = false;
      }
    },

    async paginag(p) {
      console.log(p);
      try {
        let res = await crudDataService.getAll(
          `special-offer?page=${this.page}`
        );
        this.myList = res.data.data.data;
      } catch (error) {
        console.error("Pagination error:", error);
        this.toast.error("فشل في تحميل الصفحة");
      }
    },

    validateFormData() {
      const rules = {
        "title.ar": {
          required: true,
          label: "العنوان بالعربية",
          minLength: 3,
        },
        "title.en": {
          required: true,
          label: "العنوان بالإنجليزية",
          minLength: 3,
        },
        "body.ar": {
          required: true,
          label: "التفاصيل بالعربية",
          minLength: 10,
        },
        "body.en": {
          required: true,
          label: "التفاصيل بالإنجليزية",
          minLength: 10,
        },
        image: {
          required: true,
          label: "الصورة",
          maxSize: 2048, // 2MB
        },
      };

      return this.validateForm(rules);
    },

    resetForm() {
      this.formData = {
        title: { ar: "", en: "" },
        body: { ar: "", en: "" },
        image: "",
      };
      this.imgurl = "";
      this.clearAllErrors();
    },

    async add() {
      // Clear previous errors
      this.clearAllErrors();

      // Client-side validation
      if (!this.validateFormData()) {
        return;
      }

      this.submitting = true;

      try {
        await crudDataService.create(`special-offer`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Success
        this.toast.success("تم إضافة الإشعار بنجاح");
        this.notification(); // Refresh the list
        this.ShowModel = false;
        this.resetForm();
      } catch (error) {
        console.error("Add notification error:", error);
        this.handleApiErrors(error, this.toast);
      } finally {
        this.submitting = false;
      }
    },
  },

  watch: {
    ShowModel(newVal) {
      if (newVal) {
        // Clear errors when modal opens
        this.clearAllErrors();
      } else {
        // Reset form when modal closes
        this.resetForm();
      }
    },
  },

  mounted() {
    this.notification();
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

// Loading button styling
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>
