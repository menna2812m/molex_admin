<template>
  <section>
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <img
              :src="item.image"
              alt=""
              width="100"
              style="max-height: 100px; object-fit: cover"
              class="rounded"
            />
            <h4 class="mb-0">
              {{ item.name ? item.name.ar : "" }}
            </h4>
            <div class="pos-relative">
              <button
                @click="toggleDropdown"
                class="twobtn bg-white border"
                style="border-color: #fd601f !important; color: #fd601f"
                v-if="perminlocal.includes('groups-update')"
              >
                خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
              </button>

              <div class="text-start dropend mt-1" v-if="isDropdownOpen">
                <a class="dropdown-item" @click="edit(item)">تعديل المجموعة </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <h5>الخيارات :</h5>
              <div v-if="item.conditions">
                <ul>
                  <li v-for="(con, i) in item.conditions" :key="i">
                    {{ con.type ? con.type : "" }}
                    {{ con.min_value ? con.min_value : "" }}
                    {{ con.operator ? con.operator : "" }}
                    {{ con.value ? con.value : "" }}
                    {{ con.max_value ? con.max_value : "" }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Group Modal -->
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">تعديل المجموعة</h6>
          <form @submit.prevent="update">
            <div class="row">
              <!-- Arabic Name -->
              <div class="col-6 mb-3">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.name.ar"
                  :class="{ 'is-invalid': hasFieldError('name.ar') }"
                  @input="clearFieldError('name.ar')"
                  placeholder="اسم المجموعة بالعربية"
                />
                <div v-if="hasFieldError('name.ar')" class="invalid-feedback">
                  {{ getFieldError("name.ar") }}
                </div>
              </div>

              <!-- English Name -->
              <div class="col-6 mb-3">
                <label> الاسم انجليزي</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.name.en"
                  :class="{ 'is-invalid': hasFieldError('name.en') }"
                  @input="clearFieldError('name.en')"
                  placeholder="اسم المجموعة بالإنجليزية"
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
                <label>{{ con.title ? con.title : con.type }}</label>

                <!-- Min Value Input -->
                <div
                  v-if="con.min_value !== undefined && con.min_value !== null"
                >
                  <input
                    type="text"
                    class="form-control my-1"
                    v-model="con.min_value"
                    :class="{
                      'is-invalid': hasFieldError(`condition.${ii}.min_value`),
                    }"
                    @input="clearFieldError(`condition.${ii}.min_value`)"
                    placeholder="القيمة الدنيا"
                  />
                  <div
                    v-if="hasFieldError(`condition.${ii}.min_value`)"
                    class="invalid-feedback"
                  >
                    {{ getFieldError(`condition.${ii}.min_value`) }}
                  </div>
                </div>

                <!-- Max Value Input -->
                <div
                  v-if="con.min_value !== undefined && con.min_value !== null"
                >
                  <input
                    type="text"
                    class="form-control my-1"
                    v-model="con.max_value"
                    :class="{
                      'is-invalid': hasFieldError(`condition.${ii}.max_value`),
                    }"
                    @input="clearFieldError(`condition.${ii}.max_value`)"
                    placeholder="القيمة العليا"
                  />
                  <div
                    v-if="hasFieldError(`condition.${ii}.max_value`)"
                    class="invalid-feedback"
                  >
                    {{ getFieldError(`condition.${ii}.max_value`) }}
                  </div>
                </div>

                <!-- Single Value Input -->
                <div v-else>
                  <input
                    type="text"
                    class="form-control"
                    v-model="con.value"
                    :class="{
                      'is-invalid': hasFieldError(`condition.${ii}.value`),
                    }"
                    @input="clearFieldError(`condition.${ii}.value`)"
                    placeholder="القيمة"
                  />
                  <div
                    v-if="hasFieldError(`condition.${ii}.value`)"
                    class="invalid-feedback"
                  >
                    {{ getFieldError(`condition.${ii}.value`) }}
                  </div>
                </div>
              </div>

              <!-- Image Upload -->
              <div class="col-12 mb-3">
                <label>الصوره</label>
                <div class="form-group">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept="image/jpeg, image/png, image/jpg"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('image') }"
                  />
                  <div v-if="hasFieldError('image')" class="invalid-feedback">
                    {{ getFieldError("image") }}
                  </div>

                  <!-- Image Preview -->
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
                class="fs-15 btn-save mx-1"
                type="submit"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">جاري التعديل...</span>
                <span v-else>تعديل</span>
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
import crudDataService from "../../Services/crudDataService.js";
import { useToast } from "vue-toastification";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js"; // Import the mixin

export default {
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
      isDropdownOpen: false,
      ShowModel: false,
      imageUrl: null,
      item: "",
      formData: {
        name: {
          ar: "",
          en: "",
        },
        image: "",
        condition: [],
      },
      conditions: [],
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    // Validation rules for the form
    getValidationRules() {
      return {
        "name.ar": { required: true, label: "الاسم بالعربية" },
        "name.en": { required: true, label: "الاسم بالإنجليزية" },
      };
    },

    // Validate image upload
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
        // Check if min/max values are properly set
        if (con.min_value !== undefined && con.min_value !== null) {
          if (!con.min_value || con.min_value.toString().trim() === "") {
            errors[`condition.${index}.min_value`] = ["القيمة الدنيا مطلوبة"];
            isValid = false;
          }
          if (!con.max_value || con.max_value.toString().trim() === "") {
            errors[`condition.${index}.max_value`] = ["القيمة العليا مطلوبة"];
            isValid = false;
          }
          // Validate that min < max
          if (
            con.min_value &&
            con.max_value &&
            parseFloat(con.min_value) >= parseFloat(con.max_value)
          ) {
            errors[`condition.${index}.min_value`] = [
              "القيمة الدنيا يجب أن تكون أقل من القيمة العليا",
            ];
            isValid = false;
          }
        } else if (
          con.required &&
          (!con.value || con.value.toString().trim() === "")
        ) {
          errors[`condition.${index}.value`] = [
            `${con.title || con.type} مطلوب`,
          ];
          isValid = false;
        }
      });

      if (!isValid) {
        this.setFieldErrors(errors);
      }

      return isValid;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    onFileSelected(event) {
      // Clear previous errors
      this.clearFieldError("image");

      if (!event.target || !event.target.files || !event.target.files[0]) {
        return;
      }

      const file = event.target.files[0];

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
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    async edit(data) {
      this.clearAllErrors();
      this.ShowModel = true;

      // Populate form data
      this.formData.name.ar = data.name?.ar || "";
      this.formData.name.en = data.name?.en || "";
      this.formData.condition = data.conditions ? [...data.conditions] : [];

      // Set current image URL for preview
      if (data.image) {
        this.imageUrl = data.image;
      }

      // Reset file input (will be set only if user selects new file)
      this.formData.image = "";
    },

    async getPage() {
      try {
        const res = await crudDataService.get(
          "groups",
          `${this.$route.params.id}`
        );
        this.item = res.data.data;
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    closeModal() {
      this.ShowModel = false;
      this.clearAllErrors();
      this.imageUrl = null;
      this.formData = {
        name: { ar: "", en: "" },
        image: "",
        condition: [],
      };
    },

    async update() {
      this.clearAllErrors();

      // Validate basic form fields
      if (!this.validateForm(this.getValidationRules())) {
        return;
      }

      // Validate dynamic conditions
      if (!this.validateConditions()) {
        return;
      }

      // Validate image if a new one is selected
      if (this.formData.image && !this.validateImage(this.formData.image)) {
        return;
      }

      this.isSubmitting = true;

      try {
        const res = await crudDataService.create(
          `groups/${this.$route.params.id}?_method=put`,
          this.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.getPage();
        this.ShowModel = false;
        this.clearAllErrors();

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
  },

  mounted() {
    this.getPage();
    this.condition();
  },
};
</script>

<style scoped lang="scss">
.text-danger {
  color: #dc3545 !important;
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

<style lang="scss">
input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}

.modal .modal-header {
  display: none;
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
    margin: 5.75rem auto;
  }
}

#add-page {
  overflow-y: auto;
}
</style>
