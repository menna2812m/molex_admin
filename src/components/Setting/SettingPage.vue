<template>
  <section class="mt-5 pt-5" v-if="items.length > 0">
    <div class="card pb-3 border-1">
      <div
        class="card-header pb-2 d-flex align-items-center justify-content-between"
      >
        <h4 class="mb-0">
          الاسم:
          {{ $route.params.page }}
        </h4>
        <div class="pos-relative">
          <button
            @click="toggleDropdown"
            class="twobtn bg-white border"
            style="border-color: #fd601f !important; color: #fd601f"
            v-if="perminlocal.includes('pages-update')"
          >
            خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
          </button>

          <div class="text-start dropend mt-1" v-if="isDropdownOpen">
            <a class="dropdown-item" @click="edit()">تعديل الصفحة </a>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="border rounded mb-2 p-2"
        >
          <p class="mb-0 p-2">
            {{ item.display_name }}
            :
            {{ item.value?.ar || item.value?.en ? item.value?.ar : item.value }}
          </p>
          <img
            :src="item.image"
            style="width: 50px; height: 50px"
            class="rounded-40"
            alt=""
            v-if="item.type == 'image'"
          />
        </div>
      </div>
    </div>

    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModel"
        hide-footer
        modal-class="settings-model"
        size="lg"
      >
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">تعديل الصفحة</h6>
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-md-6" v-for="(form, key) in formData" :key="key">
                <div class="mt-3">
                  <!-- Image Field -->
                  <div v-if="form.type === 'image'">
                    <label class="form-label">
                      {{ form.name }} <span class="text-danger">*</span>
                    </label>
                    <div class="pos-relative overflow-hidden">
                      <input
                        type="file"
                        class="form-control"
                        :class="{ 'is-invalid': hasFieldError(`${key}.image`) }"
                        @change="onFileSelected($event, key)"
                        @focus="clearFieldError(`${key}.image`)"
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/webp"
                      />
                      <div
                        v-if="hasFieldError(`${key}.image`)"
                        class="invalid-feedback"
                      >
                        {{ getFieldError(`${key}.image`) }}
                      </div>
                    </div>
                    <div v-if="form.image" class="mt-2">
                      <img
                        :src="
                          typeof form.image === 'string'
                            ? form.image
                            : imagePreview[key]
                        "
                        alt="صورة"
                        style="
                          width: 180px;
                          height: 180px;
                          object-fit: cover;
                          border-radius: 8px;
                        "
                        class="border"
                      />
                    </div>
                  </div>

                  <!-- Banner Field (Text with Translation) -->
                  <div v-else-if="form.type === 'banner'">
                    <div v-if="typeof form.value === 'object'">
                      <label class="form-label d-block">
                        {{ form.name }} <span class="text-danger">*</span>
                      </label>

                      <div class="mb-2">
                        <label class="form-label small">عربي</label>
                        <input
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid': hasFieldError(`${key}.value.ar`),
                          }"
                          v-model="form.value.ar"
                          @input="clearFieldError(`${key}.value.ar`)"
                          @focus="clearFieldError(`${key}.value.ar`)"
                          placeholder="أدخل النص بالعربية"
                        />
                        <div
                          v-if="hasFieldError(`${key}.value.ar`)"
                          class="invalid-feedback"
                        >
                          {{ getFieldError(`${key}.value.ar`) }}
                        </div>
                      </div>

                      <div class="mb-2">
                        <label class="form-label small">انجليزي</label>
                        <input
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid': hasFieldError(`${key}.value.en`),
                          }"
                          v-model="form.value.en"
                          @input="clearFieldError(`${key}.value.en`)"
                          @focus="clearFieldError(`${key}.value.en`)"
                          placeholder="Enter text in English"
                        />
                        <div
                          v-if="hasFieldError(`${key}.value.en`)"
                          class="invalid-feedback"
                        >
                          {{ getFieldError(`${key}.value.en`) }}
                        </div>
                      </div>
                    </div>

                    <div v-else>
                      <label class="form-label">
                        {{ form.name }} <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': hasFieldError(`${key}.value`) }"
                        v-model="form.value"
                        @input="clearFieldError(`${key}.value`)"
                        @focus="clearFieldError(`${key}.value`)"
                        placeholder="أدخل النص"
                      />
                      <div
                        v-if="hasFieldError(`${key}.value`)"
                        class="invalid-feedback"
                      >
                        {{ getFieldError(`${key}.value`) }}
                      </div>
                    </div>
                  </div>

                  <!-- Other Field Types -->
                  <div v-else>
                    <div v-if="typeof form.value === 'object'">
                      <label class="form-label d-block">
                        {{ form.name }} <span class="text-danger">*</span>
                      </label>

                      <div class="mb-2">
                        <label class="form-label small">عربي</label>
                        <input
                          :type="getInputType(form.type)"
                          class="form-control"
                          :class="{
                            'is-invalid': hasFieldError(`${key}.value.ar`),
                          }"
                          v-model="form.value.ar"
                          @input="clearFieldError(`${key}.value.ar`)"
                          @focus="clearFieldError(`${key}.value.ar`)"
                          :placeholder="getPlaceholder(form.type, 'ar')"
                        />
                        <div
                          v-if="hasFieldError(`${key}.value.ar`)"
                          class="invalid-feedback"
                        >
                          {{ getFieldError(`${key}.value.ar`) }}
                        </div>
                      </div>

                      <div class="mb-2">
                        <label class="form-label small">انجليزي</label>
                        <input
                          :type="getInputType(form.type)"
                          class="form-control"
                          :class="{
                            'is-invalid': hasFieldError(`${key}.value.en`),
                          }"
                          v-model="form.value.en"
                          @input="clearFieldError(`${key}.value.en`)"
                          @focus="clearFieldError(`${key}.value.en`)"
                          :placeholder="getPlaceholder(form.type, 'en')"
                        />
                        <div
                          v-if="hasFieldError(`${key}.value.en`)"
                          class="invalid-feedback"
                        >
                          {{ getFieldError(`${key}.value.en`) }}
                        </div>
                      </div>
                    </div>

                    <div v-else>
                      <label class="form-label">
                        {{ form.name }} <span class="text-danger">*</span>
                      </label>
                      <input
                        :type="getInputType(form.type)"
                        class="form-control"
                        :class="{ 'is-invalid': hasFieldError(`${key}.value`) }"
                        v-model="form.value"
                        @input="clearFieldError(`${key}.value`)"
                        @focus="clearFieldError(`${key}.value`)"
                        :placeholder="getPlaceholder(form.type)"
                      />
                      <div
                        v-if="hasFieldError(`${key}.value`)"
                        class="invalid-feedback"
                      >
                        {{ getFieldError(`${key}.value`) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-4">
              <button
                class="btn btn-primary px-4 py-2"
                type="submit"
                :disabled="isSubmitting"
              >
                <span
                  v-if="isSubmitting"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                {{ isSubmitting ? "جاري التعديل..." : "تعديل" }}
              </button>
              <button
                type="button"
                class="btn btn-light px-4 py-2 ms-2"
                @click="cancelEdit"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>
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
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";

export default {
  mixins: [FormErrorMixin],

  data() {
    return {
      isDropdownOpen: false,
      items: [],
      ShowModel: false,
      formData: {},
      originalFormData: {}, // For cancellation
      imagePreview: {}, // For image previews
      isSubmitting: false,
      perminlocal: localStorage.getItem("permissions"),
      watchedFields: [],
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    isString(value) {
      return typeof value === "string";
    },

    getInputType(type) {
      // Map custom types to HTML input types
      const typeMap = {
        banner: "text",
        text: "text",
        email: "email",
        number: "number",
        url: "url",
        tel: "tel",
        password: "password",
      };
      return typeMap[type] || "text";
    },

    getPlaceholder(type, lang = null) {
      const placeholders = {
        text:
          lang === "ar"
            ? "أدخل النص"
            : lang === "en"
            ? "Enter text"
            : "أدخل النص",
        email:
          lang === "ar"
            ? "أدخل البريد الإلكتروني"
            : lang === "en"
            ? "Enter email"
            : "أدخل البريد الإلكتروني",
        number:
          lang === "ar"
            ? "أدخل رقم"
            : lang === "en"
            ? "Enter number"
            : "أدخل رقم",
        url:
          lang === "ar"
            ? "أدخل الرابط"
            : lang === "en"
            ? "Enter URL"
            : "أدخل الرابط",
        tel:
          lang === "ar"
            ? "أدخل رقم الهاتف"
            : lang === "en"
            ? "Enter phone"
            : "أدخل رقم الهاتف",
      };
      return (
        placeholders[type] ||
        (lang === "ar"
          ? "أدخل القيمة"
          : lang === "en"
          ? "Enter value"
          : "أدخل القيمة")
      );
    },

    async onFileSelected(event, key) {
      const files = event.target.files;
      if (files.length === 0) {
        return;
      }

      const file = files[0];

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        this.toast.error("نوع الملف غير مدعوم. يرجى اختيار صورة صالحة.");
        return;
      }

      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.toast.error("حجم الملف كبير جداً. يجب أن يكون أقل من 2 ميجابايت.");
        return;
      }

      try {
        this.clearFieldError(`${key}.image`);
        this.clearFieldError(key);

        this.formData[key].image = file;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview[key] = e.target.result;
          // Optionally force update if reactivity doesn't work
          this.$forceUpdate && this.$forceUpdate();
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error reading file:", error);
        this.toast.error("حدث خطأ في قراءة الملف");
      }
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    async onepage() {
      try {
        let res = await crudDataService.getAll(
          `settings?page=${this.$route.params.page}`
        );
        this.items = res.data.data;

        // Reset form data
        this.formData = {};
        this.imagePreview = {};

        this.items.forEach((ele) => {
          this.formData[ele.key] = {
            name: ele.display_name,
            image: ele.image,
            value:
              ele.translated == 1
                ? { ar: ele.value.ar, en: ele.value.en }
                : ele.value,
            type: ele.type,
          };
        });

        // Store original data for cancellation
        this.originalFormData = JSON.parse(JSON.stringify(this.formData));

        this.setupWatchers();
      } catch (error) {
        console.error("Error loading page data:", error);
        this.toast.error("فشل في تحميل بيانات الصفحة");
      }
    },

    setupWatchers() {
      Object.keys(this.formData).forEach((key) => {
        const form = this.formData[key];

        if (form.type === "image") {
          this.$watch(`formData.${key}.image`, () => {
            this.clearFieldError(`${key}.image`);
          });
        } else if (typeof form.value === "object") {
          this.$watch(`formData.${key}.value.ar`, () => {
            this.clearFieldError(`${key}.value.ar`);
          });
          this.$watch(`formData.${key}.value.en`, () => {
            this.clearFieldError(`${key}.value.en`);
          });
        } else {
          this.$watch(`formData.${key}.value`, () => {
            this.clearFieldError(`${key}.value`);
          });
        }
      });
    },

    edit() {
      this.ShowModel = true;
      this.clearAllErrors();
      // Reset to original data
      this.formData = JSON.parse(JSON.stringify(this.originalFormData));
    },

    cancelEdit() {
      this.ShowModel = false;
      this.clearAllErrors();
      // Reset to original data
      this.formData = JSON.parse(JSON.stringify(this.originalFormData));
      this.imagePreview = {};
    },

    validateFormData() {
      const rules = {};

      Object.keys(this.formData).forEach((key) => {
        const form = this.formData[key];

        if (form.type === "image") {
          // Only validate if it's a new file upload
          if (form.image && typeof form.image !== "string") {
            rules[`${key}.image`] = {
              label: form.name,
              maxSize: 2048, // 2MB
            };
          }
        } else if (typeof form.value === "object") {
          rules[`${key}.value.ar`] = {
            label: `${form.name} (عربي)`,
            required: true,
            minLength: 1,
          };
          rules[`${key}.value.en`] = {
            label: `${form.name} (انجليزي)`,
            required: true,
            minLength: 1,
          };
        } else {
          rules[`${key}.value`] = {
            label: form.name,
            required: true,
            minLength: 1,
          };
        }
      });

      return this.validateForm(rules);
    },

    async update() {
      this.clearAllErrors();

      // Client-side validation (optional - uncomment if needed)
      // if (!this.validateFormData()) {
      //   this.toast.error('يرجى تصحيح الأخطاء في النموذج');
      //   return;
      // }

      this.isSubmitting = true;

      try {
        const response = await crudDataService.create(
          `settings`,
          this.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        await this.onepage();
        this.ShowModel = false;
        this.clearAllErrors();

        this.toast.success(response.data.message || "تم التعديل بنجاح", {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        console.error("Update error:", error);
        this.handleApiErrors(error, this.toast);
      } finally {
        this.isSubmitting = false;
      }
    },
  },

  watch: {
    ShowModel(newVal) {
      if (!newVal) {
        this.clearAllErrors();
        this.imagePreview = {};
      }
    },
  },

  mounted() {
    this.onepage();

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".pos-relative")) {
        this.isDropdownOpen = false;
      }
    });
  },

  beforeUnmount() {
    // Clean up event listeners
    document.removeEventListener("click", () => {});
  },
};
</script>

<style lang="scss" scoped>
input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}

#add-page {
  overflow-y: auto;
}

.form-label {
  font-weight: 600;
  margin-bottom: 0.5rem;

  &.small {
    font-size: 0.875rem;
    font-weight: 500;
    color: #666;
  }
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.border {
  border: 1px solid #dee2e6 !important;
}

.rounded-40 {
  border-radius: 40px;
}
</style>
