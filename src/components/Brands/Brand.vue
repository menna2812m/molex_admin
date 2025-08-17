<template>
  <section class="mt-5 pt-5">
    <button
      class="fs-15 btn-add mb-4"
      @click="openAddModal"
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
        class="row border rounded mb-2 p-2 d-flex align-items-center justify-content-between cursor-pointer"
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
      <b-pagination
        v-model="page"
        :total-rows="last"
        :per-page="1"
        @click="paginag(page)"
        class="justify-content-end mt-4"
      ></b-pagination>
    </section>

    <!-- Add Brand Modal -->
    <teleport to="body">
      <b-modal
        id="add-page"
        title="اضافة ماركه جديده"
        v-model="ShowModel"
        hide-footer
        modal-class="brand-model"
        @hidden="onModalHidden"
      >
        <div class="mt-2">
          <form @submit.prevent="add" ref="brandForm">
            <div class="row">
              <!-- Arabic Name -->
              <div class="col-12 mb-3">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  placeholder="اسم الماركة"
                  class="form-control"
                  v-model="formData.name.ar"
                  :class="{
                    'is-invalid':
                      hasFieldError('name.ar') || hasFieldError('name'),
                  }"
                  @input="clearFieldError('name.ar')"
                />
                <div
                  v-if="hasFieldError('name.ar') || hasFieldError('name')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("name.ar") || getFieldError("name") }}
                </div>
              </div>

              <!-- English Name -->
              <div class="col-12 mb-3">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  placeholder="اسم الماركة"
                  class="form-control"
                  v-model="formData.name.en"
                  :class="{
                    'is-invalid':
                      hasFieldError('name.en') || hasFieldError('name'),
                  }"
                  @input="clearFieldError('name.en')"
                />
                <div
                  v-if="hasFieldError('name.en') || hasFieldError('name')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("name.en") || getFieldError("name") }}
                </div>
              </div>

              <!-- Arabic Description -->
              <div class="col-12 mb-3">
                <label>وصف الماركه عربي</label>
                <input
                  type="text"
                  placeholder="وصف البراند"
                  class="form-control"
                  v-model="formData.description.ar"
                  :class="{
                    'is-invalid':
                      hasFieldError('description.ar') ||
                      hasFieldError('description'),
                  }"
                  @input="clearFieldError('description.ar')"
                />
                <div
                  v-if="
                    hasFieldError('description.ar') ||
                    hasFieldError('description')
                  "
                  class="invalid-feedback"
                >
                  {{
                    getFieldError("description.ar") ||
                    getFieldError("description")
                  }}
                </div>
              </div>

              <!-- English Description -->
              <div class="col-12 mb-3">
                <label>وصف الماركه انجليزي</label>
                <input
                  type="text"
                  placeholder="وصف البراند"
                  class="form-control"
                  v-model="formData.description.en"
                  :class="{
                    'is-invalid':
                      hasFieldError('description.en') ||
                      hasFieldError('description'),
                  }"
                  @input="clearFieldError('description.en')"
                />
                <div
                  v-if="
                    hasFieldError('description.en') ||
                    hasFieldError('description')
                  "
                  class="invalid-feedback"
                >
                  {{
                    getFieldError("description.en") ||
                    getFieldError("description")
                  }}
                </div>
              </div>

              <!-- Image Upload -->
              <div class="col-12 mb-3">
                <label>الصوره</label>
                <div class="form-group">
                  <input
                    ref="fileInput"
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('image') }"
                  />
                  <div v-if="hasFieldError('image')" class="invalid-feedback">
                    {{ getFieldError("image") }}
                  </div>
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    alt="صورة"
                    style="
                      width: 200px;
                      height: 200px;
                      object-fit: cover;
                      margin-top: 10px;
                      border-radius: 8px;
                    "
                  />
                </div>
              </div>
            </div>

            <div class="text-center">
              <button
                class="fs-15 btn-save mx-1"
                type="submit"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">جاري الإضافة...</span>
                <span v-else>اضافة</span>
              </button>
              <button
                class="fs-15 btn-cancel mx-1"
                type="button"
                @click="ShowModel = false"
                :disabled="isSubmitting"
              >
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
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";

export default {
  mixins: [FormErrorMixin],

  data() {
    return {
      ShowModel: false,
      imageUrl: null,
      items: [],
      isSubmitting: false,
      page: 1,
      last: 2,
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

      // Define fields to watch for automatic error clearing
      watchedFields: [
        "formData.name.ar",
        "formData.name.en",
        "formData.description.ar",
        "formData.description.en",
      ],
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    async paginag(p) {
      let res = await crudDataService.getAll(`brands?page=${this.page}`);
      this.items = res.data.data.data;
    },
    // Open modal and reset form
    openAddModal() {
      this.resetFormData();
      this.ShowModel = true;
    },

    // Reset form when modal is hidden
    onModalHidden() {
      this.resetFormData();
      this.resetFileInput();
    },

    // Reset file input
    resetFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },

    // Reset all form data
    resetFormData() {
      this.formData = {
        name: { ar: "", en: "" },
        description: { ar: "", en: "" },
        image: "",
      };
      this.imageUrl = null;
      this.clearAllErrors();
    },

    // Validation rules
    getValidationRules() {
      return {
        "name.ar": { required: true, label: "الاسم بالعربية" },
        "name.en": { required: true, label: "الاسم بالإنجليزية" },
        "description.ar": { required: true, label: "الوصف بالعربية" },
        "description.en": { required: true, label: "الوصف بالإنجليزية" },
        image: { required: true, maxSize: 2048, label: "الصورة" },
      };
    },

    async toggleactive(id) {
      try {
        let res = await crudDataService.create(`brands/${id}/toggle`, "");
        if (res.data.success) {
          this.toast.success(res.data.message, {
            position: "top-center",
            timeout: 5000,
          });
          // Refresh the list to update the toggle state
          this.getAllData();
        }
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    async add() {
      // Clear previous errors
      this.clearAllErrors();

      // Validate form
      if (!this.validateForm(this.getValidationRules())) {
        return;
      }

      this.isSubmitting = true;

      try {
        const res = await crudDataService.create(`brands`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Success
        this.getAllData();
        this.ShowModel = false;
        this.resetFormData();

        this.toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      } finally {
        this.isSubmitting = false;
      }
    },

    onFileSelected(event) {
      // Clear any existing file errors
      this.clearFieldError("image");

      const file = event.target.files[0];
      if (!file) return;

      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        this.setFieldErrors({
          image: ["حجم الملف يجب أن يكون أقل من 2 ميجابايت"],
        });
        return;
      }

      this.formData.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async getAllData() {
      this.loading = true;

      try {
        let res = await crudDataService.getAll("brands");
        this.items = res.data.data.data;
        this.last = res.data.data.last_page;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.toast.error("فشل في جلب البيانات", {
          position: "top-center",
          timeout: 5000,
        });
      } finally {
        this.loading = false;
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
          if (result.isConfirmed) {
            crudDataService
              .delete("brands", `${data}`)
              .then(() => {
                this.items.splice(index, 1);
                this.$swal.fire({
                  title: "تم الحذف بنجاح!",
                  icon: "success",
                  confirmButtonText: "تم",
                });
              })
              .catch((error) => {
                this.handleApiErrors(error, this.toast);
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
