<template>
  <section class="position-relative" style="height: 80vh;display: grid;
 place-items: center;"
 v-if="loading"
>

<section class="cate">
</section>
<progress class="pure-material-progress-circular"/> 

</section>  
<section class="mt-5 pt-5" v-else>
 <section  v-if="myList.length > 0">
   <div v-for="(item, index) in myList" :key="index">
   <div class="d-flex justify-content-between align-items-start pt-3 pb-2">
     <div class="d-flex align-items-start">
       <img
         :src="item.product.cover_image"
         class="imageUrl"
         v-if="item.product"
       />
       <div class="ps-2">
         <h5 class="mb-0">
           {{ item.product?item.product.name.ar:'' }}
         </h5>

         <!-- <p>
           {{ item }}
           <span style="color: #fb99bf">
             {{ item }}
           </span>
         </p> -->
       </div>
     </div>
     <div>
       <span class="text-muted">
         {{ item.created_at }}
       </span>
     </div>
   </div>
   <div class="d-flex border-bottom">
     <div class="d-flex my-3 w-100">
       <img :src="user" class="avatar" />
       <div class="w-50">
         <h4>{{ item.user?item.user.fname:'' }}</h4>
         <rate :length="5" :value="item.rating" :disabled="true" />
         <!-- <span
         v-for="(star,i) in 5"
         :key="i"
         class="star"
         :class="{ filled: item.rating }"
       >
         &#9733;
       </span> -->
         <p>{{ item.comment }}</p>
         <div class="">
           <!-- <input type="text" class="form-control w-100"> -->
           <label class="custom-switch justify-content-center" 
           v-if="perminlocal.includes('questions-toggle')">
               <input
                 type="checkbox"
                 name="custom-switch-checkbox"
                 class="custom-switch-input"
                 :checked="item.is_approved"
               
                 @change="toggleactive(item.id)"
               />
               <span class="custom-switch-description"> </span>
               <span class="custom-switch-indicator"></span>
             </label>
           <!-- <button class="btn-add fs-15 twobtn ms-0">
            <i class="ion-reply"></i>
             رد
              
             الموافقة
           </button> -->
         </div>
       </div>
     </div>
     <button class="trash" @click="del(item.id, index, item.comment)"
     v-if="perminlocal.includes('questions-destroy')">
       <i class="fe fe-trash-2"></i>
     </button>
   </div>
 </div>
 <b-pagination
   v-model="page"
   :total-rows="last"
   :per-page="1"
   @click="getAllData(page)"
   class="justify-content-end mt-5"
 ></b-pagination>
 </section>
 <section class="position-relative" style="height: 80vh;display: grid;
 place-items: center;"
 v-else
>
<div style="
background: #E66239;
 padding: 30px;
 font-size: 20px;" class="w-50 text-center text-white rounded-10">
لا يوجد اسئلة حتي الان 
</div>
</section> 

</section>

</template>

<script>
import user from "../../assets/img/user.png";
import { useToast } from "vue-toastification";
import crudDataService from "../../Services/crudDataService";
export default {
data() {
 return {
   page: 1,
   last: 2,
   user,
   myList: [],
   selectedRating: 0,
   loading:false,
   perminlocal : localStorage.getItem('permissions')

 };
},
methods: {
 // async paginag(p) {
 //   console.log(p);
 //   let res = await crudDataService.getAll(`reviews?page=${this.page}`);
 //   this.myList = res.data.data.data;
 // },
 async toggleactive(id){
 let res=  await crudDataService.create(`reviews/${id}/toggle`,"");
   const toast = useToast(); 
   if(res.data.success){
   toast.success(res.data.message, {
     position: "top-center",
     timeout: 5000,
   });
 }
 },
 async getAllData(p) {
 
   this.loading = true; // Start loading

try {
let res = await crudDataService.getAll(`reviews?page=${this.page}`);
   this.myList = res.data.data.data;
   this.last = res.data.data.last_page;

}catch (error) {
console.error("Failed to fetch data:", error);
// Handle error
} finally {
this.loading = false; // End loading regardless of success or failure
}
 },
 del(data, index, name) {
   this.$swal
     .fire({
       title: ` ؟"${name}" هل تريد حذف `,
       showCancelButton: true,
       confirmButtonText: "Yes",
     })
     .then((result) => {
       /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) {
         this.$swal.fire("Deleted successfully!", "", "success");
         crudDataService.delete("reviews", `${data}`).then((response) => {
           console.log(response);
           this.myList.splice(index, 1);
           this.getAllData();
         });
       }
     });
 },
},
mounted() {
 this.getAllData();
},
};
</script>

<style scoped lang="scss">
.imageUrl {
width: 50px;
height: 50px;
}

.filled {
color: gold;
}
.avatar {
width: 50px;
height: 50px;
}

.trash {
width: max-content;
background: transparent;
border: none;
margin-top: 15px;
i {
 color: #ff6060;
 background: #ffe7e7;
 padding: 10px;
 border-radius: 2px;
}
}
</style>
