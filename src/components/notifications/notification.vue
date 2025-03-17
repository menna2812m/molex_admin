<template>
  <section class="mt-5">
    <div class="pos-relative">
      <button @click="ShowModel = true" class="btn-add me-0 mb-4" 
      v-if="perminlocal.includes('special-offer-store')"
      >
        <i class="fe fe-plus"></i>
        اشعار جديد
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
          class="table-responsive border-0 rounded border-bottom-0 mb-0"
        >
          <table class="table  table-bordered text-nowrap text-md-nowrap mg-b-0">
            <tr>
              <td class="text-muted">صورة الاشعار</td>
              <td class="text-muted">عنوان الاشعار</td>
              <td class="text-muted">تفاصيل الاشعار</td>
            </tr>
            <tr
              v-for="(item, index) in myList"
              :key="index"
              class="list_item py-3 w-100 align-items-center justify-content-between"
            >
              <td>
                <img :src="item.image" alt="" width="150" height="150" class="rounded-circle"/>
              </td>
              <td>
                {{ item.title.ar }}
              </td>
              <td>
                {{ item.body.ar }}
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
          style="background: #E66239; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد اشعارات حتي الان
        </div>
      </section>
    </section>
    <teleport to="body">
      <b-modal id="add" v-model="ShowModel" hide-footer title="اضافة اشعار">
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="add">
            <div class="row">
              <div class="col-md-6">
                <div class="mt-1">
                  <label for="">العنوان عربي </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.title.ar"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label for="">العنوان انجليزي </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.title.en"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label for="">التفاصيل عربي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.body.ar"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label for="">التفاصيل انجليزي</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.body.en"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mt-1">
                  <label for="">الصورة</label>
                  <input
                    type="file"
                    class="form-control"
                    @change="onFileSelected($event)"
                    accept=".pdf, image/jpeg, image/png"
                  />
                  <img
                    :src="imgurl"
                    style="width: 180px; height: 180px; object-fit: fill"
                    class="m-1"
                    v-if="imgurl.length > 0"
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
  
    <b-pagination
      v-model="page"
      :total-rows="last"
      :per-page="1"
      @click="paginag(page)"
      class="justify-content-end"
     
    ></b-pagination>
  </section>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
        page: 1,
      last: 2,
      ShowModel: false,
      myList: [],
      id: null,
      imgurl: [],
      formData: {
        title: {
          ar: "",
          en: "",
        },
        body: {
          ar: "",
          en: "",
        },
        image: "",
      },
      loading: false,
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imgurl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
  
    async notification() {
      this.loading = true; // Start loading
      try {
        let res = await crudDataService.getAll("special-offer");
      this.myList = res.data.data.data;
      this.last = res.data.data.last_page;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
      
    },
    async paginag(p) {
      console.log(p);
      let res = await crudDataService.getAll(`special-offer?page=${this.page}`);
      this.myList = res.data.data.data;
    },
    async add() {
      let res = await crudDataService
        .create(`special-offer`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.notification();
          this.ShowModel = false;
          console.log(this.formData.image);
          (this.formData.title.ar = ""),
            (this.formData.title.en = ""),
            (this.formData.body.ar = ""),
            (this.formData.body.en = ""),
            this.imgurl='',
            (this.formData.image = "");

        })
        .catch((error) => {
          // this.ShowModel = false;

          console.error(error);
        });
    },
  },
  mounted() {
    this.notification();
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
