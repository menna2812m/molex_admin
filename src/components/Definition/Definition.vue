<template>
  <section class="mt-5" >
    <button class="fs-15 btn-add mb-4" @click="ShowModel = true" 
    v-if="perminlocal.includes('pages-store')"
    >
      <i class="fe fe-plus"></i>
      صفحة جديدة
    </button>
    <section class="position-relative" style="height: 100vh;display: grid;
    place-items: center;"
    v-if="loading"
   >

<section class="cate">
</section>
 <progress class="pure-material-progress-circular"/> 

   </section>  
   <section v-else>
    <div class="card custom-card mg-b-20" v-if="pages.length>0">
      <div class="card-body p-0">
        <ul class="list-unstyled mb-0">
          <li class="w-100 p-3 border-bottom justify-content-between align-items-center" v-for="(page,i) in pages " :key="i">
      
            <p class=" fw-semibold fs-6 mb-0" style="cursor: pointer;" @click="singlepage(page.id)">
                {{ page.title}}
              </p>
              <div class="d-flex align-center">
                <label class="custom-switch justify-content-center "
                v-if="perminlocal.includes('pages-toggle')"
                >
              <input
                type="checkbox"
                name="custom-switch-checkbox"
                class="custom-switch-input"
                v-model="page.is_published"
                @change="publish(page.id)"
              />
          
              <span class="custom-switch-indicator ms-auto"></span>
            </label>
            <button
            class="btn  me-2"
            @click="del(page.id,i, page.title)"
            v-if="perminlocal.includes('pages-destroy')"
          >
            <i class="fe fe-trash text-danger"></i>
          </button>
        
              </div>
          
          </li>
    
        </ul>
      </div>
    </div>
    <section class="position-relative" style="height: 100vh;display: grid;
    place-items: center;"
    v-else
   >
<div style="
background: #E66239;
    padding: 30px;
    font-size: 20px;" class="w-50 text-center text-white rounded-10">
  لا يوجد صفحات حتي الان 
</div>
   </section> 
   </section>
    
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/23.png" alt="img2" />
        </div>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555;">
          <h6 style="color: #febcd5" class="text-center">إنشاء صفحة</h6>
          <form @submit.prevent="add">
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
                <label> محتوي الصفحة  عربي</label>

                <ckeditor
                  :editor="editor"
                  v-model="formData.content.ar"
                  :editorConfigs="editorConfigs"
                ></ckeditor>
               
              </div>
              <div class="col-12 mb-3">
                <label> محتوي الصفحة  انجليزي</label>

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
              <button class="fs-15 btn-save mx-1" type="submit">حفظ</button>
              <button class="fs-15 btn-cancel mx-1">الغاء</button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
  
</template>

<script>
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { reactive } from "vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      isDropdownOpen: false,
      ShowModel: false,
      isDropdown:false,
      loading:false,
      pages:[],
      formData:{
        title:{
          ar:"",
          en:""
        },
        content:{
          ar:"",
          en:""
        },
        seo_title:"",
        seo_description:"",
        seo_url:""
      },
    perminlocal : localStorage.getItem('permissions')

    };
  },
  setup() {
    const editorConfigs = reactive({});
    return { editor: ClassicEditor, editorConfigs };
  },
  methods: {
   async publish(id){
      let res=await crudDataService.create(`pages/${id}/toggle`,'');
       const toast = useToast();
      if(res.data.success){
      toast.success(res.data.message, {
        position: "top-center",
        timeout: 5000,
      });
    }
    },
    toggled() {
      this.isDropdown = !this.isDropdown;
    },
    singlepage(id){
      if (this.perminlocal.includes('pages-show')) {
        this.$router.push({name:'Singlepage',params:{ id }})
        
      }
    },
   
    async getallpages() {
  
      this.loading = true; // Start loading

try {
  let res = await crudDataService.getAll("pages");
      this.pages=res.data.data.data;
 
}catch (error) {
console.error("Failed to fetch data:", error);
// Handle error
} finally {
this.loading = false; // End loading regardless of success or failure
}
    },
    async add() {
      let res = await crudDataService.create("pages",this.formData).then((response)=>{
        this.getallpages();
      this.ShowModel=false
        this.formData.title.ar= "",
        this.formData.title.en= "",
        this.formData.content.ar= "",
        this.formData.content.en= "",
        this.formData.seo_title= "",
        this.formData.seo_description= "",
        this.formData.seo_url= ""
      })
     
    },
    del(data,index, name) {
      this.$swal
        .fire({
          title: ` ؟"${name}" هل تريد حذف صفحة`,
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
            crudDataService.delete("pages", `${data}`).then(() => {
              this.pages.splice(index, 1);
            });
          }
        });
    },
  },
  mounted(){
    this.getallpages();
  }
};
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0 0 9px 2px #e6edf0bf;
}
</style>
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
