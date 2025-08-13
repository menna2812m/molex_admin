<template>
  <section>
    <button
      class="bg-transparent twobtn"
      style="
        color: #fd601f;
        border: 1px solid #fd601f;
        border-bottom: 1px solid #fd601f !important;
      "
      @click="showModal()"
    >
      اضافة تذكير
    </button>

    <!-- Cart Reminder Modal -->
    <teleport to="body">
      <b-modal
        id="add"
        v-model="ShowModel"
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
          <h6 style="color: #febcd5" class="text-center">إنشاء تذكير جديد</h6>
          <form @submit.prevent="add(id)">
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

              <!-- Total Cart Value -->
              <div class="col-md-6 mb-3">
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
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService";
import { useToast } from "vue-toastification";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js"; // Import the mixin

export default {
  props: ["id"],
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
      ShowModel: false,
      discount_type: [
        { value: "fixed", name: "ثابتة" },
        { value: "percent", name: "نسبة مئوية" },
      ],
      send_channel: [
        { value: "email", name: "بريد الكتروني" },
        { value: "sms", name: "رسالة نصية" },
      ],
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
        user_ids: [],
      },
    };
  },
  components: {
    Multiselect,
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

      // Add conditional validation based on user ID
      if (!this.id) {
        rules["cart_left_days"] = { required: true, label: "مدة ترك السلة" };
        rules["total_cart"] = { required: true, label: "مجموع السلة" };
      }

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

    validateCartLeftDays() {
      if (this.id) return true; // Skip for specific user

      const days = parseInt(this.formData.cart_left_days);

      if (days <= 0) {
        this.setFieldErrors({
          cart_left_days: ["مدة ترك السلة يجب أن تكون أكبر من صفر"],
        });
        return false;
      }

      return true;
    },

    validateTotalCart() {
      if (this.id) return true; // Skip for specific user

      const total = parseFloat(this.formData.total_cart);

      if (total <= 0) {
        this.setFieldErrors({
          total_cart: ["مجموع السلة يجب أن يكون أكبر من صفر"],
        });
        return false;
      }

      return true;
    },

    async showModal() {
      this.clearAllErrors();
      this.ShowModel = true;
    },

    closeModal() {
      this.ShowModel = false;
      this.resetForm();
    },

    resetForm() {
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
        user_ids: [],
      };
      this.clearAllErrors();
    },

    async add(id) {
      this.clearAllErrors();

      // Validate basic form fields
      if (!this.validateForm(this.getValidationRules())) {
        return;
      }

      // Custom validations
      const validations = [
        this.validateDiscountValue(),
        this.validateDiscountEndDate(),
        this.validateCartLeftDays(),
        this.validateTotalCart(),
      ];

      if (!validations.every((v) => v)) {
        return;
      }

      this.isSubmitting = true;

      try {
        // Prepare form data
        const submitData = { ...this.formData };

        if (id) {
          // For specific user, clear cart conditions and set user_ids
          submitData.total_cart = null;
          submitData.cart_left_days = null;
          submitData.user_ids = [id];
        } else {
          // For general reminder, ensure user_ids is empty
          submitData.user_ids = [];
        }

        const response = await crudDataService.create(
          "cart_reminders",
          submitData
        );

        this.ShowModel = false;
        this.resetForm();

        this.toast.success("تم إنشاء التذكير بنجاح", {
          position: "top-center",
          timeout: 3000,
        });
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      } finally {
        this.isSubmitting = false;
      }
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
};
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  height: 160px;
  background: url(/src/assets/img/Groupqw.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  .input {
    width: 95%;
    margin-right: auto;
  }
}

.text-danger {
  color: #dc3545 !important;
}

// Loading state for buttons
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

// Disabled field styling
input:disabled,
textarea:disabled {
  background-color: #f8f9fa;
  opacity: 0.6;
}
</style>

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

  & .multiselect-placeholder,
  & ::placeholder {
    font-size: 12px;
  }
}

.imgtoadd {
  background: #fff;
  width: 100px;
  height: 100px;
  position: absolute;
  right: 40%;
  border-radius: 50%;
  top: -50px;
  text-align: center;

  img {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
}

@media (min-width: 576px) {
  .reminder-isolated-modal .modal-dialog {
    max-width: 620px;
    margin: 8.75rem auto;
  }
}

.ckbox span:after {
  background-color: #fe7eae;
}
</style>
