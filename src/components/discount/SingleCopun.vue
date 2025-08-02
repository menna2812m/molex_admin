<template>
  <section v-if="item">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <h4 class="mb-0">
              الكود:
              {{ item.code }}
            </h4>
            <div class="pos-relative">
              <button
                @click="toggleDropdown"
                class="twobtn bg-white border"
                style="border-color: #fd601f !important; color: #fd601f"
                v-if="perminlocal.includes('coupons-update')"
              >
                خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
              </button>

              <div class="text-start dropend mt-1" v-if="isDropdownOpen">
                <a class="dropdown-item" @click="edit()">تعديل الكوبون </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <ul>
                <li>
                  نوع الخصم :
                  {{ item.discount_type }}
                </li>
                <li>
                  قيمة الخصم :
                  {{ item.discount_value }}
                </li>
                <li>
                  بداية التاريخ :
                  {{ item.start_date }}
                </li>
                <li>
                  نهاية التاريخ :
                  {{ item.end_date }}
                </li>
                <li>
                  الحد الأقصى للاستخدام لكل مستخدم :
                  {{ item.max_usage_per_user }}
                </li>
                <li>
                  الحد الأقصى للاستخدام :
                  {{ item.max_usage }}
                </li>
                <li>
                  الحد الأدنى للسعر دون ضريبة القيمة المضافة :
                  {{ item.minimum_price_without_vat }}
                </li>
                <li>
                  الحد الأقصى لسعر الخصم :
                  {{ item.max_discounted_price }}
                </li>
                <li>
                  الحد الأقصى لرؤية السعر الخصم :
                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      :checked="item.max_discounted_price_visibility"
                      disabled
                    />
                    <span class="custom-switch-indicator ms-auto"></span>
                  </label>
                </li>
                <li>
                  توصيل مجاني :
                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      :checked="item.is_free_shipping"
                      disabled
                    />
                    <span class="custom-switch-indicator ms-auto"></span>
                  </label>
                </li>
                <li>
                  تم استبعاد العناصر المخفضة :
                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      :checked="item.discounted_items_excluded"
                      disabled
                    />
                    <span class="custom-switch-indicator ms-auto"></span>
                  </label>
                </li>
                <li>
                  متاح :
                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      :checked="item.is_active"
                      disabled
                    />
                    <span class="custom-switch-indicator ms-auto"></span>
                  </label>
                </li>
                <li>
                  تابعة :
                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      :checked="item.is_affiliated"
                      disabled
                    />
                    <span class="custom-switch-indicator ms-auto"></span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">تعديل كوبون</h6>
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-md-6">
                <div class="mt-1">
                  <label>الاسم </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.name"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>كود</label>
                  <input
                    type="text"
                    placeholder="كود"
                    v-model="formData.code"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>نوع الخصم</label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="discount_type"
                    placeholder="اختر النوع"
                    v-model="formData.discount_type"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>قيمة الخصم</label>
                  <input
                    type="text"
                    placeholder=""
                    v-model="formData.discount_value"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>بداية التاريخ</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="formData.start_date"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>نهاية التاريخ</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="formData.end_date"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الحد الأقصى للاستخدام لكل مستخدم</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.max_usage_per_user"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الحد الأقصى للاستخدام</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.max_usage"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>نوع العمولة </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="comission_type"
                    placeholder="اختر النوع"
                    v-model="formData.comission_type"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>قيمة العمولة </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.comission_value"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>الحد الأقصى لسعر الخصم </label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.max_discounted_price"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mt-1">
                  <label>الحد الأدنى للسعر دون ضريبة القيمة المضافة </label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.minimum_price_without_vat"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="mt-1">
                  <label>ملحوظات </label>
                  <textarea
                    rows="5"
                    type="text"
                    class="form-control"
                    v-model="formData.notes"
                  ></textarea>
                </div>
              </div>

              <div class="col-md-12">
                <div class="mt-1 d-flex align-items-center">
                  <label class="mx-1">الحد الأقصى لرؤية السعر الخصم </label>

                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      v-model="formData.max_discounted_price_visibility"
                    />

                    <span class="custom-switch-indicator ms-auto"></span>
                  </label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mt-1 d-flex align-items-center">
                  <label class="mx-1">توصيل مجاني </label>
                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      v-model="formData.is_free_shipping"
                    />

                    <span class="custom-switch-indicator ms-auto"></span>
                  </label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mt-1 d-flex align-items-center">
                  <label class="mx-1">تم استبعاد العناصر المخفضة </label>
                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      v-model="formData.discounted_items_excluded"
                    />

                    <span class="custom-switch-indicator ms-auto"></span>
                  </label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mt-1 d-flex align-items-center">
                  <label class="mx-1">تابعة </label>
                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      v-model="formData.is_affiliated"
                    />

                    <span class="custom-switch-indicator ms-auto"></span>
                  </label>
                </div>
              </div>
            </div>
            <button class="btn btn-primary m-auto d-block" type="submit">
              تعديل
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
  <section
    class="position-relative"
    style="height: 100vh; display: grid; place-items: center"
    v-else
  >
    <section class="cate"></section>
    <progress class="pure-material-progress-circular" />
  </section>
</template>
<script>
import moment from "moment";
import Multiselect from "@vueform/multiselect";
import Fillter from "./Fillter.vue";
import Tabscopuns from "./Tabscopuns.vue";
import crudDataService from "../../Services/crudDataService.js";
export default {
  components: {
    Multiselect,
    Fillter,
    Tabscopuns,
  },
  data() {
    return {
      isDropdownOpen: false,
      ShowModel: false,
      item: null,
      discount_type: [
        { value: "fixed", name: "ثابتة" },
        { value: "percent", name: "نسية مئوية" },
      ],
      comission_type: [
        { value: "fixed", name: "ثابتة" },
        { value: "percent", name: "نسية مئوية" },
      ],
      formData: {
        code: "",
        discount_type: "",
        discount_value: "",
        start_date: "",
        end_date: "",
        max_usage_per_user: null,
        max_usage: null,
        minimum_price_without_vat: null,
        max_discounted_price: null,
        max_discounted_price_visibility: false,
        is_free_shipping: false,
        discounted_items_excluded: false,
        is_affiliated: false,
        name: "",
        comission_type: "",
        comission_value: "",
        notes: "",
        couponables: [],
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    edit() {
      this.ShowModel = true;
      this.formData.code = this.item.code;
      this.formData.discount_type = this.item.discount_type;
      this.formData.discount_value = this.item.discount_value;
      this.formData.start_date = moment(this.item.start_date).format(
        "YYYY-MM-DD"
      );
      this.formData.end_date = moment(this.item.end_date).format("YYYY-MM-DD");
      this.formData.max_usage_per_user = this.item.max_usage_per_user;
      this.formData.max_usage = this.item.max_usage;
      this.formData.minimum_price_without_vat =
        this.item.minimum_price_without_vat;
      this.formData.max_discounted_price = this.item.max_discounted_price;
      this.formData.max_discounted_price_visibility =
        this.item.max_discounted_price_visibility;
      this.formData.is_free_shipping = this.item.is_free_shipping;
      this.formData.discounted_items_excluded =
        this.item.discounted_items_excluded;
      this.formData.is_affiliated = this.item.is_affiliated;
      this.formData.name = this.item.name;
      this.formData.comission_type = this.item.comission_type;
      this.formData.comission_value = this.item.comission_value;
      this.formData.notes = this.item.note;
    },
    async update() {
      let res = await crudDataService
        .put(`coupons/${this.$route.params.id}`, this.formData)
        .then(() => {
          this.ShowModel = false;
          this.onecopuns();
        });
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    async onecopuns() {
      let res = await crudDataService.get(
        "coupons",
        `${this.$route.params.id}`
      );
      this.item = res.data.data;
      console.log(this.item);
    },
  },
  mounted() {
    this.onecopuns();
  },
};
</script>

<style scoped lang="scss">
.dropend {
  background: #fff;
  position: absolute;
  width: 150px;
  box-shadow: 0px 3px 3px 0px #e6edf0;
  border-radius: 3px;
  a {
    cursor: pointer;
  }
}
</style>
<style lang="scss">
input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}

.modal .modal-header {
  display: none;
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
    margin: 5.75rem auto;
  }
}
#add-page {
  overflow-y: auto;
}
</style>
