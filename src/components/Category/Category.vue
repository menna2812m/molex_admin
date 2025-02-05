<template>
  <div dir="rtl">
    <AddCategory
      @customEvent="handleCustomEvent"
      v-if="perminlocal.includes('categories-store')"
    />
    <section
      class="position-relative"
      style="height: 100vh; display: grid; place-items: center"
      v-if="loading"
    >
      <section class="cate"></section>
      <progress class="pure-material-progress-circular" />
    </section>
    <section v-else>
      <vue-good-table
        v-if="rows && rows.length > 0"
        :columns="filteredColumns"
        :rows="rows"
        :search-options="{ enabled: true }"
        :group-options="{ enabled: false }"
      
        :pagination-options="{
  enabled: true,
  mode: 'fixed',
  rowsPerPage: 10,
  rowsPerPageLabel: 'عدد الصفوف',
}"
        :compactMode="true"
        :rtl="true"
      >
        <template #table-row="props">
          <span v-if="props.column.field === 'image'" class="imgetext">
            <img
              :src="props.formattedRow[props.column.field]"
              class="imagetable"
            />
          </span>
          <span v-if="props.column.field == 'actions'">
            <button
              class="btn btn-info me-2"
              @click="view(props.row.id)"
              v-if="perminlocal.includes('categories-show')"
            >
              <i class="si si-eye"></i>
            </button>
            <button
              class="btn btn-primary me-2"
              @click="edit(props.row)"
              v-if="perminlocal.includes('categories-update')"
            >
              <i class="fe fe-edit-2"></i>
            </button>

            <button
              class="btn btn-danger me-2"
              v-if="perminlocal.includes('categories-destroy')"
              @click="del(props.row.id, props.index, props.row.name)"
            >
              <i class="fe fe-trash"></i>
            </button>
            <label
              class="custom-switch justify-content-center"
              v-if="perminlocal.includes('categories-toggle')"
            >
              <input
                type="checkbox"
                name="custom-switch-checkbox"
                class="custom-switch-input"
                :checked="props.row.is_active"
                @change="toggleactive(props.row.id)"
              />
              <span class="custom-switch-description"> </span>
              <span
                class="custom-switch-indicator"
                style="background: #9fa8b8"
              ></span>
            </label>
          </span>
        </template>
      </vue-good-table>

      <section
        class="position-relative"
        style="height: 100vh; display: grid; place-items: center"
        v-else
      >
        <div
          style="background: #e66239; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد اقسام حتي الان
        </div>
      </section>
    </section>

    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModelEdit"
        hide-footer
        title="تعديل القسم"
      >
        <div class="row">
          <div class="col-lg-12">
            <form ref="anyName" @submit.prevent="update">
              <div class="mt-1">
                <label>الاسم عربي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.name.ar"
                  class="form-control"
                />
              </div>
              <div class="mt-1">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.name.en"
                  class="form-control"
                />
              </div>
              <div class="mt-1">
                <label>الوصف عربي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.ar"
                  class="form-control"
                />
              </div>
              <div class="mt-1">
                <label>الوصف انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.en"
                  class="form-control"
                />
              </div>
              <div class="mt-3">
                <label>الصوره</label>
                <div class="pos-relative overflow-hidden">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                  />
                  <!-- <p
                    class="pos-absolute mb-0 bg-white overflow-y-auto w-75"
                    v-if="changeedit"
                    style="top: 5px; left: 15px; height: 30px"
                  >
                     {{ textimage }} 
                  </p> -->
                </div>
                <img
                  :src="imageUrl"
                  alt="صورة"
                  style="width: 180px; height: 180px; object-fit: fill"
                  class="m-1"
                />
              </div>

              <button class="btn btn-primary m-auto d-block">تعديل</button>
            </form>
          </div>
        </div>
      </b-modal>
    </teleport>
  </div>
</template>

<script>
import crudDataService from "../../Services/crudDataService.js";
import AddCategory from "../Category/AddCategory.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    AddCategory,
  },
  data() {
    return {
      textimage: "",
      changeedit: true,

      ShowModelEdit: false,
      imageUrl: null,
      columns: [
        {
          label: "الإسم",
          field: "name.ar",
        },
        {
          label: "الوصف",
          field: "description.ar",
        },
        {
          label: "الصوره",
          field: "image",
        },

        {
          label: "فعل",
          field: "actions",
        },
      ],
      rows: [],
      formData: {
        name: {
          ar: "",
          en: "",
        },
        image: "",
        description: {
          ar: "",
          en: "",
        },
      },
      id: null,
      loading: false,
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    async toggleactive(id) {
      let res = await crudDataService.create(`categories/${id}/toggle`, "");
      console.log(res.data);
      
      const toast = useToast();
      if (res.data.status) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    view(id) {
      console.log(id);
      this.$router.push({ name: "ViewCategory", params: { id } });
    },
    handleCustomEvent(data) {
      console.log("Event received with data:", data);
      this.rows = data;
    },
    async getcategories() {
      this.loading = true; // Start loading
      try {
        let res = await crudDataService.getAll("categories");
        if (res.data && res.data.data && res.data.data.data) {
          this.rows = res.data.data.data.map((category) => {
            console.log(category);
            return { ...category };
          });
        } else {
          console.error("Invalid response structure", res);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
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
    async edit(data) {
      console.log(data);
      this.id = data.id;
      this.ShowModelEdit = true;
      this.formData.name.ar = data.name.ar;
      this.formData.name.en = data.name.en;
      this.formData.description.ar = data.description.ar;
      this.formData.description.en = data.description.en;
      this.formData.image = data.image;
      (this.textimage = data.image),
        (this.formData.image = this.onFileSelected(data.image));
      this.imageUrl = data.image;
    },
    async update() {
      const toast = useToast();
      let res = await crudDataService
        .create(`categories/${this.id}?_method=put`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.ShowModelEdit = false;
          this.getcategories()
          const toast = useToast();
          toast.success(res.data.message, {
            position: "top-center",
            timeout: 5000,
          });
        }).catch((error) => {
          // this.ShowModeledit = false;          
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
    del(data, index, name) {
      this.$swal
        .fire({
          title: ` ؟"${name.ar}" هل تريد حذف قسم`,
           showCancelButton: true,
          confirmButtonText: "نعم",
          cancelButtonText: "إلغاء", // ✅ Add cancel button text
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal.fire({
            title: "تم الحذف بنجاح!",
            icon: "success",
            confirmButtonText: "تم", // ✅ Custom OK button text
          });
         
          }
        });
        crudDataService.delete("categories", `${data}`).then(() => {
          this.rows.splice(index, 1);
          });
    },
  },
  computed: {
    filteredColumns() {
      if (
        !this.perminlocal.includes("categories-show") ||
        !this.perminlocal.includes("categories-update") ||
        !this.perminlocal.includes("categories-destroy")
      ) {
        return this.columns?.length ? this.columns : [];
      }
      return this.columns;
    },
  },
  mounted() {
    this.getcategories();
  },
};
</script>
<style lang="scss">
.imagetable {
  width: 200px !important;
  height: 200px !important;
}
.imagesub {
  width: 100px;
}
.vgt-wrap.rtl .vgt-table thead th,
.vgt-wrap.rtl .vgt-table.condensed thead th {
  padding-right: 1.5rem;
}
.vgt-wrap__footer .footer__row-count::after {
  left: 0;
  right: auto;
}
.vgt-wrap__footer .footer__navigation {
  display: none;
}
input::file-selector-button {
  background-image: linear-gradient(to right, #e66239, #e66239) !important;
}
.imgetext + span {
  display: none;
}
.tableabot tr td {
  padding-right: 50px;
}
.tableabot th {
  width: 120px;
}
table.vgt-table td {
  vertical-align: middle;
}

.vgt-table th.vgt-row-header {
  background-color: #dcdfe69c !important;
}
.custom-switch-input:checked ~ .custom-switch-indicator {
  background: #fb99bf !important;
}
</style>
