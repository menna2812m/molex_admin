<template>
  <section>
    <div class="">
      <button class="fs-15 btn-add mb-4" @click="ShowModel = true">
        <i class="fe fe-plus"></i>
        اضافة قسم جديد
      </button>
    </div>
    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModel"
        hide-footer
        title="اضافة قسم"
        modal-class="category-model"
      >
        <div class="row">
          <div class="col-12 mb-3">
            <form ref="anyName" @submit.prevent="add">
              <!-- استخدام المساعدات من المixin -->
              <div class="mt-1">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  placeholder="Name"
                  v-model="formData.name.ar"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('name.ar') }"
                />
                <div v-if="hasFieldError('name.ar')" class="invalid-feedback">
                  {{ getFieldError("name.ar") }}
                </div>
              </div>

              <div class="mt-1">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  placeholder="Name"
                  v-model="formData.name.en"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('name.en') }"
                />
                <div v-if="hasFieldError('name.en')" class="invalid-feedback">
                  {{ getFieldError("name.en") }}
                </div>
              </div>

              <div class="mt-1">
                <label>الوصف عربي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.ar"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('description.ar') }"
                />
                <div
                  v-if="hasFieldError('description.ar')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("description.ar") }}
                </div>
              </div>

              <div class="mt-1">
                <label>الوصف انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.en"
                  class="form-control"
                  :class="{ 'is-invalid': hasFieldError('description.en') }"
                />
                <div
                  v-if="hasFieldError('description.en')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("description.en") }}
                </div>
              </div>

              <div class="mt-3">
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
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    alt="صورة"
                    class="mt-4"
                  />
                </div>
              </div>

              <button
                class="btn btn-primary m-auto d-block"
                :disabled="isLoading"
              >
                <span v-if="isLoading">جاري الحفظ...</span>

                <span v-if="!isLoading"> اضافة </span>
              </button>
            </form>
          </div>
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import crudDataService from "../../Services/crudDataService.js";
import Multiselect from "@vueform/multiselect";
import { useToast } from "vue-toastification";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";

export default {
  mixins: [FormErrorMixin],

  components: {
    Multiselect,
  },

  data() {
    return {
      Selectcategory: [],
      ShowModel: false,
      formData: {
        name: {
          ar: "",
          en: "",
        },
        image: null,
        description: {
          ar: "",
          en: "",
        },
        parent_id: null,
      },
      imageUrl: null,
      isLoading: false,

      // ✅ قائمة الحقول المراقبة للمسح التلقائي للأخطاء
      watchedFields: [
        "formData.name.ar",
        "formData.name.en",
        "formData.description.ar",
        "formData.description.en",
      ],
    };
  },

  methods: {
    // ✅ جلب جميع التصنيفات وإرسالها للأب
    async getcategories() {
      try {
        let res = await crudDataService.getAll("categories");
        this.$emit("customEvent", res.data.data.data);
      } catch (error) {
        console.error("فشل في جلب التصنيفات:", error);
      }
    },

    // ✅ جلب الخيارات للقائمة المنسدلة
    async getselectoption() {
      try {
        let res = await crudDataService.getAll("categories?limit=1000");
        this.Selectcategory = res.data.data.data.map((cat) => ({
          value: cat.id,
          name: cat.name.ar,
        }));
      } catch (error) {
        console.error("فشل في جلب قائمة الخيارات:", error);
      }
    },

    // ✅ تحميل الصورة وعرضها بشكل فوري
    onFileSelected(event) {
      // ✅ استخدام المساعد من المixin لمسح خطأ الصورة
      this.clearFieldError("image");

      if (event.target.files.length > 0) {
        this.formData.image = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(this.formData.image);
      }
    },

    // ✅ إضافة تصنيف جديد - استخدام المساعدات من المixin
    async add() {
      const toast = useToast();
      this.isLoading = true;

      // ✅ استخدام المساعد من المixin لمسح الأخطاء السابقة
      this.clearAllErrors();

      try {
        const res = await crudDataService.create(`categories`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.isLoading = false;

        // ✅ إعادة تحميل التصنيفات بعد الإضافة
        this.getcategories();
        this.ShowModel = false;

        // ✅ إعادة تعيين الحقول بعد الإضافة
        this.resetForm();

        // ✅ عرض إشعار النجاح
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        this.isLoading = false;
        console.error("خطأ أثناء الإضافة:", error);

        // ✅ استخدام المساعد من المixin لمعالجة الأخطاء
        this.handleApiErrors(error, toast);
      }
    },

    // ✅ إعادة تعيين النموذج
    resetForm() {
      this.formData = {
        name: { ar: "", en: "" },
        image: null,
        description: { ar: "", en: "" },
        parent_id: null,
      };
      this.imageUrl = null;
    },
  },

  // ✅ لم نعد بحاجة للـ watchers اليدوية - المixin سيتعامل معها تلقائياً
  // watch: { ... } - تم حذفها

  mounted() {
    this.getselectoption();
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

#add-page {
  overflow-y: auto;
}
</style>
