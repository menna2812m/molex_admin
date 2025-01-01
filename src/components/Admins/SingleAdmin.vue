<template>
  <section v-if="item">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
          <img
                  :src="item.image"
                  alt=""
                  style="width: 40px; height: 40px; border-radius: 50%"
                />
            <h4 class="mb-0">
              {{ item.name }}
            </h4>
            <div class="pos-relative">
              <button
                @click="toggleDropdown"
                class="twobtn bg-white border"
                style="border-color: #E66239 !important; color: #E66239"
      v-if="perminlocal.includes('admins-update')"
                           
              >
                خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
              </button>

              <div class="text-start dropend mt-1" v-if="isDropdownOpen">
                <a class="dropdown-item" @click="edit()">تعديل المسئول </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="pb-3">
              <h3 class="py-2">الادوار</h3>
              <div>
                <ul
                  class="list-group list-group-flush"
                  v-for="(role, i) in item.role"
                  :key="i"
                >
                  <li>
                    {{ role.name }}
                  </li>
                  <h4 class="ms-4">رخصة</h4>
                  <li v-for="per in role.permissions" :key="per">
                    {{ per.display_name }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="border-top pt-3">
              <h4>للتواصل:</h4>
              <div class="icon d-flex flex-column">
                <a
                  v-if="item.email"
                  :href="`tel:+${item.email}`"
                  class="text-decoration-none d-block mb-3"
                >
                  <i class="fe fe-mail"></i>
                  {{ item.email }}
                </a>
                <a
                  v-if="item.phone"
                  :href="`tel:+${item.phone}`"
                  class="text-decoration-none d-block mb-3"
                >
                  {{ item.phone }}

                  <i class="fe fe-phone"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/23.png" alt="img2" />
        </div>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">تعديل </h6>
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-12 mb-3">
                <label >الاسم</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="اسم  "
                  class="form-control"
                  v-model="formData.name"
                />
              </div>
              <div class="col-12 mb-3">
                <label >البريد الالكتروني </label>
                <input
                  type="email"
                  name=""
                  id=""
                  class="form-control"
                  v-model="formData.email"
                />
              </div>

              <div class="col-12 mb-3">
                <label >رقم الجوال</label>
                <input
                  type="number"
                  name=""
                  id=""
                  class="form-control"
                  v-model="formData.phone"
                />
              </div>
              <div class="col-6 mb-3">
                <label >كلمة السر </label>
                <input
                  type="password"
                  name=""
                  id=""
                  class="form-control"
                  v-model="formData.password"
                />
              </div>
              <div class="col-6 mb-3">
                <label >تاكيد كلمة السر </label>
                <input
                  type="password"
                  name=""
                  id=""
                  class="form-control"
                  v-model="formData.password_confirmation"
                />
              </div>
              <div class="col-12 mb-3">
                <label >الاذن/الادوار</label>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control"
                  v-model="formData.role_name"
                />
              </div>
              <div class="col-12 mb-3">
                <label>الصوره</label>
                <div class="form-group">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                  />
                  <img :src="imageUrl" alt="صورة" />
                </div>
              </div>
              
            </div>
            <div class="text-center">
              <button class="fs-15 btn-save mx-1" type="submit">تعديل</button>
              <button class="fs-15 btn-cancel mx-1" @click="ShowModel = false">
                الغاء
              </button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
  <section class="position-relative" style="height: 100vh;display: grid;
    place-items: center;"
    v-else
   >

<section class="cate">
</section>
 <progress class="pure-material-progress-circular"/> 

   </section>  
</template>
<script>
import crudDataService from "../../Services/crudDataService.js";

export default {
  data() {
    return {
      isDropdownOpen: false,
      ShowModel: false,
      isDropdown: false,
      imageUrl: null,
      item: null,
      formData: {
        name:"",
        email:"",
        password: "",
        password_confirmation: "",
        phone:"",
        image:'',
        role_name:""
      },
      perminlocal: localStorage.getItem("permissions"),

    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
    edit() {
      this.ShowModel = true;
      this.formData.name = this.item.name;
      this.formData.email = this.item.email;
      this.formData.password=this.item.password;
        this.formData.password_confirmation=this.item.password_confirmation;
        this.formData.phone=this.item.phone;
        this.imageUrl=this.item.image
        this.formData.role_name=this.item.role[0].name
       },
    async getPage() {
      const res = await crudDataService.get(
        "admins",
        `${this.$route.params.id}`
      );
      this.item = res.data.data;
    },
    async update() {
      let res = await crudDataService.create(
        `admins/${this.$route.params.id}?_method=put`,
        this.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.isDropdownOpen=false
      this.getPage();
      this.ShowModel = false;
    },
  },
  mounted() {
    this.getPage();
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
  background-image: linear-gradient(to right, #E66239, #E66239) !important;
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
