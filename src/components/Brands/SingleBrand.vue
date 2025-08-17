<template>
  <section v-if="item">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <div class="mb-0 d-flex align-items-center">
              <img
                :src="item.image"
                alt=""
                style="width: 150px; height: 150px; border-radius: 50%"
              />
              <h4 class="ms-2">{{ item.name ? item.name.ar : "" }}:</h4>
              <span class="fs-6 text-muted">
                ({{ item.slug ? item.slug.ar : "" }})
              </span>
            </div>
            <div class="pos-relative">
              <button
                @click="toggleDropdown"
                class="twobtn bg-white border"
                style="border-color: #fd601f !important; color: #fd601f"
              >
                خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
              </button>

              <div class="text-start dropend mt-1" v-if="isDropdownOpen">
                <a class="dropdown-item" @click="edit()">تعديل البراند </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <h5>
                الوصف :
                {{ item.description ? item.description.ar : "" }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModel"
        hide-footer
        modal-class="brand-isolated-modal"
      >
        <div class="imgtoadd">
          <img src="../../assets/img/23.png" alt="img2" />
        </div>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-right mb-3">تعديل البراند</h6>
          <form @submit.prevent="update">
            <div class="row">
              <!-- Arabic Name Field -->
              <div class="col-md-6 mb-3">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  placeholder="اسم البراند"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('name.ar') }"
                  v-model="formData.name.ar"
                  @input="clearFieldError('name.ar')"
                />
                <div
                  v-if="hasFieldError('name.ar')"
                  class="invalid-feedback d-block"
                >
                  {{ getFieldError("name.ar") }}
                </div>
              </div>

              <!-- English Name Field -->
              <div class="col-md-6 mb-3">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  placeholder="brand"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('name.en') }"
                  v-model="formData.name.en"
                  @input="clearFieldError('name.en')"
                />
                <div
                  v-if="hasFieldError('name.en')"
                  class="invalid-feedback d-block"
                >
                  {{ getFieldError("name.en") }}
                </div>
              </div>

              <!-- Arabic Description Field -->
              <div class="col-12 mb-3">
                <label>وصف الماركه عربي</label>
                <input
                  type="text"
                  placeholder="وصف البراند"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('description.ar') }"
                  v-model="formData.description.ar"
                  @input="clearFieldError('description.ar')"
                />
                <div
                  v-if="hasFieldError('description.ar')"
                  class="invalid-feedback d-block"
                >
                  {{ getFieldError("description.ar") }}
                </div>
              </div>

              <!-- English Description Field -->
              <div class="col-12 mb-3">
                <label>وصف الماركه انجليزي</label>
                <input
                  type="text"
                  placeholder="description"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('description.en') }"
                  v-model="formData.description.en"
                  @input="clearFieldError('description.en')"
                />
                <div
                  v-if="hasFieldError('description.en')"
                  class="invalid-feedback d-block"
                >
                  {{ getFieldError("description.en") }}
                </div>
              </div>

              <!-- Image Field -->
              <div class="mt-3 col-12 mb-3">
                <label>الصوره</label>
                <div class="pos-relative overflow-hidden">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('image') }"
                  />
                </div>
                <div
                  v-if="hasFieldError('image')"
                  class="invalid-feedback d-block"
                >
                  {{ getFieldError("image") }}
                </div>
                <img
                  :src="imageUrl"
                  alt="صورة"
                  style="width: 180px; height: 180px; object-fit: fill"
                  class="m-1"
                />
              </div>
            </div>
            <div class="text-center">
              <button class="fs-15 btn-save mx-1" type="submit">تعديل</button>
              <button
                class="fs-15 btn-cancel mx-1"
                @click="ShowModel = false"
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
  <section
    class="position-relative"
    style="height: 100vh; display: grid; place-items: center"
    v-else
  >
    <section class="cate"></section>
    <progress class="pure-material-progress-circular" />
  </section>
</template>

<script>
import crudDataService from "../../Services/crudDataService.js";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";
import { useToast } from "vue-toastification";

export default {
  mixins: [FormErrorMixin],

  data() {
    return {
      textimage: "",
      changeedit: true,
      isDropdownOpen: false,
      ShowModel: false,
      isDropdown: false,
      imageUrl: null,
      item: null,
      formData: {
        name: {
          ar: "",
          en: "",
        },
        description: {
          ar: "",
          en: "",
        },
        image: "",
      },
      // تحديد الحقول التي نريد مراقبتها لمسح الأخطاء تلقائياً
      watchedFields: [
        "formData.name.ar",
        "formData.name.en",
        "formData.description.ar",
        "formData.description.en",
      ],
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    onFileSelected(event) {
      console.log(event);
      // مسح خطأ الصورة عند اختيار ملف جديد
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

    edit() {
      // مسح جميع الأخطاء عند فتح النموذج
      this.clearAllErrors();

      this.ShowModel = true;
      this.formData.name.ar = this.item.name.ar;
      this.formData.name.en = this.item.name.en;
      this.formData.description.ar = this.item.description.ar;
      this.formData.description.en = this.item.description.en;
      this.textimage = this.item.image;
      this.formData.image = this.onFileSelected(this.item.image);
      this.imageUrl = this.item.image;
    },

    async getPage() {
      try {
        const res = await crudDataService.get(
          "brands",
          `${this.$route.params.id}`
        );
        this.item = res.data.data;
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    async update() {
      try {
        // مسح الأخطاء السابقة
        this.clearAllErrors();

        // التحقق من صحة البيانات محلياً (اختياري)
        const validationRules = {
          "name.ar": {
            required: true,
            label: "الاسم العربي",
            minLength: 2,
          },
          "name.en": {
            required: true,
            label: "الاسم الإنجليزي",
            minLength: 2,
          },
          "description.ar": {
            required: true,
            label: "الوصف العربي",
            minLength: 5,
          },
          "description.en": {
            required: true,
            label: "الوصف الإنجليزي",
            minLength: 5,
          },
          image: {
            maxSize: 2048, // 2MB in KB
            label: "الصورة",
          },
        };

        if (!this.validateForm(validationRules)) {
          return; // إيقاف التقديم إذا كانت هناك أخطاء
        }

        const res = await crudDataService.create(
          `brands/${this.$route.params.id}?_method=put`,
          this.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(res);

        // عرض رسالة نجاح
        this.toast.success("تم تحديث البراند بنجاح", {
          position: "top-right",
          timeout: 3000,
        });

        await this.getPage();
        this.ShowModel = false;
      } catch (error) {
        // معالجة الأخطاء باستخدام المixin
        this.handleApiErrors(error, this.toast);
      }
    },
  },

  mounted() {
    this.getPage();
  },
};
</script>

<style lang="scss">
.brand-isolated-modal {
  .modal-content {
    overflow: unset;
  }
  .brand-isolated-modal-content {
    height: 75vh;
    overflow: scroll;
    padding-bottom: 17px;
  }
  .modal-body {
    overflow-y: unset;
  }
  .modal-dialog {
    transition: transform 0.3s ease-out;
    transform: translate(0, -15%);
  }

  & .multiselect-placeholder,
  & ::placeholder {
    font-size: 12px;
  }
}

input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f) !important;
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
