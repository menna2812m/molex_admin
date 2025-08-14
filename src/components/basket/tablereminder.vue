<template>
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
      class="card custom-card border-0 mg-b-20"
      v-if="items && items.length > 0"
    >
      <div class="card-body p-0">
        <div class="table-responsive rounded border-bottom-0 mb-0">
          <table
            class="table table-bordered text-nowrap text-md-nowrap mg-b-0 p-4"
          >
            <thead>
              <tr class="mb-4">
                <th class="text-muted">الموضوع</th>
                <th class="text-muted">نوع الخصم</th>
                <th class="text-muted">قيمة الخصم</th>
                <th class="text-muted">عدد ايام السله المتروكه</th>
                <th class="text-muted">الخصم صالح لمدة</th>
                <th class="text-muted">التذكير</th>
                <th class="text-muted">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in items"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td>
                  <h6 class="mb-0 fw-semibold">
                    {{ item.subject }}
                  </h6>
                </td>

                <td>
                  <span class="badge badge-primary">
                    {{ getDiscountTypeText(item.discount_type) }}
                  </span>
                </td>

                <td>
                  <span v-if="item.discount_value">
                    {{ item.discount_value }}
                    {{ item.discount_type === "percent" ? "%" : "ر.س" }}
                  </span>
                  <span v-else class="text-muted">-</span>
                </td>

                <td>
                  <span v-if="item.cart_left_days">
                    {{ item.cart_left_days }} يوم
                  </span>
                  <span v-else class="text-muted">-</span>
                </td>

                <td>
                  <span v-if="item.discount_valid_for_hours">
                    {{ item.discount_valid_for_hours }} ساعة
                  </span>
                  <span v-else class="text-muted">-</span>
                </td>

                <td>
                  <label
                    class="custom-switch w-100"
                    v-if="perminlocal.includes('cart_reminders-toggle')"
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

                <td class="text-center py-3">
                  <div class="btn-group">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="edit(item)"
                      v-if="perminlocal.includes('cart_reminders-update')"
                    >
                      تعديل
                    </button>
                    <button
                      class="btn btn-sm btn-outline-danger mx-1"
                      @click="del(item.id, index, item.subject)"
                      v-if="perminlocal.includes('cart_reminders-destroy')"
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
    <div class="text-center py-5" v-else>
      <img
        src="../../assets/img/Interse.png"
        alt=""
        class="d-block m-auto mb-3"
        style="max-width: 200px; opacity: 0.6"
      />
      <h5 class="text-muted mb-2">لا توجد تذكيرات بعد</h5>
      <p class="text-muted">قم بإنشاء تذكير جديد لبدء استخدام هذه الميزة</p>
    </div>

    <!-- Edit Reminder Modal -->
    <teleport to="body">
      <b-modal
        id="add"
        v-model="ShowModelEdit"
        hide-footer
        modal-class="reminder-isolated-modal"
      >
        <div class="imgtoadd">
          <img src="../../assets/img/Interse.png" alt="img2" />
        </div>
        <div
          class="mt-5 pos-relative reminder-isolated-modal-content"
          style="z-index: 5555"
        >
          <h6 style="color: #febcd5" class="text-center">تعديل تذكير</h6>
          <form @submit.prevent="updates">
            <div class="row">
              <!-- Conditions Section -->
              <div class="col-12">
                <h6 class="fw-semibold">شروط التذكر</h6>
                <p class="text-muted fs-10">
                  سيتم ارسال رسالة بعد ترك العميل للمتجر لفترة محدوده وتجاوز سلة
                  المشتريات لقيمة معينة
                </p>
              </div>

              <!-- Cart Left Days -->
              <div class="col-md-6 mb-3">
                <label class="form-label">مدة ترك السلة</label>
                <div class="position-relative">
                  <input
                    type="number"
                    placeholder="مدة ترك السلة"
                    class="form-control"
                    v-model="formData.cart_left_days"
                    :class="{ 'is-invalid': hasFieldError('cart_left_days') }"
                    @input="clearFieldError('cart_left_days')"
                    min="1"
                  />
                  <p
                    class="position-absolute fw-semibold"
                    style="top: 25%; left: 9%"
                  >
                    يوم
                  </p>
                </div>
                <div
                  v-if="hasFieldError('cart_left_days')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("cart_left_days") }}
                </div>
              </div>

              <!-- Total Cart -->
              <div class="col-md-6 mb-3">
                <label class="form-label">مجموع السلة</label>
                <div class="position-relative">
                  <input
                    type="number"
                    placeholder="مجموع السلة"
                    class="form-control"
                    v-model="formData.total_cart"
                    :class="{ 'is-invalid': hasFieldError('total_cart') }"
                    @input="clearFieldError('total_cart')"
                    min="0"
                    step="0.01"
                  />
                  <p
                    class="position-absolute fw-semibold"
                    style="top: 25%; left: 9%"
                  >
                    ر.س
                  </p>
                </div>
                <div
                  v-if="hasFieldError('total_cart')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("total_cart") }}
                </div>
              </div>

              <!-- Free Shipping Checkbox -->
              <div class="col-12 mb-3">
                <label class="ckbox">
                  <input
                    type="checkbox"
                    v-model="formData.is_free_shipping"
                    @change="clearFieldError('is_free_shipping')"
                  />
                  <span class="fw-semibold fs-7 ps-1"> شحن مجاني </span>
                </label>
                <div
                  v-if="hasFieldError('is_free_shipping')"
                  class="text-danger small mt-1"
                >
                  {{ getFieldError("is_free_shipping") }}
                </div>
              </div>

              <!-- Cart Discount Checkbox -->
              <div class="col-12 mb-3">
                <label class="ckbox mb-0">
                  <input
                    type="checkbox"
                    v-model="formData.is_cart_discounted"
                    @change="clearFieldError('is_cart_discounted')"
                  />
                  <span class="fw-semibold fs-7 ps-1"> خصم السلة </span>
                  <p class="text-muted fs-10 ms-4 mt-2 mb-0">
                    منح العميل خصم وتحديد نوع الخصم إما مبلغ ثابت او نسبة من سلة
                    المشتريات
                  </p>
                </label>
                <div
                  v-if="hasFieldError('is_cart_discounted')"
                  class="text-danger small mt-1"
                >
                  {{ getFieldError("is_cart_discounted") }}
                </div>
              </div>

              <!-- Discount Type -->
              <div class="col-6 mb-3">
                <label class="form-label">نوع الخصم</label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="discount_type"
                  placeholder="نوع الخصم"
                  v-model="formData.discount_type"
                  :class="{ 'is-invalid': hasFieldError('discount_type') }"
                  @select="clearFieldError('discount_type')"
                  :disabled="!formData.is_cart_discounted"
                />
                <div
                  v-if="hasFieldError('discount_type')"
                  class="text-danger small mt-1"
                >
                  {{ getFieldError("discount_type") }}
                </div>
              </div>

              <!-- Discount Value -->
              <div class="col-md-6 mb-3">
                <label class="form-label">قيمة الخصم</label>
                <input
                  type="number"
                  v-model="formData.discount_value"
                  class="form-control"
                  placeholder="قيمة الخصم"
                  :class="{ 'is-invalid': hasFieldError('discount_value') }"
                  @input="clearFieldError('discount_value')"
                  :disabled="!formData.is_cart_discounted"
                  min="0"
                  step="0.01"
                />
                <div
                  v-if="hasFieldError('discount_value')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("discount_value") }}
                </div>
              </div>

              <!-- Discount End Date -->
              <div class="col-md-6 mb-3">
                <label class="form-label">تاريخ نهاية الخصم</label>
                <input
                  type="date"
                  v-model="formData.discount_end_date"
                  class="form-control"
                  placeholder="تاريخ نهاية الخصم"
                  :class="{ 'is-invalid': hasFieldError('discount_end_date') }"
                  @input="clearFieldError('discount_end_date')"
                  :disabled="!formData.is_cart_discounted"
                  :min="minDiscountEndDate"
                />
                <div
                  v-if="hasFieldError('discount_end_date')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("discount_end_date") }}
                </div>
              </div>

              <!-- Send Channel -->
              <div class="col-6 mb-3">
                <label class="form-label">قناة الإرسال</label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="send_channel"
                  placeholder="قناة الإرسال"
                  v-model="formData.send_channel"
                  :class="{ 'is-invalid': hasFieldError('send_channel') }"
                  @select="clearFieldError('send_channel')"
                />
                <div
                  v-if="hasFieldError('send_channel')"
                  class="text-danger small mt-1"
                >
                  {{ getFieldError("send_channel") }}
                </div>
              </div>

              <!-- Subject -->
              <div class="col-6 mb-3">
                <label class="form-label">موضوع التذكير</label>
                <input
                  type="text"
                  v-model="formData.subject"
                  class="form-control"
                  placeholder="موضوع التذكير"
                  :class="{ 'is-invalid': hasFieldError('subject') }"
                  @input="clearFieldError('subject')"
                />
                <div v-if="hasFieldError('subject')" class="invalid-feedback">
                  {{ getFieldError("subject") }}
                </div>
              </div>

              <!-- Discount Valid Hours -->
              <div class="col-md-6 mb-3">
                <label class="form-label">مدة صلاح الخصم</label>
                <div class="position-relative">
                  <input
                    type="number"
                    placeholder="مدة صلاح الخصم"
                    class="form-control"
                    v-model="formData.discount_valid_for_hours"
                    :class="{
                      'is-invalid': hasFieldError('discount_valid_for_hours'),
                    }"
                    @input="clearFieldError('discount_valid_for_hours')"
                    :disabled="!formData.is_cart_discounted"
                    min="1"
                  />
                  <p
                    class="position-absolute fw-semibold"
                    style="top: 25%; left: 9%"
                  >
                    ساعة
                  </p>
                </div>
                <div
                  v-if="hasFieldError('discount_valid_for_hours')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("discount_valid_for_hours") }}
                </div>
              </div>

              <!-- Message -->
              <div class="col-md-6 mb-3">
                <label class="form-label">رسالة التذكير</label>
                <textarea
                  rows="3"
                  class="form-control"
                  placeholder="رسالة التذكير"
                  v-model="formData.message"
                  :class="{ 'is-invalid': hasFieldError('message') }"
                  @input="clearFieldError('message')"
                ></textarea>
                <div v-if="hasFieldError('message')" class="invalid-feedback">
                  {{ getFieldError("message") }}
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
import Multiselect from "@vueform/multiselect";
import Temporarydiscount from "./Temporarydiscount.vue";
import crudDataService from "../../Services/crudDataService";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js"; // Import the mixin

export default {
  components: {
    Multiselect,
    Temporarydiscount,
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
        "formData.cart_left_days",
        "formData.total_cart",
        "formData.discount_type",
        "formData.discount_value",
        "formData.discount_end_date",
        "formData.send_channel",
        "formData.subject",
        "formData.discount_valid_for_hours",
        "formData.message",
      ],
      discount_type: [
        { value: "fixed", name: "ثابتة" },
        { value: "percent", name: "نسبة مئوية" },
      ],
      send_channel: [
        { value: "email", name: "بريد الكتروني" },
        { value: "sms", name: "رسالة نصية" },
      ],
      loading: false,
      ShowModelEdit: false,
      id: null,
      items: [],
      formData: {
        is_free_shipping: true,
        is_cart_discounted: true,
        discount_type: "",
        discount_value: "",
        discount_end_date: "",
        send_channel: "",
        message: "",
        subject: "",
        discount_valid_for_hours: "",
        cart_left_days: "",
        total_cart: "",
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  computed: {
    // Minimum date for discount end date (today)
    minDiscountEndDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
  },
  methods: {
    // Validation rules for the form
    getValidationRules() {
      const rules = {
        subject: { required: true, label: "موضوع التذكير" },
        message: { required: true, label: "رسالة التذكير" },
        send_channel: { required: true, label: "قناة الإرسال" },
      };

      // Add discount-related validation if discount is enabled
      if (this.formData.is_cart_discounted) {
        rules["discount_type"] = { required: true, label: "نوع الخصم" };
        rules["discount_value"] = { required: true, label: "قيمة الخصم" };
        rules["discount_end_date"] = {
          required: true,
          label: "تاريخ نهاية الخصم",
        };
        rules["discount_valid_for_hours"] = {
          required: true,
          label: "مدة صلاح الخصم",
        };
      }

      return rules;
    },

    // Helper method to get discount type text
    getDiscountTypeText(type) {
      const typeMap = {
        fixed: "ثابتة",
        percent: "نسبة مئوية",
      };
      return typeMap[type] || type;
    },

    // Custom validation methods
    validateDiscountValue() {
      if (!this.formData.is_cart_discounted) return true;

      const value = parseFloat(this.formData.discount_value);
      const type = this.formData.discount_type;

      if (value <= 0) {
        this.setFieldErrors({
          discount_value: ["قيمة الخصم يجب أن تكون أكبر من صفر"],
        });
        return false;
      }

      if (type === "percent" && value > 100) {
        this.setFieldErrors({
          discount_value: ["نسبة الخصم يجب أن تكون أقل من أو تساوي 100%"],
        });
        return false;
      }

      return true;
    },

    validateDiscountEndDate() {
      if (!this.formData.is_cart_discounted || !this.formData.discount_end_date)
        return true;

      const today = new Date();
      const endDate = new Date(this.formData.discount_end_date);

      if (endDate <= today) {
        this.setFieldErrors({
          discount_end_date: ["تاريخ نهاية الخصم يجب أن يكون في المستقبل"],
        });
        return false;
      }

      return true;
    },

    validateCartValues() {
      let isValid = true;
      const errors = {};

      if (
        this.formData.cart_left_days &&
        parseInt(this.formData.cart_left_days) <= 0
      ) {
        errors["cart_left_days"] = ["مدة ترك السلة يجب أن تكون أكبر من صفر"];
        isValid = false;
      }

      if (
        this.formData.total_cart &&
        parseFloat(this.formData.total_cart) <= 0
      ) {
        errors["total_cart"] = ["مجموع السلة يجب أن يكون أكبر من صفر"];
        isValid = false;
      }

      if (!isValid) {
        this.setFieldErrors(errors);
      }

      return isValid;
    },

    edit(data) {
      this.clearAllErrors();
      this.ShowModelEdit = true;
      this.id = data.id;

      // Populate form data
      this.formData.cart_left_days = data.cart_left_days || "";
      this.formData.discount_end_date = data.discount_end_date || "";
      this.formData.discount_type = data.discount_type || "";
      this.formData.discount_valid_for_hours =
        data.discount_valid_for_hours || "";
      this.formData.discount_value = data.discount_value || "";
      this.formData.is_cart_discounted = data.is_cart_discounted || false;
      this.formData.is_free_shipping = data.is_free_shipping || false;
      this.formData.message = data.message || "";
      this.formData.send_channel = data.send_channel || "";
      this.formData.subject = data.subject || "";
      this.formData.total_cart = data.total_cart || "";
    },

    closeModal() {
      this.ShowModelEdit = false;
      this.clearAllErrors();
      this.resetFormData();
    },

    resetFormData() {
      this.formData = {
        is_free_shipping: true,
        is_cart_discounted: true,
        discount_type: "",
        discount_value: "",
        discount_end_date: "",
        send_channel: "",
        message: "",
        subject: "",
        discount_valid_for_hours: "",
        cart_left_days: "",
        total_cart: "",
      };
    },

    async updates() {
      this.clearAllErrors();

      // Validate form
      if (!this.validateForm(this.getValidationRules())) {
        this.toast.error("يرجى تصحيح الأخطاء في النموذج", {
          position: "top-center",
          timeout: 5000,
        });
        return;
      }

      // Custom validations
      const validations = [
        this.validateDiscountValue(),
        this.validateDiscountEndDate(),
        this.validateCartValues(),
      ];

      if (!validations.every((v) => v)) {
        this.toast.error("يرجى تصحيح الأخطاء في النموذج", {
          position: "top-center",
          timeout: 5000,
        });
        return;
      }

      this.isSubmitting = true;

      try {
        const response = await crudDataService.create(
          `cart_reminders/${this.id}?_method=put`,
          this.formData
        );

        this.ShowModelEdit = false;
        this.getcarts(); // Refresh the list

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

    async getcarts() {
      this.loading = true;
      try {
        const res = await crudDataService.getAll("cart_reminders");
        this.items = res.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.handleApiErrors(error, this.toast);
      } finally {
        this.loading = false;
      }
    },

    async toggleactive(id) {
      try {
        const response = await crudDataService.create(
          `cart_reminders/${id}/toggle`,
          ""
        );
        if (response.data.success) {
          this.toast.success(response.data.message, {
            position: "top-center",
            timeout: 3000,
          });
          // Refresh the list to get updated status
          this.getcarts();
        }
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف التذكير`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
          icon: "warning",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("cart_reminders", `${data}`)
              .then(() => {
                this.items.splice(index, 1);
                this.$swal.fire({
                  title: "تم الحذف بنجاح!",
                  icon: "success",
                  confirmButtonText: "تم",
                });
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

  watch: {
    // Watch discount checkbox to clear related errors
    "formData.is_cart_discounted"(newVal) {
      if (!newVal) {
        // Clear discount-related errors when discount is disabled
        this.clearFieldError("discount_type");
        this.clearFieldError("discount_value");
        this.clearFieldError("discount_end_date");
        this.clearFieldError("discount_valid_for_hours");

        // Reset discount-related fields
        this.formData.discount_type = "";
        this.formData.discount_value = "";
        this.formData.discount_end_date = "";
        this.formData.discount_valid_for_hours = "";
      }
    },
  },

  mounted() {
    this.getcarts();
  },
};
</script>
<style lang="scss">
.reminder-isolated-modal {
  .modal-content {
    overflow: unset;
  }
  .reminder-isolated-modal-content {
    height: 75vh;
    overflow: scroll;
    padding-bottom: 17px;
  }
  .modal-body {
    overflow-y: unset;
  }
  &.fade .modal-dialog {
    transition: transform 0.3s ease-out;
    transform: translate(0, -15%);
  }

  & .multiselect-placeholder,
  & ::placeholder {
    font-size: 12px;
  }
}
</style>
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
