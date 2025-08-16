<template>
  <section v-if="oneuser.length > 0">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <h4 class="mb-0">العميل</h4>
            <div class="pos-relative">
              <button
                @click="toggleDropdown"
                class="twobtn bg-white border"
                v-if="perminlocal.includes('users-update')"
              >
                خيارات العميل <i class="fas fa-caret-down ms-1"></i>
              </button>

              <div class="text-start dropend mt-1" v-if="isDropdownOpen">
                <a class="dropdown-item" @click="ShowModel = true"
                  >تعديل العميل
                </a>

                <a class="dropdown-item text-danger" @click="blocked()">
                  {{ blocktext }}
                </a>
              </div>
            </div>
          </div>
          <div class="row align-items-center justify-content-center pt-3">
            <div class="col-lg-7">
              <div class="row" v-for="(user, i) in oneuser" :key="i">
                <div class="col-lg-4 text-center">
                  <img
                    src="../../assets/img/avatar_male.jpg"
                    alt="img"
                    class="mx-auto"
                    style="width: 80px; height: 80px; border-radius: 50%"
                  />
                  <h5>{{ user.fname }} {{ user.lname }}</h5>
                  <h5>{{ user ? user.email : "" }}</h5>
                  <p>
                    {{ user.birth_date }}
                  </p>
                </div>
                <div class="col-lg-7 mt-3">
                  <ul style="list-style: none; font-size: 16px">
                    <li class="pb-3">
                      <i class="si si-location-pin"></i>
                      المنطقة:
                      <span>
                        {{ user.country?.name }}
                      </span>
                    </li>
                    <li class="pb-3">
                      <i class="fa fa-calendar"></i>
                      تاريخ التسجيل في المتجر:
                      <span>{{ user.created_at }}</span>
                    </li>
                    <li class="pb-3">
                      <p
                        class="p-2"
                        style="
                          border-radius: 25px;
                          border: 1px solid #fd601f;
                          width: max-content;
                        "
                      >
                        <i class="si si-phone"></i>
                        <a href="tel:`+${user.country.phonecode}${user.phone}`">
                          اتصل {{ user?.phone }}
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/1.png" alt="img2" />
        </div>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h5 style="color: #febcd5" class="text-center mb-4">تعديل عميل</h5>
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
            <button class="fs-15 btn-save mx-1" @click="edit">حفظ</button>
            <button class="fs-15 btn-cancel mx-1" @click="ShowModel = false">
              الغاء
            </button>
          </div>
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
import Multiselect from "@vueform/multiselect";
import axios from "axios";
import crudDataService from "../../Services/crudDataService.js";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      blocktext: "حظر المستخدم",
      ShowModel: false,
      isDropdownOpen: false,
      isDropendOpen: false,
      oneuser: [],
      formData: {
        email: "",
        fname: "",
        lname: "",
        phone: "",
        birth_date: "",
        gender: "",
        phone: "",
        country_id: null,
        region_id: "",
        city_id: "",
        district_id: "",
      },
      codephone: "+966",
      countries: [],
      gender: [
        { value: "male", name: "ذكر" },
        { value: "female", name: "انثي" },
      ],
      districta: [],
      SelectOptions: [],
      regions: [],
      cities: [],
      items: [],
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    async getCustomer() {
      const res = await crudDataService.get(
        "users",
        `${this.$route.params.id}`
      );
      console.log(res.data.data);
      if (res.data.data.blocked == 1) {
        this.blocktext = "إلغاء الحظر";
      } else {
        this.blocktext = "حظر المستخدم";
      }
      this.oneuser.push(res.data.data),
        (this.formData.fname = res.data.data.fname),
        (this.formData.lname = res.data.data.lname),
        (this.formData.birth_date = res.data.data.birth_date),
        (this.formData.gender = res.data.data.gender),
        (this.formData.email = res.data.data.email),
        (this.formData.phone = res.data.data.phone),
        (this.formData.country_id = res.data.data.country?.id),
        (this.formData.city_id = res.data.data.city
          ? res.data.data.city.id
          : null),
        (this.formData.region_id = res.data.data.region
          ? res.data.data.region.id
          : null),
        (this.formData.district_id = res.data.data.district
          ? res.data.data.district.id
          : null);
    },
    async country() {
      const result = await crudDataService.getAll("countries");
      this.countries = result.data.data;
      this.SelectOptions = this.countries.map((country) => ({
        value: country.id,
        name: country.name,
        regions: country.regions,
      }));
      this.countries.find((country) => {
        this.regions = country.regions.map((reg) => ({
          value: reg.id,
          name: reg.name,
          cities: reg.cities,
        }));
      });
      this.oneuser.forEach((ele) => {
        this.regions.forEach((city) => {
          city.cities.forEach((one) => {
            if (ele.city) {
              if (ele.city.id === one.id) {
                this.cities = city.cities.map((dist) => ({
                  value: dist.id,
                  name: dist.name,
                  districts: dist.districts,
                }));
              }
            }
          });
        });
      });
      this.oneuser.forEach((ele) => {
        this.cities.forEach((dist) => {
          dist.districts.forEach((district) => {
            if (ele.district?.id === district.id) {
              this.districta = dist.districts.map((ass) => ({
                value: ass.id,
                name: ass.name,
              }));
            }
          });
        });
      });
    },
    async edit() {
      const res = await crudDataService.put(
        `users/${this.$route.params.id}`,
        this.formData
      );
      console.log(res);
      this.ShowModel = false;
      this.oneuser = [];
      this.getCustomer();
    },

    async blocked() {
      const res = await crudDataService.create(
        `users/${this.$route.params.id}/toggle`,
        ""
      );
      console.log();
      if (res.data.data.blocked) {
        this.blocktext = "إلغاء الحظر";
      } else {
        this.blocktext = "حظر المستخدم";
      }
    },
    changecode() {
      this.countries.find((country) => {
        this.codephone = "+" + country.phonecode;
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
    this.getCustomer();
    this.country();
  },
};
</script>

<style scoped lang="scss">
.twobtn {
  border-color: rgb(253, 96, 31) !important;
  color: rgb(253, 96, 31);
  display: flex;
  align-items: center;
  width: 111px;
  padding: 6px;
}
</style>
<style lang="scss">
.multiselect-caret {
  margin: 0 var(--ms-px, 0.875rem) 0 var(--ms-px, 0.875rem);
}
.multiselect-multiple-label,
.multiselect-placeholder,
.multiselect-single-label {
  left: auto;

  padding-right: 9px;

  right: 0;
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
    margin: 8.75rem auto;
  }
}
</style>
