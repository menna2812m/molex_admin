<template>
  <section
    class="position-relative"
    style="height: 100vh; display: grid; place-items: center"
    v-if="loading"
  >
    <section class="cate"></section>
    <progress class="pure-material-progress-circular" />
  </section>
  <section v-else>
    <div class="mt-5 d-flex justify-content-between align-items-center">
      <h4 class="mb-0 fw-semibold">
        احدث الطلبات
        <span style="color: #fb99bf" class="fw-normal">
          ({{ myList.length }})
        </span>
      </h4>

      <Multiselect
        label="name"
        :searchable="true"
        :options="type"
        placeholder="اختر النوع"
        @change="handleTypeChange($event)"
        class="w-25 ms-auto"
      />
    </div>
    <section class="" v-if="iscomplete && myList.length > 0">
      <div class="card border-0 mg-b-20 rounded-4 mt-4">
        <div class="card-body p-0 rounded-4">
          <div class="table table-bordered table-responsive rounded-4 mb-0">
            <table class="w-100 text-nowrap text-md-nowrap mg-b-0">
              <thead>
                <tr class="list_item py-3 w-100">
                  <td class="text-muted">رقم الطلب</td>
                  <td class="text-muted">حالة الطلب</td>
                  <td class="text-muted">التكلفة</td>
                  <td class="text-muted">تاريخ الطلب</td>
                  <td class="text-muted">فعل</td>
                </tr>
              </thead>
              <tr
                v-for="(item, index) in myList"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td @click="gotopage(item.id)">
                  <div class="d-flex" style="cursor: pointer">
                    <!-- <i class="mdi mdi-account-plus icon-table"></i> -->
                    <img :src="userimg" alt="" width="45" />

                    <div class="pe-2">
                      <h5 class="mb-0 fw-semibold">
                        <!-- {{ userData[index] }} -->
                        {{ item.order_id }}
                      </h5>
                      <div class="d-flex justify-content-between">
                        <span class="text-secondary">
                          التفاصيل
                          <i class="fe fe-chevron-left"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p :class="[item.status, 'mb-0']">
                    {{ item.status_translated }}
                  </p>
                </td>
                <td style="color: #fb99bf">
                  {{ item.total }}
                </td>
                <td class="text-secondary">
                  {{ item.updated_at.split("T")[0] }}
                </td>
                <td class="">
                  <i
                    class="fe fe-eye text-info px-2"
                    @click="gotopage(item.id)"
                    style="cursor: pointer"
                  ></i>

                  <i
                    class="fa fa-motorcycle text-danger"
                    @click="deliver(item.id)"
                    style="cursor: pointer"
                  ></i>
                  <i
                    class="fe fe-settings text-warning px-2"
                    @click="change(item.id)"
                    style="cursor: pointer"
                  ></i>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <b-pagination
        v-model="page"
        :total-rows="last"
        :per-page="1"
        @click="paginag(page)"
        class="justify-content-end"
      ></b-pagination>
    </section>
    <section
      class="position-relative"
      style="height: 100vh; display: grid; place-items: center"
      v-if="myList.length <= 0 && !loading"
    >
      <div
        style="background: #fd601f; padding: 30px; font-size: 20px"
        class="w-50 text-center text-white rounded-10"
      >
        لا يوجد 'طلبات' حتي الان
      </div>
    </section>
  </section>
  <teleport to="body">
    <b-modal
      id="add-body"
      v-model="showmodal"
      hide-footer
      title="تغير الحالة "
      modal-class="modal-dropdown-fix modal-fixed-footer"
      dialog-class="modal-dialog-dropdown"
      size="md"
    >
      <div class="modal-content-wrapper">
        <div class="modal-body-content">
          <form @submit.prevent="statchange()" class="modal-form">
            <div class="m-2">
              <label class="form-label">الحالة *</label>
              <Multiselect
                label="name"
                :searchable="true"
                :options="status_type"
                placeholder="اختر الحالة"
                v-model="statusFormData.status"
                :class="{ 'is-invalid': hasFieldError('status') }"
                @change="clearFieldError('status')"
              />
              <div
                v-if="hasFieldError('status')"
                class="invalid-feedback d-block"
              >
                {{ getFieldError("status") }}
              </div>
            </div>
          </form>
        </div>
        <div class="modal-fixed-actions">
          <div class="text-center">
            <button
              class="fs-15 btn-save mx-1"
              @click="statchange()"
              :disabled="statusLoading"
            >
              {{ statusLoading ? "جاري الحفظ..." : "حفظ" }}
            </button>
            <button
              class="fs-15 btn-cancel mx-1"
              @click="showmodal = false"
              type="button"
              :disabled="statusLoading"
            >
              الغاء
            </button>
          </div>
        </div>
      </div>
    </b-modal>
  </teleport>
  <teleport to="body">
    <b-modal
      id="add-body"
      v-model="showdeliveries"
      hide-footer
      title="اضافة مندوب  "
      modal-class="modal-dropdown-fix modal-fixed-footer"
      dialog-class="modal-dialog-dropdown"
      size="md"
    >
      <div class="modal-content-wrapper">
        <div class="modal-body-content">
          <form @submit.prevent="adddelivery()" class="modal-form">
            <div class="m-2">
              <label class="form-label">المندوب *</label>
              <Multiselect
                :searchable="true"
                :options="deliveries"
                placeholder="اختر المندوب"
                v-model="deliveryFormData.delivery_id"
              >
                <template v-slot:option="{ option }">
                  <div
                    class="d-flex justify-content-between align-items-center w-100"
                  >
                    <span>{{ option.name }} ({{ option.city }})</span>
                    <span
                      class="badge"
                      :class="{
                        'bg-success': option.status === 'available',

                        'bg-secondary': !['available'].includes(option.status),
                      }"
                    >
                      {{ option.status }}
                    </span>
                  </div>
                </template>

                <template v-slot:singlelabel="{ value }">
                  <div
                    class="d-flex justify-content-between align-items-start w-80 z-index-33"
                  >
                    <span>{{ value.name }} ({{ value.city }})</span>
                    <span
                      class="badge"
                      :class="{
                        'bg-success': value.status === 'available',

                        'bg-secondary': !['available'].includes(value.status),
                      }"
                    >
                      {{ value.status }}
                    </span>
                  </div>
                </template>
              </Multiselect>
              <div
                v-if="hasFieldError('delivery_id')"
                class="invalid-feedback d-block"
              >
                {{ getFieldError("delivery_id") }}
              </div>
            </div>
          </form>
        </div>
        <div class="modal-fixed-actions">
          <div class="text-center">
            <button
              class="fs-15 btn-save mx-1"
              @click="adddelivery()"
              :disabled="deliveryLoading"
            >
              {{ deliveryLoading ? "جاري الحفظ..." : "حفظ" }}
            </button>
            <button
              type="button"
              class="fs-15 btn-cancel mx-1"
              @click="showdeliveries = false"
              :disabled="deliveryLoading"
            >
              الغاء
            </button>
          </div>
        </div>
      </div>
    </b-modal>
  </teleport>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService";
import userimg from "../../assets/img/user.png";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";
import { handleApiError, ApiErrorHandler } from "../../utils/errorHandler.js";
import { useToast } from "vue-toastification";

export default {
  components: {
    Multiselect,
  },
  mixins: [FormErrorMixin],
  data() {
    return {
      userimg,
      type: [
        { value: "", name: "الكل " },
        { value: "waitingForPayment", name: "انتظار الدفع " },
        { value: "pending", name: "قيد المراجعة" },
        { value: "assigned", name: "مخصص" },
        { value: "processing", name: "قيد المعالجة" },
        { value: "withDelivery", name: "مع التوصيل" },
        { value: "completed", name: "مكتمل" },
        { value: "cancelled", name: "ملغى" },
        { value: "hasProblem", name: "يوجد مشكلة" },
      ],
      status_type: [
        { value: "waitingForPayment", name: "انتظار الدفع " },
        { value: "pending", name: "قيد المراجعة" },
        { value: "assigned", name: "مخصص" },
        { value: "processing", name: "قيد المعالجة" },
        { value: "withDelivery", name: "مع التوصيل" },
        { value: "completed", name: "مكتمل" },
        { value: "cancelled", name: "ملغى" },
        { value: "hasProblem", name: "يوجد مشكلة" },
      ],
      myList: [],
      showmodal: false,
      iscomplete: false,
      loading: false,
      page: 1,
      last: 2,
      perminlocal: localStorage.getItem("permissions"),
      id: null,
      deliveries: [],
      showdeliveries: false,
      // Form data for status change
      statusFormData: {
        status: null,
      },
      // Form data for delivery assignment
      deliveryFormData: {
        delivery_id: null,
      },
      // Loading states for buttons
      statusLoading: false,
      deliveryLoading: false,
      // Watched fields for automatic error clearing
      watchedFields: ["statusFormData.status", "deliveryFormData.delivery_id"],
    };
  },
  methods: {
    getStatusInArabic(status) {
      const statusMap = {
        available: "متاح",
        unavailable: "غير متاح",
      };
      return statusMap[status] || status;
    },
    async alldeliveries() {
      try {
        let res = await crudDataService.getAll("deliveries");
        this.deliveries = res.data.data.data.map((delivery) => ({
          value: delivery.id,
          name: delivery.full_name,
          city: delivery.city.name,
          status: this.getStatusInArabic(delivery.status),
          // Create a display label for search purposes
          label: `${delivery.full_name} (${delivery.city.name}) ${delivery.status}`,
        }));
      } catch (error) {
        this.deliveries = handleApiError(error, []);
      }
    },
    async handleTypeChange(e) {
      try {
        let res = await crudDataService.getAll(`orders?filter[status]=${e}`);
        this.myList = res.data.data.data;
        this.last = res.data.data.last_page;
        this.iscomplete = this.myList.length > 0;
      } catch (error) {
        this.myList = handleApiError(error, []);
        this.iscomplete = false;
      }
    },
    async paginag(p) {
      try {
        let res = await crudDataService.getAll(`orders?page=${this.page}`);
        this.myList = res.data.data.data;
      } catch (error) {
        this.myList = handleApiError(error, []);
      }
    },
    gotopage(id) {
      if (this.perminlocal.includes("orders-show")) {
        this.$router.push({ name: "SingleOrder", params: { id } });
      }
    },
    async change(id) {
      this.showmodal = true;
      this.id = id;
      this.clearAllErrors(); // Clear any previous errors
      this.statusFormData.status = null; // Reset form
    },
    async deliver(id) {
      this.showdeliveries = true;
      this.id = id;
      this.clearAllErrors(); // Clear any previous errors
      this.deliveryFormData.delivery_id = null; // Reset form
    },
    async statchange() {
      // Validate form - need to check the actual form data structure
      if (!this.statusFormData.status) {
        this.setFieldErrors({
          status: ["الحالة مطلوبة"],
        });
        return;
      }

      this.statusLoading = true;
      const toast = useToast();

      try {
        let res = await crudDataService.create(`orders/${this.id}/status`, {
          status: this.statusFormData.status,
        });

        this.showmodal = false;
        this.allorders();

        toast.success("تم تحديث حالة الطلب بنجاح", {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        this.handleApiErrors(error, toast);
      } finally {
        this.statusLoading = false;
      }
    },
    async adddelivery() {
      // Validate form - need to check the actual form data structure
      if (!this.deliveryFormData.delivery_id) {
        this.setFieldErrors({
          delivery_id: ["المندوب مطلوب"],
        });
        return;
      }

      this.deliveryLoading = true;
      const toast = useToast();

      try {
        let res = await crudDataService.create(
          `deliveries/${this.deliveryFormData.delivery_id}/orders`,
          {
            order_id: this.id,
          }
        );

        this.showdeliveries = false;
        this.allorders();

        toast.success(res.data.message || "تم تعيين المندوب بنجاح", {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        this.handleApiErrors(error, toast);
      } finally {
        this.deliveryLoading = false;
      }
    },
    async allorders() {
      this.loading = true;
      try {
        let res = await crudDataService.getAll("orders");
        this.myList = res.data.data.data;
        this.last = res.data.data.last_page;
        this.iscomplete = this.myList.length > 0;
      } catch (error) {
        this.myList = handleApiError(error, []);
        this.iscomplete = false;
      } finally {
        this.loading = false;
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleend() {
      this.isDropendOpen = !this.isDropendOpen;
    },
  },
  mounted() {
    this.allorders();
    this.alldeliveries();
  },
};
</script>

<style scoped lang="scss">
.pending {
  color: #fd601f;
}
.icon-table {
  padding: 12px 13px 0 12px;
  border-radius: 50%;
  background: #e7faff;
  color: #7e87f7;
}
.card {
  box-shadow: 0px 3px 3px 0px #e6edf0;
}

.list_item:not(:last-child) {
  border-bottom: 1px solid #e8e7ff;
}

.table-responsive .table > :not(caption) > * > * {
  border-bottom: 0px solid #e8e8f7 !important;
}
.tab-menu-heading {
  border: 1px solid #e8e8f7;
}

// ✅ Modal with fixed footer structure
.modal-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
}

.modal-body-content {
  flex: 1;
  overflow: visible;
  padding-bottom: 20px;
  min-height: 200px;
}

.modal-form {
  overflow: visible;
}

// ✅ Fixed action buttons at bottom
.modal-fixed-actions {
  position: sticky;
  bottom: 0;
  border-top: 1px solid #676a6d;
  padding: 15px 20px;
  margin: 0 -20px -25px -20px;
  z-index: 10;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

// ✅ Global styles for modal with fixed footer
:deep(.modal-fixed-footer) {
  .modal-dialog {
    height: auto;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }

  .modal-content {
    height: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .modal-body {
    flex: 1;
    overflow: visible;
    padding: 25px 20px 0 20px;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    flex-shrink: 0;
  }
}

// ✅ Multiselect dropdown z-index
:deep(.multiselect-dropdown) {
  z-index: 999999 !important;
  position: absolute !important;
}

// ✅ Error styling for multiselect
:deep(.multiselect.is-invalid) {
  border-color: #dc3545;
}

:deep(.multiselect.is-invalid .multiselect-wrapper) {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
}

.form-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

// ✅ Loading button styles
.btn-save:disabled,
.btn-cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
.w-80 {
  width: 80% !important;
}
</style>
