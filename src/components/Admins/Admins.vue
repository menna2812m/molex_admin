<template>
  <section class="mt-5">
    <div
      class="border p-3 mb-3 d-flex justify-content-between align-items-center"
      style="border-radius: 8px"
    >
      <h4 class="mb-0">المسئولين</h4>
      <button
        class="fs-15 btn-add"
        @click="openAddModal"
        v-if="perminlocal.includes('admins-store')"
      >
        <i class="fe fe-plus"></i>
        اضافة مسؤول جديد
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
      <div class="card custom-card border-0 mg-b-20" v-if="items.length > 0">
        <div class="card-body p-0">
          <div
            class="table-responsive border-item rounded border-bottom-0 mb-0"
          >
            <table
              class="table table-bordered text-nowrap text-md-nowrap mg-b-0"
            >
              <thead>
                <tr>
                  <th>الصورة</th>
                  <th>الاسم</th>
                  <th>رقم الجوال</th>
                  <th>البريد الإلكتروني</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="index"
                  class="list_item py-3 w-100 align-items-center justify-content-between"
                >
                  <td>
                    <img
                      :src="item.image"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        object-fit: cover;
                      "
                    />
                  </td>
                  <td @click="oneadmin(item.id)" style="cursor: pointer">
                    {{ item.name }}
                  </td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <label
                      class="custom-switch justify-content-center w-100"
                      v-if="perminlocal.includes('admins-toggle')"
                    >
                      <input
                        type="checkbox"
                        name="custom-switch-checkbox"
                        class="custom-switch-input border-bottom-0"
                        :checked="item.is_active"
                        @change="toggleactive(item.id)"
                      />
                      <span class="custom-switch-description"></span>
                      <span class="custom-switch-indicator"></span>
                    </label>
                  </td>
                  <td>
                    <button
                      class="btn me-2"
                      @click="del(item.id, index, item.name)"
                      v-if="perminlocal.includes('admins-destroy')"
                    >
                      <i class="fe fe-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
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
          لا يوجد مسؤولين حتي الان
        </div>
      </section>
    </section>

    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModel"
        hide-footer
        modal-class="admins-model"
      >
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">إضافة مسئول جديد</h6>
          <form @submit.prevent="add">
            <div class="row">
              <!-- الاسم -->
              <div class="col-12 mb-3">
                <label>الاسم <span class="text-danger">*</span></label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('name') }"
                  v-model="formData.name"
                  @input="clearFieldError('name')"
                  @focus="clearFieldError('name')"
                  placeholder="اسم المسؤول"
                />
                <div v-if="hasFieldError('name')" class="invalid-feedback">
                  {{ getFieldError("name") }}
                </div>
              </div>

              <!-- البريد الالكتروني -->
              <div class="col-12 mb-3">
                <label
                  >البريد الالكتروني <span class="text-danger">*</span></label
                >
                <input
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('email') }"
                  v-model="formData.email"
                  @input="clearFieldError('email')"
                  @focus="clearFieldError('email')"
                />
                <div v-if="hasFieldError('email')" class="invalid-feedback">
                  {{ getFieldError("email") }}
                </div>
              </div>

              <!-- رقم الجوال -->
              <div class="col-12 mb-3">
                <label>رقم الجوال <span class="text-danger">*</span></label>
                <input
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('phone') }"
                  v-model="formData.phone"
                  @input="clearFieldError('phone')"
                  @focus="clearFieldError('phone')"
                />
                <div v-if="hasFieldError('phone')" class="invalid-feedback">
                  {{ getFieldError("phone") }}
                </div>
              </div>

              <!-- كلمة السر -->
              <div class="col-6 mb-3">
                <label>كلمة السر <span class="text-danger">*</span></label>
                <input
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('password') }"
                  v-model="formData.password"
                  @input="clearFieldError('password')"
                  @focus="clearFieldError('password')"
                  placeholder="كلمة السر"
                />
                <div v-if="hasFieldError('password')" class="invalid-feedback">
                  {{ getFieldError("password") }}
                </div>
              </div>

              <!-- تاكيد كلمة السر -->
              <div class="col-6 mb-3">
                <label
                  >تاكيد كلمة السر <span class="text-danger">*</span></label
                >
                <input
                  type="password"
                  class="form-control"
                  :class="{
                    'is-invalid': hasFieldError('password_confirmation'),
                  }"
                  v-model="formData.password_confirmation"
                  @input="clearFieldError('password_confirmation')"
                  @focus="clearFieldError('password_confirmation')"
                  placeholder="تاكيد كلمة السر"
                />
                <div
                  v-if="hasFieldError('password_confirmation')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("password_confirmation") }}
                </div>
              </div>

              <!-- الاذن/الادوار -->
              <div class="col-12 mb-3">
                <label>الاذن/الادوار <span class="text-danger">*</span></label>
                <div>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="roles"
                    v-model="formData.role_name"
                    @select="clearFieldError('role_name')"
                    @clear="clearFieldError('role_name')"
                    placeholder="اختر الدور"
                    :class="{ 'is-invalid': hasFieldError('role_name') }"
                  />
                </div>
                <div v-if="hasFieldError('role_name')" class="invalid-feedback">
                  {{ getFieldError("role_name") }}
                </div>
              </div>

              <!-- الصوره -->
              <div class="col-12 mb-3">
                <label>الصورة</label>
                <div class="form-group">
                  <input
                    type="file"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('image') }"
                    @change="onFileSelected"
                    @focus="clearFieldError('image')"
                    accept=".pdf, image/jpeg, image/png"
                  />
                  <div v-if="hasFieldError('image')" class="invalid-feedback">
                    {{ getFieldError("image") }}
                  </div>
                  <div v-if="imageUrl" class="mt-2">
                    <img
                      :src="imageUrl"
                      alt="صورة المعاينة"
                      style="
                        width: 80px;
                        height: 80px;
                        object-fit: cover;
                        border-radius: 8px;
                      "
                    />
                  </div>
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
                <span v-else>إضافة</span>
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
import { useToast } from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js"; // تأكد من المسار الصحيح

export default {
  mixins: [FormErrorMixin],

  components: {
    Multiselect,
  },

  data() {
    return {
      items: [],
      ShowModel: false,
      imageUrl: null,
      loading: false,
      isSubmitting: false,
      formData: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        image: "",
        role_name: "",
      },
      roles: [],
      perminlocal: localStorage.getItem("permissions"),
      // تحديد الحقول المراد مراقبتها
      watchedFields: [
        "formData.name",
        "formData.email",
        "formData.phone",
        "formData.password",
        "formData.password_confirmation",
        "formData.role_name",
        "formData.image",
      ],
    };
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
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        image: "",
        role_name: "",
      };
      this.imageUrl = null;
    },

    // التحقق من صحة البيانات محلياً
    validateFormData() {
      const rules = {
        name: {
          label: "الاسم",
          required: true,
          minLength: 2,
        },
        email: {
          label: "البريد الإلكتروني",
          required: true,
          email: true,
        },
        phone: {
          label: "رقم الجوال",
          required: true,
          minLength: 10,
        },
        password: {
          label: "كلمة السر",
          required: true,
          minLength: 8,
        },
        password_confirmation: {
          label: "تأكيد كلمة السر",
          required: true,
        },
        role_name: {
          label: "الدور",
          required: true,
        },
        image: { required: true, label: "الصورة" },
      };

      // التحقق من تطابق كلمة السر
      if (this.formData.password !== this.formData.password_confirmation) {
        this.setFieldErrors({
          password_confirmation: ["كلمة السر غير متطابقة"],
        });
        return false;
      }

      return this.validateForm(rules);
    },

    async getroles() {
      const toast = useToast();
      try {
        const res = await crudDataService.getAll("roles");
        this.roles = res.data.data.map((ele) => ({
          value: ele.name,
          name: ele.name,
        }));
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("فشل في تحميل الأدوار", {
          position: "top-center",
          timeout: 5000,
        });
      }
    },

    onFileSelected(event) {
      const file = event.target.files[0];
      if (!file) return;

      // مسح خطأ الملف عند تحديد ملف جديد
      this.clearFieldError("image");

      this.formData.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async getadmins() {
      this.loading = true;
      const toast = useToast();

      try {
        const res = await crudDataService.getAll("admins");
        this.items = res.data.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("فشل في تحميل المسؤولين", {
          position: "top-center",
          timeout: 5000,
        });
      } finally {
        this.loading = false;
      }
    },

    oneadmin(id) {
      if (this.perminlocal.includes("admins-show")) {
        this.$router.push({ name: "OneAdmin", params: { id } });
      }
    },

    async toggleactive(id) {
      const toast = useToast();
      try {
        let res = await crudDataService.create(`admins/${id}/toggle`, "");
        if (res.status == 200) {
          toast.success(res.data.message, {
            position: "top-center",
            timeout: 5000,
          });
          // تحديث الحالة في القائمة
          const admin = this.items.find((item) => item.id === id);
          if (admin) {
            admin.is_active = !admin.is_active;
          }
        }
      } catch (error) {
        this.handleApiErrors(error, toast);
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
        const response = await crudDataService.create(`admins`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // تحديث قائمة المسؤولين
        await this.getadmins();

        // إغلاق النافذة وإعادة تعيين النموذج
        this.closeModal();

        // عرض رسالة نجاح
        toast.success(response.data.message || "تم إضافة المسؤول بنجاح", {
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
          title: `هل تريد حذف المسؤول "${name}" ؟`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteAdminConfirmed(data, index);
          }
        });
    },

    async deleteAdminConfirmed(data, index) {
      const toast = useToast();
      try {
        await crudDataService.delete("admins", `${data}`);

        this.items.splice(index, 1);

        this.$swal.fire({
          title: "تم الحذف بنجاح!",
          icon: "success",
          confirmButtonText: "تم",
        });
      } catch (error) {
        console.error("Error deleting admin:", error);
        toast.error("فشل في حذف المسؤول", {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
  },

  mounted() {
    this.getadmins();
    this.getroles();
  },
};
</script>

<style lang="scss">
.admins-model {
  &.fade .modal-dialog {
    transform: none !important;
  }
  &.show .modal-dialog {
    transform: none !important;
  }
}

// حالة التحميل للأزرار
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

<style>
.border-item.table-responsive .table > :not(caption) > * > * {
  border-bottom: none !important;
}

#add-page {
  overflow-y: auto;
}

input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}
</style>
