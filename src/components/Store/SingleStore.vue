<template>
  <section v-if="onestore">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <h4 class="mb-0">المتجر</h4>
            <h4 class="px-2">اسم المتجر : {{ onestore.name }}</h4>
                   
          </div>
          <div class="row align-items-center justify-content-center pt-3">
              <div class="row pb-2">
                <h4>تفاصيل التاجر </h4>
                <div class="col-lg-2 text-center">
                  <!-- <img
                    :src="onestore.image"
                    alt="img"
                    class="mx-auto"
                    style="width: 80px; height: 80px; border-radius: 50%"
                  /> -->
                </div>
                <div class="col-lg-9 " v-for="vendor in onestore.vendors" :key="vendor.id">
                  <div>
                    <h5 class="px-2">اسم التاجر :
                     <span class="text-muted">{{ vendor.name }}</span> 
                    </h5>
                    <h5 class="px-2">البريد الالكتروني : 
                      <a :href="'mailto:'+vendor.email" class="text-muted">{{ vendor.email }}</a>
                      </h5>

                  </div>
            
                </div>
              </div>
          </div>
          <div>
            <button @click="ShowModel = true" class="btn-add  m-2">
              <i class="fe fe-plus"></i>
              إضافة منتج جديد
            </button>
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
                <span
                  v-if="props.column.field === 'cover_image'"
                  class="imgetext"
                >
                  <img
                    :src="props.formattedRow[props.column.field]"
                    class="imagetable"
                    width="150"
                    height="100"
                  />
                </span>
                <span v-if="props.column.field == 'actions'">
                
                  <button
                    class="btn btn-primary me-2"
                    @click="edit(props.row)"
                    v-if="perminlocal.includes('products-update')"
                  >
                    <i class="fe fe-edit-2"></i>
                  </button>

                  <button
                    class="btn btn-danger me-2"
                    v-if="perminlocal.includes('products-destroy')"
                    @click="del(props.row.id, props.index, props.row.name)"
                  >
                    <i class="fe fe-trash"></i>
                  </button>
                  <!-- <label
                    class="custom-switch justify-content-center"
                    v-if="perminlocal.includes('products-toggle')"
                  >
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      :checked="props.row.is_active"
                      @change="toggleactive(props.row.id)"
                    />
                    <span class="custom-switch-description"> </span>
                    <span
                      class="custom-switch-indicator"
                      style="background: #9fa8b8"
                    ></span>
                  </label> -->
                </span>
              </template>
            </vue-good-table>
           
            <teleport to="body">
              <b-modal
                id="add-page"
                v-model="ShowModel"
                hide-footer
                class="add"
                title="إضافة منتج"
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
                                style="
                                  width: 200px;
                                  height: 200px;
                                  object-fit: fill;
                                "
                                class="m-1"
                                v-for="(url, index) in imageUrl"
                                :key="index"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button class="btn btn-primary m-auto d-block">
                        إضافة
                      </button>
                    </form>
                  </div>
                </div>
              </b-modal>
            </teleport>
            <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModelEdit"
        hide-footer
        class="edit"
        title="تعديل منتج "
      >
        <div class="row pos-relative" style="z-index: 5555">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-md-6 mt-1">
                <label for=""> الإسم عربي </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.name.ar"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for="">الإسم انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.name.en"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for="">الوصف عربي</label>
                <ckeditor
                  :editor="editor"
                  v-model="formEdit.description.ar"
                  :editorConfigs="editorConfigs"
                ></ckeditor>
              </div>
              <div class="col-md-6 mt-1">
                <label for="">الوصف انجليزي</label>
                <ckeditor
                  :editor="editor"
                  v-model="formEdit.description.en"
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
                  v-model="formEdit.brand_id"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> اختر القسم </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="Selectcategories"
                  placeholder="اختر القسم "
                  v-model="formEdit.categories_ids"
                  mode="multiple"
                  :close-on-select="false"
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
                  </template>
                </Multiselect>
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> السعر الأساسي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.base_price"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> لينك seo </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.seo_url"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> عنوان seo </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.seo_title"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> وصف seo </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.seo_description"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> باركود </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.barcode"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> كمية </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.quantity"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> السعر </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.price"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> سعر الكلفة </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.cost_price"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> السعر بعد الخصم</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formEdit.discounted_price"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> تاريخ انتهاء الخصم </label>
                <input
                  type="date"
                  placeholder=""
                  v-model="formEdit.discount_end_date"
                  class="form-control"
                />
              </div>
              <div class="col-md-12 mt-3">
                <label for="">الصوره</label>
                <div class="form-group">
                  <input
                    type="file"
                    @change="handleFileedit"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                    multiple
                  />
                  <div class="d-flex flex-wrap mt-2">
                    <div
                      v-for="(url, index) in imageedit"
                      :key="index"
                      class="d-flex"
                    >
                      <img
                        :src="url.path"
                        alt="Preview Image"
                        style="width: 200px; height: 200px; object-fit: fill"
                        class="m-1"
                      />
                      <span
                        class="si si-close text-red"
                        @click="removeimage(index)"
                        style="
                          margin-right: -30px;
                          background: #fff;
                          padding: 5px;
                          height: max-content;
                          margin-top: 5px;
                        "
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary m-auto d-block" @click="update">
              تعديل
            </button>
          </div>
        </div>
      </b-modal>
    </teleport>
          </div>
        </div>
      </div>
    </div>
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
import { reactive } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import crudDataService from "../../Services/crudDataService.js";
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
      perminlocal: localStorage.getItem("permissions"),
      columns: [
        {
          label: "الصوره",
          field: "cover_image",
        },
        {
          label: "الإسم",
          field: "name.ar",
        },
        {
          label: "السعر",
          field: "current_price",
        },
        {
          label: "الماركة",
          field: "brand.name.ar",
        },
        {
          label: "فعل",
          field: "actions",
        },
      ],
      rows: [],
      onestore: null,
      Selectcategories: [],
      Selectbrand: [],
      imageUrl: [],
      imageedit: [],
      ShowModel: false,
      ShowModelEdit:false,
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
      formEdit: {
        name: {
          ar: "",
          en: "",
        },

        description: {
          ar: "",
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
        brand_id: "",
      },
      id:null
    };
  },
  methods: {
    async getstore() {
      const res = await crudDataService.get(
        "stores",
        `${this.$route.params.id}`
      );
      this.onestore = res.data.data;
      this.rows = res.data.data.products.map((product) => {
            return { ...product };
          });
      this.Selectcategories = res.data.data.categories.map((ele) => ({
        value: ele.id,
        name: ele.name.ar,
      }));
    },
 
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
    removeimage(index) {
      this.imageedit.splice(index, 1);
    },
    handleFileedit(event) {
      const files = event.target.files;
      this.formEdit.images = [];
      Array.from(files).forEach((file) => {
        this.formEdit.images.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageedit.push({
            path: e.target.result,
            thumbnail: e.target.result,
          });
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
    async add() {
      let res = await crudDataService.create(
        `stores/${this.$route.params.id}/products`,
        this.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then(()=>{
        this.ShowModel = false;
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
      this.formData.categories_ids = [];
      this.formData.brand_id = "";
      this.formData.images = "";
      this.categories_ids = [];
      (this.formData.brand_id = ""), (this.imageUrl = "");
  
      })
    },
    async edit(data) {
      this.id = data.id;
      // let res = await crudDataService.getAll(`products/${this.id}/variants`);
      // this.variant = res.data.data;
      this.ShowModelEdit = true;
      this.formEdit.name.ar = data.name.ar;
      this.formEdit.description.ar = data.description.ar;
      this.formEdit.brand_id = data.brand ? data.brand.id : "";
      this.formEdit.name.en = data.name.en;
      this.formEdit.description.en = data.description.en;
      this.formEdit.barcode = data.barcode;
      this.formEdit.base_price = data.base_price;
      this.formEdit.seo_url = data.seo_url;
      this.formEdit.seo_title = data.seo_title;
      this.formEdit.seo_description = data.seo_description;
      this.formEdit.quantity = data.quantity;
      this.formEdit.price = data.price;
      this.formEdit.cost_price = data.cost_price;
      this.formEdit.discounted_price = data.discounted_price;
      this.formEdit.discount_end_date = data.discount_end_date;
      this.formEdit.categories_ids = data.categories.map((category) =>
        category ? category.id : ""
      );
      this.imageedit = data.images;
    },
    async update() {
      console.log(this.formEdit);
      
      let res = await crudDataService.create(
        `stores/${this.$route.params.id}/products/${this.id}?_method=put`,
        this.formEdit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.ShowModelEdit = false;
      this.getstore();
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: ` ؟"${name.ar}" هل تريد حذف `,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal.fire({
              title: "تم الحذف بنجاح!",
              icon: "success",
              confirmButtonText: "تم", // ✅ Custom OK button text
            });
            crudDataService.delete(`stores/${this.$route.params.id}/products`, `${data}`).then(() => {
              this.rows.splice(index, 1);
            });
          }
        });
    },
  },
  computed: {
    filteredColumns() {
      if (
        !this.perminlocal.includes("stores-show") ||
        !this.perminlocal.includes("stores-update") ||
        !this.perminlocal.includes("stores-destroy")
      ) {
        return this.columns?.length ? this.columns : [];
      }
      return this.columns;
    },
  },
  mounted() {
    this.getstore();
    this.getbrands();
  },
};
</script>

<style scoped lang="scss">
.dropend {
  background: #fff;
  position: absolute;
  width: 150px;
  box-shadow: 0px 3px 3px 0px #e6edf0;
  border-radius: 3px;
  a {
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.multiselect-caret {
  margin: 0 var(--ms-px, 0.875rem) 0 var(--ms-px, 0.875rem);
}
.multiselect-multiple-label,
.multiselect-placeholder,
.multiselect-single-label {
  left: auto;

  padding-right: 9px;

  right: 0;
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
    margin: 8.75rem auto;
  }
}
</style>
