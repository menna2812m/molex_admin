<template>
  <section class="mt-5 pt-5" >
    <div class="pos-relative">
      <button @click="ShowModel = true" class="btn-add me-0 mb-4"
      v-if="perminlocal.includes('sliders-store')"
      >
        <i class="fe fe-plus"></i>
        اسلايد جديد
      </button>
    </div>
    <section class="position-relative" style="height: 100vh;display: grid;
    place-items: center;"
    v-if="loading"
   >

<section class="cate">
</section>
 <progress class="pure-material-progress-circular"/> 

   </section>  
   <section v-else>
  
    <div class="card custom-card border-0 mg-b-20"   v-if="myList.length>0">
      <div class="card-body p-0">
        <div
          class="table-responsive border-0 rounded border-bottom-0 px-4 mb-0"
        >
          <table class="table text-nowrap text-md-nowrap mg-b-0">
            <tr>
              <td class="text-muted">صورة الاسلايد</td>
              <td class="text-muted">عنوان الاسلايد</td>
              <td class="text-muted">التفعيل</td>
            </tr>
            <tr
              v-for="(item, index) in myList"
              :key="index"
              class="list_item py-3 w-100 align-items-center justify-content-between"
            >
              <td>
                <img :src="item.image" alt="" width="250" height="250" />
              </td>
              <td>
                {{ item.title.ar }}
              </td>
              

              <td>
                <label class="custom-switch justify-content-start w-100"
      v-if="perminlocal.includes('sliders-toggle')"
                
                >
                  <input
                    type="checkbox"
                    name="custom-switch-checkbox"
                    class="custom-switch-input"
                    :checked="item.is_active"
                    @change="toggleactive(item.id)"
                  />
                  <span class="custom-switch-description"> </span>
                  <span class="custom-switch-indicator"></span>
                </label>
              </td>
              <td>
                <button class="btn me-2"
                @click="edit(item)"
      v-if="perminlocal.includes('sliders-update')"
                
                >
                  <i class="fe fe-edit-2 text-info"></i>
                </button>
                <button
                  class="btn me-2"
                  @click="del(item.id, index, item.title)"
      v-if="perminlocal.includes('sliders-destroy')"
                
                >
                  <i class="fe fe-trash text-danger"></i>
                </button>
              </td>
            </tr>
          </table>
        </div>
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
  لا يوجد اسلايدر حتي الان 
</div>
   </section> 
   </section>

    <teleport to="body">
      <b-modal id="add" v-model="ShowModel" hide-footer title="اضافة اسلايد">
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="add">
            <div class="row">
              <div class="col-md-6">
                <div class="mt-1">
                  <label >الاسم عربي </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.title.ar"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label >الاسم انجليزي </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.title.en"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mt-1">
                  <label >اللينك </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.link"
                  />
                </div>
              </div>
           
              <div class="col-md-6">
                <div class="mt-1">
                  <label >الصورة</label>
                    <input
                    type="file"
                    class="form-control "
                    @change="onFileSelected($event)"
                    accept=".pdf, image/jpeg, image/png"
                  />

               
                  <img
                        :src="imgurl"
                        style="width: 180px; height: 180px; object-fit: fill"
                        class="m-1"
                        v-if="imgurl.length>0"
                      />
                </div>
              </div>
            </div>
            <button class="btn btn-primary m-auto mt-3 d-block" type="submit">
              اضافة
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
    <teleport to="body">
      <b-modal id="add" v-model="ShowEditModel" hide-footer title="تعديل اسلايد">
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-md-6">
                <div class="mt-1">
                  <label >الاسم عربي </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.title.ar"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label >الاسم انجليزي </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.title.en"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mt-1">
                  <label >اللينك </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.link"
                  />
                </div>
              </div>
           
              <div class="col-md-6">
                <div class="mt-1">
                  <label >الصورة</label>
                 
                  <div class="pos-relative overflow-hidden">
                    <input
                    type="file"
                    class="form-control pos-relative"
                    @change="editFileSelected($event)"
                    accept=".pdf, image/jpeg, image/png"
                  />

                  <!-- <p class="pos-absolute mb-0 bg-white overflow-scroll h-75 w-50" v-if="changeedit" style="top: 5px;
    left: 5px;
  ">{{ textimage }}</p> -->
  </div>
                  <img :src="imageedit"  
                  style="width: 180px; height: 180px; object-fit: fill"
                  class="m-1"
                  v-if="imageedit.length>0">
                </div>
              </div>
            </div>
            <button class="btn btn-primary m-auto mt-3 d-block" type="submit">
              تعديل
            </button>
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
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      textimage:'',
      changeedit:true,
      ShowModel: false,
      ShowEditModel:false,
      myList: [],
      id:null,
      imgurl:[],
      imageedit:[],
      loading:false,
      formData: {
        title: {
          ar: "",
          en: "",
        },
        link: "",
        image: "",
      },
      EditData:{
        title: {
          ar: "",
          en: "",
        },
        link: "",
        image: "",
      },
      perminlocal: localStorage.getItem("permissions"),
      
    };
  },
  methods: {
    async toggleactive(id) {
      let res = await crudDataService.create(`sliders/${id}/toggle`, "");
      const toast = useToast();
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imgurl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
editFileSelected(event) {
  console.log(event);
  if (event.target) {
    this.changeedit=false;

    this.EditData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageedit = reader.result;
      };
      reader.readAsDataURL(this.EditData.image);
  
  }else{
    this.changeedit=true;

    this.EditData.image= event
  }
        },
    async edit(data) {
        console.log(data);
        this.id = data.id;
        this.ShowEditModel = true;
        this.EditData.title.ar = data.title.ar;       
        this.EditData.title.en = data.title.en;
        this.EditData.link = data.link;
        this.textimage=data.image,
        this.EditData.image= this.editFileSelected(data.image) ;
        this.imageedit=data.image;   
      },
      async update() {
        let res = await crudDataService.create(
          `sliders/${this.id}?_method=put`,
          this.EditData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(this.EditData);
        this.ShowEditModel = false;
        this.sliders();
      },
    async sliders() {
      this.loading = true; // Start loading

try {
  let res = await crudDataService.getAll("sliders");
      this.myList = res.data.data.data;
 
}catch (error) {
console.error("Failed to fetch data:", error);
// Handle error
} finally {
this.loading = false; // End loading regardless of success or failure
}
     
    },
   async add(){
    const toast = useToast();

    let res = await crudDataService.create(`sliders`, this.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response)=>{
        this.sliders();
      this.ShowModel = false;
        this.formData.title.ar= "",
        this.formData.title.en= "",
        this.formData.link= "",
        this.formData.image= "",
        this.imgurl=''
      }) .catch ((error) => {
        this.ShowModel = false;
        
        const errorData = error?.data?.errors || {};
        console.log(error);
        
        const errorMessages = Object.values(errorData).flat().filter((msg) => typeof msg === "string");

        if (errorMessages.length > 0) {
          console.log(errorMessages[0]);
          
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
      })
   },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name.ar}" هل تريد حذف الاسلايد `,
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
            crudDataService.delete("sliders", `${data}`).then(() => {
              this.myList.splice(index, 1);
            });
          }
        });
    },
  },
  mounted() {
    this.sliders();
  },
};
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0px 3px 3px 0px #e6edf0;
}
.list_item:not(:last-child) {
  border-bottom: 1px solid #e8e7ff;
}
.table-responsive .table > :not(caption) > * > * {
  border-bottom: 0px solid #e8e8f7 !important;
}
</style>
