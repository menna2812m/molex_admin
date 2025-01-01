<template>
  <section >
    <Groupcustomer />
    <div class="mt-0 pt-5">
    <button class="fs-15 btn-add mb-4" @click="ShowModel = true"
    v-if="perminlocal.includes('users-store')"
    >
      <i class="fe fe-plus"></i>
      اضافة عميل جديد
    </button>
  </div>
  <section class="position-relative" style="height: 20vh;display: grid;
    place-items: center;"
    v-if="loading"
   >

<section class="cate">
</section>
 <progress class="pure-material-progress-circular"/> 

   </section>  
    <section v-else>
      <div class="card custom-card border-0 mg-b-20" v-if="myList.length>0">
      <div class="card-body p-0">
        <div class="table-responsive border rounded border-bottom-0 px-4 mb-0">
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
                  العملاء
                  <span style="color: #fb99bf" class="fw-normal">
                    ({{ myList.length }})
                  </span>
                </h4>
              </th>
              <th></th>
              <th>
                <div class="text-end ms-auto pos-relative">
                  <button @click="toggleDropdown" class="twobtn btn-add">
                    تحرير سريع <i class="fas fa-caret-down ms-1"></i>
                  </button>
                  <div v-if="isDropdownOpen" class="pos-relative">
                    <div class="tx-13 text-start dropitem">
                      <a
                        class="dropdown-item bg-transparent text-muted fs-6"
                        @click="toggleend"
                      >
                        <i class="fas fa-caret-right me-3 ms-2"></i>
                        المجموعات
                        <i class="fe fe-box px-1"></i>
                      </a>
                    </div>
                    <div class="text-start dropend mx-1" v-if="isDropendOpen">
                      <a class="dropdown-item"  @click="ShowModelAddgroup = true">لإضافة مجموعة</a>
                      <a class="dropdown-item text-danger" @click="removeuser()"> حذف مجموعة</a>
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
                <input type="checkbox" v-model="item.selected" @change="selectuser(item.id)" />
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/img/avatar_male.jpg"
                    alt="img"
                    style="width: 60px; height: 60px; border-radius: 50%"
                  />

                  <div class="pe-2">
                    <h5 class="mb-0 fw-semibold" @click="SingleCustomer(item.id)" style="cursor: pointer;">
                      {{ item.name }}
                    
                    </h5>
                  </div>
                </div>
              </td>

              <td class="text-secondary">
                <span class="text-secondary">
                  <i class="typcn typcn-location text-black"></i>

                  {{ loc }}
                </span>
              </td>
              <td>
                <button
                  class="btn me-2"
                  @click="del(item.id, index, item.fname)"
      v-if="perminlocal.includes('users-destroy')"
                
                >
                  <i class="fe fe-trash text-danger"></i>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <section class="position-relative" style="height: 10vh;display: grid;
    place-items: center;"
    v-else
   >
<div style="
background: #E66239;
    padding: 30px;
    font-size: 20px;" class="w-50 text-center text-white rounded-10">
  لا يوجد عملاء حتي الان 
</div>
   </section> 
   <b-pagination
      v-model="page"
      :total-rows="last"
      :per-page="1"
      @click="paginag(page)"
      class="justify-content-end"
     
    ></b-pagination>
    </section>
   
  
    
    <teleport to="body">
      <b-modal id="add" v-model="ShowModel" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/1.png" alt="img2" />
        </div>
        <div  class="mt-4  pos-relative" style="z-index: 5555;">
          <h6 style="color: #febcd5" class="text-center pt-2 mb-3">إنشاء عميل جديد</h6>
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
              <button class="fs-15 btn-save mx-1" type="submit" @click="add">حفظ</button>
              <button class="fs-15 btn-cancel mx-1" @click="ShowModel=false">
                الغاء
              </button>
            </div>
        </div>
      </b-modal>
    </teleport>
    <teleport to="body">
      <b-modal id="add" v-model="ShowModelAddgroup" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/1.png" alt="img2" />
        </div>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555;">
          <h5 style="color: #febcd5" class="text-center mb-4">إضافة الي مجموعة </h5>
          <label class="custom-control custom-checkbox" v-for="(item,i) in items" :key="i">
            
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      name="example-checkbox1"
                      @change="checkitem(item.id)"
                    />
                    <span class="custom-control-label">{{ item.name }}</span>
                  </label>
          <div class="text-center">
            <button class="fs-15 btn-save mx-1" type="submit" @click="adduser()">
              حفظ
            </button>
            <button class="fs-15 btn-cancel mx-1" @click="ShowModelAddgroup = false">
              الغاء
            </button>
          </div>
        </div>
      </b-modal>
    </teleport>
 
  </section>
 
</template>

<script>
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import Groupcustomer from "./GroupCustomer.vue";
import axios from "axios";
export default {
  components: {
    Multiselect,
    Groupcustomer,
  },
  data() {
    return {
      page: 1,
      last: 2,
      loading:false,
      ShowModelAddgroup:false,
      isDropdownOpen: false,
      isDropendOpen: false,
      myList: [],
      items: [],
      loc: "",
      selectAll: false,
      codephone: "+966",
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
        phone: "",
        country_id: '',
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
      addData:{
        group_id:"",
        user_ids:[]
      },
    perminlocal : localStorage.getItem('permissions')

    };
  },
  methods: {
    SingleCustomer(data){
      this.$router.push({name:"SingleCustomer" ,params: { id: data }})
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleSelectAll() {
      this.myList.forEach((item) => (item.selected = this.selectAll));
    },
    toggleend() {
      this.isDropendOpen = !this.isDropendOpen;
    },
    async paginag(p) {
      let res = await crudDataService.getAll(`users?page=${this.page}`);
      this.myList = res.data.data.data;
    },
    async getAllCustomer() {
      this.loading = true; // Start loading

try {
  const res = await crudDataService.getAll("users");
      this.myList = res.data.data.data;
      this.last = res.data.data.last_page;

      this.myList.forEach((ele) => {
        console.log(ele.country);
        
        this.loc = ele.country?.name;
      });
 
}catch (error) {
console.error("Failed to fetch data:", error);
// Handle error
} finally {
this.loading = false; // End loading regardless of success or failure
}
   
    },
    async add() {
      const res = await crudDataService.create("users", this.formData).then((response)=>{
        this.ShowModel= false;
        this.getAllCustomer();
        this.formData.email= "",
        this.formData.fname= "",
        this.formData.lname= "",
        this.formData.phone= "",
        this.formData.birth_date= "",
        this.formData.gender= "",
        this.formData.country_id= "",
        this.formData.region_id= "",
        this.formData.city_id= "",
        this.formData.district_id= ""
      })
    },
    async country() {
      const result = await crudDataService.getAll(
        "countries"
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
    async getallgroups() {
      let res = await crudDataService.getAll("groups");
      this.items = res.data.data.data;
    },
    checkitem(id){
      this.addData.group_id=id
    },
    selectuser(id){
      this.addData.user_ids.push(id)
    },
    async adduser(){
      let res = await crudDataService.create("add-users-to-group",this.addData);
      console.log(res);
      this.ShowModelAddgroup=false
      this.isDropendOpen=false;
     this.getAllCustomer()
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف العميل `,
          showCancelButton: true,
          confirmButtonText: "Yes",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal.fire("Deleted successfully!", "", "success");
            crudDataService.delete("users", `${data}`).then(() => {
              this.myList.splice(index, 1);
            });
          }
        });
    },
    async removeuser(){
      let res = await crudDataService.create("remove-users-from-group",{
        user_ids:this.addData.user_ids
      });
      console.log(res);
 
     this.getAllCustomer()
    }
  },
  mounted() {
    this.getAllCustomer();
    this.country();
    this.getallgroups()
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
.icon_color {
  display: inline;
  padding: 12px;
  border-radius: 50%;
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
  &.icon_color_7 {
    color: #161548;
    background: #eff4fb;
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
  left: 55%;
  box-shadow: 0px 3px 3px 0px #e6edf0;
  border-radius: 3px;
  a {
    cursor: pointer;
  }
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
