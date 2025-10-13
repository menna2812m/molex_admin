<template lang="">
  <section class="mt-5 pt-5"></section>
  <div class="card custom-card border-0 mg-b-20" v-if="list">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between flex-wrap">
        <div>
          <h5 class="mb-0 text-muted">#رقم الطلب</h5>
          <p class="mt-4">{{ list?.order_id }}</p>
        </div>
        <div>
          <h5 class="mb-0 text-muted">
            <i class="fa fa-calendar"></i>
            تاريخ الطلب
          </h5>
          <p class="mt-4">
            {{ list?.updated_at.split("T")[0] }}
          </p>
        </div>
        <div v-if="list?.expected_delivery_date">
          <h5 class="mb-0 text-muted">
            <i class="fa fa-calendar"></i>
            تاريخ التسليم المتوقع
          </h5>
          <p class="mt-4">
            {{ list?.expected_delivery_date.split(" ")[0] }}
          </p>
        </div>
        <div>
          <h5 class="mb-0 text-muted">
            <i class="si si-flag"></i>
            حالة الطلب
          </h5>
          <p
            class="mt-4 border text-center p-1"
            style="border-radius: 25px; cursor: pointer"
            @click="showmodal = true"
          >
            {{ list?.status_translated }}
            <i class="fa fa-angle-left ms-1"></i>
          </p>
        </div>
      </div>
    </div>

    <div class="p-4 d-flex align-items-center justify-content-end">
      <!-- <div>
        <h5 class="mb-0 text-muted">العنوان </h5>
          <p class="mt-4">{{ list?.address.city }}
            -
            {{ list?.address.district }}
            -
            {{ list?.address.region }}

          </p>
      </div> -->
      <div
        class="mt-0"
        v-if="list?.address.latitude && list?.address.longitude"
      >
        <a
          class="border text-center p-2 px-4 bg-transparent text-primary"
          style="border-radius: 25px; cursor: pointer"
          :href="googleMapsUrl(list?.address.latitude, list?.address.longitude)"
          target="_blank"
        >
          المكان علي الخريطة
          <i class="fa fa-angle-left ms-1"></i>
        </a>
      </div>
    </div>
  </div>
  <div class="card custom-card border-0 mg-b-20" v-if="list">
    <div class="card-header">
      <h6 class="card-title">بيانات التوصيل</h6>
    </div>
    <div class="card-body p-4">
      <div class="d-flex justify-content-between flex-wrap">
        <div>
          <h5 class="mb-0 text-muted">*طريقة التوصيل*</h5>
          <p class="mt-4">{{ list?.delivery_option?.name.ar }}</p>
        </div>
        <div>
          <h5 class="mb-0 text-muted">
            <i class="fa fa-money"></i>
            طريقة الدفع
          </h5>
          <p class="mt-4">
            {{ list?.transaction?.payment_method }}
          </p>
        </div>
        <div>
          <h5 class="mb-0 text-muted">
            <i class="fa fa-motorcycle"></i>
            اختيار مندوب للتسليم
          </h5>
          <p
            class="mt-4 border text-center p-1"
            style="border-radius: 25px; cursor: pointer"
            @click="showdeliveries = true"
          >
            {{ list?.delivery?.full_name }}
            <i class="fa fa-angle-left ms-1"></i>
          </p>
        </div>
      </div>
      <div class="text-danger" v-if="list?.delivery">
        * اذا كنت تريد الغاء هذا المندوب من هذا الاوردر
        <button class="btn" @click="removedelivery(list?.delivery, list?.id)">
          اضغط هنا
        </button>
      </div>
    </div>
  </div>
  <div class="card custom-card border-0 mg-b-20" v-if="userData">
    <div class="card-header">
      <h6 class="card-title">بيانات العميل</h6>
    </div>
    <div class="card-body p-4">
      <div class="d-flex align-items-center">
        <img
          src="../../assets/img/avatar_male.jpg"
          alt="img"
          style="width: 60px; height: 60px; border-radius: 50%"
        />
        <div>
          <p class="h5 mt-4 d-block">{{ userData.name }}{{ userData.lname }}</p>
          <!-- <p>{{ list?.address.address }}</p> -->
          <div class="mt-4">
            <p class="mb-0">
              {{ list?.address.city }}
              -
              {{ list?.address.district }}
              -
              {{ list?.address.region }}
            </p>
            <span class="px-3 text-muted">
              {{ list?.address.address }}
            </span>
          </div>

          <p class="mb-0 px-2">{{ userData.birth_date }}</p>
        </div>
      </div>
      <div class="my-3 mx-5">
        <a :href="`tel:${userData.phone}`" class="iconuser">
          <i class="zmdi zmdi-phone"></i>
          {{ userData.phone }}
        </a>
        <a :href="`mailto:${userData.email}`" class="iconuser">
          <i class="zmdi zmdi-email"></i>
          {{ userData.email }}
        </a>
      </div>
    </div>
  </div>
  <div class="card custom-card border-0 mg-b-20" v-if="list">
    <div class="card-header">
      <h6 class="card-title">المنتجات</h6>
    </div>
    <div class="card-body p-4">
      <div class="table-responsive border-0 rounded border-bottom-0 p-3 mb-0">
        <table class="table text-nowrap text-md-nowrap mg-b-0">
          <tr class="my-3">
            <th class="">المنتج</th>
            <th>اسم المنتج</th>
            <th>الكمية</th>
            <th>العرض</th>
            <th>الشحن</th>
            <th>سعر الوحدة</th>
            <th>السعر النهائي</th>
          </tr>
          <tr
            v-for="(item, index) in list?.items"
            :key="index"
            class="list_item py-3 w-100 align-items-center justify-content-between"
          >
            <td>
              <img
                :src="item.product.cover_image"
                alt=""
                class="rounded-50"
                width="100"
              />
            </td>
            <td>
              {{ item.product.name.ar }}
            </td>
            <td>
              {{ item.quantity }}
            </td>
            <td>
              {{ item.offer_discount }}
            </td>
            <td>
              {{ list?.shipping }}
            </td>
            <td>
              {{ item.unit_price }}
            </td>
            <td>
              {{ list?.total }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <teleport to="body">
    <b-modal
      id="status-modal"
      v-model="showmodal"
      hide-footer
      title="تغير الحالة"
      modal-class="modal-dropdown-fix modal-fixed-footer"
      dialog-class="modal-dialog-dropdown"
      size="md"
    >
      <div class="modal-content-wrapper">
        <div class="modal-body-content">
          <form @submit.prevent="change()" class="modal-form">
            <div class="m-2">
              <label class="form-label mb-2">حالة الطلب</label>
              <Multiselect
                label="name"
                :searchable="true"
                :options="status_type"
                placeholder="اختر الحالة"
                v-model="status"
                :appendToBody="true"
                :closeOnSelect="true"
                :class="{ 'is-invalid': hasFieldError('status') }"
                @select="clearFieldError('status')"
              />
              <div v-if="hasFieldError('status')" class="invalid-feedback">
                {{ getFieldError("status") }}
              </div>
            </div>
          </form>
        </div>
        <div class="modal-fixed-actions">
          <div class="text-center">
            <button
              type="button"
              @click="change()"
              class="fs-15 btn-save mx-1"
              :disabled="formLoading"
            >
              <span
                v-if="formLoading"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              حفظ
            </button>
            <button
              type="button"
              class="fs-15 btn-cancel mx-1"
              @click="closeStatusModal"
              :disabled="formLoading"
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
      id="delivery-modal"
      v-model="showdeliveries"
      hide-footer
      title="اضافة مندوب"
      modal-class="modal-dropdown-fix modal-fixed-footer"
      dialog-class="modal-dialog-dropdown"
      size="md"
    >
      <div class="modal-content-wrapper">
        <div class="modal-body-content">
          <form @submit.prevent="adddelivery(delivery_id)" class="modal-form">
            <div class="m-2">
              <label class="form-label mb-2">اختر المندوب</label>
              <Multiselect
                :searchable="true"
                :options="deliveries"
                placeholder="اختر المندوب"
                v-model="delivery_id"
              >
                <template v-slot:option="{ option }">
                  <div
                    class="d-flex justify-content-between align-items-center w-100"
                  >
                    <span>{{ option.name }} ({{ option.city }})</span>
                    <span
                      class="badge"
                      :class="{
                        'bg-success': option.is_active == 1,

                        'bg-secondary': ![1].includes(option.is_active),
                      }"
                    >
                      {{ option.is_active == 1 ? "متاح" : "غير متاح" }}
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
                        'bg-success': value.is_active == 1,

                        'bg-secondary': ![1].includes(value.is_active),
                      }"
                    >
                      {{ value.is_active == 1 ? "متاح" : "غير متاح" }}
                    </span>
                  </div>
                </template>
              </Multiselect>
              <div v-if="hasFieldError('delivery_id')" class="invalid-feedback">
                {{ getFieldError("delivery_id") }}
              </div>
            </div>
          </form>
        </div>
        <div class="modal-fixed-actions">
          <div class="text-center">
            <button
              type="button"
              @click="adddelivery(delivery_id)"
              class="fs-15 btn-save mx-1"
              :disabled="formLoading"
            >
              <span
                v-if="formLoading"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              حفظ
            </button>
            <button
              type="button"
              class="fs-15 btn-cancel mx-1"
              @click="closeDeliveryModal"
              :disabled="formLoading"
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
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";

export default {
  mixins: [FormErrorMixin],
  components: {
    Multiselect,
  },
  data() {
    return {
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
      deliveries: [],
      showdeliveries: false,
      delivery_id: null,
      formLoading: false,
      list: "",
      userData: "",
      showmodal: false,
      status: "",
      watchedFields: ["status", "delivery_id"],
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
          is_active: delivery.is_active,
          // Create a display label for search purposes
          label: `${delivery.full_name} (${delivery.city.name}) ${delivery.status}`,
        }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    googleMapsUrl(lat, lng) {
      return `https://www.google.com/maps/?q=${lat},${lng}`;
    },
    removedelivery(data, orderid) {
      this.$swal
        .fire({
          title: `؟"${data.full_name}" هل تريد حذف المندوب  `,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete(`deliveries/${data.id}/orders`, `${orderid}`)
              .then((res) => {
                this.$swal.fire(res.data.message, "", "success");
                this.order();
              })
              .catch((error) => {
                this.$swal.fire(error.data.message, "", "error");
              });
          }
        });
    },

    async adddelivery(id) {
      if (!id) {
        this.setFieldErrors({ delivery_id: ["يرجى اختيار مندوب"] });
        return;
      }

      try {
        this.formLoading = true;
        this.clearAllErrors();

        const res = await crudDataService.create(`deliveries/${id}/orders`, {
          order_id: this.$route.params.id,
        });

        this.closeDeliveryModal();
        await this.order();
        this.$swal.fire({
          title: "تم إضافة المندوب بنجاح!",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "تم",
        });
      } catch (error) {
        console.error("Error adding delivery:", error);

        // if (error.data && error.data.status === 422) {
        //   this.setFieldErrors(error.data.errors || {});
        // } else {
        //   console.log(error, "erroro");

        this.$swal.fire({
          title: "خطأ!",
          text: error?.data?.message || "حدث خطأ أثناء إضافة المندوب",
          icon: "error",
          confirmButtonText: "تم",
        });
        // }
      } finally {
        this.formLoading = false;
      }
    },

    async change() {
      if (!this.status) {
        this.setFieldErrors({ status: ["يرجى اختيار حالة الطلب"] });
        return;
      }

      try {
        this.formLoading = true;
        this.clearAllErrors();

        const res = await crudDataService.create(
          `orders/${this.$route.params.id}/status`,
          {
            status: this.status,
          }
        );

        this.closeStatusModal();
        await this.order();
        this.$swal.fire({
          title: "تم تحديث حالة الطلب بنجاح!",
          icon: "success",
          confirmButtonText: "تم",
        });
      } catch (error) {
        console.error("Error updating status:", error);

        if (error.response && error.response.status === 422) {
          this.setFieldErrors(error.response.data.errors || {});
        } else {
          this.$swal.fire({
            title: "خطأ!",
            text:
              error.response?.data?.message || "حدث خطأ أثناء تحديث حالة الطلب",
            icon: "error",
            confirmButtonText: "تم",
          });
        }
      } finally {
        this.formLoading = false;
      }
    },

    closeStatusModal() {
      this.showmodal = false;
      this.clearAllErrors();
      this.formLoading = false;
      this.status = "";
    },

    closeDeliveryModal() {
      this.showdeliveries = false;
      this.clearAllErrors();
      this.formLoading = false;
      this.delivery_id = null;
    },
    async order() {
      let res = await crudDataService.get("orders", `${this.$route.params.id}`);
      this.list = res.data.data;
      this.user();
    },
    async user() {
      if (this.list?.user_id) {
        let res = await crudDataService.get("users", `${this.list?.user_id}`);
        this.userData = res?.data.data;
      }
    },
  },
  mounted() {
    this.order();
    this.alldeliveries();
  },
};
</script>
<style scoped lang="scss">
.card {
  box-shadow: 0px 3px 3px 0px #e6edf0;
}
.iconuser {
  padding: 8px 15px;
  border-radius: 30px;
  color: #fd601f;
  border: 1px solid #fd601f;
  margin-left: 5px;
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
.w-80 {
  width: 80% !important;
}
// ✅ Multiselect dropdown z-index
:deep(.multiselect-dropdown) {
  z-index: 999999 !important;
  position: absolute !important;
}
</style>
