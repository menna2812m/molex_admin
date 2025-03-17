<template>
  <div class="pos-relative">
    <button @click="ShowModelEdit = true" class="btn-add me-0">
      <i class="fe fe-plus"></i>
      إضافة منتج جديد
    </button>
    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModelEdit"
        hide-footer
        class="add"
        title="إضافة منتج   "
      >
        <div class="row pos-relative" style="z-index: 5555">
          <div class="col-lg-12">
            <form ref="anyName" @submit.prevent="add">
              <div class="row">
                <div class="col-md-6 mt-1">
                  <label for=""> الإسم عربي </label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.name.ar"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for="">الإسم انجليزي</label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.name.en"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for="">الوصف عربي</label>
                  <ckeditor
                    :editor="editor"
                    v-model="formData.description.ar"
                    :editorConfigs="editorConfigs"
                  ></ckeditor>
                </div>
                <div class="col-md-6 mt-1">
                  <label for="">الوصف انجليزي</label>
                  <ckeditor
                    :editor="editor"
                    v-model="formData.description.en"
                    :editorConfigs="editorConfigs"
                  ></ckeditor>
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> اختر العلامة التجارية </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="Selectbrand"
                    placeholder="اختر العلامة التجارية"
                    v-model="formData.brand_id"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> اختر القسم </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="Selectcategories"
                    placeholder="اختر القسم "
                    v-model="formData.categories_ids"
                    mode="multiple"
                    :close-on-select="true"
                    group-values="options"
                    group-label="name"
                    class="itteemm"
                  >
                    <template v-slot:option="{ option }">
                      <!-- Check if the option is a main category or a sub-category -->
                      <div
                        :style="getOptionStyle(option)"
                        style="
                          padding: 10px;
                          width: 100%;
                          text-align: right;
                          margin-bottom: 2px;
                        "
                      >
                        {{ option.name }}
                      </div>
                    </template></Multiselect
                  >
                </div>
                <!-- <div class="col-md-6 mt-1">
                  <label for=""> اختر القسم الفرعي </label>
                  {{ subcategories }}
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="subcategories"
                    placeholder="اختر القسم "
                    :close-on-select="true"
                  ></Multiselect>
                </div> -->
                <div class="col-md-6 mt-1">
                  <label for=""> السعر الأساسي</label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.base_price"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> لينك seo </label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.seo_url"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> عنوان seo </label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.seo_title"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> وصف seo </label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.seo_description"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> باركود </label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.barcode"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> كمية </label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.quantity"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> السعر </label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.price"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> سعر الكلفة </label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.cost_price"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> السعر بعد الخصم</label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.discounted_price"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6 mt-1">
                  <label for=""> تاريخ انتهاء الخصم </label>
                  <input
                    type="date"
                    placeholder=""
                    v-model="formData.discount_end_date"
                    class="form-control"
                  />
                </div>

                <div class="col-md-12 mt-3">
                  <label for="">الصوره</label>
                  <div class="form-group">
                    <input
                      type="file"
                      @change="handleFileChange"
                      accept=".pdf, image/jpeg, image/png"
                      class="form-control"
                      multiple
                    />
                    <div class="d-flex flex-wrap mt-2">
                      <img
                        :src="url.path"
                        alt="Preview Image"
                        style="width: 200px; height: 200px; object-fit: fill"
                        class="m-1"
                        v-for="(url, index) in imageUrl"
                        :key="index"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button class="btn btn-primary m-auto d-block">إضافة</button>
            </form>
          </div>
        </div>
      </b-modal>
    </teleport>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { reactive } from "vue";
import crudDataService from "../../Services/crudDataService";
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Multiselect,
  },
  setup() {
    const editorConfigs = reactive({});
    return { editor: ClassicEditor, editorConfigs };
  },
  data() {
    return {
      Selectcategories: [],
      Selectbrand: [],
      imageUrl: [],
      ShowModelEdit: false,
      formData: {
        name: {
          ar: "",
        },
        name: {
          en: "",
        },
        description: {
          ar: "",
        },
        description: {
          en: "",
        },
        base_price: "",
        seo_url: "",
        seo_title: "",
        seo_description: "",
        barcode: "",
        quantity: "",
        price: "",
        cost_price: "",
        discounted_price: "",
        discount_end_date: "",
        categories_ids: [],
        images: [],
        subcategories: [],
      },
    };
  },

  methods: {
    getOptionStyle(option) {
      return {
        background: option.options ? "#d6d8dddb" : "",
      };
    },
    handleFileChange(event) {
      const files = event.target.files;
      this.formData.images = [];
      Array.from(files).forEach((file) => {
        this.formData.images.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl.push({
            path: e.target.result,
            thumbnail: e.target.result,
          }); // Add the image URL for preview
        };
        reader.readAsDataURL(file);
      });
    },
    async getbrands() {
      const res = await crudDataService.getAll("brands");
      this.Selectbrand = res.data.data.data.map((ele) => ({
        value: ele.id,
        name: ele.name,
      }));
    },

    async getcategories() {
      const res = await crudDataService.getAll("categories");

      // Initialize an empty array to store the grouped categories
      const groupedCategories = [];

      res.data.data.data.forEach((ele) => {
        // Create an object for the main category
        const mainCategory = {
          value: ele.id,
          name: ele.name.ar,
          // Initialize an empty array for sub-categories
          options: [],
          style: {
            background: "blue",
          },
        };
        if (ele.sub_categories && ele.sub_categories.length > 0) {
          // Populate the options array with sub-categories
          ele.sub_categories.forEach((subCat) => {
            mainCategory.options.push({
              value: subCat.id,
              name: subCat.name.ar,
            });
          });
        }

        // Push the main category to the groupedCategories array
        groupedCategories.push(mainCategory);
      });

      // Flatten the groupedCategories array to create a flat array
      this.Selectcategories = groupedCategories.reduce((acc, category) => {
        acc.push(category, ...category.options);
        return acc;
      }, []);

    },

    async add() {
      let res = await crudDataService.create(`products`, this.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.ShowModelEdit = false;
      this.formData.name.ar = "";
      this.formData.name.en = "";
      this.formData.description.ar = "";
      this.formData.description.en = "";
      this.formData.barcode = "";
      this.formData.base_price = "";
      this.formData.seo_url = "";
      this.formData.seo_title = "";
      this.formData.seo_description = "";
      this.formData.quantity = "";
      this.formData.price = "";
      this.formData.cost_price = "";
      this.formData.discounted_price = "";
      this.formData.discount_end_date = "";
      this.formData.categories_ids = "";
      this.formData.brand_id = "";
      this.formData.images = "";
      this.categories_ids = "";
      (this.formData.brand_id = ""), (this.imageUrl = "");
    },
  },
  mounted() {
    this.getbrands();
    this.getcategories();
  },
};
</script>
<style lang="scss">
.itteemm .multiselect-option {
  padding: 0 !important;
}
.modal.show.add .modal-header {
  display: inline-flex;
}
.modal.show.add .modal-dialog {
  max-width: 800px;
}
</style>
<style scoped lang="scss">
.dropitem {
  border: 1px solid #e8e8f7;
  margin-top: 3px;
}
</style>
