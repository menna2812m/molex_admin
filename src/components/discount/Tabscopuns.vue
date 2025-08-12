<template>
  <section>
    <div class="pos-relative">
      <button @click="ShowModel = true" class="btn-add me-0 mb-4">
        <i class="fe fe-plus"></i>
        كوبون جديد
      </button>
    </div>
    <teleport to="body">
      <b-modal id="add" v-model="ShowModel" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/dis.png" alt="img2" />
        </div>
        <div class="p-0 mt-5 pos-relative" style="z-index: 555">
          <h6 style="color: #febcd5" class="text-center my-3">
            إنشاء كوبون التخفيض
          </h6>
          <form @submit.prevent="add">
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
              <div class="col-md-12">
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
                  <label class="mx-1">متاح</label>
                  <label class="custom-switch justify-content-center">
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      v-model="formData.is_active"
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
              اضافة
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import crudDataService from "../../Services/crudDataService.js";
import Multiselect from "@vueform/multiselect";
export default {
  components: {
    Multiselect,
  },

  data() {
    return {
      discount_type: [
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
        is_active: "",
        couponables: [],
      },
      comission_type: [
        { value: "fixed", name: "ثابتة" },
        { value: "percent", name: "نسية مئوية" },
      ],
      ShowModel: false,
    };
  },
  methods: {
    async getcoupons() {
      let res = await crudDataService.getAll("coupons");
      this.$emit("customEvent", res.data.data.data);
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    async add() {
      let res = await crudDataService
        .create(`coupons`, this.formData)
        .then((response) => {
          this.ShowModel = false;
          this.getcoupons();
          (this.formData.code = ""),
            (this.formData.discount_type = ""),
            (this.formData.discount_value = ""),
            (this.formData.start_date = ""),
            (this.formData.end_date = ""),
            (this.formData.max_usage_per_user = ""),
            (this.formData.max_usage = ""),
            (this.formData.minimum_price_without_vat = ""),
            (this.formData.max_discounted_price = ""),
            (this.formData.max_discounted_price_visibility = ""),
            (this.formData.is_free_shipping = ""),
            (this.formData.discounted_items_excluded = ""),
            (this.formData.is_affiliated = ""),
            (this.formData.name = ""),
            (this.formData.notes = ""),
            (this.formData.is_active = ""),
            (this.formData.couponables = ""),
            (this.formData.comission_type = ""),
            (this.formData.comission_value = "");
        });
    },
  },
};
</script>

<style scoped lang="scss">
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
}
</style>
<style lang="scss">
.modal {
  & .multiselect-placeholder,
  & ::placeholder {
    font-size: 12px;
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
    margin: 8.75rem auto;
  }
}
.dp__menu_index {
  z-index: 999999999 !important;
}
.dp__input_icon {
  margin-right: auto !important;
}
.dp__action_buttons {
  text-align: left;
  .dp__action.dp__cancel {
    display: none;
  }
}
</style>
