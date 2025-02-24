<template>
  <section>
    <button @click="ShowModel = true" class="twobtn btn-add" style="width: 150px; padding: 7px;"
    v-if="perminlocal.includes('cart_reminders-store')"
    >
      تفعيل خصم مؤقت
    </button>
    <teleport to="body">
      <b-modal id="add" v-model="ShowModel" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/Interse.png" alt="img2" />
        </div>
        <div class="mt-5 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">تفعيل خصم مؤقت  </h6>
          <form @submit.prevent="add()">
            <div class="row">
                   <div class="col-12">
                <h6 class="fw-semibold">شروط التذكر</h6>
                <p class="text-muted fs-10">
                  سيتم ارسال رسالة بعد ترك العميل للمتجر لفترة محدوده وتجاوز سلة
                  المشتريات لقيمة معينة
                </p>
              </div>
              <div class="col-12 mb-3">
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="myList"
                  placeholder=" اختر المستخدمين  "
                  v-model="formData.user_ids"
                  mode="multiple"
                  :close-on-select="false"
                />
              </div>
              <!-- <div class="col-md-6 mb-3">
                <input
                  type="number"
                  placeholder="مدة ترك السلة"
                  class="form-control pos-relative"
                  v-model="formData.cart_left_days"
                />
                <p class="pos-absolute fw-semibold" style="top: 25%; left: 9%">
                  يوم
                </p>
              </div> -->
              <!-- <div class="col-md-6 mb-3">
                <input
                  type="number"
                  placeholder="مجموع السلة"
                  class="form-control pos-relative"
                  v-model="formData.total_cart"
                />
                <p class="pos-absolute fw-semibold" style="top: 25%; left: 9%">
                  ر.س
                </p>
              </div> -->
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
              <button class="fs-15 btn-cancel mx-1" @click="ShowModel=false">الغاء</button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { reactive, ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import crudDataService from "../../Services/crudDataService";
import { useToast } from "vue-toastification";

export default {
  components: {
    Multiselect,
  },
  setup() {
    const description = ref();
    const editorConfigs = reactive({});
    return { description, editor: ClassicEditor, editorConfigs };
  },
  data() {
    return {
      myList:[],
      ShowModel: false,
      discount_type: [
        { value: "fixed", name: "ثابتة" },
        { value: "percent", name: "نسية مئوية" },
      ],
      send_channel: [{ value: "email", name: "بريد الكتروني" }],

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
        // cart_left_days: "",
        // total_cart: "",
        user_ids:[]
      },
      perminlocal: localStorage.getItem("permissions"),

    };
  },
  methods: {
    async getcarts() {
      let res = await crudDataService.getAll("abandoned_carts");
      this.myList = res.data.data.map((item) => ({
        value: item.id,
        name: item.first_name,
      }));
    },
    async add(){
      const toast = useToast();

      let res = await crudDataService.create("cart_reminders",this.formData).then((response)=>{
        this.formData.is_free_shipping= true,
        this.formData.is_cart_discounted= true,
        this.formData.discount_type= '',
        this.formData.discount_value= '',
        this.formData.discount_end_date= '',
        this.formData.send_channel= '',
        this.formData.message= '',
        this.formData.subject= '',
        this.formData.discount_valid_for_hours= '',
        this.formData.user_ids= ''
      }).catch ((error) => {
            // this.ShowModel = false;
        
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
    }
  },
  mounted(){
      this.getcarts()
    }
};
</script>
<style lang="scss" scoped>
.message {
  width: 100%;
  height: 160px;
  background: url(/src/assets/img/Groupqw.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  .input {
    width: 95%;
    margin-right: auto;
  }
}
</style>
<style lang="scss">
.modal {
  overflow: auto;
  .modal-header {
    display: none;
  }
  & .multiselect-placeholder ,
    & ::placeholder {
  font-size: 12px;
}
}
.dp__menu_index {
    z-index: 999999999 !important;
}
.dp__input_icon{
    margin-right: auto !important;
}
.dp__action_buttons{
    text-align: left;
    .dp__action.dp__cancel{
        display: none;
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
    max-width: 620px;
    margin: 8.75rem auto;
  }
}
.ckbox span:after {
  background-color: #fe7eae;
}
.modal .ck-content {
    height: 160px !important;
}
</style>
