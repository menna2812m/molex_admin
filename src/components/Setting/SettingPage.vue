<template>
  <section class="mt-5 pt-5" v-if="items.length > 0 ">
    <div class="card pb-3 border-1">
      <div
        class="card-header pb-2 d-flex align-items-center justify-content-between"
      >
        <h4 class="mb-0">
          الاسم:
          {{ $route.params.page }}
        </h4>
        <div class="pos-relative">
          <button
            @click="toggleDropdown"
            class="twobtn bg-white border"
            style="border-color: #E66239 !important; color: #E66239"
            v-if="perminlocal.includes('pages-update')">
            خيارات الصفحة <i class="fas fa-caret-down ms-1"></i>
          </button>

          <div class="text-start dropend mt-1" v-if="isDropdownOpen">
            <a class="dropdown-item" @click="edit()">تعديل الصفحة </a>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div v-for="(item, i) in items" :key="i" class="border rounded mb-2 p-2">
        
          <!-- <img
            :src="item.image"
            style="width: 50px; height: 50px;"
            class="rounded-40"
            alt=""
            v-if="item.banner"
          /> -->
          <p class="mb-0 p-2">
            {{ item.display_name }}
            :
            {{ item.value?.ar || item.value?.en ? item.value?.ar : item.value }}
            <!-- {{ item.value ? item.value  :  item.value.ar}} -->
          </p>
          <img
            :src="item.image"
            style="width: 50px; height: 50px;"
            class="rounded-40"
            alt=""
            v-if="item.type=='image'"
          />
        </div>
      </div>
    </div>
    <teleport to="body">
      <b-modal id="add-page" v-model="ShowModel" hide-footer>
        <div class="mt-4 pt-1 pos-relative" style="z-index: 5555">
          <h6 style="color: #febcd5" class="text-center">تعديل الصفحة</h6>
          <form @submit.prevent="update">
            <!-- <div class="row">
              <div class="col-md-6" v-for="(form, key) in formData" :key="key">
                <div class="mt-1">
                  <label >
                    {{ form.name }}
                  </label>

                  <input
                    type="file"
                    class="form-control"
                    @change="onFileSelected($event, form.value)"
                    accept=".pdf, image/jpeg, image/png"
                    v-if="form.type == 'image'"
                  />
                  <label  v-if="typeof form.value === 'object'"
                    >عربي
                  </label>
                  <input
                    v-if="typeof form.value === 'object'"
                    :type="form.type"
                    class="form-control"
                    v-model="form.value.ar"
                  />
                  <label  v-if="typeof form.value === 'object'">
                    انجليزي
                  </label>
                  <input
                    v-if="typeof form.value === 'object'"
                    :type="form.type"
                    class="form-control"
                    v-model="form.value.en"
                  />

                  <input
                    :type="form.type"
                    class="form-control"
                    v-model="form.value"
                    v-else
                  />
                </div>
              </div>
            </div> -->
            <div class="row">
            <div class="col-md-6" v-for="(form, key) in formData" :key="key">
        <div class="mt-1">
          <div v-if="form.type === 'image'">
          <label>{{ form.name }}</label>
          <div class="pos-relative overflow-hidden">

            <input type="file" class="form-control" @change="onFileSelected($event, key)" accept=".pdf, image/jpeg, image/png"  />
            <p class="pos-absolute mb-0 bg-white overflow-scroll h-75 w-50" v-if="isString(form.image)" style="top: 5px;
    left: 5px;
  ">
  {{ form.image }}</p>
  </div>
          </div>
          <div v-else-if="form.type === 'banner'">
            <div v-if="typeof form.value === 'object'">
          <label class="d-block"> {{ form.name }} </label> 
          <!-- <input type="file" class="form-control" @change="onFileSelected($event,key)" accept=".pdf, image/jpeg, image/png"  /> -->

            <label> عربي </label>
            <input :type="form.type" class="form-control" v-model="form.value.ar" />
            <label>انجليزي</label>
            <input :type="form.type" class="form-control" v-model="form.value.en" />
          </div>
          <div v-else >
            <label>{{ form.name }}</label>
            <input :type="form.type" class="form-control" v-model="form.value" />

          </div>

      
          </div>
          <div v-else>
            <div v-if="typeof form.value === 'object'">
          <label class="d-block"> {{ form.name }} </label> 
            <label> عربي </label>
            <input :type="form.type" class="form-control" v-model="form.value.ar" />
            <label>انجليزي</label>
            <input :type="form.type" class="form-control" v-model="form.value.en" />
          </div>
          <div v-else >
            <label>{{ form.name }}</label>
            <input :type="form.type" class="form-control" v-model="form.value" />

          </div>

      
          </div>
           </div>
      </div>
      </div>
            <button class="btn btn-primary m-auto d-block mt-2" type="submit">
              تعديل
            </button>
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
      items: [],
      ShowModel: false,
      formData: {},
      imageUrl: null,
    perminlocal : localStorage.getItem('permissions'),
    textimage:'',

    };
  },
  methods: {
    isString(value) {
    return typeof value === 'string';
  },
//     onFileSelected(event, data) {
//       console.log(data);
//       const files = event.target.files;
//       Array.from(files).forEach((file) => {
//         data=[]
//         data.push(file);
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         console.log(file);  
//         data=file;
//       console.log(data);

// //         for (let key in this.formData) {
// //           if (key == `favicon`) {
// //            this.formData.favicon.image=[]
// //            this.formData.favicon.image.push(file);

// //           }  
// // }
//       });
//     },
async onFileSelected(event, key) {
  const files = event.target.files;
  if (files.length === 0) {
    return; // No file selected
  }

  const file = files[0]; // Assuming single file selection
  try {
    // const fileData = await this.readFileAsDataURL(file);
    this.formData[key].image =file; // Direct assignment
    console.log(this.formData);
  } catch (error) {
    console.error("Error reading file:", error);
    // Handle file reading error
  }
},
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    async onepage() {
      let res = await crudDataService.getAll(
        `settings?page=${this.$route.params.page}`
      );
      this.items = res.data.data;
      this.items.forEach((ele) => {
        this.formData[ele.key] = {
          name: ele.display_name,
          image:ele.image,
          value:
            ele.translated == 1
              ? { ar: ele.value.ar, en: ele.value.en }
              : ele.value ,
          type: ele.type,
        };
      });
    },
    edit() {
      this.ShowModel = true;
      console.log(this.formData);
    },
    async update() {
      console.log(this.formData);
      let res = await crudDataService.create(`settings`, this.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(this.formData);
      this.onepage();
      this.ShowModel = false;
    },
  },
  mounted() {
    this.onepage();
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
#add-page {
  overflow-y: auto;
}
</style>
