<template>
  <section class="mt-5 pt-5">
    <div class="border p-3 mb-3 d-flex justify-content-between align-items-center" style="border-radius: 8px">
      <h4 class="mb-0">الأدوار</h4>
      <button class="fs-15 btn-add " @click="ShowModel = true"
    v-if="perminlocal.includes('roles-store')"
    
      >
        <i class="fe fe-plus"></i>
        اضافة  دور جديد
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
    <div class="card custom-card border-0 mg-b-20"  v-if="items.length>0">
      <div class="card-body p-0">
        <div
          class="table-responsive border-item rounded border-bottom-0  mb-0"
        >
          <table class="table  table-bordered text-nowrap text-md-nowrap mg-b-0">
            <tr
              v-for="(item, index) in items"
              :key="index"
              class="list_item py-3 w-100 align-items-center justify-content-between"
            >
            
              <td @click="onerole(item.id)" style="cursor: pointer">
                {{ item.name }}
              </td>
        
              <td>
                <button
                  class="btn me-2"
                  @click="del(item.id, index, item.name)"
    v-if="perminlocal.includes('roles-destroy')"
               
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
لا يوجد ادوار حتي الان 
</div>
 </section> 
 </section>

    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer>
      
        <div class="mt-4  pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">إضافة دور جديد </h6>
          <form @submit.prevent="add">
        <div class="row">
          <div class="col-12 mb-3">
            <label >الاسم</label>
              <input
                type="text"
                name=""
                id=""
                class="form-control"
                v-model="formData.name"                 />
            </div>
          <div class="col-6" v-for="(item, key) in permissions" :key="key">
              <div class="pb-3">
                <h5>
                  {{ item.title }}
                </h5>
                <div
                  class="mt-1"
                  v-for="(text, i) in item.permissions"
                  :key="i"
                >
                  <input
                    type="checkbox"
                    name="vehicle1"
                    :value="text.name"
                    v-model="formData.permission"
                  />
                  <label for="vehicle1" class="mb-0 ms-1">
                    {{ text.display_name }}</label
                  ><br />
                </div>
              </div>
          </div>
        </div>
            <div class="text-center">
              <button class="fs-15 btn-save mx-1" type="submit">إضافة</button>
              <button class="fs-15 btn-cancel mx-1" @click="ShowModel = false">
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
import { useToast } from "vue-toastification";

import crudDataService from "../../Services/crudDataService.js";
export default {
  data() {
    return {
    loading:false,
      items: [],
      ShowModel: false,
      formData: {
      name: "",
      permission: [],
    },
    permissions: [],
    perminlocal: localStorage.getItem("permissions"),

    };
  },
  methods: {
    async getpermission() {
    const res = await crudDataService.getAll("permissions");
    this.permissions = res.data.data;
  },
    async getroles() {
      this.loading = true; // Start loading

try {
const res = await crudDataService.getAll("roles");
      this.items = res.data.data;
}catch (error) {
console.error("Failed to fetch data:", error);
// Handle error
} finally {
this.loading = false; // End loading regardless of success or failure
}
     
    },
    onerole(id) {
    if (this.perminlocal.includes("roles-show")) {

      this.$router.push({ name: "SingleRole", params: { id } });
      }  },
    async add() {
      let res = await crudDataService.create(
        `roles`,
        this.formData,
    
      );
      this.getroles();
      this.ShowModel = false;
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف المسؤول `,
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
            crudDataService.delete("roles", `${data}`).then(() => {
              this.items.splice(index, 1);
            });
          }
        });
    },
  },
  mounted() {
    this.getroles();
  this.getpermission();

  },
};
</script>
<style>
.border-item.table-responsive .table > :not(caption) > * > * {
  border-bottom: none !important;
}
#add-page {
  overflow-y: auto;
}
input::file-selector-button {
  background-image: linear-gradient(to right, #E66239, #E66239) !important;
}
</style>
