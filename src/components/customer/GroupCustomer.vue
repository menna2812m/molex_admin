<template>
  <div class="row mb-0 mt-5 pt-5">
    <div
      class="card border-0 m-1"
      style="width: 14rem; cursor: pointer"
      v-for="(item, i) in items"
      :key="i"
    >
      <button
        class="btn me-2"
        @click="del(item.id, i, item.name)"
        v-if="perminlocal.includes('groups-destroy')"
      >
        <i class="fe fe-trash text-danger"></i>
      </button>
      <div class="card-body text-center" @click="singlegroup(item.id)">
        <img
          :src="item.image"
          style="width: 35px; height: 35px"
          class="rounded-50"
          alt=""
        />
        <h5 class="card-title mt-3">{{ item.name }}</h5>
        <h6 class="card-subtitle mb-2 text-secondary">
          ({{ item.users.length }}) عميل
        </h6>
      </div>
    </div>

    <div
      class="card border-0 m-1"
      style="width: 14rem; cursor: pointer"
      @click="ShowModel = true"
    >
      <div
        class="card-body text-center d-flex flex-column align-items-center justify-content-center"
        v-if="perminlocal.includes('groups-store')"
      >
        <i class="fe fe-plus icon_color_2 icon_color"></i>
        <h5 class="card-title mt-3">مجموعة جديدة</h5>
      </div>
    </div>

    <!-- Add Group Modal -->
    <teleport to="body" class="overflow-auto">
      <b-modal
        id="add-page"
        title="مجموعة جديدة"
        v-model="ShowModel"
        hide-footer
        class="overflow-auto"
      >
        <div class="mt-2 pos-relative" style="z-index: 5555">
          <form @submit.prevent="add">
            <div class="row">
              <!-- Arabic Name -->
              <div class="col-6 mb-2">
                <label> الاسم عربي</label>
                <input
                  type="text"
                  placeholder="اسم المجموعة عربي"
                  class="form-control"
                  v-model="formData.name.ar"
                  :class="{ 'is-invalid': hasFieldError('name.ar') }"
                  @input="clearFieldError('name.ar')"
                />
                <div v-if="hasFieldError('name.ar')" class="invalid-feedback">
                  {{ getFieldError("name.ar") }}
                </div>
              </div>

              <!-- English Name -->
              <div class="col-6 mb-2">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  placeholder="اسم المجموعة انجليزي"
                  class="form-control"
                  v-model="formData.name.en"
                  :class="{ 'is-invalid': hasFieldError('name.en') }"
                  @input="clearFieldError('name.en')"
                />
                <div v-if="hasFieldError('name.en')" class="invalid-feedback">
                  {{ getFieldError("name.en") }}
                </div>
              </div>

              <!-- Dynamic Conditions -->
              <div
                class="col-md-6 mb-2"
                v-for="(con, ii) in formData.condition"
                :key="ii"
              >
                <label>
                  {{ con.title }}
                </label>

                <!-- Multi-select for array values -->
                <div v-if="Array.isArray(con.values)">
                  <Multiselect
                    class="mb-1"
                    label="name"
                    :searchable="true"
                    :options="con.values"
                    placeholder="النوع"
                    v-model="con.selectedValue"
                    :class="{
                      'is-invalid': hasFieldError(
                        `condition.${ii}.selectedValue`
                      ),
                    }"
                    @select="clearFieldError(`condition.${ii}.selectedValue`)"
                  />
                  <div
                    v-if="hasFieldError(`condition.${ii}.selectedValue`)"
                    class="text-danger small mt-1"
                  >
                    {{ getFieldError(`condition.${ii}.selectedValue`) }}
                  </div>
                </div>

                <!-- Input for other types -->
                <div v-else>
                  <input
                    :type="getInputType(con.values)"
                    :placeholder="con.placeholder || con.values"
                    class="form-control"
                    v-model="con.inputValue"
                    :class="{
                      'is-invalid': hasFieldError(`condition.${ii}.inputValue`),
                    }"
                    @input="clearFieldError(`condition.${ii}.inputValue`)"
                  />
                  <div
                    v-if="hasFieldError(`condition.${ii}.inputValue`)"
                    class="invalid-feedback"
                  >
                    {{ getFieldError(`condition.${ii}.inputValue`) }}
                  </div>
                </div>
              </div>

              <!-- Image Upload -->
              <div class="col-12 mb-2">
                <label>الصوره</label>
                <div class="form-group">
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
                  <div v-if="imageUrl" class="mt-2">
                    <img
                      :src="imageUrl"
                      alt="صورة"
                      style="
                        max-width: 200px;
                        max-height: 200px;
                        object-fit: cover;
                      "
                      class="img-thumbnail"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <button
                :disabled="isSubmitting"
                class="fs-15 btn-save mx-1"
                type="submit"
              >
                <span v-if="!isSubmitting">اضافة</span>
                <span v-else>جاري الإضافة...</span>
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
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import { useToast } from "vue-toastification";
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
      watchedFields: ["formData.name.ar", "formData.name.en", "formData.image"],
      ShowModel: false,
      items: [],
      conditions: [],
      imageUrl: null,
      formData: {
        name: {
          ar: "",
          en: "",
        },
        image: "",
        condition: [],
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    // Validation rules for the form
    getValidationRules() {
      return {
        "name.ar": { required: true, label: "الاسم بالعربية" },
        "name.en": { required: true, label: "الاسم بالإنجليزية" },
        image: { required: true, label: " الصورة" },
        // Add more validation rules as needed
      };
    },

    // Get appropriate input type based on condition value
    getInputType(value) {
      if (typeof value === "string") {
        if (value.includes("email")) return "email";
        if (value.includes("number") || value.includes("age")) return "number";
        if (value.includes("date")) return "date";
        if (value.includes("tel") || value.includes("phone")) return "tel";
      }
      return "text";
    },

    // Validate file upload
    validateImage(file) {
      if (!file) return true; // Optional field

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        this.setFieldErrors({
          image: ["يجب أن تكون الصورة من نوع JPG أو PNG"],
        });
        return false;
      }

      if (file.size > maxSize) {
        this.setFieldErrors({
          image: ["حجم الصورة يجب أن يكون أقل من 2 ميجابايت"],
        });
        return false;
      }

      return true;
    },

    // Validate dynamic conditions
    validateConditions() {
      let isValid = true;
      const errors = {};

      this.formData.condition.forEach((con, index) => {
        if (con.required) {
          const fieldKey = Array.isArray(con.values)
            ? "selectedValue"
            : "inputValue";
          const value = con[fieldKey];

          if (!value || (typeof value === "string" && value.trim() === "")) {
            errors[`condition.${index}.${fieldKey}`] = [`${con.title} مطلوب`];
            isValid = false;
          }
        }
      });

      if (!isValid) {
        this.setFieldErrors(errors);
      }

      return isValid;
    },

    onFileSelected(event) {
      const file = event.target.files[0];

      // Clear previous errors
      this.clearFieldError("image");

      if (!file) {
        this.formData.image = "";
        this.imageUrl = null;
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
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async condition() {
      try {
        const res = await crudDataService.getAll("groups-conditions");
        this.conditions = res.data.data;

        // Initialize condition data with proper structure
        this.formData.condition = this.conditions.map((condition) => ({
          ...condition,
          selectedValue: Array.isArray(condition.values) ? null : "",
          inputValue: Array.isArray(condition.values) ? "" : "",
        }));
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    async getallgroups() {
      try {
        const res = await crudDataService.getAll("groups");
        this.items = res.data.data.data;
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    singlegroup(id) {
      if (this.perminlocal.includes("groups-show")) {
        this.$router.push({ name: "SingleGroup", params: { id } });
      }
    },

    resetForm() {
      this.formData = {
        name: {
          ar: "",
          en: "",
        },
        image: "",
        condition: [],
      };
      this.imageUrl = null;
      this.clearAllErrors();

      // Reinitialize conditions
      this.condition();
    },

    closeModal() {
      this.ShowModel = false;
    },

    async add() {
      this.clearAllErrors();

      // Validate basic form fields
      if (!this.validateForm(this.getValidationRules())) {
        return;
      }

      // Validate dynamic conditions
      if (!this.validateConditions()) {
        return;
      }

      // Validate image if provided
      if (this.formData.image && !this.validateImage(this.formData.image)) {
        return;
      }

      this.isSubmitting = true;

      try {
        // Prepare form data for submission
        const submitData = {
          ...this.formData,
          condition: this.formData.condition.map((con) => ({
            ...con,
            value: Array.isArray(con.values)
              ? con.selectedValue
              : con.inputValue,
          })),
        };

        const res = await crudDataService.create(`groups`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.status === 200 || res.status === 201) {
          this.$swal.fire({
            title: "تم الإضافة بنجاح!",
            icon: "success",
            confirmButtonText: "تم",
          });

          this.ShowModel = false;
          this.resetForm();
          this.getallgroups();

          this.toast.success("تم إضافة المجموعة بنجاح", {
            position: "top-center",
            timeout: 3000,
          });
        }
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      } finally {
        this.isSubmitting = false;
      }
    },

    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف المجموعة`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
          icon: "warning",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("groups", `${data}`)
              .then(() => {
                this.$swal.fire({
                  title: "تم الحذف بنجاح!",
                  icon: "success",
                  confirmButtonText: "تم",
                });
                this.items.splice(index, 1);
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
    this.getallgroups();
  },
};
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0px 3px 3px 0px #e6edf0;
}

.icon_color {
  display: inline;
  padding: 12px;
  border-radius: 50%;
  &.icon_color_2 {
    color: #929aff;
    background: #e7faff;
  }
}

.dropitem {
  position: absolute;
  left: 5px;
  border: 1px solid #e8e8f7;
  margin: 2px;
  border-radius: 3px;
  a {
    cursor: pointer;
  }
}

input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}

// Loading state for buttons
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

// Image preview styling
.img-thumbnail {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 0.25rem;
}
</style>
