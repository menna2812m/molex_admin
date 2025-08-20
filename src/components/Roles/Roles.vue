<template>
  <section class="mt-5 pt-5">
    <div
      class="border p-3 mb-3 d-flex justify-content-between align-items-center"
      style="border-radius: 8px"
    >
      <h4 class="mb-0">الأدوار</h4>
      <button
        class="fs-15 btn-add"
        @click="ShowModel = true"
        v-if="perminlocal.includes('roles-store')"
      >
        <i class="fe fe-plus"></i>
        اضافة دور جديد
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
      <div class="card custom-card border-0 mg-b-20" v-if="items.length > 0">
        <div class="card-body p-0">
          <div
            class="table-responsive border-item rounded border-bottom-0 mb-0"
          >
            <table
              class="table table-bordered text-nowrap text-md-nowrap mg-b-0"
            >
              <tr
                v-for="(item, index) in items"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td @click="onerole(item.id)" style="cursor: pointer">
                  {{ item.name }}
                </td>

                <td>
                  <button
                    class="btn me-2"
                    @click="del(item.id, index, item.name)"
                    v-if="perminlocal.includes('roles-destroy')"
                  >
                    <i class="fe fe-trash text-danger"></i>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </section>
    <section
      class="position-relative"
      style="height: 100vh; display: grid; place-items: center"
      v-if="items.length == 0 && !loading"
    >
      <div
        style="background: #fd601f; padding: 30px; font-size: 20px"
        class="w-50 text-center text-white rounded-10"
      >
        لا يوجد ادوار حتي الان
      </div>
    </section>
    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModel"
        hide-footer
        modal-class="roles-model"
        size="lg"
        title="  اضافة دور جديد"
      >
        <div class="modal-content-custom">
          <form @submit.prevent="add" class="role-form">
            <!-- Role Name Section -->
            <div class="form-section">
              <div class="section-header">
                <i class="fe fe-edit-3"></i>
                <h6>معلومات الدور</h6>
              </div>
              <div class="form-group-custom">
                <label class="form-label-custom"
                  >اسم الدور <span class="required">*</span></label
                >
                <input
                  type="text"
                  class="form-control-custom"
                  v-model="formData.name"
                  placeholder="أدخل اسم الدور..."
                  required
                />
              </div>
            </div>

            <!-- Permissions Section -->
            <div class="form-section">
              <div class="section-header">
                <i class="fe fe-shield"></i>
                <h6>الصلاحيات</h6>
              </div>

              <!-- Select All Checkbox -->
              <div class="select-all-container">
                <div class="custom-checkbox">
                  <input
                    type="checkbox"
                    id="selectAll"
                    v-model="selectAll"
                    @change="handleSelectAll"
                    class="custom-checkbox-input"
                  />
                  <label for="selectAll" class="custom-checkbox-label">
                    <span class="checkmark"></span>
                    تحديد جميع الصلاحيات
                  </label>
                </div>
              </div>

              <!-- Permissions Grid -->
              <div class="permissions-grid">
                <div
                  class="permission-group"
                  v-for="(item, key) in permissions"
                  :key="key"
                >
                  <div class="permission-group-header">
                    <h6>{{ item.title }}</h6>
                  </div>
                  <div class="permission-items">
                    <div
                      class="permission-item"
                      v-for="(text, i) in item.permissions"
                      :key="i"
                    >
                      <div class="custom-checkbox">
                        <input
                          type="checkbox"
                          :id="`perm_${key}_${i}`"
                          :value="text.name"
                          v-model="formData.permission"
                          class="custom-checkbox-input"
                        />
                        <label
                          :for="`perm_${key}_${i}`"
                          class="custom-checkbox-label"
                        >
                          <span class="checkmark"></span>
                          {{ text.display_name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-primary-custom" type="submit">
                <i class="fe fe-plus"></i>
                إضافة الدور
              </button>
              <button
                class="btn-secondary-custom"
                type="button"
                @click="closeModal"
              >
                <i class="fe fe-x"></i>
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import { useToast } from "vue-toastification";

import crudDataService from "../../Services/crudDataService.js";
export default {
  data() {
    return {
      loading: false,
      items: [],
      ShowModel: false,
      formData: {
        name: "",
        permission: [],
      },
      permissions: [],
      perminlocal: localStorage.getItem("permissions"),
      selectAll: false,
    };
  },
  methods: {
    async getpermission() {
      this.loading = true;
      const res = await crudDataService.getAll("permissions");
      this.permissions = res.data.data;
    },
    async getroles() {
      this.loading = true; // Start loading

      try {
        const res = await crudDataService.getAll("roles");
        this.items = res.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    onerole(id) {
      if (this.perminlocal.includes("roles-show")) {
        this.$router.push({ name: "SingleRole", params: { id } });
      }
    },
    async add() {
      // Ensure permissions is an array and not empty
      if (!this.formData.name.trim() && this.formData.permission != []) {
        this.$swal.fire({
          title: "خطأ",
          text: "يرجى إدخال اسم الدور",
          icon: "error",
          confirmButtonText: "تم",
        });
        return;
      }

      // Prepare the data to send
      const roleData = {
        name: this.formData.name.trim(),
        permission: this.formData.permission || [],
      };

      try {
        let res = await crudDataService.create(`roles`, roleData);
        this.$swal.fire({
          title: "تم الإضافة بنجاح!",
          icon: "success",
          confirmButtonText: "تم",
        });
        this.getroles();
        this.ShowModel = false;
        // Reset form
        this.formData.name = "";
        this.formData.permission = [];
        this.selectAll = false;
      } catch (error) {
        console.error("Error creating role:", error);
        this.$swal.fire({
          title: "خطأ",
          text: "حدث خطأ أثناء إضافة الدور",
          icon: "error",
          confirmButtonText: "تم",
        });
      }
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name}" هل تريد حذف المسؤول `,
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
            crudDataService.delete("roles", `${data}`).then(() => {
              this.items.splice(index, 1);
            });
          }
        });
    },
    handleSelectAll() {
      if (this.selectAll) {
        this.formData.permission = this.allPermissionNames;
      } else {
        this.formData.permission = [];
      }
    },
    closeModal() {
      this.ShowModel = false;
      this.resetForm();
    },
    resetForm() {
      this.formData.name = "";
      this.formData.permission = [];
      this.selectAll = false;
    },
  },
  watch: {
    selectAll(val) {
      if (val) {
        // When selecting all, set all permissions
        this.formData.permission = [...this.allPermissionNames];
      } else {
        // When deselecting all, clear permissions
        this.formData.permission = [];
      }
    },

    "formData.permission": {
      handler(val) {
        if (this.allPermissionNames.length > 0) {
          this.selectAll = val.length === this.allPermissionNames.length;
        }
      },
      deep: true,
    },
  },
  computed: {
    allPermissionNames() {
      if (!this.permissions || typeof this.permissions !== "object") {
        return [];
      }

      // Convert object to array of permission names
      const result = Object.values(this.permissions).flatMap((group) => {
        return Array.isArray(group.permissions)
          ? group.permissions.map((perm) => {
              return perm.name;
            })
          : [];
      });

      return result;
    },
  },
  async mounted() {
    await this.getpermission(); // Wait for permissions to load
    this.getroles();
  },
};
</script>
<style lang="scss">
.roles-model {
  &.fade .modal-dialog {
    transform: none !important;
  }
  &.show .modal-dialog {
    transform: none !important;
  }

  .modal-dialog {
    max-width: 800px;
    margin: 1.75rem auto;
  }

  .modal-content {
    border: none;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
}

// Modal Header Styles
.modal-header-custom {
  background: linear-gradient(135deg, #fd601f 0%, #ff8a50 100%);
  color: white;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;

  .header-icon {
    background: rgba(255, 255, 255, 0.2);
    width: 45px;
    height: 45px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 20px;
    }
  }

  .modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    flex: 1;
  }

  .btn-close-custom {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }

    i {
      font-size: 16px;
    }
  }
}

.role-form {
  .form-section {
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f1f3f4;

      i {
        color: #fd601f;
        font-size: 18px;
        background: rgba(253, 96, 31, 0.1);
        padding: 8px;
        border-radius: 8px;
      }

      h6 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}

// Form Controls
.form-group-custom {
  margin-bottom: 20px;
}

.form-label-custom {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;

  .required {
    color: #e74c3c;
    margin-left: 3px;
  }
}

.form-control-custom {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e8ecef;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #fd601f;
    box-shadow: 0 0 0 3px rgba(253, 96, 31, 0.1);
  }

  &::placeholder {
    color: #95a5a6;
  }
}

// Select All Container
.select-all-container {
  margin-bottom: 25px;
  padding: 15px;
  border-radius: 10px;
  border: 2px dashed #dee2e6;
}

// Custom Checkbox Styles
.custom-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .custom-checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked ~ .custom-checkbox-label .checkmark {
      background: #fd601f;
      border-color: #fd601f;

      &:after {
        display: block;
      }
    }
  }

  .custom-checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    user-select: none;

    .checkmark {
      width: 20px;
      height: 20px;
      border: 2px solid #bdc3c7;
      border-radius: 4px;
      margin-left: 10px;
      position: relative;
      transition: all 0.3s ease;
      background: white;

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:hover .checkmark {
      border-color: #fd601f;
      background: rgba(253, 96, 31, 0.05);
    }
  }
}

// Permissions Grid
.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.dark-theme {
  .permission-group {
    border: 1px solid #35393d;
  }
}
.permission-group {
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #e9ecef;

  .permission-group-header {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dee2e6;

    h6 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #fd601f;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .permission-items {
    .permission-item {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// Action Buttons
.form-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 2px solid #f1f3f4;

  .btn-primary-custom {
    background: linear-gradient(135deg, #fd601f 0%, #ff8a50 100%);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 140px;
    justify-content: center;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(253, 96, 31, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .btn-secondary-custom {
    background: #6c757d;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 140px;
    justify-content: center;

    &:hover {
      background: #5a6268;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(108, 117, 125, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .roles-model .modal-dialog {
    margin: 0.5rem;
    max-width: none;
  }

  .permissions-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;

    .btn-primary-custom,
    .btn-secondary-custom {
      width: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
.border-item.table-responsive .table > :not(caption) > * > * {
  border-bottom: none !important;
}
#add-page {
  overflow-y: auto;
}
input::file-selector-button {
  background-image: linear-gradient(to right, #fd601f, #fd601f) !important;
}
</style>
