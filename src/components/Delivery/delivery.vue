<template>
  <section class="mt-5 pt-5">
    <div class="pos-relative">
      <button
        @click="ShowModel = true"
        class="btn-add me-0 mb-4"
        v-if="perminlocal.includes('deliveries-store')"
      >
        <i class="fe fe-plus"></i>
        رجل توصيل جديد
      </button>
    </div>
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
                <td class="text-muted"> الاسم</td>
                <td class="text-muted">البريد الالكتروني </td>
                <td class="text-muted">رقم الجوال  </td>
                <td class="text-muted">الحالة   </td>
                <td class="text-muted">التفعيل</td>
              </tr>
              <tr
                v-for="(item, index) in myList"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
               
                <td>
                  {{ item.full_name }}
                </td>
                <td>
                  {{ item.email }}
                </td>
                <td>
                  {{ item.phone }}
                </td>
                <td>
                  {{ item.status }}
                </td>
                
                <td>
                  <label
                    class="custom-switch justify-content-start w-100"
                    v-if="perminlocal.includes('deliveries-toggle')"
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
                    @click="edit(item)"
                    v-if="perminlocal.includes('deliveries-update')"
                  >
                    <i class="fe fe-edit-2 text-info"></i>
                  </button>
                  <button
                    class="btn me-2"
                    @click="del(item.id, index, item.full_name)"
                    v-if="perminlocal.includes('deliveries-destroy')"
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
          style="background: #e66239; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد توصيل حتي الان
        </div>
      </section>
    </section>

    <teleport to="body">
      <b-modal id="add" v-model="ShowModel" hide-footer title="اضافة توصيل">
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="add">
            <div class="row">
              <div class="col-md-6">
                <div class="mt-1">
                  <label>  الاسم الاول </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.fname"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم الاخير </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.lname"
                  />
                </div>
              </div>
              
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>البريد الالكتروني </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.email"
                  />
                </div>
              </div>
              <div class="col-6 mb-3">
                <label >كلمة السر </label>
                <input
                  type="password"
                  name=""
                  class="form-control"
                  v-model="formData.password"
                />
              </div>
              <div class="col-6 mb-3">
                <label >تاكيد كلمة السر </label>
                <input
                  type="password"
                  name=""
                  class="form-control"
                  v-model="formData.password_confirmation"
                />
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>رقم الجوال </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.phone"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                    <label>المدينة  </label>
                <Multiselect
              label="name"
              :searchable="true"
              :options="cities"
              placeholder="المدينة"
              v-model="formData.city_id"
            />
            </div>
            </div>   
                </div>
            <button class="btn btn-primary m-auto mt-3 d-block" type="submit">
              اضافة
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
    <teleport to="body">
      <b-modal
        id="add"
        v-model="ShowEditModel"
        hide-footer
        title="تعديل التوصيل"
      >
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم الاول </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.fname"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>الاسم الاخير </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.lname"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>البريد الالكتروني </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.email"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                  <label>رقم الجوال </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="EditData.phone"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="mt-1">
                    <label>المدينة  </label>
                <Multiselect
              label="name"
              :searchable="true"
              :options="cities"
              placeholder="المدينة"
              v-model="EditData.city_id"
            />
            </div>
            </div>   
           
            </div>
            <button class="btn btn-primary m-auto mt-3 d-block" type="submit">
              تعديل
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import { useToast } from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import axios from "axios";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      changeedit: true,
      ShowModel: false,
      ShowEditModel: false,
      myList: [],
      id: null,
      loading: false,
      cities:[],
      formData: {
        fname:'',
        lname:'',
        email: "",
        phone:'',
        password: "",
        password_confirmation: "",
        city_id:''
      },
      EditData: {
        fname:'',
        lname:'',
        email: "",
        phone:'',
        city_id:''
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    async allcities() {
        const res = await axios.get("https://mall-express.code7x.com/api/cities");    
          this.cities = res.data.data.map((city) => ({
        value: city.id,
        name: city.name,
      }));
    },
    async toggleactive(id) {
      let res = await crudDataService.create(`deliveries/${id}/toggle`, "");
      const toast = useToast();
      if (res.data.status) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    async edit(data) {
      this.id = data.id;
      this.ShowEditModel = true;
      this.EditData.fname = data.fname;
      this.EditData.lname = data.lname;
      this.EditData.email = data.email;  
      this.EditData.city_id=data.city.id    
      this.EditData.phone = data.phone;      
    },
    async update() {
      let res = await crudDataService.create(
        `deliveries/${this.id}?_method=put`,
        this.EditData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(this.EditData);
      this.ShowEditModel = false;
      this.deliveries();
    },
    async deliveries() {
      this.loading = true; // Start loading

      try {
        let res = await crudDataService.getAll("deliveries");
        this.myList = res.data.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    async add() {
      console.log(this.formData);

      let res = await crudDataService
        .create(`deliveries`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.deliveries();
          this.ShowModel = false;
          (this.formData.full_name = ""),
            (this.formData.email = ""),
            (this.formData.status = ""),
            (this.formData.phone = "")
        });
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف التوصيل `,
          showCancelButton: true,
          confirmButtonText: "Yes",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal.fire("Deleted successfully!", "", "success");
            crudDataService.delete("deliveries", `${data}`).then(() => {
              this.myList.splice(index, 1);
            });
          }
        });
    },
  },
  mounted() {
    this.allcities();
    this.deliveries();
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
</style>
