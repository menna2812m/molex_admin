<template>
  <section class="mt-5">
    <!-- <NewRequest /> -->
    <div class="custom-card border-0 mg-b-20">
      <div class="p-0">
        <div class="text-wrap border-0">
          <div class="panel panel-primary tabs-style-3 border-0 p-0">
            <div class="tab-menu-heading mb-3 border">
              <div class="tabs-menu">
                <!-- Tabs -->
                <ul class="nav panel-tabs justify-content-between pe-0">
                  <li v-for="(item, index) in items" :key="index">
                    <a
                      :href="item.href"
                      data-bs-toggle="tab"
                      :class="[
                        { active: item.isActive },
                        'text-decoration-none fs-6 ',
                      ]"
                    >
                      {{ item.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="panel-body tabs-menu-body p-0 bg-white">
              <div class="tab-content">
                <div class="tab-pane active" id="tab1">
                  <div class="table-responsive border border-bottom-0 px-4">
                    <table class="table text-nowrap text-md-nowrap mg-b-0">
                      <tr>
                        <th class="text-center">
                          <input
                            type="checkbox"
                            v-model="selectAll"
                            @change="toggleSelectAll"
                          />
                        </th>
                        <th>
                          <h4 class="mb-0 fw-semibold">
                            احدث الطلبات
                            <span style="color: #fb99bf" class="fw-normal">
                              (1152)
                            </span>
                          </h4>
                        </th>
                        <th></th>
                        <th></th>
                        <th >
                          <div class="text-end ms-auto pos-relative">
                            <button
                              @click="toggleDropdown"
                              class="twobtn btn-add"
                            >
                              تحرير سريع <i class="fas fa-caret-down ms-1"></i>
                            </button>
                            <div v-if="isDropdownOpen" class="pos-relative">
                              <div class="tx-13 text-start dropitem">
                                <a
                                  class="dropdown-item bg-transparent text-muted fs-6"
                                  @click="toggleend"
                                >
                                  <i class="fe fe-box px-1"></i>

                                  تعديل حالة الطلب

                                  <i class="fas fa-caret-down me-3 ms-2"></i>
                                </a>
                                <a
                                  class="dropdown-item bg-transparent text-muted fs-6"
                                >
                                  <i
                                    class="mdi mdi-account-multiple px-1"
                                    style="color: #b4b4b4"
                                  ></i>

                                  اسناد الي الموظفين
                                </a>
                                <a
                                  class="dropdown-item bg-transparent text-muted fs-6"
                                >
                                  <img
                                    src="../../assets/img/cloud-print.png"
                                    alt=""
                                    class="px-1"
                                    style="width: 25px"
                                  />
                                  طباعة الفواتير
                                </a>
                                <a
                                  class="dropdown-item bg-transparent text-muted fs-6"
                                >
                                  <img
                                    src="../../assets/img/receipt.png"
                                    alt=""
                                    class="px-1"
                                    style="width: 25px"
                                  />

                                  طباعة ملخص الفواتير
                                </a>
                                <a
                                  class="dropdown-item bg-transparent text-muted fs-6"
                                >
                                  <i
                                    class="mdi mdi-barcode-scan px-1"
                                    style="color: #b4b4b4"
                                  ></i>

                                  طباعة قوائم التجهيز
                                </a>
                                <a class="dropdown-item bg-transparent fs-6">
                                  <img
                                    src="../../assets/img/printer-settings.png"
                                    alt=""
                                    class="px-1"
                                    style="width: 25px"
                                  />

                                  طباعة البوليصات
                                </a>
                                <a
                                  class="dropdown-item bg-transparent text-muted fs-6"
                                >
                                  <img
                                    src="../../assets/img/export.png"
                                    alt=""
                                    class="px-1"
                                    style="width: 25px"
                                  />

                                  تصدير الطلب
                                </a>
                                <a
                                  class="dropdown-item bg-transparent text-muted fs-6"
                                >
                                  <img
                                    src="../../assets/img/delete-empty.png"
                                    alt=""
                                    class="px-1"
                                    style="width: 25px"
                                  />

                                  حذف الطلب
                                </a>
                              </div>
                              <div
                                class="text-start dropend mx-1"
                                v-if="isDropendOpen"
                              >
                                <a class="dropdown-item">محذوف </a>
                                <a class="dropdown-item"> بانتظار الدفع </a>
                                <a class="dropdown-item"> بانتظار المراجعة </a>
                                <a class="dropdown-item">قيد التنفيذ </a>
                                <a class="dropdown-item">تم التنفيذ </a>
                                <a class="dropdown-item">جاري التوصيل </a>
                                <a class="dropdown-item">تم التوصيل </a>
                                <a class="dropdown-item"> تم الشحن </a>
                                <a class="dropdown-item"> ملغي </a>
                                <a class="dropdown-item"> مسترجع </a>
                                <a class="dropdown-item"> قيد الاسترجاع </a>
                              </div>
                            </div>
                          </div>
                        </th>
                      </tr>
                      <tr
                        v-for="(item, index) in myList"
                        :key="index"
                        class="list_item py-3 w-100 align-items-center justify-content-between"
                      >
                        <td class="text-center">
                          <input type="checkbox" v-model="item.selected" />
                        </td>
                        <td>
                          <div class="d-flex">
                            <i :class="item.icon"></i>

                            <div class="pe-2">
                              <h5 class="mb-0 fw-semibold">
                                {{ item.name }}
                              </h5>
                              <div class="d-flex justify-content-between">
                                <span class="text-secondary">
                                  <i
                                    class="typcn typcn-location text-black"
                                  ></i>
                                  {{ item.location }}
                                </span>
                                <span class="text-secondary">
                                  {{ item.code }}
                                </span>

                                <span class="text-secondary">
                                  <i :class="item.dev"></i>
                                  {{ item.device }}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p :class="[item.stat, 'mb-0']">
                            <i :class="item.status_icon"></i>
                            {{ item.status }}
                          </p>
                        </td>
                        <td style="color: #fb99bf">
                          {{ item.price }}
                        </td>
                        <td class="text-secondary text-center " >
                          {{ item.span }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <!-- <div class="tab-pane" id="tab2">
                 <Waiting_for_payment/>
                </div>
                <div class="tab-pane" id="tab3">
                  <Waiting_for_review/>
                </div>
                <div class="tab-pane" id="tab4">
                  <Underway/>
                </div>
                <div class="tab-pane" id="tab5">
                  <Done/>
                </div>
                <div class="tab-pane" id="tab6">
                  <Delivery_in_progress/>
                </div>
                <div class="tab-pane" id="tab7"></div>
                <div class="tab-pane" id="tab8"></div>
                <div class="tab-pane" id="tab9"></div>
                <div class="tab-pane" id="tab10"></div> -->

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NewRequest from "./NewRequest.vue";
import Waiting_for_payment from "./Waiting_for_payment.vue";
import Waiting_for_review from "./Waiting_for_review.vue";
import Underway from './Underway.vue'
import Done from './Done.vue'
import Delivery_in_progress from './Delivery_in_progress.vue'
export default {
  components: {
    NewRequest,
    Waiting_for_payment,
    Waiting_for_review,
    Underway,
    Done,
    Delivery_in_progress
},
  data() {
    return {
      isDropdownOpen: false,
      isDropendOpen: false,
      items: [
        { isActive: true, title: "الجميع", href: "#tab1" },
        { isActive: false, title: "بانتظار الدفع", href: "#tab2" },
        { isActive: false, title: "بانتظار المراجعه ", href: "#tab3" },
        { isActive: false, title: "قيد التنفيذ  ", href: "#tab4" },
        { isActive: false, title: "تم التنفيذ  ", href: "#tab5" },
        { isActive: false, title: "جاري التوصيل", href: "#tab6" },
        { isActive: false, title: "تم الشحن", href: "#tab7" },
        { isActive: false, title: "ملغي", href: "#tab8" },
        { isActive: false, title: "مسترجع", href: "#tab9" },
        { isActive: false, title: "قيد الاسترجاع", href: "#tab10" },
      ],
      myList: [
        {
          selected: false,
          icon: "mdi mdi-account-plus icon_color icon_color_1",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record success",
          dev: "typcn typcn-device-laptop text-black pe-1",
          device: "مستعرض كمبيوتر",
          status: "تم التنفيذ ",
          location: "الرياض",
          code: "#123456",
          stat: "success",
        },
        {
          selected: false,
          icon: "mdi mdi-account-plus icon_color icon_color_2",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record faild",
          dev: "typcn typcn-device-phone text-black pe-1",
          device: "مستعرض جوال",
          status: "ملغي ",
          location: "الرياض",
          code: "#123456",
          stat: "faild",
        },
        {
          selected: false,
          icon: "mdi mdi-account-plus icon_color icon_color_3",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record progres",
          dev: "typcn typcn-device-laptop text-black pe-1",
          device: "مستعرض كمبيوتر",
          status: "بانتظار المراجعه",
          location: "الرياض",
          code: "#123456",
          stat: "progres",
        },
        {
          selected: false,
          icon: "mdi mdi-account-plus icon_color icon_color_4",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record success",
          dev: "typcn typcn-device-phone text-black pe-1",
          device: "مستعرض جوال",
          status: "تم التنفيذ ",
          location: "الرياض",
          code: "#123456",
          stat: "success",
        },
        {
          selected: false,
          icon: "mdi mdi-account-plus icon_color icon_color_2",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record progres",
          status: "بانتظار المراجعه",
          location: "الرياض",
          code: "#123456",
          stat: "progres",
        },
        {
          selected: false,
          icon: "mdi mdi-account-plus icon_color icon_color_3",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record faild",
          status: "ملغي ",
          location: "الرياض",
          code: "#123456",
          stat: "faild",
        },
        {
          selected: false,
          icon: "mdi mdi-account-plus icon_color icon_color_4",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record progres",
          status: "بانتظار المراجعه",
          location: "الرياض",
          code: "#123456",
          stat: "progres",
        },
      ],
      selectAll: false,
    };
  },
  methods: {
    toggleSelectAll() {
      this.myList.forEach((item) => (item.selected = this.selectAll));
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleend() {
      this.isDropendOpen = !this.isDropendOpen;
    },
  },
};
</script>

<style scoped lang="scss">

.list_item:not(:last-child) {
  border-bottom: 1px solid #e8e7ff;
}
.icon_color {
  padding: 12px;
    border-radius: 50%;
    height: 40px;
    padding-right: 13px;
  &.icon_color_1 {
    color: #929aff;
    background: #e8e7ff;
  }
  &.icon_color_2 {
    color: #929aff;
    background: #e7faff;
  }
  &.icon_color_3 {
    color: #ffd891;
    background: #fffde7;
  }
  &.icon_color_4 {
    color: #ff7f7f;
    background: #ffe7e7;
  }
}
.progres {
  color: #E66239;
  font-weight: 600;
  font-size: 16px;
}
.faild {
  color: #ff6060;
  font-weight: 600;
  font-size: 16px;
}
.success {
  color: #62d56d;
  font-weight: 600;
  font-size: 16px;
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
  &.active {
    background: #fff2f7;
    border-bottom: 1px solid #fe85b2;
    color: #fe85b2;
    border-radius: 0;
  }
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
