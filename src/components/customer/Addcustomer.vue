<template>
  <section class="mt-5 pt-5">
    <button class="fs-15 btn-add mb-4" @click="ShowModel = true">
      <i class="fe fe-plus"></i>
      اضافة عميل جديد
    </button>

    <teleport to="body">
      <b-modal id="add" v-model="ShowModel">
        <div class="imgtoadd">
          <img src="../../assets/img/1.png" alt="img2" />
        </div>
        <div class="mt-5 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">إنشاء عميل جديد</h6>
          <form @submit.prevent="add">
            <div class="row">
              <div class="col-6 mb-3">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="الاسم الاول"
                  class="form-control"
                  v-model="formData.fname"
                />
              </div>
              <div class="col-6 mb-3">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="الاسم الأخر"
                  class="form-control"
                  v-model="formData.lname"
                />
              </div>
              <div class="col-12 mb-3">
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="البريد الالكتروني "
                  class="form-control"
                  v-model="formData.email"
                />
              </div>
              <div class="col-12 mb-3">
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="SelectOptions"
                  placeholder="اختر البلد"
                  v-model="formData.country_id"
                  @change="changecode"
                />
              </div>
              <div class="col-6 mb-3">
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="regions"
                  placeholder="اختر الاقليم "
                  v-model="formData.region_id"
                  @change="changecities($event, regions)"
                />
              </div>
              <div class="col-6 mb-3">
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="cities"
                  placeholder="اختر المدينة "
                  v-model="formData.city_id"
                  @change="district($event, cities)"
                />
              </div>
              <div class="col-6 mb-3">
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="districta"
                  placeholder="اختر المنطقة "
                  v-model="formData.district_id"
                />
              </div>
              <div class="col-6 mb-3 pos-relative">
                <input
                  type="number"
                  class="form-control"
                  v-model="formData.phone"
                />
                <span class="addn">{{ codephone }}</span>
              </div>
              <div class="col-6 mb-3">
                <input
                  type="date"
                  name=""
                  id=""
                  placeholder="تاريخ الميلاد "
                  class="form-control"
                  v-model="formData.birth_date"
                />
              </div>
              <div class="col-6 mb-3">
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="gender"
                  placeholder="اختر النوع "
                  v-model="formData.gender"
                />
              </div>
            </div>
            <div class="text-center">
              <button class="fs-15 btn-save mx-1" type="submit">حفظ</button>
              <button class="fs-15 btn-cancel mx-1" @click="ShowModel = false">
                الغاء
              </button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import axios from "axios";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      codephone: "",
      SelectOptions: [],
      regions: [],
      cities: [],
      ShowModel: false,
      selectAll: false,
      formData: {
        email: "",
        fname: "",
        lname: "",
        phone: "",
        birth_date: "",
        gender: "",
        country_id: "",
        region_id: "",
        city_id: "",
        district_id: "",
      },
      countries: [],
      gender: [
        { value: "male", name: "ذكر" },
        { value: "female", name: "انثي" },
      ],
      districta: [],
    };
  },
  methods: {
    async add() {
      const res = await crudDataService
        .create("users", this.formData)
        .then((response) => {
          this.ShowModel = false;
          (this.formData.email = ""),
            (this.formData.fname = ""),
            (this.formData.lname = ""),
            (this.formData.phone = ""),
            (this.formData.birth_date = ""),
            (this.formData.gender = ""),
            (this.formData.country_id = ""),
            (this.formData.region_id = ""),
            (this.formData.city_id = ""),
            (this.formData.district_id = "");
        });
    },
    async country() {
      const result = await axios.get(
        "https://sallah.nader-mo.tech/api/countries"
      );
      this.countries = result.data.data;
      this.SelectOptions = this.countries.map((country) => ({
        value: country.id,
        name: country.name,
      }));
    },
    changecode() {
      this.countries.find((country) => {
        this.codephone = "+" + country.phonecode;
        this.regions = country.regions.map((reg) => ({
          value: reg.id,
          name: reg.name,
          cities: reg.cities,
        }));
      });
    },
    changecities(events, regions) {
      regions.forEach((ele) => {
        if (events === ele.value) {
          this.cities = ele.cities.map((city) => ({
            value: city.id,
            name: city.name,
            districts: city.districts,
          }));
        }
      });
    },
    district(events, dis) {
      dis.forEach((ele) => {
        if (events === ele.value) {
          this.districta = ele.districts.map((dist) => ({
            value: dist.id,
            name: dist.name,
          }));
        }
      });
    },
  },

  mounted() {
    this.country();
  },
};
</script>
