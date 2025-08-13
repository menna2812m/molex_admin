<template>
  <section>
    <button
      @click="
        () => {
          ShowModel = true;
          clearAllErrors();
          resetFormData();
        }
      "
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
                    @input="clearFieldError('name')"
                    :class="{ 'is-invalid': hasFieldError('name') }"
                  />
                  <div v-if="hasFieldError('name')" class="invalid-feedback">
                    {{ getFieldError("name") }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <div class="mt-1">
                  <label> الجوال </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.store_phone"
                    @input="clearFieldError('store_phone')"
                    :class="{ 'is-invalid': hasFieldError('store_phone') }"
                  />
                  <div
                    v-if="hasFieldError('store_phone')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("store_phone") }}
                  </div>
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
                    :class="{ 'is-invalid': hasFieldError('image') }"
                  />
                  <div v-if="hasFieldError('image')" class="invalid-feedback">
                    {{ getFieldError("image") }}
                  </div>
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
                    accept="video/*"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('video') }"
                  />
                  <div v-if="hasFieldError('video')" class="invalid-feedback">
                    {{ getFieldError("video") }}
                  </div>
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
                  :class="{ 'is-invalid': hasFieldError('country_id') }"
                />
                <div
                  v-if="hasFieldError('country_id')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("country_id") }}
                </div>
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
                  :class="{ 'is-invalid': hasFieldError('region_id') }"
                />
                <div v-if="hasFieldError('region_id')" class="invalid-feedback">
                  {{ getFieldError("region_id") }}
                </div>
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
                  :class="{ 'is-invalid': hasFieldError('city_id') }"
                />
                <div v-if="hasFieldError('city_id')" class="invalid-feedback">
                  {{ getFieldError("city_id") }}
                </div>
              </div>
              <div class="col-6 mb-2">
                <label> المنطقة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="districta"
                  placeholder="اختر المنطقة "
                  v-model="formData.district_id"
                  :class="{ 'is-invalid': hasFieldError('district_id') }"
                />
                <div
                  v-if="hasFieldError('district_id')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("district_id") }}
                </div>
              </div>
              <div class="col-6 mb-2">
                <label> الماركة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allbrands"
                  mode="tags"
                  :close-on-select="false"
                  group-values="options"
                  group-label="name"
                  @change="addbrands($event)"
                  :class="{ 'is-invalid': hasFieldError('brands_ids') }"
                />
                <div
                  v-if="hasFieldError('brands_ids')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("brands_ids") }}
                </div>
              </div>
              <div class="col-12 mb-2">
                <label> القسم </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allcategory"
                  mode="tags"
                  :close-on-select="false"
                  group-values="options"
                  group-label="name"
                  @change="addcategories($event)"
                  :class="{ 'is-invalid': hasFieldError('categories_ids') }"
                />
                <div
                  v-if="hasFieldError('categories_ids')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("categories_ids") }}
                </div>
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
                    @input="clearFieldError('fname')"
                    :class="{ 'is-invalid': hasFieldError('fname') }"
                  />
                  <div v-if="hasFieldError('fname')" class="invalid-feedback">
                    {{ getFieldError("fname") }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label> الاسم الثاني </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.lname"
                    @input="clearFieldError('lname')"
                    :class="{ 'is-invalid': hasFieldError('lname') }"
                  />
                  <div v-if="hasFieldError('lname')" class="invalid-feedback">
                    {{ getFieldError("lname") }}
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="mt-1">
                  <label> الايميل </label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="formData.email"
                    @input="clearFieldError('email')"
                    :class="{ 'is-invalid': hasFieldError('email') }"
                  />
                  <div v-if="hasFieldError('email')" class="invalid-feedback">
                    {{ getFieldError("email") }}
                  </div>
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
                    @input="clearFieldError('phone')"
                    :class="{ 'is-invalid': hasFieldError('phone') }"
                  />
                  <div v-if="hasFieldError('phone')" class="invalid-feedback">
                    {{ getFieldError("phone") }}
                  </div>
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
                      @input="clearFieldError('password')"
                      :class="{ 'is-invalid': hasFieldError('password') }"
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
                  <div
                    v-if="hasFieldError('password')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("password") }}
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
                      @input="clearFieldError('password_confirmation')"
                      :class="{
                        'is-invalid': hasFieldError('password_confirmation'),
                      }"
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
                  <div
                    v-if="hasFieldError('password_confirmation')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("password_confirmation") }}
                  </div>
                </div>
              </div>
            </div>
            <button
              class="btn btn-primary m-auto d-block mt-3"
              type="submit"
              :disabled="isLoading"
            >
              <span v-if="isLoading">جاري الحفظ...</span>
              <span v-else>اضافة</span>
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
                    @input="clearFieldError('name')"
                    :class="{ 'is-invalid': hasFieldError('name') }"
                  />
                  <div v-if="hasFieldError('name')" class="invalid-feedback">
                    {{ getFieldError("name") }}
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <div class="mt-1">
                  <label> الجوال </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formDataupdate.store_phone"
                    @input="clearFieldError('store_phone')"
                    :class="{ 'is-invalid': hasFieldError('store_phone') }"
                  />
                  <div
                    v-if="hasFieldError('store_phone')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("store_phone") }}
                  </div>
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
                    :class="{ 'is-invalid': hasFieldError('image') }"
                  />
                  <div v-if="hasFieldError('image')" class="invalid-feedback">
                    {{ getFieldError("image") }}
                  </div>
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
                    :class="{ 'is-invalid': hasFieldError('video') }"
                  />
                  <div v-if="hasFieldError('video')" class="invalid-feedback">
                    {{ getFieldError("video") }}
                  </div>
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
                  :class="{ 'is-invalid': hasFieldError('country_id') }"
                />
                <div
                  v-if="hasFieldError('country_id')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("country_id") }}
                </div>
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
                  :class="{ 'is-invalid': hasFieldError('region_id') }"
                />
                <div v-if="hasFieldError('region_id')" class="invalid-feedback">
                  {{ getFieldError("region_id") }}
                </div>
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
                  :class="{ 'is-invalid': hasFieldError('city_id') }"
                />
                <div v-if="hasFieldError('city_id')" class="invalid-feedback">
                  {{ getFieldError("city_id") }}
                </div>
              </div>
              <div class="col-6 mb-2">
                <label> المنطقة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="districta"
                  placeholder="اختر المنطقة "
                  v-model="formDataupdate.district_id"
                  :class="{ 'is-invalid': hasFieldError('district_id') }"
                />
                <div
                  v-if="hasFieldError('district_id')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("district_id") }}
                </div>
              </div>
              <div class="col-6 mb-2">
                <label> الماركة </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allbrands"
                  mode="tags"
                  :close-on-select="false"
                  group-values="options"
                  group-label="name"
                  @change="addbrands($event)"
                  :class="{ 'is-invalid': hasFieldError('brands_ids') }"
                />
                <div
                  v-if="hasFieldError('brands_ids')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("brands_ids") }}
                </div>
              </div>
              <div class="col-12 mb-2">
                <label> القسم </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="allcategory"
                  mode="tags"
                  :close-on-select="false"
                  group-values="options"
                  group-label="name"
                  @change="addcategories($event)"
                  :class="{ 'is-invalid': hasFieldError('categories_ids') }"
                />
                <div
                  v-if="hasFieldError('categories_ids')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("categories_ids") }}
                </div>
              </div>
            </div>
            <button
              class="btn btn-primary m-auto d-block mt-3"
              type="submit"
              :disabled="isLoadingUpdate"
            >
              <span v-if="isLoadingUpdate">جاري التحديث...</span>
              <span v-else>تعديل</span>
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
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js"; // ✅ Import FormErrorMixin

export default {
  components: {
    Multiselect,
  },

  // ✅ Use the mixin
  mixins: [FormErrorMixin],

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
        password: "",
        password_confirmation: "",
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
      isLoading: false, // ✅ Add loading state for add form
      isLoadingUpdate: false, // ✅ Add loading state for update form
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

      // ✅ Define watched fields for automatic error clearing
      watchedFields: [
        "formData.name",
        "formData.store_phone",
        "formData.fname",
        "formData.lname",
        "formData.email",
        "formData.phone",
        "formData.password",
        "formData.password_confirmation",
        "formDataupdate.name",
        "formDataupdate.store_phone",
      ],
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

      // ✅ Clear all previous errors when opening edit modal
      this.clearAllErrors();

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
      this.isLoadingUpdate = true; // ✅ Start loading

      // ✅ Clear previous errors
      this.clearAllErrors();

      try {
        const res = await crudDataService.create(
          `stores/${this.id}?_method=put`,
          this.formDataupdate,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.stores();
        this.ShowModeledit = false;

        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });

        this.imageUrl = "";
        this.videoUrl = "";
      } catch (error) {
        // ✅ Use mixin's error handling method
        this.handleApiErrors(error, toast);
      } finally {
        this.isLoadingUpdate = false; // ✅ End loading
      }
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
      this.clearFieldError("country_id");

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
      this.clearFieldError("city_id");
      this.clearFieldError("region_id");
      this.clearFieldError("district_id");

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
      // ✅ Clear image error when file is selected
      this.clearFieldError("image");

      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },

    editFileSelected(event) {
      // ✅ Clear image error when file is selected
      this.clearFieldError("image");

      this.formDataupdate.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formDataupdate.image);
    },

    editFilevideo(event) {
      // ✅ Clear video error when file is selected
      this.clearFieldError("video");

      this.formDataupdate.video = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.videoUrl = reader.result;
      };
      reader.readAsDataURL(this.formDataupdate.video);
    },

    onFilevideo(event) {
      // ✅ Clear video error when file is selected
      this.clearFieldError("video");

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
      // ✅ Clear brands error when selection changes
      this.clearFieldError("brands_ids");
    },

    addcategories(e) {
      this.formDataupdate.categories_ids = e;
      this.formData.categories_ids = e;
      // ✅ Clear categories error when selection changes
      this.clearFieldError("categories_ids");
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
      this.loading = true;
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
      } finally {
        this.loading = false;
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
          if (result.isConfirmed) {
            this.$swal.fire({
              title: "تم الحذف بنجاح!",
              icon: "success",
              confirmButtonText: "تم",
            });
            crudDataService.delete("stores", `${data}`).then(() => {
              this.stores();
              this.myList.splice(index, 1);
            });
          }
        });
    },

    // ✅ Reset form data helper method
    resetFormData() {
      this.formData = {
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
        password: "",
        password_confirmation: "",
      };
      this.imageUrl = "";
      this.videoUrl = "";
    },

    async add() {
      const toast = useToast();
      this.isLoading = true; // ✅ Start loading

      // ✅ Clear previous errors
      this.clearAllErrors();

      // ✅ Optional local validation
      const validationRules = {
        name: { required: true, label: "اسم المتجر" },
        store_phone: { required: true, label: "رقم هاتف المتجر" },
        fname: { required: true, label: "الاسم الأول" },
        lname: { required: true, label: "الاسم الثاني" },
        email: { required: true, email: true, label: "البريد الإلكتروني" },
        phone: { required: true, label: "رقم الهاتف" },
        password: { required: true, minLength: 6, label: "كلمة المرور" },
        password_confirmation: { required: true, label: "تأكيد كلمة المرور" },
        country_id: { required: true, label: "البلد" },
        region_id: { required: true, label: "الأقليم" },
        city_id: { required: true, label: "المدينة" },
        image: { required: true, label: "الصورة" },
        district_id: { required: true, label: "المنطقة" },
        brands_ids: { required: true, label: "الماركة" },
        categories_ids: { required: true, label: "القسم" },
      };

      // ✅ Check password confirmation match
      if (this.formData.password !== this.formData.password_confirmation) {
        this.setFieldErrors({
          password_confirmation: [
            "كلمة المرور وتأكيد كلمة المرور غير متطابقتين",
          ],
        });
        this.isLoading = false;
        return;
      }

      if (!this.validateForm(validationRules)) {
        this.isLoading = false;
        return;
      }

      try {
        const response = await crudDataService.create(`stores`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.stores();
        this.ShowModel = false;
        this.resetFormData(); // ✅ Use helper method to reset form

        toast.success(response.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        // ✅ Use mixin's error handling method
        this.handleApiErrors(error, toast);
      } finally {
        this.isLoading = false; // ✅ End loading
      }
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

// ✅ Multiselect error styles
.multiselect.is-invalid {
  border-color: #dc3545 !important;

  .multiselect-wrapper {
    border-color: #dc3545 !important;
  }

  .multiselect-input {
    border-color: #dc3545 !important;
  }
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

input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}
</style>
