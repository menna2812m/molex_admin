<template>
  <section class="position-relative" style="height: 100vh;display: grid;
 place-items: center;"
 v-if="loading"
>

<section class="cate">
</section>
<progress class="pure-material-progress-circular"/> 

</section> 
<section v-else>
 <div class="row row-sm mt-5 pt-5" v-if="items.length > 0">
   <div class="col-12">
     <div class="card p-3 border-1 mb-3" v-for="(item, i) in items" :key="i" >
       <div class="d-flex justify-content-between border-bottom">
         
         <h4 class="mb-0">
           <!-- <i v-if="item.is_seen===1" class="fe fe-eye text-green" style="cursor: pointer;"></i> -->
           <span v-if="perminlocal.includes('contacts-seen')"
           >
           <i v-if="item.is_seen===0" class="fe fe-eye-off text-info" style="cursor: pointer; color: rgb(38, 202, 38);" @click="seenmessage(item.id)"
></i>
</span>
     
           {{ item.name }}</h4>
         <div class="d-flex">
           <div class="icon d-flex flex-column align-items-end">
             <a
               :href="`tel:+${item.email}`"
               class="text-decoration-none d-block mb-3"
             >
               <i class="fe fe-mail"></i>
               {{ item.email }}
             </a>
             <a
               :href="`tel:+${item.phone}`"
               class="text-decoration-none d-block mb-3"
             >
               {{ item.phone }}

               <i
                 class="fe fe-phone"
               ></i>
             </a>
             <!-- 
             "subject": null,
             "message": "bkrhkooo" -->
           </div>
           <button
@click="del(item.id, i, item.name)"
style=" background: transparent;
 border: none;
 width: max-content;
 height: max-content;
"              
v-if="perminlocal.includes('contacts-destroy')"
>
             <i class="fe fe-trash text-danger px-3" ></i>
           </button>
        
         </div>
       </div>
       <div class="mt-2">
         <h4>الرسالة:</h4>
         <p>
           {{ item.message }}
         </p>
       </div>
      
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
لا يوجد رسائل حتي الان 
</div>
</section> 
<b-pagination
      v-model="page"
      :total-rows="last"
      :per-page="1"
      @click="paginag(page)"
      class="justify-content-end"
     
    ></b-pagination>
</section>


</template>

<script>
import { useToast } from "vue-toastification";
import crudDataService from "../../Services/crudDataService.js";
export default {
components:{
},
data() {
 return {
  page: 1,
      last: 2,
   items: [],
   loading:false,
   notifications:[],
 perminlocal : localStorage.getItem('permissions')

 };
},
methods: {
 async getContact() {
   this.loading = true; // Start loading

try {
const res = await crudDataService.getAll("contacts");
   this.items = res.data.data.data;   
   this.last = res.data.data.last_page;
  
   res.data.data.data.forEach((element) => {
     if (element.is_seen===0) {
       this.notifications.push(element);
 localStorage.setItem('notificationCount', this.notifications.length);

     }
   });

}catch (error) {
console.error("Failed to fetch data:", error);
// Handle error
} finally {
this.loading = false; // End loading regardless of success or failure
}
  
 },
 async paginag(p) {
      console.log(p);
      let res = await crudDataService.getAll(`contacts?page=${this.page}`);
      this.items = res.data.data.data;
    },
 async seenmessage(id){
   const res = await crudDataService.create(`contacts/${id}/seen`)
   const toast = useToast();
   this.notifications=[]
 this.getContact()
 // localStorage.clear('notificationCount');
 localStorage.setItem('notificationCount', this.notifications.length);
   if (res.data.success) {
     toast.success(res.data.message, {
       position: "top-center",
       timeout: 3000,
     });
   }
 },
 del(data, index, name) {
   this.$swal
     .fire({
       title: ` ؟"${name}"  هل تريد حذف رسالة `,
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
         crudDataService.delete("contacts", `${data}`).then(() => {
           this.items.splice(index, 1);
           this.ShowModelEdit = false;
         });
       }
     });
 },
},
mounted() {
 this.getContact();
},
};
</script>
