<template>
  <section v-if="item">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <div class="d-flex justify-content-center align-items-center">
              <img :src="item.image" alt="" width="100" height="70" />

              <div class="px-2">
                <h5>
                  {{ item.title ? item.title.ar : "" }}
                </h5>
                <span class="text-muted">
                  {{ item.message.ar }}
                </span>
              </div>
            </div>

            <div class="pos-relative">
              <button
                @click="toggleDropdown"
                class="twobtn bg-white border"
                style="border-color: #fd601f !important; color: #fd601f"
                v-if="perminlocal.includes('offers-update')"
              >
                خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
              </button>

              <div class="text-start dropend mt-1" v-if="isDropdownOpen">
                <a class="dropdown-item" @click="edit()">تعديل العرض </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <ul>
                <li>
                  نوع العرض :
                  {{ item.type }}
                </li>
                <li v-if="item.value">
                  قيمة العرض :
                  {{ item.value }}
                </li>
                <li v-if="item.min_type">
                  نوع الخصم :
                  {{ item.min_type }}
                </li>

                <li>
                  بداية العرض :
                  {{ item.start_date }}
                </li>
                <li>
                  نهاية العرض :
                  {{ item.expire_date }}
                </li>
                <li v-if="item.min_value">
                  اقل قيمة للعرض :
                  {{ item.min_value }}
                </li>
                <li v-if="item.max_discounted_value">
                  اقصي قيمة للعرض :
                  {{ item.max_discounted_value }}
                </li>
                <li v-if="item.products ? item.products.length > 0 : ''">
                  عدد المنتجات داخل العرض
                  {{ item.products.length }}
                </li>
                <li v-if="item.categories ? item.categories.length > 0 : ''">
                  عدد الاقسام داخل العرض
                  {{ item.categories.length }}
                </li>
                <li v-if="item.x_quantity">
                  الكميه داخل البند x :
                  <p class="ms-5 ps-5 mb-0 text-primary">
                    {{ item.x_quantity }}
                  </p>
                </li>
                <li v-if="item.y_quantity">
                  الكميه داخل البند y :
                  <p class="ms-5 ps-5 mb-0 text-primary">
                    {{ item.y_quantity }}
                  </p>
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
                  <label> اسم العرض عربي</label
                  ><input
                    type="text"
                    class="form-control"
                    v-model="formData.title.ar"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>اسم العرض انجليزي</label
                  ><input
                    type="text"
                    class="form-control"
                    v-model="formData.title.en"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>بداية العرض</label
                  ><input
                    type="date"
                    class="form-control"
                    v-model="formData.start_date"
                    @change="
                      conflicts(formData.start_date, formData.expire_date)
                    "
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>نهاية العرض</label
                  ><input
                    type="date"
                    class="form-control"
                    v-model="formData.expire_date"
                    @change="
                      conflicts(formData.start_date, formData.expire_date)
                    "
                  />
                </div>
              </div>
              <div class="mt-3">
                <label>الصوره</label>
                <div class="pos-relative overflow-hidden">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                  />
                </div>
                <img
                  :src="imageUrl"
                  alt="صورة"
                  style="width: 180px; height: 180px; object-fit: fill"
                  class="m-1"
                />
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label>نوع العرض </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="type"
                    placeholder="اختر النوع"
                    v-model="formData.type"
                    @change="handleTypeChange($event)"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showField">
                <div class="mt-1">
                  <label>اختر البند </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="catpro"
                    placeholder="اختر البند"
                    @change="changpro($event)"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showdiscount">
                <div class="mt-1">
                  <label>نوع الخصم : </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="discount_type"
                    @change="changdiscount($event)"
                    v-model="formData.discount_type"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showField">
                <div class="mt-1">
                  <label>اختر الخصم علي </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="allitempro"
                    mode="multiple"
                    :close-on-select="false"
                    group-values="options"
                    group-label="name"
                    placeholder="الخصم علي"
                    @change="allmulti($event)"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showx">
                <div class="mt-1">
                  <label>اختر البند x : </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="catpro"
                    placeholder="اختر البند"
                    @change="changcatx($event)"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showx">
                <div class="mt-1">
                  <label>الكمية من x </label
                  ><input
                    type="number"
                    class="form-control"
                    v-model="formData.x_quantity"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showx">
                <div class="mt-1">
                  <label>اختر الخصم علي x : </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="allitempro"
                    mode="multiple"
                    :close-on-select="false"
                    group-values="options"
                    group-label="name"
                    placeholder="الخصم علي"
                    @change="allmultix($event)"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showdiscount">
                <div class="mt-1">
                  <label>اختر البند y: </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="catpro"
                    placeholder="اختر البند"
                    @change="changcaty($event)"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showdiscount">
                <div class="mt-1">
                  <label>الكمية من y </label
                  ><input
                    type="number"
                    class="form-control"
                    v-model="formData.y_quantity"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showdiscount">
                <div class="mt-1">
                  <label>اختر الخصم علي y: </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="allitempro"
                    mode="multiple"
                    :close-on-select="false"
                    group-values="options"
                    group-label="name"
                    placeholder="الخصم علي"
                    @change="allmultiy($event)"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showvalue">
                <div class="mt-1">
                  <label>قيمة العرض </label
                  ><input
                    type="number"
                    class="form-control"
                    v-model="formData.value"
                  />
                </div>
              </div>

              <div class="col-md-6" v-if="showField">
                <div class="mt-1">
                  <label> نوع الخصم : </label>
                  <Multiselect
                    label="name"
                    :searchable="true"
                    :options="porq"
                    placeholder="الخصم علي"
                    @change="changporq($event)"
                    v-model="formData.min_type"
                  />
                </div>
              </div>
              <div class="col-md-6" v-if="showField">
                <div class="mt-1">
                  <label>اقل قيمة العرض </label>
                  <div class="d-flex">
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.min_value"
                    />
                    <span
                      style="
                        background: #fd601f;
                        padding: 5px 15px;
                        border-radius: 5px;
                      "
                    >
                      {{ pp }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6" v-if="percshow">
                <div class="mt-1">
                  <label>اقصي قيمة العرض </label>
                  <div class="d-flex">
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.max_discounted_value"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mt-1">
                  <label>رسالة عربي</label
                  ><textarea
                    rows="3"
                    type="text"
                    class="form-control"
                    v-model="formData.message.ar"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mt-1">
                  <label>رسالة انجليزي</label
                  ><textarea
                    rows="3"
                    type="text"
                    class="form-control"
                    v-model="formData.message.en"
                  ></textarea>
                </div>
              </div>
              <label class="custom-switch" v-if="showvalue">
                <input
                  type="checkbox"
                  name="custom-switch-checkbox"
                  class="custom-switch-input"
                  v-model="formData.coupon_active"
                />
                <span class="custom-switch-description">متاح كوبون </span>
                <span class="custom-switch-indicator"></span>
              </label>
            </div>
            <button class="btn btn-primary m-auto mt-3 d-block" type="submit">
              اضافة
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
import crudDataService from "../../Services/crudDataService.js";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      imageUrl: null,
      isDropdownOpen: false,
      discount_type: [
        { value: "free", name: "مجانا" },
        { value: "percent", name: "نسية مئوية" },
      ],
      porq: [
        { value: "price", name: "سعر" },
        { value: "quantity", name: "كمية " },
      ],

      catpro: [
        { value: "products", name: "منتج" },
        { value: "categories", name: "قسم" },
      ],
      type: [
        { value: "fixed", name: "ثابتة" },
        { value: "percent", name: "نسية مئوية" },
        { value: "buy_x_get_y", name: "اشتري قطعه واحصل ع اخري" },
      ],
      ShowModel: false,
      item: null,
      showdiscount: false,
      showField: false,
      showvalue: false,
      percshow: false,
      showx: false,
      allitempro: [],
      pp: "",
      formData: {
        title: {
          ar: "",
          en: "",
        },
        message: {
          ar: "",
          en: "",
        },
        coupon_active: "",
        start_date: "",
        expire_date: "",
        type: "",
        value: "",
        discount_type: "",
        max_discounted_value: "",
        min_value: "",
        min_type: "",
        x_quantity: "",
        y_quantity: "",
        offerables: [],
        image: null,
      },
      perminlocal: localStorage.getItem("permissions"),
      conflictsdata: [],
      allpro: [],
    };
  },
  methods: {
    edit() {
      this.ShowModel = true;
      this.formData.title.ar = this.item.title.ar;
      this.formData.title.en = this.item.title.en;
      this.formData.start_date = moment(this.item.start_date).format(
        "YYYY-MM-DD"
      );
      this.formData.expire_date = moment(this.item.expire_date).format(
        "YYYY-MM-DD"
      );
      this.formData.type = this.item.type;
      this.formData.value = this.item.value;
      this.formData.discount_type = this.item.discount_type;
      this.formData.min_type = this.item.min_type;
      this.formData.min_value = this.item.min_value;
      this.formData.message.ar = this.item.message.ar;
      this.formData.message.en = this.item.message.en;
      this.formData.is_active = this.item.is_active;
      this.imageUrl = this.item.image;
      if (this.item.min_type === "price") {
        this.pp = "سعر";
      } else if (this.item.min_type === "quantity") {
        this.pp = "كمية";
      } else {
        this.pp = "";
      }
    },
    async update() {
      let res = await crudDataService.create(
        `offers/${this.$route.params.id}?_method=put`,
        this.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.onecopuns();
      this.ShowModel = false;
    },
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    async onecopuns() {
      let res = await crudDataService.get("offers", `${this.$route.params.id}`);
      this.item = res.data.data;
    },
    changdiscount(e) {
      if (e === "free") {
        this.showvalue = false;
      } else if (e === "percent") {
        this.showvalue = true;
      }
    },
    changporq(e) {
      if (e === "price") {
        this.pp = "سعر";
      } else if (e === "quantity") {
        this.pp = "كمية";
      } else {
        this.pp = "";
      }
    },
    changpro(e) {
      this.getall(e);
      if (e === "products") {
        this.formData.offerables.push({ type: null, model_name: "product" });
      } else if (e === "categories") {
        this.formData.offerables.push({ type: null, model_name: "category" });
      }
    },
    changcaty(e) {
      this.getall(e);
      if (e === "products") {
        this.formData.offerables.push({ type: "y", model_name: "product" });
      } else if (e === "categories") {
        this.formData.offerables.push({ type: "y", model_name: "category" });
      }
    },
    changcatx(e) {
      this.getall(e);
      if (e === "products") {
        this.formData.offerables.push({ type: "x", model_name: "product" });
      } else if (e === "categories") {
        this.formData.offerables.push({ type: "x", model_name: "category" });
      }
    },
    handleTypeChange(e) {
      if (e === "fixed") {
        this.showdiscount = false;
        this.showField = true;
        this.showvalue = true;
        this.percshow = false;
        this.showx = false;
      } else if (e === "percent") {
        this.showField = true;
        this.percshow = true;
        this.showdiscount = false;
        this.showvalue = true;
        this.showx = false;
      } else {
        (this.showField = false), (this.pp = "");
        this.percshow = false;
        this.formData.coupon_active = false;
        this.showvalue = false;
        this.showx = true;
        this.showdiscount = true;
      }
    },
    async getall(e) {
      if (this.conflictsdata.product || this.conflictsdata.category) {
        if (
          this.conflictsdata.product.length > 0 ||
          this.conflictsdata.category.length > 0
        ) {
          console.log(e);

          if (e === "products") {
            console.log(e);
            this.allitempro = [];
            let res = await crudDataService
              .getAll("products-without-paginated")
              .then((response) => {
                this.allpro = response.data.data.map((ele) => ({
                  value: ele.id,
                  name: ele.name.ar,
                }));
                console.log(this.conflictsdata);
                console.log(this.allpro);
                this.allpro.forEach((element) => {
                  console.log(
                    this.conflictsdata.product.includes(element.value)
                  );
                  if (!this.conflictsdata.product.includes(element.value)) {
                    this.allitempro.push(element);
                    console.log(this.allitempro);
                  }
                });
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (e === "categories") {
            this.allitempro = [];
            let res = await crudDataService
              .getAll("categories-without-paginated")
              .then((response) => {
                this.allpro = response.data.data.map((ele) => ({
                  value: ele.id,
                  name: ele.name,
                }));
                this.allpro.forEach((element) => {
                  console.log(
                    this.conflictsdata.category.includes(element.value)
                  );
                  if (!this.conflictsdata.category.includes(element.value)) {
                    this.allitempro.push(element);
                  }
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      } else {
        if (e === "products") {
          let res = await crudDataService
            .getAll("products-without-paginated")
            .then((response) => {
              this.allitempro = response.data.data.map((ele) => ({
                value: ele.id,
                name: ele.name.ar,
              }));
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (e === "categories") {
          let res = await crudDataService
            .getAll("categories-without-paginated")
            .then((response) => {
              this.allitempro = response.data.data.map((ele) => ({
                value: ele.id,
                name: ele.name,
              }));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    allmultiy(e) {
      this.formData.offerables.forEach((element) => {
        if (element.type === "y") {
          element.ids = e;
        }
      });
      console.log(this.formData.offerables);
    },
    allmultix(e) {
      this.formData.offerables.forEach((element) => {
        if (element.type === "x") {
          element.ids = e;
        }
      });
      console.log(this.formData.offerables);
    },
    allmulti(e) {
      console.log(this.formData.offerables);

      this.formData.offerables.forEach((element) => {
        element.ids = e;
      });
    },
    async conflicts(fdate, edate) {
      if (fdate && edate) {
        let res = await crudDataService.create(`offers/conflicts`, {
          start_date: fdate,
          expire_date: edate,
        });
        this.conflictsdata = res.data.data;
      }
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
