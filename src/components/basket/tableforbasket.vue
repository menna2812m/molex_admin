<template>
  <section class="mt-5 pt-5">
    <div class="card custom-card border-0 mg-b-20">
      <div class="card-body p-0">
        <div class="table-responsive border rounded border-bottom-0 px-4 mb-0">
          <table class="table text-nowrap text-md-nowrap mg-b-0">
            <tr>
              <th class="d-flex">
                <h5 class="mb-0 fw-semibold">
                  السلات المتروكة
                  <span style="color: #fb99bf" class="fw-normal">
                    ({{ myList ? myList.length : "" }})
                  </span>
                </h5>
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <div class="text-center ms-auto">
                  <Temporarydiscount />
                </div>
              </th>
            </tr>
            <tr>
              <td class="text-muted">اسم العميل</td>
              <td class="text-muted">تاريخ انشاء السلة</td>
              <td class="text-muted">عدد المنتجات</td>
              <td class="text-muted">اجمالي السلة</td>
            </tr>
            <tr
              v-for="(item, index) in myList"
              :key="index"
              class="list_item py-3 w-100 align-items-center justify-content-between"
            >
              <td>
                <div class="d-flex align-items-center">
                  <!-- <input type="checkbox" v-model="item.selected" /> -->

                  <div class="pe-2">
                    <h6 class="mb-0 fw-semibold">
                      {{ item.first_name }}{{ item.last_name }}
                    </h6>
                  </div>
                </div>
              </td>

              <td>
                {{ item.created_at }}
              </td>
              <td>
                {{ item.total_items }}
              </td>
              <td style="color: #fb99bf">
                {{ item.total_price }}
              </td>

              <td class="text-center py-3">
                <remember :id="item.id" v-if="perminlocal.includes('cart_reminders-store')"/>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import Temporarydiscount from "./Temporarydiscount.vue";
import remember from "./remember.vue";
import crudDataService from "../../Services/crudDataService";
export default {
  components: {
    Multiselect,
    remember,
    Temporarydiscount,
  },
  data() {
    return {
      myList: [],
      selectAll: false,
      perminlocal: localStorage.getItem("permissions"),

    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleSelectAll() {
      this.myList.forEach((item) => (item.selected = this.selectAll));
    },
    async getcarts() {
      let res = await crudDataService.getAll("abandoned_carts");
      console.log(res.data.data);
      this.myList = res.data.data;
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
.tab-menu-heading {
  border: 1px solid #e8e8f7;
}
</style>
