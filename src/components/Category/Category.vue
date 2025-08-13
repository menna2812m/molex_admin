<template>
  <div dir="rtl">
    <AddCategory
      @customEvent="handleCustomEvent"
      v-if="perminlocal.includes('categories-store')"
    />
    <section
      class="position-relative"
      style="height: 100vh; display: grid; place-items: center"
      v-if="loading"
    >
      <section class="cate"></section>
      <progress class="pure-material-progress-circular" />
    </section>
    <section v-else>
      <vue-good-table
        v-if="rows && rows.length > 0"
        :columns="filteredColumns"
        :rows="rows"
        :search-options="{ enabled: true }"
        :group-options="{ enabled: false }"
        :pagination-options="{
          enabled: true,
          mode: 'fixed',
          rowsPerPage: 10,
          rowsPerPageLabel: 'عدد الصفوف',
        }"
        :compactMode="true"
        :rtl="true"
      >
        <template #table-row="props">
          <span v-if="props.column.field === 'image'" class="imgetext">
            <img
              :src="props.formattedRow[props.column.field]"
              class="imagetable"
            />
          </span>
          <span v-if="props.column.field == 'actions'">
            <button
              class="btn btn-info me-2"
              @click="view(props.row.id)"
              v-if="perminlocal.includes('categories-show')"
            >
              <i class="si si-eye"></i>
            </button>
            <button
              class="btn btn-primary me-2"
              @click="edit(props.row)"
              v-if="perminlocal.includes('categories-update')"
            >
              <i class="fe fe-edit-2"></i>
            </button>

            <button
              class="btn btn-danger me-2"
              v-if="perminlocal.includes('categories-destroy')"
              @click="del(props.row.id, props.index, props.row.name)"
            >
              <i class="fe fe-trash"></i>
            </button>
            <label
              class="custom-switch justify-content-center"
              v-if="perminlocal.includes('categories-toggle')"
            >
              <input
                type="checkbox"
                name="custom-switch-checkbox"
                class="custom-switch-input"
                :checked="props.row.is_active"
                @change="toggleactive(props.row.id)"
              />
              <span class="custom-switch-description"> </span>
              <span
                class="custom-switch-indicator"
                style="background: #9fa8b8"
              ></span>
            </label>
          </span>
        </template>
      </vue-good-table>

      <section
        class="position-relative"
        style="height: 100vh; display: grid; place-items: center"
        v-else
      >
        <div
          style="background: #fd601f; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد اقسام حتي الان
        </div>
      </section>
    </section>

    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModelEdit"
        hide-footer
        title="تعديل القسم"
        modal-class="category-model"
      >
        <div class="row">
          <div class="col-lg-12">
            <form ref="anyName" @submit.prevent="update">
              <div class="mt-1">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.name.ar"
                  @input="clearFieldError('name.ar')"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      hasFieldError('name.ar') || hasFieldError('name'),
                  }"
                />
                <div
                  v-if="hasFieldError('name.ar') || hasFieldError('name')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("name.ar") || getFieldError("name") }}
                </div>
              </div>

              <div class="mt-1">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.name.en"
                  @input="clearFieldError('name.en')"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      hasFieldError('name.en') || hasFieldError('name'),
                  }"
                />
                <div
                  v-if="hasFieldError('name.en') || hasFieldError('name')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("name.en") || getFieldError("name") }}
                </div>
              </div>

              <div class="mt-1">
                <label>الوصف عربي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.ar"
                  @input="clearFieldError('description.ar')"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      hasFieldError('description.ar') ||
                      hasFieldError('description'),
                  }"
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

              <div class="mt-1">
                <label>الوصف انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.en"
                  @input="clearFieldError('description.en')"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      hasFieldError('description.en') ||
                      hasFieldError('description'),
                  }"
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

              <div class="mt-3">
                <label>الصوره</label>
                <div class="pos-relative overflow-hidden">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('image') }"
                  />
                  <div v-if="hasFieldError('image')" class="invalid-feedback">
                    {{ getFieldError("image") }}
                  </div>
                </div>
                <img
                  :src="imageUrl"
                  alt="صورة"
                  style="width: 180px; height: 180px; object-fit: fill"
                  class="m-1"
                />
              </div>

              <button
                class="btn btn-primary m-auto d-block"
                :disabled="isLoading"
              >
                <progress
                  class="pure-material-progress-circular pure-material-progress-circular--sm"
                  v-if="isLoading"
                />
                <span v-if="!isLoading"> تعديل </span>
              </button>
            </form>
          </div>
        </div>
      </b-modal>
    </teleport>
  </div>
</template>

<script>
import crudDataService from "../../Services/crudDataService.js";
import AddCategory from "../Category/AddCategory.vue";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js"; // ✅ استيراد المixin
import { useToast } from "vue-toastification";

export default {
  components: {
    AddCategory,
  },

  // ✅ استخدام المixin
  mixins: [FormErrorMixin],

  data() {
    return {
      textimage: "",
      changeedit: true,
      ShowModelEdit: false,
      imageUrl: null,
      // ✅ تم حذف fieldErrors من هنا لأنه موجود في المixin
      columns: [
        {
          label: "الإسم",
          field: "name.ar",
        },
        {
          label: "الوصف",
          field: "description.ar",
        },
        {
          label: "الصوره",
          field: "image",
        },
        {
          label: "فعل",
          field: "actions",
        },
      ],
      rows: [],
      formData: {
        name: {
          ar: "",
          en: "",
        },
        image: "",
        description: {
          ar: "",
          en: "",
        },
      },
      id: null,
      loading: false,
      perminlocal: localStorage.getItem("permissions"),
      isLoading: false,

      // ✅ تحديد الحقول التي نريد مراقبتها (اختياري)
      watchedFields: [
        "formData.name.ar",
        "formData.name.en",
        "formData.description.ar",
        "formData.description.en",
      ],
    };
  },

  methods: {
    async toggleactive(id) {
      let res = await crudDataService.create(`categories/${id}/toggle`, "");

      const toast = useToast();
      if (res.data.status) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },

    view(id) {
      this.$router.push({ name: "ViewCategory", params: { id } });
    },

    handleCustomEvent(data) {
      this.rows = data;
    },

    async getcategories() {
      this.loading = true;
      try {
        let res = await crudDataService.getAll("categories");
        if (res.data && res.data.data && res.data.data.data) {
          this.rows = res.data.data.data.map((category) => {
            return { ...category };
          });
        } else {
          console.error("Invalid response structure", res);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        this.loading = false;
      }
    },

    onFileSelected(event) {
      // ✅ استخدام دالة المixin لمسح خطأ الصورة
      this.clearFieldError("image");

      if (event.target) {
        this.changeedit = false;
        this.formData.image = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(this.formData.image);
      } else {
        this.changeedit = true;
        this.formData.image = event;
      }
    },

    async edit(data) {
      this.id = data.id;
      this.ShowModelEdit = true;

      // ✅ استخدام دالة المixin لمسح جميع الأخطاء
      this.clearAllErrors();

      this.formData.name.ar = data.name.ar;
      this.formData.name.en = data.name.en;
      this.formData.description.ar = data.description.ar;
      this.formData.description.en = data.description.en;
      this.formData.image = data.image;
      (this.textimage = data.image),
        (this.formData.image = this.onFileSelected(data.image));
      this.imageUrl = data.image;
    },

    async update() {
      this.isLoading = true;
      const toast = useToast();

      // ✅ استخدام دالة المixin لمسح الأخطاء السابقة
      this.clearAllErrors();

      // ✅ التحقق من صحة النموذج محلياً (اختياري)
      const validationRules = {
        "name.ar": { required: true, label: "الاسم بالعربية" },
        "name.en": { required: true, label: "الاسم بالإنجليزية" },
        "description.ar": { required: true, label: "الوصف بالعربية" },
        "description.en": { required: true, label: "الوصف بالإنجليزية" },
        image: { maxSize: 2048, label: "الصورة" }, // 2MB
      };

      if (!this.validateForm(validationRules)) {
        this.isLoading = false;
        return;
      }

      try {
        const res = await crudDataService.create(
          `categories/${this.id}?_method=put`,
          this.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.isLoading = false;
        this.ShowModelEdit = false;
        this.getcategories();

        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        this.isLoading = false;

        // ✅ استخدام دالة المixin للتعامل مع أخطاء API
        this.handleApiErrors(error, toast);
      }
    },

    del(data, index, name) {
      this.$swal
        .fire({
          title: ` ؟"${name.ar}" هل تريد حذف قسم`,
          showCancelButton: true,
          confirmButtonText: "نعم",
          cancelButtonText: "إلغاء",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("categories", `${data}`)
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
                  text: error.data.message,
                  icon: "error",
                  confirmButtonText: "موافق",
                });
              });
          }
        });
    },
  },

  // ✅ تم حذف watchers لأنها موجودة في المixin وتعمل تلقائياً

  computed: {
    filteredColumns() {
      if (
        !this.perminlocal.includes("categories-show") ||
        !this.perminlocal.includes("categories-update") ||
        !this.perminlocal.includes("categories-destroy")
      ) {
        return this.columns?.length ? this.columns : [];
      }
      return this.columns;
    },
  },

  mounted() {
    this.getcategories();
  },
};
</script>

<style lang="scss">
.category-model {
  &.fade .modal-dialog {
    transform: none !important;
  }
  &.show .modal-dialog {
    transform: none !important;
  }
}

.imagetable {
  width: 200px !important;
  height: 200px !important;
}

.imagesub {
  width: 100px;
}

.vgt-wrap.rtl .vgt-table thead th,
.vgt-wrap.rtl .vgt-table.condensed thead th {
  padding-right: 1.5rem;
}

.vgt-wrap__footer .footer__row-count::after {
  left: 0;
  right: auto;
}

.vgt-wrap__footer .footer__navigation {
  display: none !important;
}

input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}

.imgetext + span {
  display: none;
}

.tableabot tr td {
  padding-right: 50px;
}

.tableabot th {
  width: 120px;
}

table.vgt-table td {
  vertical-align: middle;
}

.vgt-table th.vgt-row-header {
  background-color: #dcdfe69c !important;
}

.custom-switch-input:checked ~ .custom-switch-indicator {
  background: #fb99bf !important;
}

// ✅ تنسيق رسائل الخطأ
.invalid-feedback {
  display: block;
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 0.25rem;
}

.form-control.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>
