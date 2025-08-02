<template>
  <section class="mt-5 pt-5">
    <form action="">
      <div class="row">
        <div class="col-md-3 mb-3">
          <label for="" class="fw-bold fs-6 mb-3">نوع التقرير </label>
          <Multiselect
            label="name"
            :searchable="true"
            :options="type"
            placeholder="اختر نوع التقرير"
            v-model="formData.type"
          />
        </div>
        <div class="col-md-3 mb-3">
          <label for="" class="fw-bold fs-6 mb-3"> بداية التاريخ </label>
          <input
            type="date"
            class="form-control"
            v-model="formData.start_date"
          />
        </div>
        <div class="col-md-3 mb-3">
          <label for="" class="fw-bold fs-6 mb-3"> نهاية التاريخ </label>
          <input type="date" class="form-control" v-model="formData.end_date" />
        </div>
      </div>
    </form>
    <div class="d-flex justify-content-end align-items-center mb-3">
      <div>
        <button class="btn-add fs-15 twobtn ms-0" @click="getreports()">
          عرض
        </button>
      </div>
    </div>
    <section id="printit">
      <section v-if="product">
        <div class="d-flex justify-content-end align-items-center mb-3">
          <div>
            <button
              class="twobtn fs-15 ms-0 border-0 rounded"
              @click="printSection()"
              style="background: #ffc9dc88; color: #fe7eae"
            >
              <i class="si si-printer"></i>
              طباعة
            </button>
          </div>
        </div>

        <div class="card custom-card border mg-b-20">
          <div class="card-header pb-3">
            <h4 class="card-title mb-0">الأكثر مبيعًا</h4>
          </div>
          <div class="card-body p-0" v-if="best_seller">
            <div class="table-responsive border-0 product">
              <table class="table text-nowrap text-md-nowrap mg-b-0">
                <thead>
                  <th>المنتج</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>التكلفة الكلي</th>
                  <th>الخصم</th>
                  <th>كود الخصم</th>
                  <th>سعر الشراء</th>
                  <th>اجمالي سعر الشراء</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in myList.best_seller"
                    :key="index"
                    class="list_item py-3 w-100 align-items-center justify-content-between"
                  >
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.price }}
                    </td>
                    <td class="text-secondary">
                      {{ item.quantity }}
                    </td>
                    <td>
                      {{ item.total }}
                    </td>
                    <td>
                      {{ item.offer_discount }}
                    </td>
                    <td>
                      {{ item.coupon_discount }}
                    </td>
                    <td>
                      {{ item.total_discount }}
                    </td>
                    <td style="color: #fb99bf">
                      {{ item.total_buying_price }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-body p-0 text-center" v-else>
            <img
              :src="activity"
              alt=""
              class=""
              width="200"
              height="200"
              style="opacity: 0.5"
            />
            <p>لا توجد بيانات كافية</p>
          </div>
        </div>

        <div class="card custom-card border mg-b-20">
          <div class="card-header pb-3">
            <h4 class="card-title mb-0">أفضل مجموع</h4>
          </div>
          <div class="card-body p-0" v-if="best_total">
            <div class="table-responsive border-0 product">
              <table class="table text-nowrap text-md-nowrap mg-b-0">
                <thead>
                  <th>المنتج</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>التكلفة الكلي</th>
                  <th>الخصم</th>
                  <th>كود الخصم</th>
                  <th>سعر الشراء</th>
                  <th>اجمالي سعر الشراء</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in myList.best_seller"
                    :key="index"
                    class="list_item py-3 w-100 align-items-center justify-content-between"
                  >
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.price }}
                    </td>
                    <td class="text-secondary">
                      {{ item.quantity }}
                    </td>
                    <td>
                      {{ item.total }}
                    </td>
                    <td>
                      {{ item.offer_discount }}
                    </td>
                    <td>
                      {{ item.coupon_discount }}
                    </td>
                    <td>
                      {{ item.total_discount }}
                    </td>
                    <td style="color: #fb99bf">
                      {{ item.total_buying_price }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-body p-0 text-center" v-else>
            <img
              :src="activity"
              alt=""
              class=""
              width="200"
              height="200"
              style="opacity: 0.5"
            />
            <p>لا توجد بيانات كافية</p>
          </div>
        </div>
        <div class="card custom-card border mg-b-20">
          <div class="card-header pb-3">
            <h4 class="card-title mb-0">تذكير السلات</h4>
          </div>
          <div class="card-body p-0" v-if="remained_cart">
            <div class="table-responsive border-0 product">
              <table class="table text-nowrap text-md-nowrap mg-b-0">
                <thead>
                  <th>المنتج</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>التكلفة الكلي</th>
                  <th>الخصم</th>
                  <th>كود الخصم</th>
                  <th>سعر الشراء</th>
                  <th>اجمالي سعر الشراء</th>
                </thead>
                <tbody
                  v-for="(items, index) in myList.remained_cart"
                  :key="index"
                >
                  <tr
                    v-for="(item, i) in items"
                    :key="i"
                    class="list_item py-3 w-100 align-items-center justify-content-between"
                  >
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.price }}
                    </td>
                    <td class="text-secondary">
                      {{ item.quantity }}
                    </td>
                    <td>
                      {{ item.total }}
                    </td>
                    <td>
                      {{ item.offer_discount }}
                    </td>
                    <td>
                      {{ item.coupon_discount }}
                    </td>
                    <td>
                      {{ item.total_discount }}
                    </td>
                    <td style="color: #fb99bf">
                      {{ item.total_buying_price }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-body p-0 text-center" v-else>
            <img
              :src="activity"
              alt=""
              class=""
              width="200"
              height="200"
              style="opacity: 0.5"
            />
            <p>لا توجد بيانات كافية</p>
          </div>
        </div>
      </section>
      <section v-if="sells">
        <div class="d-flex justify-content-end align-items-center mb-3">
          <div>
            <button
              class="twobtn fs-15 ms-0 border-0 rounded"
              @click="printSection()"
              style="background: #ffc9dc88; color: #fe7eae"
            >
              <i class="si si-printer"></i>
              طباعة
            </button>
          </div>
        </div>
        <div class="card custom-card border mg-b-20">
          <div class="card-header pb-3">
            <h4 class="card-title mb-0">المبيعات الأكثر مبيعا</h4>
          </div>
          <div class="card-body p-0" v-if="productsReport">
            <div class="table-responsive border-0 product">
              <table class="table text-nowrap text-md-nowrap mg-b-0">
                <thead>
                  <th>المنتج</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>التكلفة الكلي</th>
                  <th>الخصم</th>
                  <th>كود الخصم</th>
                  <th>سعر الشراء</th>
                  <th>اجمالي سعر الشراء</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in myList.products_report"
                    :key="index"
                    class="list_item py-3 w-100 align-items-center justify-content-between"
                  >
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.price }}
                    </td>
                    <td class="text-secondary">
                      {{ item.quantity }}
                    </td>
                    <td>
                      {{ item.total }}
                    </td>
                    <td>
                      {{ item.offer_discount }}
                    </td>
                    <td>
                      {{ item.coupon_discount }}
                    </td>
                    <td>
                      {{ item.total_discount }}
                    </td>
                    <td style="color: #fb99bf">
                      {{ item.total_buying_price }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-body p-0 text-center" v-else>
            <img
              :src="activity"
              alt=""
              class=""
              width="200"
              height="200"
              style="opacity: 0.5"
            />
            <p>لا توجد بيانات كافية</p>
          </div>
        </div>
      </section>
      <section v-if="customer">
        <div class="d-flex justify-content-end align-items-center mb-3">
          <div>
            <button
              class="twobtn fs-15 ms-0 border-0 rounded"
              @click="printSection()"
              style="background: #ffc9dc88; color: #fe7eae"
            >
              <i class="si si-printer"></i>
              طباعة
            </button>
          </div>
        </div>
        <div class="row mt-5 pt-5" v-if="customerdata">
          <div class="col-md-6 mb-4">
            <Chartscustomer :myList="myList" />
          </div>
          <div class="col-md-6 mb-4">
            <UproveCustomer :myList="myList" />
          </div>
        </div>
        <div class="card-body p-0 text-center" v-else>
          <img
            :src="activity"
            alt=""
            class=""
            width="200"
            height="200"
            style="opacity: 0.5"
          />
          <p>لا توجد بيانات كافية</p>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import activity from "../../assets/img/activity.png";
import Chartscustomer from "./Chartscustomer.vue";
import UproveCustomer from "./UproveCustomer.vue";
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService";
export default {
  components: {
    UproveCustomer,
    Chartscustomer,
    Multiselect,
  },
  data() {
    return {
      activity: activity,
      // sub_type:[
      //   { value: 'best_seller', name: "best seller" },
      //   { value: 'best_total', name: "best total" },
      //   { value: 'remained_cart', name: "remained cart" }
      // ],
      type: [
        { value: "sells", name: "مبيعات" },
        { value: "customers", name: "عملاء" },
        { value: "products", name: "منتجات" },
      ],
      myList: [],
      formData: {
        type: "",
        start_date: "",
        end_date: "",
      },
      product: false,
      customer: false,
      sells: false,
      best_seller: false,
      best_total: false,
      remained_cart: false,
      productsReport: false,
      customerdata: false,
    };
  },
  methods: {
    printSection() {
      window.print();
    },
    async getreports() {
      const res = await crudDataService
        .getAll(
          `reports?type=${this.formData.type}&start_date=${this.formData.start_date}&end_date=${this.formData.end_date}`
        )
        .then((response) => {
          this.myList = response.data.data;
          console.log(this.formData.type === "products");
          console.log(this.formData.type === "customers");
          console.log(this.formData.type === "sells");
          if (this.formData.type === "products") {
            this.product = true;
            this.customer = false;
            this.sells = false;
            if (this.myList.best_seller.length > 0) {
              this.best_seller = true;
            } else if (this.myList.best_total.length > 0) {
              this.best_total = true;
            } else if (this.myList.remained_cart.length > 0) {
              this.remained_cart = true;
            }
          } else if (this.formData.type === "customers") {
            this.product = false;
            this.sells = false;
            this.customer = true;
            if (this.myList.total > 0 && this.myList.satisfaction.length > 0) {
              this.customerdata = true;
            }
          } else if (this.formData.type === "sells") {
            this.product = false;
            this.customer = false;
            this.sells = true;
            if (this.myList.products_report.length > 0) {
              this.productsReport = true;
            }
          }
        });
    },
    show() {
      this.$router.push({ name: "Reportscharts" });
    },
  },
  mounted() {
    this.getreports();
  },
};
</script>
<style lang="scss">
.card.custom-card .table td {
  padding: 11px;
}
</style>
<style scoped lang="scss">
.list_item:not(:last-child) {
  border-bottom: 1px solid #e8e7ff;
}
.progres {
  color: #fd601f;
  font-weight: 600;
  font-size: 16px;
}

.table-responsive .table > :not(caption) > * > * {
  border-bottom: 0px solid #e8e8f7 !important;
}
.imagestyle {
  width: 50px;
  height: 50px;
}
.product {
  border-radius: 10px;
  padding-left: 0 !important;
  thead {
    th {
      font-size: 16px;
    }
  }
  tbody {
    td {
      vertical-align: middle;
      padding-left: 0;
      padding-right: 0;
    }
  }
}
.twobtn {
  &.export {
    background: #eff4fb;
    color: #719fd9;
  }
  &.print {
    background: #fff2f7;
    color: #fe7eae;
  }
}
</style>
