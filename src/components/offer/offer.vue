<template>
  <section class="mt-5">
    <button
      @click="ShowModel = true"
      class="btn-add me-0 mb-4"
      v-if="perminlocal.includes('offers-store')"
    >
      <i class="fe fe-plus"></i>
      عرض جديد
    </button>
    <section
      class="position-relative"
      style="height: 100vh; display: grid; place-items: center"
      v-if="loading"
    >
      <section class="cate"></section>
      <progress class="pure-material-progress-circular" />
    </section>
    <section v-else>
      <div class="card custom-card border-0 mg-b-20" v-if="myList.length > 0">
        <div class="card-body p-0">
          <div
            class="table-responsive border-0 rounded border-bottom-0 px-4 mb-0"
          >
            <table class="table text-nowrap text-md-nowrap mg-b-0">
              <tr>
                <td class="text-muted">اسم العرض</td>
                <td class="text-muted">تاريخ بداية العرض</td>
                <td class="text-muted">تاريخ انتهاء العرض</td>
                <td class="text-muted text-center">الحالة</td>
              </tr>
              <tr
                v-for="(item, index) in myList"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td class="py-4" @click="singleoffer(item.id)">
                  {{ item.title }}
                </td>
                <td>
                  {{ item.start_date }}
                </td>
                <td>
                  {{ item.expire_date }}
                </td>

                <td>
                  <label
                    class="custom-switch justify-content-center w-100"
                    v-if="perminlocal.includes('offers-toggle')"
                  >
                    <input
                      type="checkbox"
                      name="custom-switch-checkbox"
                      class="custom-switch-input"
                      :checked="item.is_active"
                      @change="toggleactive(item.id)"
                    />
                    <span class="custom-switch-description"> </span>
                    <span class="custom-switch-indicator"></span>
                  </label>
                </td>
                <td>
                  <button
                    class="btn me-2"
                    @click="del(item.id, index, item.title)"
                    v-if="perminlocal.includes('offers-destroy')"
                  >
                    <i class="fe fe-trash text-danger"></i>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <section
        class="position-relative"
        style="height: 100vh; display: grid; place-items: center"
        v-else
      >
        <div
          style="background: #fd601f; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد عروض حتي الان
        </div>
      </section>
    </section>
    <teleport to="body">
      <b-modal id="add add-body" v-model="ShowModel" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/dis.png" alt="img2" />
        </div>
        <div>
          <div class="p-0 mt-5 pos-relative" style="z-index: 555">
            <h6 style="color: #febcd5" class="text-center my-3">
              إنشاء عرض جديد
            </h6>
            <form @submit.prevent="add">
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
                      mode="tags"
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
                      mode="tags"
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
                      mode="tags"
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
                    @change="changecoupon($event)"
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
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import { useToast } from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import offerimage from "../../assets/img/offer.png";
import { error } from "jquery";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      imageUrl: offerimage,
      showdiscount: false,
      showField: false,
      showvalue: false,
      percshow: false,
      showx: false,
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
      myList: [],
      loading: false,
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
        coupon_active: false,
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
        image: "",
      },
      perminlocal: localStorage.getItem("permissions"),
      conflictsdata: [],
      allpro: [],
    };
  },
  methods: {
    changecoupon(e) {
      if (e.target.checked) {
        this.formData.coupon_active = 1;
      } else {
        this.formData.coupon_active = 0;
      }
    },
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
    async toggleactive(id) {
      let res = await crudDataService.create(`offers/${id}/toggle`, "");
      const toast = useToast();
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
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
    async offers() {
      this.loading = true; // Start loading
      try {
        let res = await crudDataService.getAll("offers");
        this.myList = res.data.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    singleoffer(id) {
      if (this.perminlocal.includes("offers-show")) {
        this.$router.push({ name: "SingleOffer", params: { id } });
      }
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف العرض `,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal.fire({
              title: "تم الحذف بنجاح!",
              icon: "success",
              confirmButtonText: "تم", // ✅ Custom OK button text
            });
            crudDataService.delete("offers", `${data}`).then(() => {
              this.myList.splice(index, 1);
            });
          }
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

    async add() {
      if (!this.formData.image && this.imageUrl) {
        try {
          const response = await fetch(this.imageUrl);
          const blob = await response.blob();
          this.formData.image = new File([blob], "filename.jpg", {
            type: "image/jpeg",
          });
        } catch (error) {
          console.error("Error downloading image:", error);
          return;
        }
      }

      let res = await crudDataService
        .create(`offers`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.ShowModel = false;
          this.offers();
          (this.formData.title.ar = ""),
            (this.formData.title.en = ""),
            (this.formData.is_active = ""),
            (this.formData.start_date = ""),
            (this.formData.expire_date = ""),
            (this.formData.type = ""),
            (this.formData.message = ""),
            (this.formData.value = ""),
            (this.formData.x_quantity = ""),
            (this.formData.y_quantity = ""),
            (this.formData.discount_type = ""),
            (this.formData.products_x = ""),
            (this.formData.products_y = ""),
            (this.formData.categories_x = ""),
            (this.formData.categories_y = "");
        });
    },
  },
  mounted() {
    this.offers();
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
