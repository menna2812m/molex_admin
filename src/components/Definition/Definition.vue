<template>
  <section class="mt-5">
    <button
      class="fs-15 btn-add mb-4"
      @click="openAddModal"
      v-if="perminlocal.includes('pages-store')"
    >
      <i class="fe fe-plus"></i>
      صفحة جديدة
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
      <div class="card custom-card mg-b-20" v-if="pages.length > 0">
        <div class="card-body p-0">
          <ul class="list-unstyled mb-0">
            <li
              class="w-100 p-3 border-bottom justify-content-between align-items-center d-flex"
              v-for="(page, i) in pages"
              :key="i"
            >
              <p
                class="fw-semibold fs-6 mb-0"
                style="cursor: pointer"
                @click="singlepage(page.id)"
              >
                {{ page.title }}
              </p>
              <div class="d-flex align-items-center">
                <label
                  class="custom-switch justify-content-center"
                  v-if="perminlocal.includes('pages-toggle')"
                >
                  <input
                    type="checkbox"
                    name="custom-switch-checkbox"
                    class="custom-switch-input"
                    v-model="page.is_published"
                    @change="publish(page.id)"
                  />
                  <span class="custom-switch-indicator ms-auto"></span>
                </label>
                <button
                  class="btn me-2"
                  @click="del(page.id, i, page.title)"
                  v-if="perminlocal.includes('pages-destroy')"
                >
                  <i class="fe fe-trash text-danger"></i>
                </button>
              </div>
            </li>
          </ul>
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
          لا يوجد صفحات حتي الان
        </div>
      </section>
    </section>

    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModel"
        hide-footer
        modal-class="definition-isolated-modal"
        body-class="definition-isolated-body"
      >
        <div class="imgtoadd">
          <img src="../../assets/img/23.png" alt="img2" />
        </div>
        <h6 style="color: #febcd5" class="text-right">إنشاء صفحة</h6>

        <div
          class="mt-4 pt-1 pos-relative definition-isolated-body--content"
          style="z-index: 5555"
        >
          <form @submit.prevent="add">
            <div class="row">
              <!-- عنوان الصفحة عربي -->
              <div class="col-12 mb-3">
                <label>عنوان الصفحة عربي</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('title.ar') }"
                  v-model="formData.title.ar"
                  @input="clearFieldError('title.ar')"
                  @focus="clearFieldError('title.ar')"
                  placeholder="أدخل عنوان الصفحة باللغة العربية"
                />
                <div v-if="hasFieldError('title.ar')" class="invalid-feedback">
                  {{ getFieldError("title.ar") }}
                </div>
              </div>

              <!-- عنوان الصفحة انجليزي -->
              <div class="col-12 mb-3">
                <label>عنوان الصفحة انجليزي</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('title.en') }"
                  v-model="formData.title.en"
                  @input="clearFieldError('title.en')"
                  @focus="clearFieldError('title.en')"
                  placeholder="Enter page title in English"
                />
                <div v-if="hasFieldError('title.en')" class="invalid-feedback">
                  {{ getFieldError("title.en") }}
                </div>
              </div>

              <!-- محتوي الصفحة عربي -->
              <div
                class="col-12 mb-3"
                :class="{
                  'ckeditor-error': hasFieldError('content.ar'),
                }"
              >
                <label>محتوي الصفحة عربي</label>
                <div :class="{ 'is-invalid': hasFieldError('content.ar') }">
                  <ckeditor
                    :editor="editor"
                    v-model="formData.content.ar"
                    :editorConfigs="editorConfigs"
                    @input="clearFieldError('content.ar')"
                    @focus="clearFieldError('content.ar')"
                  ></ckeditor>
                </div>
                <div
                  v-if="hasFieldError('content.ar')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("content.ar") }}
                </div>
              </div>

              <!-- محتوي الصفحة انجليزي -->
              <div
                class="col-12 mb-3"
                :class="{
                  'ckeditor-error': hasFieldError('content.en'),
                }"
              >
                <label>محتوي الصفحة انجليزي</label>
                <div :class="{ 'is-invalid': hasFieldError('content.en') }">
                  <ckeditor
                    :editor="editor"
                    v-model="formData.content.en"
                    :editorConfigs="editorConfigs"
                    @input="clearFieldError('content.en')"
                    @focus="clearFieldError('content.en')"
                  ></ckeditor>
                </div>
                <div
                  v-if="hasFieldError('content.en')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("content.en") }}
                </div>
              </div>

              <!-- تحسينات SEO -->
              <div class="col-12 mb-3">
                <label class="fs-6">عنوان تحسينات SEO</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('seo_title') }"
                  v-model="formData.seo_title"
                  @input="clearFieldError('seo_title')"
                  @focus="clearFieldError('seo_title')"
                  placeholder="عنوان صفحة تعريفية"
                />
                <div v-if="hasFieldError('seo_title')" class="invalid-feedback">
                  {{ getFieldError("seo_title") }}
                </div>
              </div>

              <div class="col-12 mb-3">
                <label class="fs-6">وصف تحسينات SEO</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('seo_description') }"
                  v-model="formData.seo_description"
                  @input="clearFieldError('seo_description')"
                  @focus="clearFieldError('seo_description')"
                  placeholder="وصف صفحة تعريفية"
                />
                <div
                  v-if="hasFieldError('seo_description')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("seo_description") }}
                </div>
              </div>

              <div class="col-12 mb-3">
                <label class="fs-6">رابط تحسينات SEO</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('seo_url') }"
                  v-model="formData.seo_url"
                  @input="clearFieldError('seo_url')"
                  @focus="clearFieldError('seo_url')"
                  placeholder="رابط صفحة تعريفية"
                />
                <div v-if="hasFieldError('seo_url')" class="invalid-feedback">
                  {{ getFieldError("seo_url") }}
                </div>
              </div>
            </div>

            <div class="text-center">
              <button
                class="fs-15 btn-save mx-1"
                type="submit"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">جاري الحفظ...</span>
                <span v-else>حفظ</span>
              </button>
              <button
                class="fs-15 btn-cancel mx-1"
                @click="closeModal"
                type="button"
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
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js"; // تأكد من المسار الصحيح

export default {
  mixins: [FormErrorMixin],

  components: {
    Multiselect,
  },

  data() {
    return {
      isDropdownOpen: false,
      ShowModel: false,
      isDropdown: false,
      loading: false,
      isSubmitting: false,
      pages: [],
      formData: {
        title: {
          ar: "",
          en: "",
        },
        content: {
          ar: "",
          en: "",
        },
        seo_title: "",
        seo_description: "",
        seo_url: "",
      },
      perminlocal: localStorage.getItem("permissions"),
      // تحديد الحقول المراد مراقبتها
      watchedFields: [
        "formData.title.ar",
        "formData.title.en",
        "formData.content.ar",
        "formData.content.en",
        "formData.seo_title",
        "formData.seo_description",
        "formData.seo_url",
      ],
    };
  },

  setup() {
    const editorConfigs = reactive({});
    return { editor: ClassicEditor, editorConfigs };
  },

  methods: {
    // فتح نافذة الإضافة مع مسح الأخطاء
    openAddModal() {
      this.ShowModel = true;
      this.clearAllErrors();
      this.resetForm();
    },

    // إغلاق النافذة مع مسح الأخطاء
    closeModal() {
      this.ShowModel = false;
      this.clearAllErrors();
      this.resetForm();
    },

    // إعادة تعيين النموذج
    resetForm() {
      this.formData = {
        title: { ar: "", en: "" },
        content: { ar: "", en: "" },
        seo_title: "",
        seo_description: "",
        seo_url: "",
      };
    },

    // التحقق من صحة البيانات محلياً
    validateFormData() {
      const rules = {
        "title.ar": {
          label: "عنوان الصفحة عربي",
          required: true,
          minLength: 3,
        },
        "title.en": {
          label: "عنوان الصفحة انجليزي",
          required: true,
          minLength: 3,
        },
        "content.ar": {
          label: "محتوي الصفحة عربي",
          required: true,
          minLength: 10,
        },
        "content.en": {
          label: "محتوي الصفحة انجليزي",
          required: true,
          minLength: 10,
        },
        seo_url: {
          label: "رابط SEO",
          minLength: 3,
        },
      };

      return this.validateForm(rules);
    },

    async publish(id) {
      const toast = useToast();
      try {
        let res = await crudDataService.create(`pages/${id}/toggle`, "");
        if (res.status == 200) {
          toast.success(res.data.message, {
            position: "top-center",
            timeout: 5000,
          });
        }
      } catch (error) {
        this.handleApiErrors(error, toast);
      }
    },

    toggled() {
      this.isDropdown = !this.isDropdown;
    },

    singlepage(id) {
      if (this.perminlocal.includes("pages-show")) {
        this.$router.push({ name: "Singlepage", params: { id } });
      }
    },

    async getallpages() {
      this.loading = true;
      const toast = useToast();

      try {
        let res = await crudDataService.getAll("pages");
        this.pages = res.data.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("فشل في تحميل الصفحات", {
          position: "top-center",
          timeout: 5000,
        });
      } finally {
        this.loading = false;
      }
    },

    async add() {
      const toast = useToast();

      // مسح الأخطاء السابقة
      this.clearAllErrors();

      // التحقق من صحة البيانات محلياً
      if (!this.validateFormData()) {
        return;
      }

      this.isSubmitting = true;

      try {
        const response = await crudDataService.create("pages", this.formData);

        // تحديث قائمة الصفحات
        await this.getallpages();

        // إغلاق النافذة وإعادة تعيين النموذج
        this.closeModal();

        // عرض رسالة نجاح
        toast.success(response.data.message || "تم إنشاء الصفحة بنجاح", {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        // معالجة الأخطاء باستخدام الـ mixin
        this.handleApiErrors(error, toast);
      } finally {
        this.isSubmitting = false;
      }
    },

    del(data, index, name) {
      this.$swal
        .fire({
          title: `هل تريد حذف صفحة "${name}" ؟`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deletePageConfirmed(data, index);
          }
        });
    },

    async deletePageConfirmed(data, index) {
      const toast = useToast();
      try {
        await crudDataService.delete("pages", `${data}`);

        this.pages.splice(index, 1);

        this.$swal.fire({
          title: "تم الحذف بنجاح!",
          icon: "success",
          confirmButtonText: "تم",
        });
      } catch (error) {
        console.error("Error deleting page:", error);
        toast.error("فشل في حذف الصفحة", {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
  },

  mounted() {
    this.getallpages();
  },
};
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0 0 9px 2px #e6edf0bf;
}
</style>

<style lang="scss">
.form-check-input:checked {
  background-color: #fe7eae;
  border-color: #fe7eae;
  width: 16px;
  height: 16px;
}

.multiselect-caret {
  margin: 0 var(--ms-px, 0.875rem) 0 var(--ms-px, 0.875rem);
}

.multiselect-multiple-label,
.multiselect-placeholder,
.multiselect-single-label {
  left: auto;
  padding-right: 9px;
  right: 0;
}

.definition-isolated-modal {
  .modal-content {
    overflow: unset;
  }

  .definition-isolated-body {
    overflow-y: unset;

    &--content {
      height: 82vh;
      overflow-y: auto;
      padding-bottom: 21px;
    }
  }

  &.fade .modal-dialog {
    transform: translate(0, -7%);
  }

  .modal-header {
    display: none;
  }
}

.imgtoadd {
  background: #fff;
  width: 100px;
  height: 100px;
  position: absolute;
  right: 40%;
  border-radius: 50%;
  top: -32px;
  text-align: center;
  z-index: 10000;

  img {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
}

@media (min-width: 576px) {
  .definition-isolated-modal .modal-dialog {
    margin: 5.75rem auto;
  }
}

#add-page {
  overflow-y: auto;
}

// حالة التحميل للأزرار
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
