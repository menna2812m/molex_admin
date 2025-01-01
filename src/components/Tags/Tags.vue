<template>
  <section>
 
    <button @click="ShowModel = true" class="btn-add me-0 mb-4" v-if="perminlocal.includes('tags-store')">
      <i class="fe fe-plus"></i>
    وسم جديد 
    </button>
    <section class="position-relative" style="height: 100vh;display: grid;
  place-items: center;"
  v-if="loading"   >

<section class="cate">
</section>
<progress class="pure-material-progress-circular"/> 

 </section> 
 <section v-else>
  <div class="card custom-card border-0 mg-b-20" v-if="myList.length>0">
    <div class="card-body p-0">
      <div
        class="table-responsive border-0 rounded border-bottom-0 px-4 mb-0"
      >
        <table class="table text-nowrap text-md-nowrap mg-b-0">
          <tr>
            <td class="text-muted">اسم الوسم</td>
          </tr>
          <tr
            v-for="(item, index) in myList"
            :key="index"
            class="list_item py-3 w-100 align-items-center justify-content-between"

          >
            <td class="py-4" >{{ item.name }}</td>
           
          
              <td>
      <button class="btn me-2" @click="edit(item)" 
      v-if="perminlocal.includes('tags-update')"
      >
      <i class="fe fe-edit-2 text-info"></i>
    </button>
              <button class="btn me-2" @click="del(item.id, index, item.name)"
              v-if="perminlocal.includes('tags-destroy')">
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
لا يوجد وسوم حتي الان 
</div>
 </section> 
 </section>

  <teleport to="body">
    <b-modal id="add-page" v-model="ShowModel" hide-footer title="اضافة وسم">
      
      <div class="p-0">
       
        <form @submit.prevent="add">
          <div class="row">
            <div class="col-12">
              <div class="mt-1">
                <label >  اسم الوسم </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.name"
                />
              </div>
            </div>
          
     
        
          </div>
          <button class="btn btn-primary m-auto d-block mt-3" type="submit">
            اضافة
          </button>
        </form>
      </div>
    </b-modal>
  </teleport>
  <teleport to="body">
    <b-modal id="add-page" v-model="ShowModeledit" hide-footer title="تعديل وسم">
      
      <div class="p-0">
       
        <form @submit.prevent="update">
          <div class="row">
            <div class="col-12">
              <div class="mt-1">
                <label >  اسم الوسم</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formDataupdate.name"
                />
              </div>
            </div>
           
     
        
          </div>
          <button class="btn btn-primary m-auto d-block mt-3" type="submit">
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
      id:null,
      ShowModeledit:false,
    ShowModel: false,
    myList: [],
    formData:{
    name:''
   
    },
    formDataupdate:{
    name: ""
    },
    loading:false,
    perminlocal : localStorage.getItem('permissions')

  };
},
methods: {
  async edit(data) {
      this.ShowModeledit=true
      console.log(data);
    this.id = data.id;
  
    this.formDataupdate.name = data.name;
       },
  async update() {
    let res = await crudDataService.create(
      `tags/${this.id}?_method=put`,
      this.formDataupdate,
      
    );
    this.tags();
    this.ShowModeledit = false;
  },
  async tags() {
    this.loading = true; // Start loading

try {
let res = await crudDataService.getAll("tags");
    this.myList = res.data.data;
}catch (error) {
console.error("Failed to fetch data:", error);
// Handle error
} finally {
this.loading = false; // End loading regardless of success or failure
}
   
  },
  singleoffer(id){
    this.$router.push({name:'SingleOffer',params:{ id }})
  },
  del(data, index, name) {
    this.$swal
      .fire({
        title: `؟"${name}" هل تريد حذف الوسم `,
        showCancelButton: true,
        confirmButtonText: "Yes",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$swal.fire("Deleted successfully!", "", "success");
          crudDataService.delete("tags", `${data}`).then(() => {
            this.myList.splice(index, 1);
          });
        }
      });
  },
  async add() {
    this.ShowModel = false;
    let res = await crudDataService.create(`tags`, this.formData).then((response)=>{
      this.tags();
      this.formData.name=''
    })
  },
},
mounted() {
  this.tags();
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

.tab-menu-heading {
border: 1px solid #e8e8f7;
}
.tabs-style-3 .nav.panel-tabs li a {
padding: 10px 18px 10px 18px;
background: transparent;
border-radius: 0;
margin: 0;
text-align: center;
display: block;
color: #14112d;
}
</style>
<style lang="scss">
.modal {
overflow: auto;

& .multiselect-placeholder,
& ::placeholder {
  font-size: 12px;
}
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
.dp__menu_index {
z-index: 999999999 !important;
}
.dp__input_icon {
margin-right: auto !important;
}
.dp__action_buttons {
text-align: left;
.dp__action.dp__cancel {
  display: none;
}
}
</style>
