<template>
  <div class="row mb-0 mt-5 pt-5">
    <div
      class="card border-0 m-1"
      style="width: 14rem; cursor: pointer"
      v-for="(item, i) in items"
      :key="i"
    >
      <button
        class="btn me-2"
        @click="del(item.id, i, item.name)"
        v-if="perminlocal.includes('groups-destroy')"
      >
        <i class="fe fe-trash text-danger"></i>
      </button>
      <div class="card-body text-center" @click="singlegroup(item.id)">
        <img
          :src="item.image"
          style="width: 35px; height: 35px"
          class="rounded-50"
          alt=""
        />
        <h5 class="card-title mt-3">{{ item.name }}</h5>
        <h6 class="card-subtitle mb-2 text-secondary">
          ({{ item.users.length }}) عميل
        </h6>
      </div>
    </div>

    <div
      class="card border-0 m-1"
      style="width: 14rem; cursor: pointer"
      @click="ShowModel = true"
    >
      <div
        class="card-body text-center d-flex flex-column align-items-center justify-content-center"
        v-if="perminlocal.includes('groups-store')"
      >
        <i class="fe fe-plus icon_color_2 icon_color"></i>
        <h5 class="card-title mt-3">مجموعة جديدة</h5>
      </div>
    </div>
    <teleport to="body" class="overflow-auto">
      <b-modal
        id="add-page"
        title="مجموعة جديدة"
        v-model="ShowModel"
        hide-footer
        class="overflow-auto"
      >
        <div class="mt-2 pos-relative" style="z-index: 5555">
          <form @submit.prevent="add">
            <div class="row">
              <div class="col-12 mb-2">
                <label>الاسم</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="اسم المجموعة "
                  class="form-control"
                  v-model="formData.name.ar"
                />
              </div>
              <div
                class="col-md-6 mb-2"
                v-for="(con, ii) in formData.condition"
                :key="ii"
              >
                <label>
                  {{ con.title }}
                </label>

                <Multiselect
                  v-if="Array.isArray(con.values)"
                  class="mb-1"
                  label="name"
                  :searchable="true"
                  :options="con.values"
                  placeholder="النوع"
                  v-model="con.values"
                />
                <input
                  v-else
                  :type="con.values"
                  name=""
                  id=""
                  :placeholder="con.values"
                  class="form-control"
                  v-model="con.values"
                />
              </div>

              <div class="col-12 mb-2">
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
              <button class="fs-15 btn-save mx-1" type="submit">اضافة</button>
              <button class="fs-15 btn-cancel mx-1" @click="ShowModel = false">
                الغاء
              </button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>
  </div>
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
      ShowModel: false,
      items: [],
      conditions: [],
      imageUrl: null,
      formData: {
        name: {
          ar: "",
        },
        image: "",
        condition: [],
      },
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    anyone(e) {
      console.log(e);
    },
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
    async condition() {
      let res = await crudDataService.getAll("groups-conditions");
      this.conditions = res.data.data;
      this.formData.condition = this.conditions;
    },
    async getallgroups() {
      let res = await crudDataService.getAll("groups");
      this.items = res.data.data.data;
    },
    singlegroup(id) {
      if (this.perminlocal.includes("groups-show")) {
        this.$router.push({ name: "SingleGroup", params: { id } });
      }
    },
    async add() {
      this.ShowModel = false;
      console.log(this.formData);
      let res = await crudDataService.create(`groups`, this.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.getallgroups();
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف المجموعة`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal.fire({
              title: "تم الحذف بنجاح!",
              icon: "success",
              confirmButtonText: "تم", // ✅ Custom OK button text
            });
            crudDataService.delete("groups", `${data}`).then(() => {
              this.items.splice(index, 1);
            });
          }
        });
    },
  },
  mounted() {
    this.condition();
    this.getallgroups();
  },
};
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0px 3px 3px 0px #e6edf0;
}
.icon_color {
  display: inline;
  padding: 12px;
  border-radius: 50%;
  &.icon_color_2 {
    color: #929aff;
    background: #e7faff;
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
  left: 39%;
  box-shadow: 0px 3px 3px 0px #e6edf0;
  border-radius: 3px;
  a {
    cursor: pointer;
  }
}
input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}
</style>
