<template>
  <section class="mt-5 pt-5">
    <div class="pos-relative">
      <button
        @click="showAddModal"
        class="btn-add me-0 mb-4"
        v-if="perminlocal.includes('deliveries-store')"
      >
        <i class="fe fe-plus"></i>
        رجل توصيل جديد
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

    <!-- Delivery List -->
    <section v-else>
      <div class="card custom-card border-0 mg-b-20" v-if="myList.length > 0">
        <div class="card-body p-0">
          <div class="table-responsive border-0 rounded border-bottom-0 mb-0">
            <table
              class="table table-bordered text-nowrap text-md-nowrap mg-b-0"
            >
              <tr>
                <td class="text-muted">الاسم</td>
                <td class="text-muted">البريد الالكتروني</td>
                <td class="text-muted">رقم الجوال</td>
                <td class="text-muted">الحالة</td>
                <td class="text-muted">التفعيل</td>
              </tr>
              <tr
                v-for="(item, index) in myList"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td>
                  {{ item.full_name }}
                </td>
                <td>
                  {{ item.email }}
                </td>
                <td>
                  {{ item.phone }}
                </td>
                <td>
                  {{ item.status }}
                </td>

                <td>
                  <label
                    class="custom-switch justify-content-start w-100"
                    v-if="perminlocal.includes('deliveries-toggle')"
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
                    v-if="perminlocal.includes('deliveries-update')"
                  >
                    <i class="fe fe-edit-2 text-info"></i>
                  </button>
                  <button
                    class="btn me-2"
                    @click="del(item.id, index, item.full_name)"
                    v-if="perminlocal.includes('deliveries-destroy')"
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
          لا يوجد توصيل حتي الان
        </div>
      </section>
    </section>

    <!-- Add Delivery Modal -->
    <teleport to="body">
      <b-modal
        id="add"
        v-model="ShowModel"
        hide-footer
        title="اضافة رجل توصيل"
        modal-class="delivery-model"
      >
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="add">
            <div class="row">
              <!-- First Name -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label>الاسم الاول</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.fname"
                    :class="{ 'is-invalid': hasFieldError('fname') }"
                    @input="clearFieldError('fname')"
                    placeholder="الاسم الأول"
                  />
                  <div v-if="hasFieldError('fname')" class="invalid-feedback">
                    {{ getFieldError("fname") }}
                  </div>
                </div>
              </div>

              <!-- Last Name -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم الاخير</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.lname"
                    :class="{ 'is-invalid': hasFieldError('lname') }"
                    @input="clearFieldError('lname')"
                    placeholder="الاسم الأخير"
                  />
                  <div v-if="hasFieldError('lname')" class="invalid-feedback">
                    {{ getFieldError("lname") }}
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>البريد الالكتروني</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="formData.email"
                    :class="{ 'is-invalid': hasFieldError('email') }"
                    @input="clearFieldError('email')"
                  />
                  <div v-if="hasFieldError('email')" class="invalid-feedback">
                    {{ getFieldError("email") }}
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>رقم الجوال</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.phone"
                    :class="{ 'is-invalid': hasFieldError('phone') }"
                    @input="clearFieldError('phone')"
                  />
                  <div v-if="hasFieldError('phone')" class="invalid-feedback">
                    {{ getFieldError("phone") }}
                  </div>
                </div>
              </div>

              <!-- Password -->
              <div class="col-6 mb-3">
                <label>كلمة السر</label>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    v-model="formData.password"
                    :class="{ 'is-invalid': hasFieldError('password') }"
                    @input="clearFieldError('password')"
                    placeholder="كلمة المرور"
                  />
                </div>
              </div>

              <!-- Password Confirmation -->
              <div class="col-6 mb-3">
                <label>تاكيد كلمة السر</label>
                <div class="input-group">
                  <input
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    class="form-control"
                    v-model="formData.password_confirmation"
                    :class="{
                      'is-invalid': hasFieldError('password_confirmation'),
                    }"
                    @input="clearFieldError('password_confirmation')"
                    placeholder="تأكيد كلمة المرور"
                  />
                </div>
              </div>

              <!-- City -->
              <div class="col-md-12 mb-3">
                <div class="mt-1">
                  <label>المدينة</label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="cities"
                    placeholder="اختر المدينة"
                    v-model="formData.city_id"
                    :class="{ 'is-invalid': hasFieldError('city_id') }"
                    @select="clearFieldError('city_id')"
                  />
                  <div
                    v-if="hasFieldError('city_id')"
                    class="text-danger small mt-1"
                  >
                    {{ getFieldError("city_id") }}
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

    <!-- Edit Delivery Modal -->
    <teleport to="body">
      <b-modal
        id="edit"
        v-model="ShowEditModel"
        hide-footer
        title="تعديل رجل التوصيل"
        modal-class="delivery-model"
      >
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="update">
            <div class="row">
              <!-- First Name -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم الاول</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.fname"
                    :class="{ 'is-invalid': hasFieldError('fname') }"
                    @input="clearFieldError('fname')"
                    placeholder="الاسم الأول"
                  />
                  <div v-if="hasFieldError('fname')" class="invalid-feedback">
                    {{ getFieldError("fname") }}
                  </div>
                </div>
              </div>

              <!-- Last Name -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم الاخير</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.lname"
                    :class="{ 'is-invalid': hasFieldError('lname') }"
                    @input="clearFieldError('lname')"
                    placeholder="الاسم الأخير"
                  />
                  <div v-if="hasFieldError('lname')" class="invalid-feedback">
                    {{ getFieldError("lname") }}
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>البريد الالكتروني</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="EditData.email"
                    :class="{ 'is-invalid': hasFieldError('email') }"
                    @input="clearFieldError('email')"
                  />
                  <div v-if="hasFieldError('email')" class="invalid-feedback">
                    {{ getFieldError("email") }}
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>رقم الجوال</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.phone"
                    :class="{ 'is-invalid': hasFieldError('phone') }"
                    @input="clearFieldError('phone')"
                  />
                  <div v-if="hasFieldError('phone')" class="invalid-feedback">
                    {{ getFieldError("phone") }}
                  </div>
                </div>
              </div>

              <!-- City -->
              <div class="col-md-12 mb-3">
                <div class="mt-1">
                  <label>المدينة</label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="cities"
                    placeholder="اختر المدينة"
                    v-model="EditData.city_id"
                    :class="{ 'is-invalid': hasFieldError('city_id') }"
                    @select="clearFieldError('city_id')"
                  />
                  <div
                    v-if="hasFieldError('city_id')"
                    class="text-danger small mt-1"
                  >
                    {{ getFieldError("city_id") }}
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
      showPassword: false,
      showPasswordConfirm: false,
      // Define fields to watch for automatic error clearing
      watchedFields: [
        "formData.fname",
        "formData.lname",
        "formData.email",
        "formData.phone",
        "formData.password",
        "formData.password_confirmation",
        "formData.city_id",
        "EditData.fname",
        "EditData.lname",
        "EditData.email",
        "EditData.phone",
        "EditData.city_id",
      ],
      ShowModel: false,
      ShowEditModel: false,
      myList: [],
      id: null,
      loading: false,
      cities: [],
      formData: {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        city_id: "",
      },
      EditData: {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        city_id: "",
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    // Validation rules for add form
    getAddValidationRules() {
      return {
        fname: { required: true, label: "الاسم الأول" },
        lname: { required: true, label: "الاسم الأخير" },
        email: { required: true, email: true, label: "البريد الإلكتروني" },
        phone: { required: true, label: "رقم الجوال" },
        password: { required: true, minLength: 6, label: "كلمة المرور" },
        password_confirmation: { required: true, label: "تأكيد كلمة المرور" },
        city_id: { required: true, label: "المدينة" },
      };
    },

    // Validation rules for edit form
    getEditValidationRules() {
      return {
        fname: { required: true, label: "الاسم الأول" },
        lname: { required: true, label: "الاسم الأخير" },
        email: { required: true, email: true, label: "البريد الإلكتروني" },
        phone: { required: true, label: "رقم الجوال" },
        city_id: { required: true, label: "المدينة" },
      };
    },

    // Helper methods for status display
    getStatusText(status) {
      const statusMap = {
        active: "نشط",
        inactive: "غير نشط",
        busy: "مشغول",
        available: "متاح",
      };
      return statusMap[status] || status;
    },

    getStatusBadgeClass(status) {
      const classMap = {
        active: "badge-success",
        available: "badge-success",
        inactive: "badge-secondary",
        busy: "badge-warning",
      };
      return classMap[status] || "badge-secondary";
    },

    // Custom validation methods
    validatePasswordConfirmation() {
      if (this.formData.password !== this.formData.password_confirmation) {
        this.setFieldErrors({
          password_confirmation: [
            "كلمة المرور وتأكيد كلمة المرور غير متطابقتين",
          ],
        });
        return false;
      }
      return true;
    },

    async allcities() {
      try {
        const res = await axios.get(
          "https://mall-express.code7x.com/api/cities"
        );
        this.cities = res.data.data.map((city) => ({
          value: city.id,
          name: city.name,
        }));
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    async toggleactive(id) {
      try {
        const res = await crudDataService.create(`deliveries/${id}/toggle`, "");
        if (res.data.status) {
          this.toast.success(res.data.message, {
            position: "top-center",
            timeout: 3000,
          });
          // Refresh the list to get updated status
          this.deliveries();
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
      this.EditData.fname = data.fname;
      this.EditData.lname = data.lname;
      this.EditData.email = data.email;
      this.EditData.city_id = data.city?.id || "";
      this.EditData.phone = data.phone;
    },

    async update() {
      this.clearAllErrors();

      this.isSubmitting = true;

      try {
        const res = await crudDataService.create(
          `deliveries/${this.id}?_method=put`,
          this.EditData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.ShowEditModel = false;
        this.deliveries();

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

    async deliveries() {
      this.loading = true;
      try {
        const res = await crudDataService.getAll("deliveries");
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
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        city_id: "",
      };
      this.clearAllErrors();
    },

    async add() {
      this.clearAllErrors();

      // Validate add form
      if (!this.validateForm(this.getAddValidationRules())) {
        return;
      }

      // Custom password confirmation validation
      if (!this.validatePasswordConfirmation()) {
        return;
      }

      this.isSubmitting = true;

      try {
        const response = await crudDataService.create(
          `deliveries`,
          this.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.deliveries();
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

    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف رجل التوصيل`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
          icon: "warning",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("deliveries", `${data}`)
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
    this.allcities();
    this.deliveries();
  },
};
</script>
<style lang="scss">
.delivery-model {
  &.fade .modal-dialog {
    transform: none !important;
  }
  &.show .modal-dialog {
    transform: none !important;
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
