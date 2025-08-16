<template>
  <section
    class="position-relative"
    style="height: 100vh; display: grid; place-items: center"
    v-if="loading"
  >
    <section class="cate"></section>
    <progress class="pure-material-progress-circular" />
  </section>
  <section v-else>
    <div class="mt-5 d-flex justify-content-between align-items-center">
      <h4 class="mb-0 fw-semibold">
        احدث الطلبات
        <span style="color: #fb99bf" class="fw-normal">
          ({{ myList.length }})
        </span>
      </h4>

      <Multiselect
        label="name"
        :searchable="true"
        :options="type"
        placeholder="اختر النوع"
        @change="handleTypeChange($event)"
        class="w-25 ms-auto"
      />
    </div>
    <section class="" v-if="iscomplete && myList.length > 0">
      <div class="card border-0 mg-b-20 rounded-4 mt-4">
        <div class="card-body p-0 rounded-4">
          <div class="table table-bordered table-responsive rounded-4 mb-0">
            <table class="w-100 text-nowrap text-md-nowrap mg-b-0">
              <thead>
                <tr class="list_item py-3 w-100">
                  <td class="text-muted">رقم الطلب</td>
                  <td class="text-muted">حالة الطلب</td>
                  <td class="text-muted">التكلفة</td>
                  <td class="text-muted">تاريخ الطلب</td>
                  <td class="text-muted">فعل</td>
                </tr>
              </thead>
              <tr
                v-for="(item, index) in myList"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td @click="gotopage(item.id)">
                  <div class="d-flex" style="cursor: pointer">
                    <!-- <i class="mdi mdi-account-plus icon-table"></i> -->
                    <img :src="userimg" alt="" width="45" />

                    <div class="pe-2">
                      <h5 class="mb-0 fw-semibold">
                        <!-- {{ userData[index] }} -->
                        {{ item.order_id }}
                      </h5>
                      <div class="d-flex justify-content-between">
                        <span class="text-secondary">
                          التفاصيل
                          <i class="fe fe-chevron-left"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p :class="[item.status, 'mb-0']">
                    {{ item.status_translated }}
                  </p>
                </td>
                <td style="color: #fb99bf">
                  {{ item.total }}
                </td>
                <td class="text-secondary">
                  {{ item.updated_at.split("T")[0] }}
                </td>
                <td class="">
                  <i
                    class="fe fe-eye text-info px-2"
                    @click="gotopage(item.id)"
                    style="cursor: pointer"
                  ></i>

                  <i
                    class="fa fa-motorcycle text-danger"
                    @click="deliver(item.id)"
                    style="cursor: pointer"
                  ></i>
                  <i
                    class="fe fe-settings text-warning px-2"
                    @click="change(item.id)"
                    style="cursor: pointer"
                  ></i>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <b-pagination
        v-model="page"
        :total-rows="last"
        :per-page="1"
        @click="paginag(page)"
        class="justify-content-end"
      ></b-pagination>
    </section>
    <section
      class="position-relative"
      style="height: 100vh; display: grid; place-items: center"
      v-if="iscomplete && myList.length <= 0"
    >
      <div
        style="background: #fd601f; padding: 30px; font-size: 20px"
        class="w-50 text-center text-white rounded-10"
      >
        لا يوجد 'طلبات' حتي الان
      </div>
    </section>
  </section>
  <teleport to="body">
    <b-modal id="add-body" v-model="showmodal" hide-footer title="تغير الحالة ">
      <div class="pos-relative" style="z-index: 5555">
        <form @submit.prevent="statchange()">
          <div class="m-2">
            <Multiselect
              label="name"
              :searchable="true"
              :options="status_type"
              placeholder="الحالة"
              v-model="status"
            />
          </div>
          <p v-if="err" class="text-danger">{{ err }}</p>
          <div class="text-center">
            <button class="fs-15 btn-save mx-1">حفظ</button>
            <button
              class="fs-15 btn-cancel mx-1"
              @click="showmodal = false"
              type="button"
            >
              الغاء
            </button>
          </div>
        </form>
      </div>
    </b-modal>
  </teleport>
  <teleport to="body">
    <b-modal
      id="add-body"
      v-model="showdeliveries"
      hide-footer
      title="اضافة مندوب  "
    >
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
            <button
              type="button"
              class="fs-15 btn-cancel mx-1"
              @click="showdeliveries = false"
            >
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
import userimg from "../../assets/img/user.png";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      userimg,
      type: [
        { value: "", name: "الكل " },
        { value: "pending", name: "قيد المراجعة" },
        { value: "processing", name: "قيد التنفيذ" },
        { value: "completed", name: "مكتمل" },
        { value: "waitingForPayment", name: "انتظار الدفع " },
        { value: "cancelled", name: "إلغاء " },
      ],
      status_type: [
        { value: "pending", name: "قيد المراجعة" },
        { value: "processing", name: "قيد التنفيذ" },
        { value: "completed", name: "مكتمل" },
        { value: "waitingForPayment", name: "انتظار الدفع " },
        { value: "cancelled", name: "إلغاء " },
      ],
      myList: [],
      showmodal: false,
      iscomplete: false,
      loading: false,
      page: 1,
      last: 2,
      perminlocal: localStorage.getItem("permissions"),
      id: null,
      deliveries: [],
      showdeliveries: false,
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
    async handleTypeChange(e) {
      console.log(e);
      let res = await crudDataService
        .getAll(`orders?filter[status]=${e}`)
        .then((res) => {
          this.myList = res.data.data.data;
          this.last = res.data.data.last_page;
          if (this.myList.length > 0) {
            this.iscomplete = true;
          } else {
            this.iscomplete = false;
          }
        });
    },
    async paginag(p) {
      let res = await crudDataService.getAll(`orders?page=${this.page}`);
      this.myList = res.data.data.data;
    },
    gotopage(id) {
      if (this.perminlocal.includes("orders-show")) {
        this.$router.push({ name: "SingleOrder", params: { id } });
      }
    },
    async change(id) {
      this.showmodal = true;
      this.id = id;
    },
    async deliver(id) {
      this.showdeliveries = true;
      this.id = id;
    },
    async statchange() {
      let res = await crudDataService
        .create(`orders/${this.id}/status`, {
          status: this.status,
        })
        .then(() => {
          this.showmodal = false;
          this.allorders();
        })
        .catch((error) => {
          this.err = error.data.message;
        });
    },
    async adddelivery(id) {
      let res = await crudDataService
        .create(`deliveries/${id}/orders`, {
          order_id: this.id,
        })
        .then((result) => {
          this.showdeliveries = false;
          this.order();
          this.$swal.fire(result.data.message, "", "success");
        });
    },
    async allorders() {
      this.loading = true;
      let res = await crudDataService.getAll("orders").then((res) => {
        this.myList = res.data.data.data;
        this.last = res.data.data.last_page;
        this.loading = false;
        if (this.myList.length > 0) {
          this.iscomplete = true;
        } else {
          this.iscomplete = false;
        }
      });
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleend() {
      this.isDropendOpen = !this.isDropendOpen;
    },
  },
  mounted() {
    this.allorders();
    this.alldeliveries();
  },
};
</script>

<style scoped lang="scss">
.pending {
  color: #7e87f7;
}
.icon-table {
  padding: 12px 13px 0 12px;
  border-radius: 50%;
  background: #e7faff;
  color: #7e87f7;
}
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

.dropitem {
  background: #fff;
  position: absolute;
  left: 5px;
  border: 1px solid #e8e8f7;
  margin: 2px;
  border-radius: 3px;
  a {
    cursor: pointer;
  }
}
.dropend {
  position: absolute;
  left: 75%;
  box-shadow: 0px 3px 3px 0px #e6edf0;
  border-radius: 3px;
  background: #fff;
  a {
    cursor: pointer;
  }
}
</style>
