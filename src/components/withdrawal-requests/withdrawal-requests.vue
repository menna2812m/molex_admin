<template>
  <section class="mt-5 pt-5">
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
          <div class="table-responsive border-0 rounded border-bottom-0 mb-0">
            <table
              class="table table-bordered text-nowrap text-md-nowrap mg-b-0 text-center"
            >
              <tr>
                <td class="text-muted">اسم المتجر</td>
                <td class="text-muted">رقم جوال المتجر</td>
                <td class="text-muted">الكمية</td>
                <td class="text-muted">ايصال التحويل</td>
                <td class="text-muted">الحالة</td>
                <td class="text-muted">اسم البنك</td>
                <td class="text-muted">القبول</td>
                <td class="text-muted">تأكيد التحويل</td>
                <td class="text-muted">الرفض</td>
              </tr>
              <tr
                v-for="(item, index) in myList"
                :key="index"
                class="list_item py-3 w-100 align-items-center justify-content-between"
              >
                <td>
                  <button @click="view(item.store?.id)" class="btn">
                    {{ item.store?.name }}
                  </button>
                </td>
                <td>
                  <a :href="`tel:+${item.store?.phone}`" class="">
                    {{ item.store?.phone }}
                  </a>
                </td>
                <td>
                  {{ item.amount }}
                </td>
                <td>
                  <img
                    :src="item.transfer_receipt"
                    style="width: 100px; height: 100px; object-fit: fill"
                    class="m-1"
                    v-if="item.transfer_receipt"
                  />
                </td>
                <td>
                  {{ item.status }}
                </td>
                <td>
                  {{ item.bank_account?.bank_name }}
                </td>
                <td>
                  <button
                    class="btn me-2"
                    @click="approve(item.id, index, item.store)"
                  >
                    <i class="fa fa-check text-success"></i>
                  </button>
                </td>
                <td>
                  <button class="btn me-2" @click="edit(item)">
                    <i class="fa fa-exchange text-info"></i>
                  </button>
                </td>

                <td>
                  <button
                    class="btn me-2"
                    @click="del(item.id, index, item.store)"
                    v-if="perminlocal.includes('withdrawal-requests-destroy')"
                  >
                    <i class="fa fa-close text-danger"></i>
                  </button>
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
          style="background: #fd601f; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد طلبات سحب حتي الان
        </div>
      </section>
    </section>
    <teleport to="body">
      <b-modal
        id="add"
        v-model="confirmModel"
        hide-footer
        title="تاكيد التحويل"
      >
        <div class="p-0 pos-relative" style="z-index: 555">
          <form @submit.prevent="update">
            <div class="row">
              <div class="mt-1">
                <label>صورة الايصال</label>
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
            <button class="btn btn-primary m-auto mt-3 d-block" type="submit">
              اضافة
            </button>
          </form>
        </div>
      </b-modal>
    </teleport>
  </section>
</template>

<script>
import { useToast } from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import axios from "axios";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      confirmModel: false,
      myList: [],
      id: null,
      loading: false,
      formData: {
        transfer_receipt: "",
      },
      imgurl: "",
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    view(id) {
      this.$router.push({ name: "SingleStore", params: { id } });
    },
    onFileSelected(event) {
      this.formData.transfer_receipt = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imgurl = reader.result;
      };
      reader.readAsDataURL(this.formData.transfer_receipt);
    },
    async edit(data) {
      this.id = data.id;
      this.confirmModel = true;
      this.imgurl = data.transfer_receipt;
    },
    async update() {
      let res = await crudDataService
        .create(`withdrawal-requests/${this.id}/transfer`, this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response, "ijjijijii");

          this.withdrawal_requests();
          this.confirmModel = false;
          this.withdrawal - requests();
          (this.formData.transfer_receipt = ""), (this.imgurl = "");
        })
        .catch((error) => {
          this.confirmModel = false;
          this.$swal.fire(error.data.message, "", "error");
        });
    },
    async withdrawal_requests() {
      this.loading = true;
      try {
        let res = await crudDataService.getAll("withdrawal-requests");
        this.myList = res.data.data;
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        this.loading = false;
      }
    },
    approve(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name.name}" هل تريد الموافقة علي طلب سحب  `,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .create(`withdrawal-requests/${data}/approve`)
              .then((res) => {
                this.$swal.fire(res.data.message, "", "success");
                this.withdrawal_requests();
              })
              .catch((error) => {
                this.$swal.fire(error.data.message, "", "error");
              });
          }
        });
    },
    del(data, index, name) {
      this.$swal
        .fire({
          title: `؟"${name.name}" هل تريد رفض  طلب سحب `,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          if (result.isConfirmed) {
            crudDataService
              .delete("withdrawal-requests", `${data}`)
              .then((res) => {
                this.$swal.fire(res.data.message, "", "success");
                this.withdrawal_requests();
              })
              .catch((error) => {
                this.$swal.fire(error.data.message, "", "error");
              });
          }
        });
    },
  },
  mounted() {
    this.withdrawal_requests();
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
