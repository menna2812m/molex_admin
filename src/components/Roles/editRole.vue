<template>
  <section>
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <div class="mb-0 d-flex align-items-center w-50">
              <h3 class="me-3 mb-0 w-50">
                {{ item.name }}
              </h3>
              <input type="text" v-model="formData.name" class="form-control" />
            </div>
          </div>
          <div class="row">
            <div class="col-6" v-for="(item, key) in permissions" :key="key">
              <div class="card-body h-100 border-bottom">
                <div class="pb-3">
                  <h5>
                    {{ item.title }}
                  </h5>
                  <div
                    class="mt-1"
                    v-for="(text, i) in item.permissions"
                    :key="i"
                  >
                    <input
                      type="checkbox"
                      name="vehicle1"
                      :value="text.name"
                      v-model="formData.permission"
                    />
                    <label for="vehicle1" class="mb-0 ms-1">
                      {{ text.display_name }}</label
                    ><br />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mt-4">
            <button class="fs-15 btn-save mx-1" @click="update">تعديل</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import crudDataService from "../../Services/crudDataService.js";

export default {
  data() {
    return {
      item: [],
      formData: {
        name: "",
        permission: [],
      },
      permissions: [],
    };
  },
  methods: {
    async getpermission() {
      const res = await crudDataService.getAll("permissions");
      this.permissions = res.data.data;
    },

    edit() {
      this.ShowModel = true;
      this.formData.name = this.item.name;
    },
    async getPage() {
      const res = await crudDataService.get(
        "roles",
        `${this.$route.params.id}`
      );
      this.item = res.data.data;
      //   console.log(this.permissions);
      //   for (const key in this.permissions) {
      //     console.log("tttt");

      //     for (let i = 0; i < this.item.permissions.length; i++) {
      //       console.log("tttt");
      //       console.log(this.item.permissions[i].name === key.name);
      //       if (this.item.permissions[i].name === key.name) {
      //         console.log("one");
      //       }
      //     }
      //   }
      for (const key in this.permissions) {
        if (this.permissions.hasOwnProperty(key)) {
          // console.log("Processing:", key);
          const permissionGroup = this.permissions[key].permissions;
          for (let i = 0; i < permissionGroup.length; i++) {
            console.log("Checking:", permissionGroup[i].name);
            const hasPermission = this.item.permissions.some(
              (itemPermission) =>
                itemPermission.name === permissionGroup[i].name
            );
            if (hasPermission) {
              console.log("Match found for:", permissionGroup[i].name);
            }
          }
        }
      }
    },

    async update() {
      console.log(this.formData);
      let res = await crudDataService.put(
        `roles/${this.$route.params.id}`,
        this.formData
      );
      this.$router.push({
        name: "SingleRole",
        params: `${this.$route.params.id}`,
      });
    },
  },
  mounted() {
    this.getPage();
    this.getpermission();
  },
};
</script>

<style lang="scss">
input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
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
