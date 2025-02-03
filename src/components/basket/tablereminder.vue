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
    <div class="card custom-card border-0 mg-b-20" v-if="items">
    <div class="card-body p-0">
      <div class="table-responsive rounded border-bottom-0 px-4 mb-0">
        <table class="table text-nowrap text-md-nowrap mg-b-0 p-4">
          <tr class="mb-4">
            <td class="text-muted">الموضوع</td>
            <td class="text-muted">نوع الخصم</td>
            <td class="text-muted">قيمة الخصم</td>
            <td class="text-muted">عدد ايام السله المتروكه</td>
            <td class="text-muted">الخصم صالح لمدة</td>
            <td class="text-muted">التذكير</td>
          </tr>
          <tr
            v-for="(item, index) in items"
            :key="index"
            class="list_item py-3 w-100 align-items-center justify-content-between"
          >
            <td>
              <h6 class="mb-0 fw-semibold">
                {{ item.subject }}
              </h6>
            </td>

            <td>{{ item.discount_type }}</td>
            <td>
              {{ item.discount_value }}
            </td>
            <td>
              {{ item.cart_left_days }}
            </td>
            <td>
              {{ item.discount_valid_for_hours }}
            </td>
            <td>
              <label class="custom-switch w-100"
      v-if="perminlocal.includes('cart_reminders-toggle')"
              
              >
                <input
                  type="checkbox"
                  name="custom-switch-checkbox"
                  class="custom-switch-input border-bottom-0"
                  :checked="item.is_active"
                  @change="toggleactive(item.id)"
                />
                <span class="custom-switch-description"> </span>
                <span class="custom-switch-indicator"></span>
              </label>
            </td>
            <td class="text-center py-3">
              <button
                class="bg-transparent rounded"
                style="
                  color: #E66239;
                  border: 1px solid #E66239;
                  border-bottom: 1px solid #E66239 !important;
                "
                @click="edit(item)"
      v-if="perminlocal.includes('cart_reminders-update')"

              >
                تعديل
              </button>
              <button
                class="bg-transparent rounded mx-1"
                style="
                  color: red;
                  border: 1px solid red;
                  border-bottom: 1px solid red !important;
                "
                @click="del(item.id, index, item.subject)"
                v-if="perminlocal.includes('cart_reminders-destroy')"

              >
               <i class="fe fe-trash"></i>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div class="text-center" v-else>
    <img src="../../assets/img/Interse.png" alt="" class="d-block m-auto" />
    <span class="text-muted"> لا توجد تذكيرات بعد </span>
  </div>
  <teleport to="body">
      <b-modal id="add" v-model="ShowModelEdit" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/Interse.png" alt="img2" />
        </div>
        <div class="mt-5 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">تعديل تذكير </h6>
          <form @submit.prevent="updates">
            <div class="row">
             
              <div class="col-12">
                <h6 class="fw-semibold">شروط التذكر</h6>
                <p class="text-muted fs-10">
                  سيتم ارسال رسالة بعد ترك العميل للمتجر لفترة محدوده وتجاوز سلة
                  المشتريات لقيمة معينة
                </p>
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="number"
                  placeholder="مدة ترك السلة"
                  class="form-control pos-relative"
                  v-model="formData.cart_left_days"
                />
                <p class="pos-absolute fw-semibold" style="top: 25%; left: 9%">
                  يوم
                </p>
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="number"
                  placeholder="مجموع السلة"
                  class="form-control pos-relative"
                  v-model="formData.total_cart"
                />
                <p class="pos-absolute fw-semibold" style="top: 25%; left: 9%">
                  ر.س
                </p>
              </div>
              <div class="col-12 mb-3">
                <label class="ckbox">
                  <input type="checkbox" v-model="formData.is_free_shipping" />
                  <span class="fw-semibold fs-7 ps-1"> شحن مجاني </span>
                </label>
              </div>
              <div class="col-12 mb-3">
                <label class="ckbox mb-0">
                  <input
                    type="checkbox"
                    v-model="formData.is_cart_discounted"
                  />
                  <span class="fw-semibold fs-7 ps-1"> خصم السلة </span>
                  <p class="text-muted fs-10 ms-4 mt-2 mb-0">
                    منح العميل خصم وتحديد نوع الخصم إما مبلغ ثابت او نسبة من سلة
                    المشتريات
                  </p>
                </label>
              </div>
              <div class="col-6 mb-3">
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="discount_type"
                  placeholder="نوع الخصم  "
                  v-model="formData.discount_type"
                />
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="number"
                  v-model="formData.discount_value"
                  class="form-control"
                  placeholder="قيمة الخصم"
                />
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="date"
                  v-model="formData.discount_end_date"
                  class="form-control"
                  placeholder="تاريخ نهاية الخصم "
                />

                <!-- <Datepicker v-model="formData.discount_end_date" textInput placeholder="التاريخ" /> -->
              </div>

              <div class="col-6 mb-3">
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="send_channel"
                  placeholder=" قناة الإرسال"
                  v-model="formData.send_channel"
                />
              </div>
              <div class="col-6 mb-3">
                <input
                  type="text"
                  v-model="formData.subject"
                  class="form-control"
                  placeholder="موضوع التذكير "
                />
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="number"
                  placeholder="مدة صلاح الخصم "
                  class="form-control pos-relative"
                  v-model="formData.discount_valid_for_hours"
                />
                <p class="pos-absolute fw-semibold" style="top: 25%; left: 9%">
                  ساعة
                </p>
              </div>

              <div class="col-md-6 mb-3">
                <textarea
                  name=""
                  id=""
                  rows="3"
                  class="form-control"
                  placeholder="رسالة التذكير"
                  v-model="formData.message"
                ></textarea>
              </div>
            </div>
            <div class="text-center">
              <button class="fs-15 btn-save mx-1">حفظ</button>
              <button class="fs-15 btn-cancel mx-1" @click="ShowModelEdit=false">الغاء</button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
  
</template>

<script>
import { useToast } from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import Temporarydiscount from "./Temporarydiscount.vue";
import crudDataService from "../../Services/crudDataService";
export default {
  components: {
    Multiselect,
    Temporarydiscount,
  },
  data() {
    return {
      discount_type: [
        { value: "fixed", name: "ثابتة" },
        { value: "percent", name: "نسية مئوية" },
      ],
      send_channel: [{ value: "email", name: "بريد الكتروني" }],
      loading:false,
      ShowModelEdit:false,
      id:null,
      items: [],
      selectAll: false,
      formData: {
        is_free_shipping: true,
        is_cart_discounted: true,
        discount_type: "",
        discount_value: "",
        discount_end_date: "",
        send_channel: "",
        message: "",
        subject: "",
        discount_valid_for_hours: "",
        cart_left_days: "",
        total_cart: "",
      },
      perminlocal: localStorage.getItem("permissions"),

    };
  },
  methods: {
    edit(data){
      this.ShowModelEdit=true;
      this.id = data.id;
      this.formData.cart_left_days = data.cart_left_days;
      this.formData.discount_end_date = data.discount_end_date;
      this.formData.discount_type = data.discount_type;
      this.formData.discount_valid_for_hours = data.discount_valid_for_hours;
      this.formData.discount_value = data.discount_value;
      this.formData.is_cart_discounted = data.is_cart_discounted;
      this.formData.is_free_shipping = data.is_free_shipping;
      this.formData.message = data.message;
      this.formData.send_channel = data.send_channel;
      this.formData.subject = data.subject;
      this.formData.total_cart = data.total_cart;
    },
    async updates() {
      const toast = useToast(); 
      console.log(this.id);
      let res = await crudDataService.create(
        `cart_reminders/${this.id}?_method=put`,
        this.formData).then((response)=>{
          this.ShowModelEdit=false;
          const toast = useToast();
          toast.success(response.data.message, {
              position: "top-center",
              timeout: 5000,
            });
        }).catch((error)=>{
          this.ShowModelEdit=false;
         
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
    async getcarts() {
      this.loading = true; // Start loading
try {
  let res = await crudDataService.getAll("cart_reminders");
      this.items = res.data.data;
  
}catch (error) {
console.error("Failed to fetch data:", error);
// Handle error
} finally {
this.loading = false; // End loading regardless of success or failure
}
       },
    async toggleactive(id) {
      const toast = useToast();
      await crudDataService
        .create(`cart_reminders/${id}/toggle`, "")
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message, {
              position: "top-center",
              timeout: 5000,
            });
          }
        })
        .catch((error) => {
        });
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: ` ؟"${name}" هل تريد حذف التذكير`,
           showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          console.log(result);
          if (result.isConfirmed) {
            crudDataService.delete("cart_reminders", `${data}`)
            .then(() => {
              this.items.splice(index, 1);
               this.$swal.fire({
            title: "تم الحذف بنجاح!",
            icon: "success",
            confirmButtonText: "تم", // ✅ Custom OK button text
          });
            }).catch(()=>{
                
            })
          }
        });
    },
  },
  mounted() {
    this.getcarts();
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
