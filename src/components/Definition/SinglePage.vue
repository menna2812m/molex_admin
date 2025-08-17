<template>
  <section v-if="item">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <h4 class="mb-0">{{ item.title ? item.title.ar : "" }}</h4>
            <div class="pos-relative">
              <button
                @click="toggleDropdown"
                class="twobtn bg-white border"
                style="border-color: #fd601f !important; color: #fd601f"
              >
                خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
              </button>

              <div class="text-start dropend mt-1" v-if="isDropdownOpen">
                <a class="dropdown-item" @click="edit()">تعديل الصفحة </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <h5>
                اخر تحديث :
                {{ item.updated_at }}
              </h5>
            </div>
            <ul>
              <h3>تحسينات seo</h3>
              <li>
                {{ item.seo_title }}
              </li>
              <li>
                {{ item.seo_description }}
              </li>
              <li>
                {{ item.seo_url }}
              </li>
            </ul>
            <div>
              <h3>المحتوي:</h3>
              <p v-if="item.content" v-html="item.content.ar"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/23.png" alt="img2" />
        </div>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">تعديل الصفحة</h6>
          <form @submit.prevent="updated">
            <div class="row">
              <div class="col-12 mb-3">
                <label> عنوان الصفحة عربي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control"
                  v-model="formData.title.ar"
                />
              </div>
              <div class="col-12 mb-3">
                <label> عنوان الصفحة انجليزي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control"
                  v-model="formData.title.en"
                />
              </div>
              <div class="col-12 mb-3">
                <label> محتوي الصفحة عربي</label>

                <ckeditor
                  :editor="editor"
                  v-model="formData.content.ar"
                  :editorConfigs="editorConfigs"
                ></ckeditor>
              </div>
              <div class="col-12 mb-3">
                <label> محتوي الصفحة انجليزي</label>

                <ckeditor
                  :editor="editor"
                  v-model="formData.content.en"
                  :editorConfigs="editorConfigs"
                ></ckeditor>
              </div>

              <div class="col-12 mb-3">
                <label class="fs-6">تحسينات seo</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="عنوان صفحة تعريفية "
                  class="form-control"
                  v-model="formData.seo_title"
                />
              </div>

              <div class="col-12 mb-3">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="وصف صفحة تعريفية "
                  class="form-control"
                  v-model="formData.seo_description"
                />
              </div>
              <div class="col-12 mb-3">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="رابط صفحة تعريفية "
                  class="form-control"
                  v-model="formData.seo_url"
                />
              </div>
            </div>
            <div class="text-center">
              <button class="fs-15 btn-save mx-1" type="submit">تعديل</button>
              <button class="fs-15 btn-cancel mx-1">الغاء</button>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { reactive } from "vue";

export default {
  data() {
    return {
      isDropdownOpen: false,
      ShowModel: false,
      isDropdown: false,
      item: null,
      formData: {
        title: {
          ar: "",
          en: "",
        },
        content: {
          ar: "",
          en: "",
        },
        seo_title: "",
        seo_description: "",
        seo_url: "",
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  setup() {
    const editorConfigs = reactive({});
    return { editor: ClassicEditor, editorConfigs };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    edit() {
      this.ShowModel = true;
      this.formData.title.ar = this.item.title.ar;
      this.formData.title.en = this.item.title.en;
      this.formData.content.ar = this.item.content.ar;
      this.formData.content.en = this.item.content.en;
      this.formData.seo_title = this.item.seo_title;
      this.formData.seo_description = this.item.seo_description;
      this.formData.seo_url = this.item.seo_url;
    },
    async getPage() {
      const res = await crudDataService.get(
        "pages",
        `${this.$route.params.id}`
      );
      this.item = res.data.data;
    },
    async updated() {
      let res = await crudDataService.create(
        `pages/${this.$route.params.id}?_method=put`,
        this.formData
      );
      this.getPage();
      this.ShowModel = false;
      console.log(res.data.data);
    },
  },
  mounted() {
    this.getPage();
  },
};
</script>

<style lang="scss">
.form-check-input:checked {
  background-color: #fe7eae;
  border-color: #fe7eae;
  width: 16px;
  height: 16px;
}
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
    margin: 5.75rem auto;
  }
}
#add-page {
  overflow-y: auto;
}
</style>
