<template>
  <section v-if="item">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <div class="mb-0 d-flex align-items-center">
              <img
                :src="item.image"
                alt=""
                style="width: 150px; height: 150px; border-radius: 50%"
              />
              <h4 class="ms-2">{{ item.name ? item.name.ar : "" }}:</h4>
              <span class="fs-6 text-muted">
                ({{ item.slug ? item.slug.ar : "" }})
              </span>
            </div>
            <div class="pos-relative">
              <button
                @click="toggleDropdown"
                class="twobtn bg-white border"
                style="border-color: #E66239 !important; color: #E66239"
              >
                خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
              </button>

              <div class="text-start dropend mt-1" v-if="isDropdownOpen">
                <a class="dropdown-item" @click="edit()">تعديل البراند </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <h5>
                الوصف :
                {{ item.description ? item.description.ar : "" }}
              </h5>
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
          <h6 style="color: #febcd5" class="text-center">تعديل البراند</h6>
          <form @submit.prevent="update">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="اسم البراند "
                  class="form-control"
                  v-model="formData.name.ar"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="brand"
                  class="form-control"
                  v-model="formData.name.en"
                />
              </div>
              <div class="col-12 mb-3">
                <label> وصف الماركه عربي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="وصف البراند "
                  class="form-control"
                  v-model="formData.description.ar"
                />
              </div>
              <div class="col-12 mb-3">
                <label>وصف الماركه انجليزي</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="description"
                  class="form-control"
                  v-model="formData.description.en"
                />
              </div>
              <div class="mt-3 col-12 mb-3">
                <label>الصوره</label>
                <div class="pos-relative overflow-hidden">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                  />
                  <p
                    class="pos-absolute mb-0 bg-white overflow-y-auto w-75"
                    v-if="changeedit"
                    style="top: 5px; left: 15px; height: 30px"
                  >
                    {{ textimage }}
                  </p>
                </div>
                <img
                  :src="imageUrl"
                  alt="صورة"
                  style="width: 180px; height: 180px; object-fit: fill"
                  class="m-1"
                />
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
import crudDataService from "../../Services/crudDataService.js";

export default {
  data() {
    return {
      textimage: "",
      changeedit:true,

      isDropdownOpen: false,
      ShowModel: false,
      isDropdown: false,
      imageUrl: null,
      item: null,
      formData: {
        name: {
          ar: "",
        },
        description: {
          ar: "",
        },
        image: "",
      },
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
    edit() {
      this.ShowModel = true;
      this.formData.name.ar = this.item.name.ar;
      this.formData.name.en = this.item.name.en;
      this.formData.description.ar = this.item.description.ar;
      this.formData.description.en = this.item.description.en;
      (this.textimage = this.item.image),
        (this.formData.image = this.onFileSelected(this.item.image));
      this.imageUrl = this.item.image;
    },
    async getPage() {
      const res = await crudDataService.get(
        "brands",
        `${this.$route.params.id}`
      );
      this.item = res.data.data;
    },
    async update() {
      let res = await crudDataService.create(
        `brands/${this.$route.params.id}?_method=put`,
        this.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
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
  background-image: linear-gradient(to right, #E66239) !important;
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
