<template>
  <div dir="rtl">
    <AddCategory
      @customEvent="handleCustomEvent"
      v-if="perminlocal.includes('categories-store')"
    />

    <!-- Toggle Switch for Tree/Flat View -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center">
        <label class="me-3">عرض الأقسام:</label>
        <div class="btn-group" role="group">
          <input
            type="radio"
            class="btn-check"
            name="viewMode"
            id="flatView"
            :checked="!isTreeView"
            @change="toggleView(false)"
          />
          <label class="btn btn-outline-primary" for="flatView">
            <i class="fe fe-list"></i> عرض مسطح
          </label>

          <input
            type="radio"
            class="btn-check"
            name="viewMode"
            id="treeView"
            :checked="isTreeView"
            @change="toggleView(true)"
          />
          <label class="btn btn-outline-primary" for="treeView">
            <i class="fe fe-git-branch"></i> عرض شجري
          </label>
        </div>
      </div>
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
      <!-- Tree View -->
      <div
        v-if="isTreeView && treeData && treeData.length > 0"
        class="tree-view"
      >
        <div class="tree-container">
          <TreeNode
            v-for="category in treeData"
            :key="category.id"
            :category="category"
            :perminlocal="perminlocal"
            @edit="edit"
            @delete="del"
            @view="view"
            @toggle="toggleactive"
          />
        </div>
      </div>

      <!-- Flat Table View -->
      <vue-good-table
        v-else-if="!isTreeView && rows && rows.length > 0"
        :columns="filteredColumns"
        :rows="rows"
        :search-options="{ enabled: true }"
        :group-options="{ enabled: false }"
        :pagination-options="{
          enabled: true,
          perPageDropdownEnabled: false,
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
          style="background: #fd601f; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد اقسام حتي الان
        </div>
      </section>

      <b-pagination
        v-if="!isTreeView"
        v-model="page"
        :total-rows="last"
        :per-page="1"
        @click="paginag(page)"
        class="justify-content-end mt-4"
      ></b-pagination>
    </section>

    <!-- Modal for editing -->
    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModelEdit"
        hide-footer
        title="تعديل القسم"
        modal-class="category-model"
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
                  @input="clearFieldError('name.ar')"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      hasFieldError('name.ar') || hasFieldError('name'),
                  }"
                />
                <div
                  v-if="hasFieldError('name.ar') || hasFieldError('name')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("name.ar") || getFieldError("name") }}
                </div>
              </div>

              <div class="mt-1">
                <label>الاسم انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.name.en"
                  @input="clearFieldError('name.en')"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      hasFieldError('name.en') || hasFieldError('name'),
                  }"
                />
                <div
                  v-if="hasFieldError('name.en') || hasFieldError('name')"
                  class="invalid-feedback"
                >
                  {{ getFieldError("name.en") || getFieldError("name") }}
                </div>
              </div>

              <div class="mt-1">
                <label>الوصف عربي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.ar"
                  @input="clearFieldError('description.ar')"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      hasFieldError('description.ar') ||
                      hasFieldError('description'),
                  }"
                />
                <div
                  v-if="
                    hasFieldError('description.ar') ||
                    hasFieldError('description')
                  "
                  class="invalid-feedback"
                >
                  {{
                    getFieldError("description.ar") ||
                    getFieldError("description")
                  }}
                </div>
              </div>

              <div class="mt-1">
                <label>الوصف انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.description.en"
                  @input="clearFieldError('description.en')"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      hasFieldError('description.en') ||
                      hasFieldError('description'),
                  }"
                />
                <div
                  v-if="
                    hasFieldError('description.en') ||
                    hasFieldError('description')
                  "
                  class="invalid-feedback"
                >
                  {{
                    getFieldError("description.en") ||
                    getFieldError("description")
                  }}
                </div>
              </div>

              <div class="mt-3">
                <label>الصوره</label>
                <div class="pos-relative overflow-hidden">
                  <input
                    type="file"
                    @change="onFileSelected"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('image') }"
                  />
                  <div v-if="hasFieldError('image')" class="invalid-feedback">
                    {{ getFieldError("image") }}
                  </div>
                </div>
                <img
                  :src="imageUrl"
                  alt="صورة"
                  style="width: 180px; height: 180px; object-fit: fill"
                  class="m-1"
                  v-if="imageUrl"
                />
              </div>

              <button
                class="btn btn-primary m-auto d-block"
                :disabled="isLoading"
              >
                <span v-if="isLoading">جاري الحفظ...</span>
                <span v-if="!isLoading"> تعديل </span>
              </button>
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
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";
import { useToast } from "vue-toastification";
import TreeNode from "./TreeNode.vue";

export default {
  components: {
    AddCategory,
    TreeNode,
  },
  mixins: [FormErrorMixin],
  data() {
    return {
      textimage: "",
      changeedit: true,
      ShowModelEdit: false,
      imageUrl: null,
      page: 1,
      last: 2,
      isTreeView: false,
      treeData: [],
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
      isLoading: false,
      watchedFields: [
        "formData.name.ar",
        "formData.name.en",
        "formData.description.ar",
        "formData.description.en",
      ],
    };
  },
  methods: {
    toggleView(isTree) {
      this.isTreeView = isTree;
      if (isTree && this.treeData.length === 0) {
        this.getCategoriesTree();
      } else if (!isTree && this.rows.length === 0) {
        this.getcategories();
      }
    },

    async toggleactive(id) {
      let res = await crudDataService.create(`categories/${id}/toggle`, "");
      const toast = useToast();
      if (res.data.status) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
        // Refresh current view
        if (this.isTreeView) {
          this.getCategoriesTree();
        } else {
          this.getcategories();
        }
      }
    },

    view(id) {
      this.$router.push({ name: "ViewCategory", params: { id } });
    },

    handleCustomEvent(data) {
      this.rows = data;
    },

    async getcategories() {
      this.loading = true;
      try {
        let res = await crudDataService.getAll("categories");
        this.last = res.data.data.last_page;

        if (res.data && res.data.data && res.data.data.data) {
          this.rows = res.data.data.data.map((category) => {
            return { ...category };
          });
        } else {
          console.error("Invalid response structure", res);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        this.loading = false;
      }
    },

    async getCategoriesTree() {
      this.loading = true;
      try {
        let res = await crudDataService.getAll("categories/tree");

        if (res.data && res.data.data) {
          this.treeData = res.data.data;
        } else {
          console.error("Invalid tree response structure", res);
        }
      } catch (error) {
        console.error("Failed to fetch tree data:", error);
      } finally {
        this.loading = false;
      }
    },

    async paginag(p) {
      let res = await crudDataService.getAll(`categories?page=${this.page}`);
      this.rows = res.data.data.data;
    },

    onFileSelected(event) {
      this.clearFieldError("image");
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
      this.id = data.id;
      this.ShowModelEdit = true;
      this.clearAllErrors();

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
      this.isLoading = true;
      const toast = useToast();
      this.clearAllErrors();

      const validationRules = {
        "name.ar": { required: true, label: "الاسم بالعربية" },
        "name.en": { required: true, label: "الاسم بالإنجليزية" },
        "description.ar": { required: true, label: "الوصف بالعربية" },
        "description.en": { required: true, label: "الوصف بالإنجليزية" },
        image: { maxSize: 2048, label: "الصورة" },
      };

      if (!this.validateForm(validationRules)) {
        this.isLoading = false;
        return;
      }

      try {
        const res = await crudDataService.create(
          `categories/${this.id}?_method=put`,
          this.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.isLoading = false;
        this.ShowModelEdit = false;

        // Refresh current view
        if (this.isTreeView) {
          this.getCategoriesTree();
        } else {
          this.getcategories();
        }

        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        this.isLoading = false;
        this.handleApiErrors(error, toast);
      }
    },

    del(data, index, category) {
      const name = category.name || category.name?.ar || "هذا القسم";
      this.$swal
        .fire({
          title: ` ؟"${name}" هل تريد حذف قسم`,
          showCancelButton: true,
          confirmButtonText: "نعم",
          cancelButtonText: "إلغاء",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("categories", `${data}`)
              .then(() => {
                this.$swal.fire({
                  title: "تم الحذف بنجاح!",
                  icon: "success",
                  confirmButtonText: "تم",
                });

                // Refresh current view
                if (this.isTreeView) {
                  this.getCategoriesTree();
                } else {
                  this.getcategories();
                }
              })
              .catch((error) => {
                this.$swal.fire({
                  title: "حدث خطأ أثناء الحذف!",
                  text: error.data.message,
                  icon: "error",
                  confirmButtonText: "موافق",
                });
              });
          }
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
.category-model {
  &.fade .modal-dialog {
    transform: none !important;
  }
  &.show .modal-dialog {
    transform: none !important;
  }
}

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
  display: none !important;
}

input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
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

.btn-check:checked + .btn {
  background-color: #fd601f;
  border-color: #fd601f;
  color: white !important;
}
</style>
