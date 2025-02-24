<template lang="">
  <section class="mt-5 pt-5"></section>
  <div class="card custom-card border-0 mg-b-20" v-if="list">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between flex-wrap">
        <div>
          <h5 class="mb-0 text-muted">#رقم الطلب</h5>
          <p class="mt-4">{{ list.order_id }}</p>
        </div>
        <div>
          <h5 class="mb-0 text-muted">
            <i class="fa fa-calendar"></i>
            تاريخ الطلب
          </h5>
          <p class="mt-4">
            {{ list.updated_at.split("T")[0] }}
          </p>
        </div>
        <div v-if="list.expected_delivery_date">
          <h5 class="mb-0 text-muted">
            <i class="fa fa-calendar"></i>
            تاريخ التسليم المتوقع
          </h5>
          <p class="mt-4">
            {{ list.expected_delivery_date.split(" ")[0] }}
          </p>
        </div>
        <div>
          <h5 class="mb-0 text-muted">
            <i class="si si-flag"></i>
            حالة الطلب
          </h5>
          <p
            class="mt-4 border text-center p-1"
            style="border-radius: 25px; cursor: pointer"
            @click="showmodal = true"
          >
            {{ list.status }}
            <i class="fa fa-angle-left ms-1"></i>
          </p>
        </div>
      </div>
    </div>
    
    <div class="p-4 d-flex align-items-center justify-content-end">
      <!-- <div>
        <h5 class="mb-0 text-muted">العنوان </h5>
          <p class="mt-4">{{ list.address.city }}
            -
            {{ list.address.district }}
            -
            {{ list.address.region }}

          </p>
      </div> -->
      <div class="mt-0" v-if="list.address.latitude && list.address.longitude">
        <a
          class="border text-center p-2 px-4 bg-transparent text-primary"
          style="border-radius: 25px; cursor: pointer"
          :href="googleMapsUrl(list.address.latitude, list.address.longitude)"
          target="_blank"
        >
          المكان علي الخريطة
          <i class="fa fa-angle-left ms-1"></i>
        </a>
      </div>
    </div>
  </div>
  <div class="card custom-card border-0 mg-b-20" v-if="list">
    <div class="card-header">
      <h6 class="card-title">بيانات التوصيل</h6>
    </div>
    <div class="card-body p-4">
      <div class="d-flex justify-content-between flex-wrap">
        <div>
          <h5 class="mb-0 text-muted">*طريقة التوصيل* </h5>
          <p class="mt-4">{{ list.delivery_option.name.ar }}</p>
        </div>
        <div>
          <h5 class="mb-0 text-muted">
            <i class="fa fa-money"></i>
             طريقة الدفع
          </h5>
          <p class="mt-4">
            {{ list.transaction.payment_method }}
          </p>
        </div>
        <div>
          <h5 class="mb-0 text-muted">
            <i class="fa fa-motorcycle"></i>
            اختيار مندوب للتسليم
          </h5>
          <p
            class="mt-4 border text-center p-1"
            style="border-radius: 25px; cursor: pointer"
            @click="showdeliveries = true"
          >
            {{ list.delivery?.full_name }}
            <i class="fa fa-angle-left ms-1"></i>
          </p>
        </div>
      </div>
      <div class="text-danger" v-if="list.delivery">
        *
        اذا كنت تريد الغاء هذا المندوب من هذا الاوردر
        <button class="btn "         
          @click="removedelivery(list.delivery, list.id)"
        >
          اضغط هنا
        </button>
      </div>
    </div>
    
   
  </div>
  <div class="card custom-card border-0 mg-b-20" v-if="userData">
    <div class="card-header">
      <h6 class="card-title">بيانات العميل</h6>
    </div>
    <div class="card-body p-4">
      <div class="d-flex align-items-center">
        <img
          src="../../assets/img/avatar_male.jpg"
          alt="img"
          style="width: 60px; height: 60px; border-radius: 50%"
        />
        <div>
          <p class="h5 mt-4 d-block">
            {{ userData.fname }}{{ userData.lname }}
          </p>
          <!-- <p>{{ list.address.address }}</p> -->
          <div class="mt-4">
            <p class="mb-0">
              {{ list.address.city }}
              -
              {{ list.address.district }}
              -
              {{ list.address.region }}
            </p>
            <span class="px-3 text-muted">
              {{ list.address.address }}
            </span>
          </div>

          <p class="mb-0 px-2">{{ userData.birth_date }}</p>
        </div>
      </div>
      <div class="my-3 mx-5">
        <a :href="`tel:${userData.phone}`" class="iconuser">
          <i class="zmdi zmdi-phone"></i>
          {{ userData.phone }}
        </a>
        <a :href="`mailto:${userData.email}`" class="iconuser">
          <i class="zmdi zmdi-email"></i>
          {{ userData.email }}
        </a>
      </div>
    </div>
  </div>
  <div class="card custom-card border-0 mg-b-20" v-if="list">
    <div class="card-header">
      <h6 class="card-title">المنتجات</h6>
    </div>
    <div class="card-body p-4">
      <div class="table-responsive border-0 rounded border-bottom-0 p-3 mb-0">
        <table class="table text-nowrap text-md-nowrap mg-b-0">
          <tr class="my-3">
            <th class="">المنتج</th>
            <th>اسم المنتج</th>
            <th>الكمية</th>
            <th>العرض</th>
            <th>الشحن</th>
            <th>سعر الوحدة</th>
            <th>السعر النهائي</th>
          </tr>
          <tr
            v-for="(item, index) in list.items"
            :key="index"
            class="list_item py-3 w-100 align-items-center justify-content-between"
          >
            <td>
              <img
                :src="item.product.cover_image"
                alt=""
                class="rounded-50"
                width="100"
              />
            </td>
            <td>
              {{ item.product.name.ar }}
            </td>
            <td>
              {{ item.quantity }}
            </td>
            <td>
              {{ item.offer_discount }}
            </td>
            <td>
              {{ list.shipping }}
            </td>
            <td>
              {{ item.unit_price }}
            </td>
            <td>
              {{ list.total }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <teleport to="body">
    <b-modal id="add-body" v-model="showmodal" hide-footer title="تغير الحالة ">
      <div class="pos-relative" style="z-index: 5555">
        <form @submit.prevent="change()">
          <div class="m-2">
            <Multiselect
              label="name"
              :searchable="true"
              :options="status_type"
              placeholder="الحالة"
              v-model="status"
            />
          </div>
          <p v-if="err" class="text-danger">{{err}}</p>
          <div class="text-center">
            <button class="fs-15 btn-save mx-1">حفظ</button>
            <button class="fs-15 btn-cancel mx-1" @click="showmodal = false">
              الغاء
            </button>
          </div>
        </form>
      </div>
    </b-modal>
  </teleport>
  <teleport to="body">
    <b-modal id="add-body" v-model="showdeliveries" hide-footer title="اضافة مندوب  ">
      <div class="pos-relative" style="z-index: 5555">
        <form @submit.prevent="adddelivery(delivery_id)">
          <div class="m-2">
            <Multiselect
              label="name"
              :searchable="true"
              :options="deliveries"
              placeholder="المندوب"
              v-model="delivery_id"
            />
          </div>
          <div class="text-center">
            <button class="fs-15 btn-save mx-1">حفظ</button>
            <button class="fs-15 btn-cancel mx-1" @click="showmodal = false">
              الغاء
            </button>
          </div>
        </form>
      </div>
    </b-modal>
  </teleport>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      status_type: [
        { value: "pending", name: "قيد المراجعة" },
        { value: "processing", name: "قيد التنفيذ" },
        { value: "completed", name: "مكتمل" },
        { value: "waitingForPayment", name: "انتظار الدفع " },
        { value: "cancelled", name: "إلغاء " },
      ],
      deliveries:[],
      showdeliveries:false,
      delivery_id:null,
      list: "",
      userData: "",
      showmodal: false,
      status: "",
      
      err:''
    };
  },
  methods: {
    async alldeliveries() {
      try {
        let res = await crudDataService.getAll("deliveries");
        this.deliveries = res.data.data.data.map((delivery) => ({
        value: delivery.id,
        name: delivery.full_name,
      }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    googleMapsUrl(lat, lng) {
      return `https://www.google.com/maps/?q=${lat},${lng}`;
    },
    removedelivery(data, orderid) {
      this.$swal
        .fire({
          title: `؟"${data.full_name}" هل تريد حذف المندوب  `,
           showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService.delete(`deliveries/${data.id}/orders`,`${orderid}`).then((res) => {              
                this.$swal.fire(res.data.message,"", "success");
                this.order();
              })
              .catch((error) => {
                this.$swal.fire(error.data.message,"", "error");
              });
          }         
        });
    },
 
    async adddelivery(id) {      
      let res = await crudDataService.create(
        `deliveries/${id}/orders`,
        {
          order_id: this.$route.params.id,
        }
      ).then((result) => {
        this.showdeliveries = false;
      this.order();
          this.$swal.fire(result.data.message,"", "success");
                
      })
      
    },
    async change() {
      let res = await crudDataService.create(
        `orders/${this.$route.params.id}/status`,
        {
          status: this.status,
        }
      ).then(()=>{
        this.showmodal = false;
        this.order();
      }).catch((error)=>{
        this.err=error.data.message
      })
    
    },
    async order() {
      let res = await crudDataService.get("orders", `${this.$route.params.id}`);
      this.list = res.data.data;
      console.log(this.list);
      this.user();
    },
    async user() {
      if (this.list.user_id) {
      let res = await crudDataService.get("users", `${this.list.user_id}`);
      this.userData = res?.data.data;
        
      }
    },
  },
  mounted() {
    this.order();
    this.alldeliveries();

  },
};
</script>
<style scoped lang="scss">
.card {
  box-shadow: 0px 3px 3px 0px #e6edf0;
}
.iconuser {
  padding: 8px 15px;
  border-radius: 30px;
  color: #e66239;
  border: 1px solid #e66239;
  margin-left: 5px;
}
</style>
