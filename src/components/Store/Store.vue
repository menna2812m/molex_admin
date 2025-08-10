<template>
  <section>
    <button
      @click="ShowModel = true"
      class="btn-add me-0 mb-4"
      v-if="perminlocal.includes('stores-index')"
    >
      <i class="fe fe-plus"></i>
      متجر جديد
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
            <span v-if="props.column.field === 'image'" class="imgetext">
              <img
                :src="props.formattedRow[props.column.field]"
                class="imagetable"
                width="150"
                height="100"
              />
            </span>
            <span v-if="props.column.field === 'name'" class="vendor">
              <button class="btn" @click="view(props.row.id)">
                {{ props.row.name }}
              </button>
            </span>
            <span v-if="props.column.field === 'phone'" class="vendor">
              <a :href="`tel:+${props.row.phone}`" class="">
                {{ props.row.phone }}
              </a>
            </span>

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
            <span v-if="props.column.field == 'actions'">
              <label
                class="custom-switch justify-content-start pe-2"
                v-if="perminlocal.includes('stores-toggle')"
              >
                <input
                  type="checkbox"
                  name="custom-switch-checkbox"
                  class="custom-switch-input"
                  :checked="props.row.is_active"
                  @change="toggleactive(props.row.id)"
                />
                <span class="custom-switch-description"> </span>
                <span class="custom-switch-indicator"></span>
              </label>
              <button
                class="btn btn-info me-2"
                @click="view(props.row.id)"
                v-if="perminlocal.includes('stores-show')"
              >
                <i class="si si-eye"></i>
              </button>
              <button
                class="btn btn-primary me-2"
                @click="edit(props.row)"
                v-if="perminlocal.includes('stores-update')"
              >
                <i class="fe fe-edit-2"></i>
              </button>
              <button
                class="btn btn-danger me-2"
                @click="del(props.row.id, props.index, props.row.name)"
                v-if="perminlocal.includes('stores-destroy')"
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
          لا يوجد متاجر حتي الان
        </div>
      </section>
    </section>

    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer title="اضافة متجر">
        <div class="p-0">
          <form @submit.prevent="add" autocomplete="off">
            <div class="row">
              <div class="col-md-6 mb-2">
                <div class="mt-1">
                  <label> الاسم </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.name"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <div class="mt-1">
                  <label> الجوال </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.store_phone"
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
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
                  v-if="imageUrl"
                />
              </div>
              <div class="col-12 mb-2">
                <label>فيديو</label>
                <div class="pos-relative overflow-hidden">
                  <input
                    type="file"
                    @change="onFilevideo"
                    accept="*/*"
                    class="form-control"
                  />
                </div>

                <video
                  :src="videoUrl"
                  controls
                  style="width: 100%; height: 180px"
                  class="m-1"
                  v-if="videoUrl"
                ></video>
              </div>
              <div class="col-12 mb-2">
                <label> البلد </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="SelectOptions"
                  placeholder="اختر البلد"
                  v-model="formData.country_id"
                  @change="changecountry"
                />
              </div>
              <div class="col-6 mb-2">
                <label> الاقليم </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="regions"
                  placeholder="اختر الاقليم "
                  v-model="formData.region_id"
                  @change="changecities($event, regions)"
                />
              </div>
              <div class="col-6 mb-2">
                <label> المدينة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="cities"
                  placeholder="اختر المدينة "
                  v-model="formData.city_id"
                  @change="district($event, cities)"
                />
              </div>
              <div class="col-6 mb-2">
                <label> المنطقة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="districta"
                  placeholder="اختر المنطقة "
                  v-model="formData.district_id"
                />
              </div>
              <div class="col-6 mb-2">
                <label> الماركة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allbrands"
                  mode="multiple"
                  :close-on-select="false"
                  group-values="options"
                  group-label="name"
                  @change="addbrands($event)"
                />
              </div>
              <div class="col-12 mb-2">
                <label> القسم </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allcategory"
                  mode="multiple"
                  :close-on-select="false"
                  group-values="options"
                  group-label="name"
                  @change="addcategories($event)"
                />
              </div>
              <div class="col-12">
                <p>بيانات مالك المتجر</p>
              </div>
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
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="mt-1">
                  <label> الجوال </label>
                  <input
                    type="tel"
                    autocomplete="one-time-code"
                    class="form-control"
                    v-model="formData.phone"
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
                      autocomplete="one-time-code"
                      :type="passwordVisible ? 'text' : 'password'"
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
                      autocomplete="one-time-code"
                      v-model="formData.password_confirmation"
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
        title="تعديل المتجر"
      >
        <div class="p-0">
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-md-6 mb-2">
                <div class="mt-1">
                  <label> الاسم </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formDataupdate.name"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <div class="mt-1">
                  <label> الجوال </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formDataupdate.store_phone"
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
                <label>الصوره</label>
                <div class="pos-relative overflow-hidden">
                  <input
                    type="file"
                    @change="editFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                  />
                </div>
                <img
                  :src="imageUrl"
                  alt="صورة"
                  style="width: 180px; height: 180px; object-fit: fill"
                  class="m-1"
                  v-if="imageUrl"
                />
              </div>
              <div class="col-12 mb-2">
                <label>فيديو</label>
                <div class="pos-relative overflow-hidden">
                  <input
                    type="file"
                    @change="editFilevideo"
                    accept="video/*"
                    class="form-control"
                  />
                </div>

                <video
                  :src="videoUrl"
                  controls
                  style="width: 100%; height: 180px"
                  class="m-1"
                  v-if="videoUrl"
                ></video>
              </div>
              <div class="col-12 mb-2">
                <label> البلد </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="SelectOptions"
                  placeholder="اختر البلد"
                  v-model="formDataupdate.country_id"
                  @change="changecountry"
                />
              </div>
              <div class="col-6 mb-2">
                <label> الاقليم </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="regions"
                  placeholder="اختر الاقليم "
                  v-model="formDataupdate.region_id"
                  @change="changecities($event, regions)"
                />
              </div>
              <div class="col-6 mb-2">
                <label> المدينة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="cities"
                  placeholder="اختر المدينة "
                  v-model="formDataupdate.city_id"
                  @change="district($event, cities)"
                />
              </div>
              <div class="col-6 mb-2">
                <label> المنطقة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="districta"
                  placeholder="اختر المنطقة "
                  v-model="formDataupdate.district_id"
                />
              </div>
              <div class="col-6 mb-2">
                <label> الماركة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allbrands"
                  mode="multiple"
                  :close-on-select="false"
                  group-values="options"
                  group-label="name"
                  @change="addbrands($event)"
                />
              </div>
              <div class="col-12 mb-2">
                <label> القسم </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allcategory"
                  mode="multiple"
                  :close-on-select="false"
                  group-values="options"
                  group-label="name"
                  @change="addcategories($event)"
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
      columns: [
        {
          label: "الصوره",
          field: "image",
        },
        {
          label: "الإسم",
          field: "name",
        },
        {
          label: "رقم الجوال",
          field: "phone",
        },
        {
          label: "التاجر",
          field: "vendors",
        },
        {
          label: "الرصيد",
          field: "balance",
        },
        {
          label: "فعل",
          field: "actions",
        },
      ],
      rows: [],
      formData: {
        email: "",
        name: "",
        fname: "",
        lname: "",
        phone: "",
        store_phone: "",
        image: "",
        video: "",
        country_id: "",
        region_id: "",
        city_id: "",
        district_id: "",
        brands_ids: "",
        categories_ids: "",
      },
      formDataupdate: {
        name: "",
        store_phone: "",
        image: "",
        video: "",
        country_id: "",
        region_id: "",
        city_id: "",
        district_id: "",
        brands_ids: [],
        categories_ids: [],
      },
      gender: [
        { value: "male", name: "ذكر" },
        { value: "female", name: "انثي" },
      ],
      loading: false,
      perminlocal: localStorage.getItem("permissions"),
      passwordVisible: false,
      passwordconfVisible: false,
      regions: [],
      cities: [],
      countries: [],
      districta: [],
      SelectOptions: [],
      allbrands: [],
      allcategory: [],
      imageUrl: "",
      videoUrl: "",
    };
  },
  methods: {
    async toggleactive(id) {
      let res = await crudDataService.create(`stores/${id}/toggle`, "");
      const toast = useToast();
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    togglePassword() {
      this.passwordconfVisible = !this.passwordconfVisible;
    },
    async edit(data) {
      this.ShowModeledit = true;
      this.id = data.id;
      this.formDataupdate.name = data.name;
      this.formDataupdate.store_phone = data.phone;
      this.formDataupdate.country_id = 1;
      this.formDataupdate.region_id = data.region_id;
      this.formDataupdate.city_id = data.city_id;
      this.formDataupdate.district_id = data.district_id;
      data.categories?.forEach((element) => {
        this.formDataupdate.categories_ids.push(element.id);
      });
      data.brands?.forEach((element) => {
        this.formDataupdate.brands_ids.push(element.id);
      });
      this.imageUrl = data.image;
      this.videoUrl = data.video;
    },
    async update() {
      const toast = useToast();

      let res = await crudDataService
        .create(`stores/${this.id}?_method=put`, this.formDataupdate, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.stores();
          this.ShowModeledit = false;
          const toast = useToast();
          toast.success(res.data.message, {
            position: "top-center",
            timeout: 5000,
          });
          this.imageUrl = [];
          this.videoUrl = [];
        })
        .catch((error) => {
          // this.ShowModeledit = false;

          const errorData = error?.data?.errors || {};

          const errorMessages = Object.values(errorData)
            .flat()
            .filter((msg) => typeof msg === "string");

          if (errorMessages.length > 0) {
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
          this.imageUrl = [];
          this.videoUrl = [];
        });
    },
    async country() {
      const result = await crudDataService.getAll("countries");
      this.countries = result.data.data;
      this.SelectOptions = this.countries.map((country) => ({
        value: country.id,
        name: country.name,
      }));
    },
    changecountry() {
      this.countries.find((country) => {
        this.regions = country.regions?.map((reg) => ({
          value: reg.id,
          name: reg.name,
          cities: reg.cities,
        }));
      });
      this.changecities();
    },
    changecities(events, regions) {
      this.regions?.forEach((ele) => {
        if (
          events === ele.value ||
          this.formDataupdate.region_id === ele.value
        ) {
          this.cities = ele.cities.map((city) => ({
            value: city.id,
            name: city.name,
            districts: city.districts,
          }));
        }
      });
      this.district();
    },
    district(events, dis) {
      this.cities.forEach((ele) => {
        if (events === ele.value || this.formDataupdate.city_id === ele.value) {
          this.districta = ele.districts.map((dist) => ({
            value: dist.id,
            name: dist.name,
          }));
        }
      });
    },
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
    editFileSelected(event) {
      this.formDataupdate.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formDataupdate.image);
    },
    editFilevideo(event) {
      this.formDataupdate.video = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.videoUrl = reader.result;
      };
      reader.readAsDataURL(this.formDataupdate.video);
    },
    onFilevideo(event) {
      this.formData.video = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.videoUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.video);
    },
    addbrands(e) {
      this.formData.brands_ids = e;
      this.formDataupdate.brands_ids = e;
    },
    addcategories(e) {
      this.formDataupdate.categories_ids = e;
      this.formData.categories_ids = e;
    },
    async brands() {
      let res = await crudDataService.getAll("brands");
      this.allbrands = res.data.data.data.map((bran) => ({
        value: bran.id,
        name: bran.name,
      }));
    },
    async categories() {
      let res = await crudDataService.getAll("categories");
      this.allcategory = res.data.data.data.map((cat) => ({
        value: cat.id,
        name: cat.name,
      }));
    },
    view(id) {
      this.$router.push({ name: "SingleStore", params: { id } });
    },
    async stores() {
      this.loading = true; // Start loading
      try {
        let res = await crudDataService.getAll("stores");
        this.myList = res.data.data.data;
        this.last = res.data.data.last_page;
        if (res.data && res.data.data && res.data.data.data) {
          this.rows = res.data.data.data.map((stores) => {
            return { ...stores };
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
          title: `؟"${name}" هل تريد حذف المتجر `,
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
            crudDataService.delete("stores", `${data}`).then(() => {
              this.stores();
              this.myList.splice(index, 1);
            });
          }
        });
    },
    async add() {
      const toast = useToast();

      let res = await crudDataService
        .create(`stores`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.stores();
          this.ShowModel = false;
          this.formData.name = "";
          this.formData.store_phone = "";
          this.formData.image = "";
          this.formData.video = "";
          this.formData.country_id = "";
          this.formData.region_id = "";
          this.formData.city_id = "";
          this.formData.district_id = "";
          this.formData.categories_ids = "";
          this.formData.brands_ids = "";
          this.formData.fname = "";
          this.formData.lname = "";
          this.formData.email = "";
          this.formData.phone = "";
          this.formData.password = "";
          this.formData.password_confirmation = "";
          this.formData.birth_date = "";
          this.formData.gender = "";
          this.imageUrl = "";
          this.videoUrl = "";
          const toast = useToast();
          toast.success(response.data.message, {
            position: "top-center",
            timeout: 5000,
          });
        })
        .catch((error) => {
          // this.ShowModel = false;

          const errorData = error?.data?.errors || {};

          const errorMessages = Object.values(errorData)
            .flat()
            .filter((msg) => typeof msg === "string");

          if (errorMessages.length > 0) {
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
  },
  computed: {
    filteredColumns() {
      if (
        !this.perminlocal.includes("stores-show") ||
        !this.perminlocal.includes("stores-update") ||
        !this.perminlocal.includes("stores-destroy")
      ) {
        return this.columns?.length ? this.columns : [];
      }
      return this.columns;
    },
  },
  mounted() {
    this.stores();
    this.country();
    this.brands();
    this.categories();
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
input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}
</style>
