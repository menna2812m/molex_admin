<template>
  <section class="mt-5 pt-5">
    <div class="pos-relative">
      <button
        @click="showAddModal"
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
          <div class="table-responsive border-0 rounded border-bottom-0 mb-0">
            <table
              class="table table-bordered text-nowrap text-md-nowrap mg-b-0"
            >
              <tr>
                <td class="text-muted">الاسم</td>
                <td class="text-muted">الوصف</td>
                <td class="text-muted">السعر</td>
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
          style="background: #fd601f; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد خيار توصيل حتي الان
        </div>
      </section>
    </section>

    <!-- Add Delivery Option Modal -->
    <teleport to="body">
      <b-modal
        id="add"
        v-model="ShowModel"
        hide-footer
        title="اضافة خيار توصيل"
        modal-class="delivery-model"
      >
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="add">
            <div class="row">
              <!-- Arabic Name -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم عربي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.name.ar"
                    :class="{ 'is-invalid': hasFieldError('name.ar') }"
                    @input="clearFieldError('name.ar')"
                    placeholder="اسم خيار التوصيل بالعربية"
                  />
                  <div v-if="hasFieldError('name.ar')" class="invalid-feedback">
                    {{ getFieldError("name.ar") }}
                  </div>
                </div>
              </div>

              <!-- English Name -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم انجليزي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.name.en"
                    :class="{ 'is-invalid': hasFieldError('name.en') }"
                    @input="clearFieldError('name.en')"
                    placeholder="اسم خيار التوصيل بالإنجليزية"
                  />
                  <div v-if="hasFieldError('name.en')" class="invalid-feedback">
                    {{ getFieldError("name.en") }}
                  </div>
                </div>
              </div>

              <!-- Arabic Description -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الوصف عربي</label>
                  <textarea
                    class="form-control"
                    v-model="formData.description.ar"
                    :class="{ 'is-invalid': hasFieldError('description.ar') }"
                    @input="clearFieldError('description.ar')"
                    placeholder="وصف خيار التوصيل بالعربية"
                    rows="3"
                  ></textarea>
                  <div
                    v-if="hasFieldError('description.ar')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("description.ar") }}
                  </div>
                </div>
              </div>

              <!-- English Description -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الوصف انجليزي</label>
                  <textarea
                    class="form-control"
                    v-model="formData.description.en"
                    :class="{ 'is-invalid': hasFieldError('description.en') }"
                    @input="clearFieldError('description.en')"
                    placeholder="وصف خيار التوصيل بالإنجليزية"
                    rows="3"
                  ></textarea>
                  <div
                    v-if="hasFieldError('description.en')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("description.en") }}
                  </div>
                </div>
              </div>

              <!-- Price -->
              <div class="col-12 mb-3">
                <label>السعر</label>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.price"
                    :class="{ 'is-invalid': hasFieldError('price') }"
                    @input="clearFieldError('price')"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  <span class="input-group-text">ر.س</span>
                </div>
                <div
                  v-if="hasFieldError('price')"
                  class="invalid-feedback d-block"
                >
                  {{ getFieldError("price") }}
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

    <!-- Edit Delivery Option Modal -->
    <teleport to="body">
      <b-modal
        id="edit"
        v-model="ShowEditModel"
        hide-footer
        title="تعديل خيار التوصيل"
        modal-class="delivery-model"
      >
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="update">
            <div class="row">
              <!-- Arabic Name -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم عربي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.name.ar"
                    :class="{ 'is-invalid': hasFieldError('name.ar') }"
                    @input="clearFieldError('name.ar')"
                    placeholder="اسم خيار التوصيل بالعربية"
                  />
                  <div v-if="hasFieldError('name.ar')" class="invalid-feedback">
                    {{ getFieldError("name.ar") }}
                  </div>
                </div>
              </div>

              <!-- English Name -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم انجليزي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.name.en"
                    :class="{ 'is-invalid': hasFieldError('name.en') }"
                    @input="clearFieldError('name.en')"
                    placeholder="اسم خيار التوصيل بالإنجليزية"
                  />
                  <div v-if="hasFieldError('name.en')" class="invalid-feedback">
                    {{ getFieldError("name.en") }}
                  </div>
                </div>
              </div>

              <!-- Arabic Description -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الوصف عربي</label>
                  <textarea
                    class="form-control"
                    v-model="EditData.description.ar"
                    :class="{ 'is-invalid': hasFieldError('description.ar') }"
                    @input="clearFieldError('description.ar')"
                    placeholder="وصف خيار التوصيل بالعربية"
                    rows="3"
                  ></textarea>
                  <div
                    v-if="hasFieldError('description.ar')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("description.ar") }}
                  </div>
                </div>
              </div>

              <!-- English Description -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الوصف انجليزي</label>
                  <textarea
                    class="form-control"
                    v-model="EditData.description.en"
                    :class="{ 'is-invalid': hasFieldError('description.en') }"
                    @input="clearFieldError('description.en')"
                    placeholder="وصف خيار التوصيل بالإنجليزية"
                    rows="3"
                  ></textarea>
                  <div
                    v-if="hasFieldError('description.en')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("description.en") }}
                  </div>
                </div>
              </div>

              <!-- Price -->
              <div class="col-md-12 mb-3">
                <div class="mt-1">
                  <label>السعر</label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      v-model="EditData.price"
                      :class="{ 'is-invalid': hasFieldError('price') }"
                      @input="clearFieldError('price')"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    <span class="input-group-text">ر.س</span>
                  </div>
                  <div
                    v-if="hasFieldError('price')"
                    class="invalid-feedback d-block"
                  >
                    {{ getFieldError("price") }}
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
import axios from "axios";
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
        "formData.name.ar",
        "formData.name.en",
        "formData.description.ar",
        "formData.description.en",
        "formData.price",
        "EditData.name.ar",
        "EditData.name.en",
        "EditData.description.ar",
        "EditData.description.en",
        "EditData.price",
      ],
      ShowModel: false,
      ShowEditModel: false,
      myList: [],
      id: null,
      loading: false,
      formData: {
        name: { ar: "", en: "" },
        price: "",
        description: { ar: "", en: "" },
      },
      EditData: {
        name: { ar: "", en: "" },
        price: "",
        description: { ar: "", en: "" },
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    // Validation rules for add form
    getAddValidationRules() {
      return {
        "name.ar": { required: true, label: "الاسم بالعربية" },
        "name.en": { required: true, label: "الاسم بالإنجليزية" },
        "description.ar": { required: true, label: "الوصف بالعربية" },
        "description.en": { required: true, label: "الوصف بالإنجليزية" },
        price: { required: true, label: "السعر" },
      };
    },

    // Validation rules for edit form
    getEditValidationRules() {
      return {
        "name.ar": { required: true, label: "الاسم بالعربية" },
        "name.en": { required: true, label: "الاسم بالإنجليزية" },
        "description.ar": { required: true, label: "الوصف بالعربية" },
        "description.en": { required: true, label: "الوصف بالإنجليزية" },
        price: { required: true, label: "السعر" },
      };
    },

    // Helper method to format price
    formatPrice(price) {
      return parseFloat(price || 0).toFixed(2);
    },

    // Custom validation for price
    validatePrice(price, isEdit = false) {
      const priceValue = parseFloat(price);

      if (isNaN(priceValue) || priceValue < 0) {
        this.setFieldErrors({
          price: ["السعر يجب أن يكون رقم صحيح وأكبر من أو يساوي صفر"],
        });
        return false;
      }

      return true;
    },

    async toggleactive(id) {
      try {
        const res = await crudDataService.create(
          `delivery_options/${id}/toggle`,
          ""
        );
        if (res.data.status) {
          this.toast.success(res.data.message, {
            position: "top-center",
            timeout: 3000,
          });
          // Refresh the list to get updated status
          this.delivery_options();
        }
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    showAddModal() {
      this.clearAllErrors();
      this.ShowModel = true;
    },

    async edit(data) {
      this.clearAllErrors();
      this.id = data.id;
      this.ShowEditModel = true;

      // Populate edit form
      this.EditData.name.ar = data.name?.ar || "";
      this.EditData.name.en = data.name?.en || "";
      this.EditData.description.ar = data.description?.ar || "";
      this.EditData.description.en = data.description?.en || "";
      this.EditData.price = data.price || "";
    },

    async update() {
      this.clearAllErrors();

      // Custom price validation
      if (!this.validatePrice(this.EditData.price, true)) {
        return;
      }

      this.isSubmitting = true;

      try {
        const res = await crudDataService.create(
          `delivery_options/${this.id}?_method=put`,
          this.EditData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.ShowEditModel = false;
        this.delivery_options();

        this.toast.success("تم تعديل خيار التوصيل بنجاح", {
          position: "top-center",
          timeout: 3000,
        });
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      } finally {
        this.isSubmitting = false;
      }
    },

    async delivery_options() {
      this.loading = true;
      try {
        const res = await crudDataService.getAll("delivery_options");
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
        name: { ar: "", en: "" },
        price: "",
        description: { ar: "", en: "" },
      };
      this.clearAllErrors();
    },

    async add() {
      this.clearAllErrors();

      // Validate add form
      if (!this.validateForm(this.getAddValidationRules())) {
        return;
      }

      // Custom price validation
      if (!this.validatePrice(this.formData.price)) {
        return;
      }

      this.isSubmitting = true;

      try {
        const response = await crudDataService.create(
          `delivery_options`,
          this.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.delivery_options();
        this.ShowModel = false;
        this.resetFormData();

        this.toast.success("تم إضافة خيار التوصيل بنجاح", {
          position: "top-center",
          timeout: 3000,
        });
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      } finally {
        this.isSubmitting = false;
      }
    },

    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف خيار التوصيل`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
          icon: "warning",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("delivery_options", `${data}`)
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
