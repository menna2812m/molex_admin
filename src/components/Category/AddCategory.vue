<template>
  <section>
    <div class="">
      <button class="fs-15 btn-add mb-4" @click="ShowModel = true">
        <i class="fe fe-plus"></i>
        اضافة قسم جديد
      </button>
    </div>
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer title="اضافة قسم">
        <div class="row">
          <div class="col-12 mb-3">
            <form ref="anyName" @submit.prevent="add">
              
              <div class="mt-1">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  placeholder="Name"
                  v-model="formData.name.ar"
                  class="form-control"
                />
              </div>
              <div class="mt-1">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  placeholder="Name"
                  v-model="formData.name.en"
                  class="form-control"
                />
              </div>
              <div class="mt-1">
                <label>الوصف عربي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.ar"
                  class="form-control"
                />
              </div>
              <div class="mt-1">
                <label>الوصف انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.en"
                  class="form-control"
                />
              </div>
          
              <div class="mt-3">
                <label>الصوره</label>
                <div class="form-group">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                  />
                  <img :src="imageUrl" alt="صورة" />
                </div>
              </div>

              <button class="btn btn-primary m-auto d-block">اضافة</button>
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

export default {
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
      if (event.target.files.length > 0) {
        this.formData.image = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(this.formData.image);
      }
    },

    // ✅ إضافة تصنيف جديد
    async add() {
      const toast = useToast();

      try {
        let res = await crudDataService.create(`categories`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // ✅ إعادة تحميل التصنيفات بعد الإضافة
        this.getcategories();
        this.ShowModel = false;

        // ✅ إعادة تعيين الحقول بعد الإضافة
        this.formData = {
          name: { ar: "", en: "" },
          image: null,
          description: { ar: "", en: "" },
          parent_id: null,
        };
        this.imageUrl = null;

        // ✅ عرض إشعار النجاح
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        console.error("خطأ أثناء الإضافة:", error);

        // ✅ استخراج رسائل الخطأ
        const errorData = error?.response?.data?.errors || {};
        const errorMessages = Object.values(errorData)
          .flat()
          .filter((msg) => typeof msg === "string");

        // ✅ عرض أول رسالة خطأ إن وجدت
        if (errorMessages.length > 0) {
          toast.error(errorMessages[0], {
            position: "top-center",
            timeout: 5000,
          });
        } else {
          toast.error("حدث خطأ ما، يرجى المحاولة مرة أخرى.", {
            position: "top-center",
            timeout: 5000,
          });
        }
      }
    },
  },

  mounted() {
    this.getselectoption();
  },
};
</script>

<style >
#add-page {
    overflow-y: auto;
}</style>
