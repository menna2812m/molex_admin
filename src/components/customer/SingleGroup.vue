<template>
  <section>
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <img :src="item.image" alt="" width="100"/>
            <h4 class="mb-0">
              {{ item.name?item.name.ar:'' }}
            </h4>
            <div class="pos-relative">
              <button
                @click="toggleDropdown"
                class="twobtn bg-white border"
                style="border-color: #E66239 !important; color: #E66239"
                v-if="perminlocal.includes('groups-update')"
              
              >
                خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
              </button>

              <div class="text-start dropend mt-1" v-if="isDropdownOpen">
                <a class="dropdown-item" @click="edit(item)">تعديل المجموعة </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <h5>الخيارات :</h5>
              <div v-if="item.conditions">
                <ul>

                  <li v-for="(con, i) in item.conditions" :key="i">
                    {{ con.type?con.type:''}}
                    {{ con.min_value?con.min_value:''}}
                    {{ con.operator?con.operator:''}}
                    {{ con.value?con.value:''}}
                    {{ con.max_value?con.max_value:''}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">تعديل المجموعة</h6>
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-6 mb-3">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control"
                  v-model="formData.name.ar"
                />
              </div>
              <div class="col-6 mb-3">
                <label>
                  الاسم انجليزي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control"
                  v-model="formData.name.en"
                />
              </div>
              <div
                class="col-md-6 mb-2"
                v-for="(con, ii) in formData.condition"
                :key="ii"
              >
        
                <label>{{ con.title?con.title:con.type }}</label>
                <input
                v-if="con.min_value"
                type="text"
                  name=""
                  id=""
                  class="form-control my-1"
                  v-model="con.min_value"
                />
                <input
                v-if="con.min_value"
                  type="text"
                  name=""
                  id=""
                  class="form-control my-1"
                  v-model="con.max_value"
                /> 
                <input
                v-else
                 type="text"
                  name=""
                  id=""
                  class="form-control"
                  v-model="con.value"
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
</template>
<script>
import crudDataService from "../../Services/crudDataService.js";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      isDropdownOpen: false,
      ShowModel: false,
      isDropdown: false,
      imageUrl: null,
      item: "",
      formData: {
        name: {
          ar: "",
          en:""
        },
        image: "",
        condition: [],
      },
      conditions:[],
      perminlocal : localStorage.getItem('permissions')

    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
 
    onFileSelected(event) {
      console.log(event);
      if (event.target) {
        this.changeedit = false;

        this.formData.image = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(this.formData.image);
      } else {
        this.changeedit = true;

        this.formData.image = event;
      }
    },
    async condition() {
      let res = await crudDataService.getAll("groups-conditions");
      this.conditions = res.data.data;
      console.log(this.conditions);
    },
    async edit(data) {
      this.ShowModel = true;
      console.log(data);
      
      this.formData.name.ar = data.name.ar;
      this.formData.name.en = data.name.en;
      this.formData.condition = data.conditions;
      this.formData.image = data.image;   
      (this.formData.image = this.onFileSelected(data.image));

    },
    async getPage() {
      const res = await crudDataService.get(
        "groups",
        `${this.$route.params.id}`
      );
      this.item = res.data.data;
      console.log(this.item);
    },
    async update() {
      console.log(this.formData);
      const toast = useToast(); 

      let res = await crudDataService.create(
        `groups/${this.$route.params.id}?_method=put`,
        this.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          
        }
      ).then((res)=>{
        this.getPage();
        this.ShowModel = false;
        const toast = useToast(); 
   toast.success(res.data.message, {
     position: "top-center",
     timeout: 5000,
   }) 
      }) .catch((error) => {
          // this.ShowModel = false;          

        
        const errorData = error?.data?.errors || {};
        console.log(error);
        
        const errorMessages = Object.values(errorData).flat().filter((msg) => typeof msg === "string");

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
      })
      
    },
  },
  mounted() {
    this.getPage();
    this.condition();
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
