<template>
  <section>
    <button
      @click="
        () => {
          ShowModel = true;
          clearAllErrors();
        }
      "
      class="btn-add me-0 mb-4"
      v-if="perminlocal.includes('vendors-index')"
    >
      <i class="fe fe-plus"></i>
      بائع جديد
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
      <section v-if="myList.length > 0">
        <vue-good-table
          :columns="filteredColumns"
          :rows="rows"
          :search-options="{ enabled: true }"
          :group-options="{ enabled: false }"
          :pagination-options="{
            enabled: true,
            perPageDropdownEnabled: false,
          }"
          :compactMode="true"
          :rtl="true"
        >
          <template #table-row="props">
            <span v-if="props.column.field === 'vendors'" class="vendor">
              <button
                @click="view(props.row.id)"
                v-for="item in props.row.vendors"
                :key="item.id"
                class="btn text-primary"
              >
                {{ item.name }}
              </button>
            </span>
            <span v-if="props.column.field === 'phone'" class="vendor">
              <a :href="`tel:+${props.row.phone}`" class="">
                {{ props.row.phone }}
              </a>
            </span>
            <span v-if="props.column.field === 'email'" class="vendor">
              <a :href="`mailto:${props.row.email}`" class="">
                {{ props.row.email }}
              </a>
            </span>
            <span v-if="props.column.field == 'actions'">
              <button
                class="btn btn-info me-2"
                @click="view(props.row.store.id)"
                v-if="perminlocal.includes('vendors-show')"
              >
                <i class="si si-eye"></i>
              </button>

              <button
                class="btn btn-primary me-2"
                @click="edit(props.row)"
                v-if="perminlocal.includes('vendors-update')"
              >
                <i class="fe fe-edit-2"></i>
              </button>
              <button
                class="btn btn-danger me-2"
                @click="del(props.row.id, props.index, props.row.name)"
                v-if="perminlocal.includes('vendors-destroy')"
              >
                <i class="fe fe-trash"></i>
              </button>
            </span>
          </template>
        </vue-good-table>
        <b-pagination
          v-model="page"
          :total-rows="last"
          :per-page="1"
          @click="paginag(page)"
          class="justify-content-end mt-4"
        ></b-pagination>
      </section>

      <section
        class="position-relative"
        style="height: 100vh; display: grid; place-items: center"
        v-else
      >
        <div
          style="background: #fd601f; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد بائعين حتي الان
        </div>
      </section>
    </section>

    <!-- Add Vendor Modal -->
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer title="اضافة بائع">
        <div class="p-0">
          <form @submit.prevent="add" autocomplete="off">
            <div class="row">
              <!-- First Name -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الاسم الاول </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.fname"
                    :class="{ 'is-invalid': hasFieldError('fname') }"
                    @input="clearFieldError('fname')"
                  />
                  <div v-if="hasFieldError('fname')" class="invalid-feedback">
                    {{ getFieldError("fname") }}
                  </div>
                </div>
              </div>

              <!-- Last Name -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الاسم الثاني </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.lname"
                    :class="{ 'is-invalid': hasFieldError('lname') }"
                    @input="clearFieldError('lname')"
                  />
                  <div v-if="hasFieldError('lname')" class="invalid-feedback">
                    {{ getFieldError("lname") }}
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="col-12">
                <div class="mt-1">
                  <label> الايميل </label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="formData.email"
                    autocomplete="one-time-code"
                    :class="{ 'is-invalid': hasFieldError('email') }"
                    @input="clearFieldError('email')"
                  />
                  <div v-if="hasFieldError('email')" class="invalid-feedback">
                    {{ getFieldError("email") }}
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="col-12">
                <div class="mt-1">
                  <label> الجوال </label>
                  <input
                    type="tel"
                    class="form-control"
                    v-model="formData.phone"
                    autocomplete="one-time-code"
                    :class="{ 'is-invalid': hasFieldError('phone') }"
                    @input="clearFieldError('phone')"
                  />
                  <div v-if="hasFieldError('phone')" class="invalid-feedback">
                    {{ getFieldError("phone") }}
                  </div>
                </div>
              </div>
              <!-- Birth Date -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> تاريخ الميلاد</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="formData.birth_date"
                    :class="{ 'is-invalid': hasFieldError('birth_date') }"
                    @input="clearFieldError('birth_date')"
                    :max="maxBirthDate"
                  />
                  <div
                    v-if="hasFieldError('birth_date')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("birth_date") }}
                  </div>
                </div>
              </div>
              <!-- Gender -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> النوع </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="gender"
                    placeholder="اختر النوع "
                    v-model="formData.gender"
                    :class="{ 'is-invalid': hasFieldError('gender') }"
                    @select="clearFieldError('gender')"
                  />
                  <div
                    v-if="hasFieldError('gender')"
                    class="text-danger small mt-1"
                  >
                    {{ getFieldError("gender") }}
                  </div>
                </div>
              </div>
              <!-- Password -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الرقم السري </label>
                  <div class="d-flex align-items-center">
                    <input
                      class="form-control"
                      v-model="formData.password"
                      :type="passwordVisible ? 'text' : 'password'"
                      autocomplete="one-time-code"
                      :class="{ 'is-invalid': hasFieldError('password') }"
                      @input="clearFieldError('password')"
                    />
                    <i
                      @click="togglePasswordVisibility"
                      :class="
                        passwordVisible ? 'ti-eye' : 'mdi mdi-eye-off-outline'
                      "
                      style="
                        padding: 8px;
                        border: 1px solid #e8e8f7;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-left: 5px;
                      "
                    >
                    </i>
                  </div>
                  <div
                    v-if="hasFieldError('password')"
                    class="invalid-feedback d-block"
                  >
                    {{ getFieldError("password") }}
                  </div>
                </div>
              </div>

              <!-- Password Confirmation -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> تاكيد الرقم السري</label>
                  <div class="d-flex align-items-center">
                    <input
                      :type="passwordconfVisible ? 'text' : 'password'"
                      class="form-control"
                      v-model="formData.password_confirmation"
                      autocomplete="one-time-code"
                      :class="{
                        'is-invalid': hasFieldError('password_confirmation'),
                      }"
                      @input="clearFieldError('password_confirmation')"
                    />
                    <i
                      @click="togglePassword"
                      :class="
                        passwordconfVisible
                          ? 'ti-eye'
                          : 'mdi mdi-eye-off-outline'
                      "
                      style="
                        padding: 8px;
                        border: 1px solid #e8e8f7;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-left: 5px;
                      "
                    >
                    </i>
                  </div>
                  <div
                    v-if="hasFieldError('password_confirmation')"
                    class="invalid-feedback d-block"
                  >
                    {{ getFieldError("password_confirmation") }}
                  </div>
                </div>
              </div>

              <!-- Store Selection -->
              <div class="col-12">
                <div class="mt-1">
                  <label> المتجر </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="allstores"
                    v-model="formData.store_id"
                    placeholder="اختر المتجر"
                    :class="{ 'is-invalid': hasFieldError('store_id') }"
                    @select="clearFieldError('store_id')"
                  />
                  <div
                    v-if="hasFieldError('store_id')"
                    class="text-danger small mt-1"
                  >
                    {{ getFieldError("store_id") }}
                  </div>
                </div>
              </div>
            </div>

            <button
              class="btn btn-primary m-auto d-block mt-3"
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

    <!-- Edit Vendor Modal -->
    <teleport to="body">
      <b-modal
        id="edit-page"
        v-model="ShowModeledit"
        hide-footer
        title="تعديل البائع"
      >
        <div class="p-0">
          <form @submit.prevent="update">
            <div class="row">
              <!-- First Name -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الاسم الاول </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formDataupdate.fname"
                    :class="{ 'is-invalid': hasFieldError('fname') }"
                    @input="clearFieldError('fname')"
                  />
                  <div v-if="hasFieldError('fname')" class="invalid-feedback">
                    {{ getFieldError("fname") }}
                  </div>
                </div>
              </div>

              <!-- Last Name -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الاسم الثاني </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formDataupdate.lname"
                    :class="{ 'is-invalid': hasFieldError('lname') }"
                    @input="clearFieldError('lname')"
                  />
                  <div v-if="hasFieldError('lname')" class="invalid-feedback">
                    {{ getFieldError("lname") }}
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="col-12">
                <div class="mt-1">
                  <label> الايميل </label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="formDataupdate.email"
                    :class="{ 'is-invalid': hasFieldError('email') }"
                    @input="clearFieldError('email')"
                  />
                  <div v-if="hasFieldError('email')" class="invalid-feedback">
                    {{ getFieldError("email") }}
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="col-12">
                <div class="mt-1">
                  <label> الجوال </label>
                  <input
                    type="tel"
                    class="form-control"
                    v-model="formDataupdate.phone"
                    :class="{ 'is-invalid': hasFieldError('phone') }"
                    @input="clearFieldError('phone')"
                  />
                  <div v-if="hasFieldError('phone')" class="invalid-feedback">
                    {{ getFieldError("phone") }}
                  </div>
                </div>
              </div>

              <!-- Birth Date -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> تاريخ الميلاد</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="formDataupdate.birth_date"
                    :class="{ 'is-invalid': hasFieldError('birth_date') }"
                    @input="clearFieldError('birth_date')"
                    :max="maxBirthDate"
                  />
                  <div
                    v-if="hasFieldError('birth_date')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("birth_date") }}
                  </div>
                </div>
              </div>

              <!-- Gender -->
              <div class="col-md-6">
                <div class="mt-1">
                  <label> النوع </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="gender"
                    placeholder="اختر النوع "
                    v-model="formDataupdate.gender"
                    :class="{ 'is-invalid': hasFieldError('gender') }"
                    @select="clearFieldError('gender')"
                  />
                  <div
                    v-if="hasFieldError('gender')"
                    class="text-danger small mt-1"
                  >
                    {{ getFieldError("gender") }}
                  </div>
                </div>
              </div>

              <!-- Store Selection -->
              <div class="col-12">
                <div class="mt-1">
                  <label> المتجر </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="allstores"
                    v-model="formDataupdate.store_id"
                    placeholder="اختر المتجر"
                    :class="{ 'is-invalid': hasFieldError('store_id') }"
                    @select="clearFieldError('store_id')"
                  />
                  <div
                    v-if="hasFieldError('store_id')"
                    class="text-danger small mt-1"
                  >
                    {{ getFieldError("store_id") }}
                  </div>
                </div>
              </div>
            </div>

            <button
              class="btn btn-primary m-auto d-block mt-3"
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
import moment from "moment";
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
        "formData.fname",
        "formData.lname",
        "formData.email",
        "formData.phone",
        "formData.birth_date",
        "formData.password",
        "formData.password_confirmation",
        "formData.store_id",
        "formDataupdate.fname",
        "formDataupdate.lname",
        "formDataupdate.email",
        "formDataupdate.phone",
        "formDataupdate.birth_date",
        "formDataupdate.gender",
        "formDataupdate.store_id",
      ],
      allstores: [],
      id: null,
      ShowModeledit: false,
      ShowModel: false,
      myList: [],
      formData: {
        email: "",
        fname: "",
        lname: "",
        phone: "",
        password: "",
        birth_date: "",
        gender: "",
        password_confirmation: "",
        store_id: "",
      },
      formDataupdate: {
        email: "",
        fname: "",
        lname: "",
        phone: "",
        birth_date: "",
        gender: "",
        store_id: "",
      },
      gender: [
        { value: "male", name: "ذكر" },
        { value: "female", name: "انثي" },
      ],
      loading: false,
      perminlocal: localStorage.getItem("permissions"),
      passwordVisible: false,
      passwordconfVisible: false,
      columns: [
        {
          label: "الإسم",
          field: "name",
        },
        {
          label: "رقم الجوال",
          field: "phone",
        },
        {
          label: "البريد الالكتروني",
          field: "email",
        },
        {
          label: "المتجر",
          field: "store.name",
        },
        {
          label: "فعل",
          field: "actions",
        },
      ],
      rows: [],
      page: 1,
      last: 1,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },

    togglePassword() {
      this.passwordconfVisible = !this.passwordconfVisible;
    },

    // Validation rules for add form
    getAddValidationRules() {
      return {
        fname: { required: true, label: "الاسم الأول" },
        lname: { required: true, label: "الاسم الثاني" },
        email: { required: true, email: true, label: "البريد الإلكتروني" },
        phone: { required: true, label: "رقم الجوال" },
        password: { required: true, minLength: 6, label: "كلمة المرور" },
        password_confirmation: { required: true, label: "تأكيد كلمة المرور" },
        store_id: { required: true, label: "المتجر" },
      };
    },

    // Validation rules for edit form
    getEditValidationRules() {
      return {
        fname: { required: true, label: "الاسم الأول" },
        lname: { required: true, label: "الاسم الثاني" },
        email: { required: true, email: true, label: "البريد الإلكتروني" },
        phone: { required: true, label: "رقم الجوال" },
        store_id: { required: true, label: "المتجر" },
      };
    },

    // Custom validation for password confirmation
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

    async edit(data) {
      console.log(data, "lll");

      this.clearAllErrors();
      this.ShowModeledit = true;
      this.id = data.id;

      this.formDataupdate.fname = data.fname;
      this.formDataupdate.email = data.email;
      this.formDataupdate.lname = data.lname;
      this.formDataupdate.phone = data.phone;
      if (data.birth_date && moment(data.birth_date).isValid()) {
        this.formDataupdate.birth_date = moment(data.birth_date).format(
          "YYYY-MM-DD"
        );
      } else {
        // Set to yesterday (today - 1 day)
        this.formDataupdate.birth_date = moment()
          .subtract(1, "day")
          .format("YYYY-MM-DD");
      }
      this.formDataupdate.gender = data.gender;
      this.formDataupdate.store_id = data.store.id;
    },

    async update() {
      this.clearAllErrors();

      this.isSubmitting = true;

      try {
        const res = await crudDataService.create(
          `vendors/${this.id}?_method=put`,
          this.formDataupdate
        );

        this.vendors();
        this.ShowModeledit = false;

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

    async stores() {
      try {
        const res = await crudDataService.getAll("stores");
        this.allstores = res.data.data.data.map((store) => ({
          value: store.id,
          name: store.name,
        }));
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    async vendors() {
      this.loading = true;
      try {
        const res = await crudDataService.getAll("vendors");
        this.myList = res.data.data.data;
        this.last = res.data.data.last_page;
        if (res.data && res.data.data && res.data.data.data) {
          this.rows = res.data.data.data.map((vendor) => {
            return { ...vendor };
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.handleApiErrors(error, this.toast);
      } finally {
        this.loading = false;
      }
    },

    async paginag(p) {
      try {
        const res = await crudDataService.getAll(`vendors?page=${this.page}`);
        this.myList = res.data.data.data;
        this.rows = res.data.data.data.map((vendor) => ({ ...vendor }));
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    singleoffer(id) {
      this.$router.push({ name: "SingleOffer", params: { id } });
    },

    del(data, index, name) {
      this.$swal
        .fire({
          title: `هل تريد حذف البائع "${name}"؟`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
          icon: "warning",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("vendors", `${data}`)
              .then(() => {
                this.$swal.fire({
                  title: "تم الحذف بنجاح!",
                  icon: "success",
                  confirmButtonText: "تم",
                });
                this.rows.splice(index, 1);
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

    resetFormData() {
      this.formData = {
        email: "",
        fname: "",
        lname: "",
        phone: "",
        password: "",
        password_confirmation: "",
        store_id: "",
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
        const response = await crudDataService.create(`vendors`, this.formData);

        this.vendors();
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

    view(id) {
      this.$router.push({ name: "SingleStore", params: { id } });
    },
  },

  computed: {
    maxBirthDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
    filteredColumns() {
      if (
        !this.perminlocal.includes("vendors-show") ||
        !this.perminlocal.includes("vendors-update") ||
        !this.perminlocal.includes("vendors-destroy")
      ) {
        return this.columns?.length ? this.columns : [];
      }
      return this.columns;
    },
  },

  mounted() {
    this.vendors();
    this.stores();
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

.tab-menu-heading {
  border: 1px solid #e8e8f7;
}

.tabs-style-3 .nav.panel-tabs li a {
  padding: 10px 18px 10px 18px;
  background: transparent;
  border-radius: 0;
  margin: 0;
  text-align: center;
  display: block;
  color: #14112d;
}

// Loading state for buttons
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

// Password toggle icon styling
i[class*="ti-eye"],
i[class*="mdi-eye"] {
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #f8f9fa;
  }
}
</style>

<style lang="scss">
.modal {
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
  .modal-dialog {
    margin: 8.75rem auto;
  }
}

.dp__menu_index {
  z-index: 999999999 !important;
}

.dp__input_icon {
  margin-right: auto !important;
}

.dp__action_buttons {
  text-align: left;
  .dp__action.dp__cancel {
    display: none;
  }
}
</style>
