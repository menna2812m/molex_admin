<template>
  <section class="mt-5 pt-5">
    <div class="pos-relative">
      <button
        @click="ShowModel = true"
        class="btn-add me-0 mb-4"
        v-if="perminlocal.includes('sliders-store')"
      >
        <i class="fe fe-plus"></i>
        اسلايد جديد
      </button>
    </div>

    <!-- Loading State -->
    <section
      class="position-relative"
      style="height: 100vh; display: grid; place-items: center"
      v-if="loading"
    >
      <section class="cate"></section>
      <progress class="pure-material-progress-circular" />
    </section>

    <!-- Sliders List -->
    <section v-else>
      <div class="card custom-card border-0 mg-b-20" v-if="myList.length > 0">
        <div class="card-body p-0">
          <div class="table-responsive border-0 rounded border-bottom-0 mb-0">
            <table
              class="table table-bordered text-nowrap text-md-nowrap mg-b-0"
            >
              <thead>
                <tr>
                  <th class="text-muted">صورة الاسلايد</th>
                  <th class="text-muted">عنوان الاسلايد</th>
                  <th class="text-muted">الرابط</th>
                  <th class="text-muted">التفعيل</th>
                  <th class="text-muted">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in myList"
                  :key="index"
                  class="list_item py-3 w-100 align-items-center justify-content-between"
                >
                  <td>
                    <img
                      :src="item.image"
                      alt="slider image"
                      width="150"
                      height="100"
                      style="object-fit: cover; border-radius: 8px"
                      class="img-thumbnail"
                    />
                  </td>

                  <td>
                    <div class="slider-title">
                      <h6 class="mb-1 fw-semibold">{{ item.title.ar }}</h6>
                      <small class="text-muted">{{ item.title.en }}</small>
                    </div>
                  </td>

                  <td>
                    <span v-if="item.link" class="link-preview">
                      <a :href="item.link" target="_blank" class="text-primary">
                        {{
                          item.link.length > 30
                            ? item.link.substring(0, 30) + "..."
                            : item.link
                        }}
                      </a>
                    </span>
                    <span v-else class="text-muted">-</span>
                  </td>

                  <td>
                    <label
                      class="custom-switch justify-content-start w-100"
                      v-if="perminlocal.includes('sliders-toggle')"
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
                    <span
                      v-else
                      class="badge"
                      :class="
                        item.is_active ? 'badge-success' : 'badge-secondary'
                      "
                    >
                      {{ item.is_active ? "مفعل" : "معطل" }}
                    </span>
                  </td>

                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-sm btn-outline-info"
                        @click="edit(item)"
                        v-if="perminlocal.includes('sliders-update')"
                      >
                        <i class="fe fe-edit-2"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger ms-1"
                        @click="del(item.id, index, item.title)"
                        v-if="perminlocal.includes('sliders-destroy')"
                      >
                        <i class="fe fe-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <section
        class="position-relative"
        style="height: 50vh; display: grid; place-items: center"
        v-else
      >
        <div class="text-center py-5">
          <i
            class="fe fe-image"
            style="font-size: 4rem; color: #fd601f; opacity: 0.6"
          ></i>
          <h4 class="mt-3 mb-2" style="color: #fd601f">
            لا يوجد اسلايدر حتي الان
          </h4>
          <p class="text-muted">قم بإضافة أول اسلايد لبدء استخدام هذه الميزة</p>
        </div>
      </section>
    </section>

    <!-- Add Slider Modal -->
    <teleport to="body">
      <b-modal
        id="add"
        v-model="ShowModel"
        hide-footer
        title="اضافة اسلايد"
        modal-class="sliders-model"
      >
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="add">
            <div class="row">
              <!-- Arabic Title -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label>الاسم عربي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.title.ar"
                    :class="{ 'is-invalid': hasFieldError('title.ar') }"
                    @input="clearFieldError('title.ar')"
                    placeholder="عنوان الاسلايد بالعربية"
                  />
                  <div
                    v-if="hasFieldError('title.ar')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("title.ar") }}
                  </div>
                </div>
              </div>

              <!-- English Title -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label>الاسم انجليزي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.title.en"
                    :class="{ 'is-invalid': hasFieldError('title.en') }"
                    @input="clearFieldError('title.en')"
                    placeholder="عنوان الاسلايد بالإنجليزية"
                  />
                  <div
                    v-if="hasFieldError('title.en')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("title.en") }}
                  </div>
                </div>
              </div>

              <!-- Link -->
              <div class="col-md-12">
                <div class="mt-1">
                  <label>اللينك</label>
                  <input
                    type="url"
                    class="form-control"
                    v-model="formData.link"
                    :class="{ 'is-invalid': hasFieldError('link') }"
                    @input="clearFieldError('link')"
                    placeholder="https://example.com"
                  />
                  <div v-if="hasFieldError('link')" class="invalid-feedback">
                    {{ getFieldError("link") }}
                  </div>
                </div>
              </div>

              <!-- Image Upload -->
              <div class="col-md-12">
                <div class="mt-1">
                  <label>الصورة</label>
                  <input
                    type="file"
                    class="form-control"
                    @change="onFileSelected($event)"
                    accept="image/jpeg, image/png, image/jpg"
                    :class="{ 'is-invalid': hasFieldError('image') }"
                  />
                  <div v-if="hasFieldError('image')" class="invalid-feedback">
                    {{ getFieldError("image") }}
                  </div>

                  <!-- Image Preview -->
                  <div v-if="imgurl && imgurl.length > 0" class="mt-2">
                    <img
                      :src="imgurl"
                      style="width: 200px; height: 120px; object-fit: cover"
                      class="img-thumbnail"
                      alt="معاينة الصورة"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              class="btn btn-primary m-auto mt-3 d-block"
              type="submit"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">جاري الإضافة...</span>
              <span v-else>اضافة</span>
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>

    <!-- Edit Slider Modal -->
    <teleport to="body">
      <b-modal
        id="edit"
        v-model="ShowEditModel"
        hide-footer
        title="تعديل اسلايد"
        modal-class="sliders-model"
      >
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="update">
            <div class="row">
              <!-- Arabic Title -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label>الاسم عربي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.title.ar"
                    :class="{ 'is-invalid': hasFieldError('title.ar') }"
                    @input="clearFieldError('title.ar')"
                    placeholder="عنوان الاسلايد بالعربية"
                  />
                  <div
                    v-if="hasFieldError('title.ar')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("title.ar") }}
                  </div>
                </div>
              </div>

              <!-- English Title -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label>الاسم انجليزي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.title.en"
                    :class="{ 'is-invalid': hasFieldError('title.en') }"
                    @input="clearFieldError('title.en')"
                    placeholder="عنوان الاسلايد بالإنجليزية"
                  />
                  <div
                    v-if="hasFieldError('title.en')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("title.en") }}
                  </div>
                </div>
              </div>

              <!-- Link -->
              <div class="col-12">
                <div class="mt-1">
                  <label>اللينك</label>
                  <input
                    type="url"
                    class="form-control"
                    v-model="EditData.link"
                    :class="{ 'is-invalid': hasFieldError('link') }"
                    @input="clearFieldError('link')"
                    placeholder="https://example.com"
                  />
                  <div v-if="hasFieldError('link')" class="invalid-feedback">
                    {{ getFieldError("link") }}
                  </div>
                </div>
              </div>

              <!-- Image Upload -->
              <div class="col-md-12">
                <div class="mt-1">
                  <label>الصورة</label>
                  <input
                    type="file"
                    class="form-control"
                    @change="editFileSelected($event)"
                    accept="image/jpeg, image/png, image/jpg"
                    :class="{ 'is-invalid': hasFieldError('image') }"
                  />
                  <div v-if="hasFieldError('image')" class="invalid-feedback">
                    {{ getFieldError("image") }}
                  </div>

                  <!-- Image Preview -->
                  <div v-if="imageedit && imageedit.length > 0" class="mt-2">
                    <img
                      :src="imageedit"
                      style="width: 200px; height: 120px; object-fit: cover"
                      class="img-thumbnail"
                      alt="معاينة الصورة"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              class="btn btn-primary m-auto mt-3 d-block"
              type="submit"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">جاري التعديل...</span>
              <span v-else>تعديل</span>
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
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js"; // Import the mixin

export default {
  components: {
    Multiselect,
  },
  mixins: [FormErrorMixin], // Apply the mixin
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      isSubmitting: false,
      // Define fields to watch for automatic error clearing
      watchedFields: [
        "formData.title.ar",
        "formData.title.en",
        "formData.link",
        "formData.image",
        "EditData.title.ar",
        "EditData.title.en",
        "EditData.link",
        "EditData.image",
      ],
      ShowModel: false,
      ShowEditModel: false,
      myList: [],
      id: null,
      imgurl: "",
      imageedit: "",
      loading: false,
      formData: {
        title: {
          ar: "",
          en: "",
        },
        link: "",
        image: "",
      },
      EditData: {
        title: {
          ar: "",
          en: "",
        },
        link: "",
        image: "",
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    // Validation rules for add form
    getAddValidationRules() {
      return {
        "title.ar": { required: true, label: "العنوان بالعربية" },
        "title.en": { required: true, label: "العنوان بالإنجليزية" },
        image: { required: true, label: "صورة الاسلايد" },
      };
    },

    // Validation rules for edit form
    getEditValidationRules() {
      return {
        "title.ar": { required: true, label: "العنوان بالعربية" },
        "title.en": { required: true, label: "العنوان بالإنجليزية" },
        // Image not required for edit as user might keep existing image
      };
    },

    // Validate image file
    validateImage(file) {
      if (!file) return true; // Optional for edit

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        this.setFieldErrors({
          image: ["يجب أن تكون الصورة من نوع JPG أو PNG"],
        });
        return false;
      }

      if (file.size > maxSize) {
        this.setFieldErrors({
          image: ["حجم الصورة يجب أن يكون أقل من 5 ميجابايت"],
        });
        return false;
      }

      return true;
    },

    // Validate URL format
    validateUrl(url) {
      if (!url) return true; // URL is optional

      try {
        new URL(url);
        return true;
      } catch {
        this.setFieldErrors({
          link: ["يجب إدخال رابط صحيح (مثال: https://example.com)"],
        });
        return false;
      }
    },

    async toggleactive(id) {
      try {
        const res = await crudDataService.create(`sliders/${id}/toggle`, "");
        if (res.data.success) {
          this.toast.success(res.data.message, {
            position: "top-center",
            timeout: 3000,
          });
          // Refresh the list to get updated status
          this.sliders();
        }
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    onFileSelected(event) {
      // Clear previous errors
      this.clearFieldError("image");

      const file = event.target.files[0];
      if (!file) {
        this.formData.image = "";
        this.imgurl = "";
        return;
      }

      // Validate file
      if (!this.validateImage(file)) {
        event.target.value = ""; // Clear the input
        return;
      }

      this.formData.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imgurl = reader.result;
      };
      reader.readAsDataURL(file);
    },

    editFileSelected(event) {
      // Clear previous errors
      this.clearFieldError("image");

      if (!event.target || !event.target.files || !event.target.files[0]) {
        return;
      }

      const file = event.target.files[0];

      // Validate file
      if (!this.validateImage(file)) {
        event.target.value = ""; // Clear the input
        return;
      }

      this.EditData.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imageedit = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async edit(data) {
      this.clearAllErrors();
      this.id = data.id;
      this.ShowEditModel = true;

      // Populate edit form
      this.EditData.title.ar = data.title.ar;
      this.EditData.title.en = data.title.en;
      this.EditData.link = data.link || "";

      // Show current image
      this.imageedit = data.image;

      // Reset file input (will be set only if user selects new file)
      this.EditData.image = "";
    },

    async update() {
      this.clearAllErrors();

      // Validate URL if provided
      if (this.EditData.link && !this.validateUrl(this.EditData.link)) {
        return;
      }

      // Validate image if a new one is selected
      if (this.EditData.image && !this.validateImage(this.EditData.image)) {
        return;
      }

      this.isSubmitting = true;

      try {
        const res = await crudDataService.create(
          `sliders/${this.id}?_method=put`,
          this.EditData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.ShowEditModel = false;
        this.sliders();

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

    async sliders() {
      this.loading = true;
      try {
        const res = await crudDataService.getAll("sliders");
        this.myList = res.data.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.handleApiErrors(error, this.toast);
      } finally {
        this.loading = false;
      }
    },

    resetFormData() {
      this.formData = {
        title: { ar: "", en: "" },
        link: "",
        image: "",
      };
      this.imgurl = "";
      this.clearAllErrors();
    },

    async add() {
      this.clearAllErrors();

      // Validate add form
      if (!this.validateForm(this.getAddValidationRules())) {
        return;
      }

      // Validate URL if provided
      if (this.formData.link && !this.validateUrl(this.formData.link)) {
        return;
      }

      // Validate image
      if (!this.validateImage(this.formData.image)) {
        return;
      }

      this.isSubmitting = true;

      try {
        const response = await crudDataService.create(
          `sliders`,
          this.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.sliders();
        this.ShowModel = false;
        this.resetFormData();

        this.toast.success(response.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      } finally {
        this.isSubmitting = false;
      }
    },

    del(data, index, title) {
      this.$swal
        .fire({
          title: `؟"${title.ar}" هل تريد حذف الاسلايد `,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
          icon: "warning",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("sliders", `${data}`)
              .then(() => {
                this.$swal.fire({
                  title: "تم الحذف بنجاح!",
                  icon: "success",
                  confirmButtonText: "تم",
                });
                this.myList.splice(index, 1);
              })
              .catch((error) => {
                this.$swal.fire({
                  title: "حدث خطأ أثناء الحذف!",
                  text: error.data?.message || "حدث خطأ غير متوقع",
                  icon: "error",
                  confirmButtonText: "موافق",
                });
              });
          }
        });
    },
  },

  mounted() {
    this.sliders();
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
<style lang="scss">
.sliders-model {
  &.fade .modal-dialog {
    transform: none !important;
  }
  &.show .modal-dialog {
    transform: none !important;
  }
}
</style>
