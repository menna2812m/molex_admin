<template>
  <div class="main-container container-fluid">
    <div class="page-header">
      <div class="row align-items-center justify-content-between">
        <div class="col">
          <h4 class="">إدارة الأحياء</h4>
        </div>
        <div class="col-auto">
          <button @click="handleCreate" class="btn btn-primary btn-icon-text">
            <i class="fe fe-plus me-2"></i>
            إضافة حي جديد
          </button>
        </div>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center p-5">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <!-- Districts Table -->
    <div v-else class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered text-nowrap border-bottom">
                <thead>
                  <tr>
                    <th class="border-bottom-0">الاسم</th>

                    <th class="border-bottom-0">المدينة</th>
                    <th class="border-bottom-0">المنطقة</th>
                    <th class="border-bottom-0">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="district in districts" :key="district.id">
                    <td>{{ district.name }}</td>

                    <td>
                      <span class="badge bg-info">
                        {{ district.city?.name || "غير محدد" }}
                      </span>
                    </td>
                    <td>
                      <span class="badge bg-warning">
                        {{ district.region?.name || "غير محدد" }}
                      </span>
                    </td>
                    <td>
                      <div class="btn-group gap-2" role="group">
                        <button
                          @click="handleEdit(district)"
                          class="btn btn-primary btn-sm"
                          title="تعديل"
                        >
                          <i class="fe fe-edit-2"></i>
                        </button>
                        <button
                          @click="handleDelete(district.id, district.name)"
                          class="btn btn-danger btn-sm"
                          title="حذف"
                        >
                          <i class="fe fe-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <teleport to="body">
      <b-modal
        id="district-modal"
        v-model="showModal"
        hide-footer
        :title="editingDistrict ? 'تعديل الحي' : 'إضافة حي جديد'"
      >
        <form @submit.prevent="handleSave">
          <div class="row">
            <div class="col-md-12 mb-3">
              <label class="form-label"
                >الاسم بالعربية <span class="text-red">*</span></label
              >
              <input
                v-model="formData.name.ar"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': hasFieldError('name.ar') }"
                required
                @input="clearFieldError('name.ar')"
              />
              <div v-if="hasFieldError('name.ar')" class="invalid-feedback">
                {{ getFieldError("name.ar") }}
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <label class="form-label"
                >الاسم بالإنجليزية <span class="text-red">*</span></label
              >
              <input
                v-model="formData.name.en"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': hasFieldError('name.en') }"
                required
                @input="clearFieldError('name.en')"
              />
              <div v-if="hasFieldError('name.en')" class="invalid-feedback">
                {{ getFieldError("name.en") }}
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <label class="form-label"
                >المنطقة <span class="text-red">*</span></label
              >
              <select
                v-model="formData.region_id"
                class="form-control"
                :class="{ 'is-invalid': hasFieldError('region_id') }"
                required
                @change="
                  clearFieldError('region_id');
                  onFormRegionChange();
                "
              >
                <option value="">اختر المنطقة</option>
                <option
                  v-for="region in regions"
                  :key="region.id"
                  :value="region.id"
                >
                  {{ region.name }}
                </option>
              </select>
              <div v-if="hasFieldError('region_id')" class="invalid-feedback">
                {{ getFieldError("region_id") }}
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <label class="form-label"
                >المدينة <span class="text-red">*</span></label
              >
              <select
                v-model="formData.city_id"
                :disabled="!formData.region_id"
                class="form-control"
                :class="{ 'is-invalid': hasFieldError('city_id') }"
                required
                @change="clearFieldError('city_id')"
              >
                <option value="">اختر المدينة</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
              <div v-if="hasFieldError('city_id')" class="invalid-feedback">
                {{ getFieldError("city_id") }}
              </div>
            </div>
          </div>
          <div class="text-end">
            <button
              type="button"
              @click="closeModal"
              class="btn btn-light me-2"
              :disabled="formLoading"
            >
              إلغاء
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="formLoading"
            >
              <span
                v-if="formLoading"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              {{ editingDistrict ? "تحديث" : "إضافة" }}
            </button>
          </div>
        </form>
      </b-modal>
    </teleport>
  </div>
</template>

<script>
import { useDistrictsApi } from "../../composables/useDistrictsApi.js";
import { useRegionsApi } from "../../composables/useRegionsApi.js";
import { useCitiesApi } from "../../composables/useCitiesApi.js";
import { useCountriesApi } from "../../composables/useCountriesApi.js";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";

export default {
  name: "DistrictsPage",
  mixins: [FormErrorMixin],
  data() {
    return {
      districts: [],
      regions: [],
      cities: [],
      countries: [],
      loading: false,
      formLoading: false,
      error: null,
      page: 1,
      last: 1,
      selectedCountryId: 1,
      selectedRegionId: "",
      selectedCityId: "",
      showModal: false,
      showViewModal: false,
      editingDistrict: null,
      viewingDistrict: null,
      formData: {
        name: {
          ar: "",
          en: "",
        },
        region_id: "",
        city_id: "",
      },
      watchedFields: [
        "formData.name.ar",
        "formData.name.en",
        "formData.region_id",
        "formData.city_id",
      ],
    };
  },

  methods: {
    async getAllData() {
      this.loading = true;
      const districtsApi = useDistrictsApi();
      await districtsApi.fetchDistricts(this.page, 99999);
      this.districts = districtsApi.districts.value;
      this.error = districtsApi.error.value;
      this.loading = districtsApi.loading.value;
    },

    async getCountries() {
      const countriesApi = useCountriesApi();
      await countriesApi.fetchCountries();
      this.countries = countriesApi.countries.value;
    },

    async getRegions() {
      if (this.selectedCountryId) {
        const regionsApi = useRegionsApi();
        await regionsApi.fetchRegions(1, 100, this.selectedCountryId);
        this.regions = regionsApi.regions.value;
      }
    },

    async getCities() {
      if (this.selectedRegionId) {
        const citiesApi = useCitiesApi();
        await citiesApi.fetchCities(1, 100, this.selectedRegionId);
        this.cities = citiesApi.cities.value;
      }
    },

    async paginag(p) {
      this.page = p;
      await this.getAllData();
    },

    async onCountryChange() {
      this.selectedRegionId = "";
      this.selectedCityId = "";
      if (this.selectedCountryId) {
        await this.getRegions();
      }
      this.cities = [];
      await this.getAllData();
    },

    async onRegionChange() {
      this.selectedCityId = "";
      if (this.selectedRegionId) {
        await this.getCities();
      }
      this.page = 1;
      await this.getAllData();
    },

    async onCityChange() {
      this.page = 1;
      await this.getAllData();
    },

    async onFormRegionChange() {
      this.formData.city_id = "";
      if (this.formData.region_id) {
        const citiesApi = useCitiesApi();
        await citiesApi.fetchCities(1, 100, this.formData.region_id);
        this.cities = citiesApi.cities.value;
      }
    },

    handleCreate() {
      this.editingDistrict = null;
      this.clearAllErrors(); // Clear previous errors
      this.formData = {
        name: {
          ar: "",
          en: "",
        },
        region_id: "",
        city_id: "",
      };
      this.showModal = true;
    },

    handleEdit(district) {
      this.editingDistrict = district;
      console.log(district);

      this.clearAllErrors(); // Clear previous errors
      this.formData = {
        name: {
          ar: district.name_ar || "",
          en: district.name_en || "",
        },
        region_id: district.region_id?.toString() || "",
        city_id: district.city_id?.toString() || "",
      };
      this.showModal = true;
      // Load cities for the selected region
      if (district.region_id) {
        this.onFormRegionChange();
      }
    },

    async handleView(id) {
      try {
        const districtsApi = useDistrictsApi();
        this.viewingDistrict = await districtsApi.getDistrictById(id);
        this.showViewModal = true;
      } catch (error) {
        console.error("Error fetching district details:", error);
      }
    },

    handleDelete(id, name) {
      this.$swal
        .fire({
          title: `هل تريد حذف "${name}" ؟`,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const districtsApi = useDistrictsApi();
              await districtsApi.deleteDistrict(id);
              this.$swal.fire({
                title: "تم الحذف بنجاح!",
                icon: "success",
                confirmButtonText: "تم",
              });
              await this.getAllData();
            } catch (error) {
              console.error("Error deleting district:", error);
            }
          }
        });
    },

    async handleSave() {
      try {
        this.formLoading = true;
        this.clearAllErrors();

        const districtsApi = useDistrictsApi();
        const data = {
          name: {
            ar: this.formData.name.ar,
            en: this.formData.name.en,
          },
          region_id: parseInt(this.formData.region_id),
          city_id: parseInt(this.formData.city_id),
        };

        if (this.editingDistrict) {
          await districtsApi.updateDistrict(this.editingDistrict.id, data);
          this.$swal.fire({
            title: "تم التحديث بنجاح!",
            icon: "success",
            confirmButtonText: "تم",
          });
        } else {
          await districtsApi.createDistrict(data);
          this.$swal.fire({
            title: "تم الإضافة بنجاح!",
            icon: "success",
            confirmButtonText: "تم",
          });
        }

        this.closeModal();
        await this.getAllData();
      } catch (error) {
        console.error("Error saving district:", error);

        // Handle validation errors
        if (error.response && error.response.status === 422) {
          this.setFieldErrors(error.response.data.errors || {});
        } else {
          this.$swal.fire({
            title: "خطأ!",
            text: error.response?.data?.message || "حدث خطأ أثناء حفظ البيانات",
            icon: "error",
            confirmButtonText: "تم",
          });
        }
      } finally {
        this.formLoading = false;
      }
    },

    closeModal() {
      this.showModal = false;
      this.editingDistrict = null;
      this.clearAllErrors();
      this.formLoading = false;
    },

    closeViewModal() {
      this.showViewModal = false;
      this.viewingDistrict = null;
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },

  async mounted() {
    await this.getAllData();
    await this.getCountries();
    await this.getRegions();
  },
};
</script>
