<template>
  <section>
    <button
      @click="ShowModel = true"
      class="btn-add me-0 mb-4"
      v-if="perminlocal.includes('vendors-index')"
    >
      <i class="fe fe-plus"></i>
      بائع جديد
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
      <section v-if="myList.length > 0">
        <vue-good-table
          :columns="filteredColumns"
          :rows="rows"
          :search-options="{ enabled: true }"
          :group-options="{ enabled: false }"
          :pagination-options="{
            enabled: true,
            perPageDropdownEnabled: false,
          }"
          :compactMode="true"
          :rtl="true"
        >
          <template #table-row="props">
            <span v-if="props.column.field === 'vendors'" class="vendor">
              <button
                @click="view(props.row.id)"
                v-for="item in props.row.vendors"
                :key="item.id"
                class="btn text-primary"
              >
                {{ item.name }}
              </button>
            </span>
            <span v-if="props.column.field === 'phone'" class="vendor">
              <a :href="`tel:+${props.row.phone}`" class="">
                {{ props.row.phone }}
              </a>
            </span>
            <span v-if="props.column.field === 'email'" class="vendor">
              <a :href="`tel:+${props.row.email}`" class="">
                {{ props.row.email }}
              </a>
            </span>
            <span v-if="props.column.field == 'actions'">
              <button
                class="btn btn-info me-2"
                @click="view(props.row.store.id)"
                v-if="perminlocal.includes('vendors-show')"
              >
                <i class="si si-eye"></i>
              </button>

              <button
                class="btn btn-primary me-2"
                @click="edit(props.row)"
                v-if="perminlocal.includes('vendors-update')"
              >
                <i class="fe fe-edit-2"></i>
              </button>
              <button
                class="btn btn-danger me-2"
                @click="del(props.row.id, props.index, props.row.name)"
                v-if="perminlocal.includes('vendors-destroy')"
              >
                <i class="fe fe-trash"></i>
              </button>
            </span>
          </template>
        </vue-good-table>
        <b-pagination
          v-model="page"
          :total-rows="last"
          :per-page="1"
          @click="paginag(page)"
          class="justify-content-end mt-4"
        ></b-pagination>
      </section>

      <section
        class="position-relative"
        style="height: 100vh; display: grid; place-items: center"
        v-else
      >
        <div
          style="background: #fd601f; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد بائعين حتي الان
        </div>
      </section>
    </section>

    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer title="اضافة بائع">
        <div class="p-0">
          <form @submit.prevent="add" autocomplete="off">
            <div class="row">
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الاسم الاول </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.fname"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الاسم الثاني </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.lname"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mt-1">
                  <label> الايميل </label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="formData.email"
                    autocomplete="one-time-code"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mt-1">
                  <label> الجوال </label>
                  <input
                    type="tel"
                    class="form-control"
                    v-model="formData.phone"
                    autocomplete="one-time-code"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الر قم السري </label>
                  <div class="d-flex align-items-center">
                    <input
                      class="form-control"
                      v-model="formData.password"
                      :type="passwordVisible ? 'text' : 'password'"
                      autocomplete="one-time-code"
                    />
                    <i
                      @click="togglePasswordVisibility"
                      :class="
                        passwordVisible ? 'ti-eye' : 'mdi mdi-eye-off-outline'
                      "
                      style="
                        padding: 8px;
                        border: 1px solid #e8e8f7;
                        border-radius: 4px;
                      "
                    >
                    </i>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label> تاكيد الر قم السري</label>
                  <div class="d-flex align-items-center">
                    <input
                      :type="passwordconfVisible ? 'text' : 'password'"
                      class="form-control"
                      v-model="formData.password_confirmation"
                      autocomplete="one-time-code"
                    />
                    <i
                      @click="togglePassword"
                      :class="
                        passwordconfVisible
                          ? 'ti-eye'
                          : 'mdi mdi-eye-off-outline'
                      "
                      style="
                        padding: 8px;
                        border: 1px solid #e8e8f7;
                        border-radius: 4px;
                      "
                    >
                    </i>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-6">
                <div class="mt-1">
                  <label> تاريخ الميلاد</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="formData.birth_date"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label> النوع </label>

                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="gender"
                  placeholder="اختر النوع "
                  v-model="formData.gender"
                />
              </div> -->
              <div class="col-12">
                <label> المتجر </label>

                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allstores"
                  v-model="formData.store_id"
                />
              </div>
            </div>
            <div class="text-red">
              {{ errormessage ? errormessage : "" }}
            </div>
            <button class="btn btn-primary m-auto d-block mt-3" type="submit">
              اضافة
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModeledit"
        hide-footer
        title="تعديل البائع"
      >
        <div class="p-0">
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الاسم الاول </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formDataupdate.fname"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الاسم الثاني </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formDataupdate.lname"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mt-1">
                  <label> الايميل </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formDataupdate.email"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mt-1">
                  <label> الجوال </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formDataupdate.phone"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="mt-1">
                  <label> تاريخ الميلاد</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="formDataupdate.birth_date"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label> النوع </label>

                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="gender"
                  placeholder="اختر النوع "
                  v-model="formDataupdate.gender"
                />
              </div>
              <div class="col-12">
                <label> المتجر </label>

                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allstores"
                  v-model="formDataupdate.store_id"
                />
              </div>
            </div>
            <button class="btn btn-primary m-auto d-block mt-3" type="submit">
              تعديل
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import moment from "moment";
import { useToast } from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      errormessage: "",
      allstores: [],
      id: null,
      ShowModeledit: false,
      ShowModel: false,
      myList: [],
      formData: {
        email: "",
        fname: "",
        lname: "",
        phone: "",
        password: "",
        password_confirmation: "",
        store_id: "",
      },
      formDataupdate: {
        email: "",
        fname: "",
        lname: "",
        phone: "",

        store_id: "",
      },
      gender: [
        { value: "male", name: "ذكر" },
        { value: "female", name: "انثي" },
      ],
      loading: false,
      perminlocal: localStorage.getItem("permissions"),
      passwordVisible: false,
      passwordconfVisible: false,
      columns: [
        {
          label: "الإسم",
          field: "name",
        },

        {
          label: "رقم الجوال",
          field: "phone",
        },
        {
          label: "البريد الالكتروني",
          field: "email",
        },
        {
          label: "المتجر",
          field: "store.name",
        },
        {
          label: "فعل",
          field: "actions",
        },
      ],
      rows: [],
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    togglePassword() {
      this.passwordconfVisible = !this.passwordconfVisible;
    },
    async edit(data) {
      this.ShowModeledit = true;
      console.log(data);
      this.id = data.id;

      this.formDataupdate.fname = data.fname;
      this.formDataupdate.email = data.email;
      this.formDataupdate.lname = data.lname;
      this.formDataupdate.phone = data.phone;
      this.formDataupdate.birth_date = moment(data.birth_date).format(
        "YYYY-MM-DD"
      );
      this.formDataupdate.gender = data.gender;
      this.formDataupdate.store_id = data.store.id;
    },
    async update() {
      const toast = useToast();
      let res = await crudDataService
        .create(`vendors/${this.id}?_method=put`, this.formDataupdate)
        .then((res) => {
          this.vendors();
          this.ShowModeledit = false;
          const toast = useToast();
          toast.success(res.data.message, {
            position: "top-center",
            timeout: 5000,
          });
        })
        .catch((error) => {
          // this.ShowModeledit = false;

          const errorData = error?.data?.errors || {};
          console.log(error);

          const errorMessages = Object.values(errorData)
            .flat()
            .filter((msg) => typeof msg === "string");

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
        });
    },
    async stores() {
      let res = await crudDataService.getAll("stores");
      this.allstores = res.data.data.data.map((store) => ({
        value: store.id,
        name: store.name,
      }));
    },
    async vendors() {
      this.loading = true; // Start loading
      try {
        let res = await crudDataService.getAll("vendors");
        this.myList = res.data.data.data;
        this.last = res.data.data.last_page;
        if (res.data && res.data.data && res.data.data.data) {
          this.rows = res.data.data.data.map((vendor) => {
            return { ...vendor };
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    async paginag(p) {
      let res = await crudDataService.getAll(`stores?page=${this.page}`);
      this.myList = res.data.data.data;
    },
    singleoffer(id) {
      this.$router.push({ name: "SingleOffer", params: { id } });
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `هل تريد حذف البائع "${name}"؟`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
          icon: "warning",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("vendors", `${data}`) // ✅ Correct URL format
              .then(() => {
                this.$swal.fire({
                  title: "تم الحذف بنجاح!",
                  icon: "success",
                  confirmButtonText: "تم",
                });
                this.myList.splice(index, 1);
              })
              .catch((error) => {
                this.$swal.fire({
                  title: "حدث خطأ أثناء الحذف!",
                  text: error.data.message,
                  icon: "error",
                  confirmButtonText: "موافق",
                });
              });
          }
        });
    },
    async add() {
      const toast = useToast();
      let res = await crudDataService
        .create(`vendors`, this.formData)
        .then((response) => {
          this.vendors();
          this.ShowModel = false;
          this.formData.fname = "";
          this.formData.email = "";
          this.formData.lname = "";
          this.formData.phone = "";
          this.formData.birth_date = "";
          this.formData.gender = "";
          this.formData.store_id = "";
          this.formData.password = "";
          this.formData.password_confirmation = "";
          this.ShowModelEdit = false;
          const toast = useToast();
          toast.success(response.data.message, {
            position: "top-center",
            timeout: 5000,
          });
        })
        .catch((error) => {
          // this.ShowModel = false;

          const errorData = error?.data?.errors || {};
          if (typeof errorData === "object") {
            const errorMessages = Object.values(errorData)
              .flat()
              .filter((msg) => typeof msg === "string");
            toast.error(errorMessages[0], {
              position: "top-center",
              timeout: 5000,
            });

            toast.error(errorMessages[0], {
              position: "top-center",
              timeout: 5000,
            });
          } else {
            toast.error(error.data.message, {
              position: "top-center",
              timeout: 5000,
            });
          }
        });
    },
    view(id) {
      this.$router.push({ name: "SingleStore", params: { id } });
    },
  },
  computed: {
    filteredColumns() {
      if (
        !this.perminlocal.includes("vendors-show") ||
        !this.perminlocal.includes("vendors-update") ||
        !this.perminlocal.includes("vendors-destroy")
      ) {
        return this.columns?.length ? this.columns : [];
      }
      return this.columns;
    },
  },
  mounted() {
    this.vendors();
    this.stores();
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
  overflow: auto;

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
