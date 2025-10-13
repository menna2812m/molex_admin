<template>
  <div class="main-container container-fluid">
    <div class="page-header">
      <div class="row align-items-center justify-content-between">
        <div class="col">
          <h4 class="">إدارة المدن</h4>
        </div>
        <div class="col-auto">
          <button @click="handleCreate" class="btn btn-primary btn-icon-text">
            <i class="fe fe-plus me-2"></i>
            إضافة مدينة جديدة
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

    <!-- Cities Table -->
    <div v-else class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered text-nowrap border-bottom">
                <thead>
                  <tr>
                    <th class="border-bottom-0">الاسم</th>
                    <th class="border-bottom-0">المنطقة</th>
                    <th class="border-bottom-0">عدد الأحياء</th>
                    <th class="border-bottom-0">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="city in cities" :key="city.id">
                    <tr>
                      <td>{{ city.name }}</td>
                      <td>
                        <span class="badge bg-primary">
                          {{ city.region?.name || "غير محدد" }}
                        </span>
                      </td>
                      <td>{{ city.districts_count || 0 }}</td>
                      <td>
                        <div class="btn-group gap-2" role="group">
                          <button
                            @click="toggleCityDistricts(city.id)"
                            class="btn btn-secondary btn-sm"
                            title="عرض الأحياء"
                          >
                            <i class="fe fe-list"></i>
                          </button>

                          <button
                            @click="handleEdit(city)"
                            class="btn btn-primary btn-sm"
                            title="تعديل"
                          >
                            <i class="fe fe-edit-2"></i>
                          </button>
                          <button
                            @click="handleDelete(city.id, city.name)"
                            class="btn btn-danger btn-sm"
                            title="حذف"
                          >
                            <i class="fe fe-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <!-- Expandable Districts Row -->
                    <tr v-if="expandedCities.includes(city.id)">
                      <td colspan="4" class="bg-light">
                        <div class="p-3">
                          <h6 class="text-secondary mb-2">
                            <i class="fe fe-home me-2"></i>
                            أحياء مدينة {{ city.name }}
                          </h6>
                          <div
                            v-if="city.districts && city.districts.length > 0"
                            class="d-flex flex-wrap gap-2"
                          >
                            <span
                              v-for="district in city.districts"
                              :key="district.id"
                              class="badge bg-light text-dark border px-3 py-2"
                            >
                              {{ district.name }}
                            </span>
                          </div>
                          <div v-else class="alert alert-info py-2 mb-0">
                            <small>لا توجد أحياء في هذه المدينة</small>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
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
        id="city-modal"
        v-model="showModal"
        hide-footer
        :title="editingCity ? 'تعديل المدينة' : 'إضافة مدينة جديدة'"
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
                @change="clearFieldError('region_id')"
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
              {{ editingCity ? "تحديث" : "إضافة" }}
            </button>
          </div>
        </form>
      </b-modal>
    </teleport>
  </div>
</template>

<script>
import { useCitiesApi } from "../../composables/useCitiesApi.js";
import { useRegionsApi } from "../../composables/useRegionsApi.js";
import { useCountriesApi } from "../../composables/useCountriesApi.js";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";

export default {
  name: "CitiesPage",
  mixins: [FormErrorMixin],
  data() {
    return {
      cities: [],
      regions: [],
      countries: [],
      loading: false,
      formLoading: false,
      error: null,
      page: 1,
      last: 1,
      selectedCountryId: 1,
      selectedRegionId: "",
      showModal: false,
      showViewModal: false,
      editingCity: null,
      viewingCity: null,
      expandedCities: [],
      formData: {
        name: {
          ar: "",
          en: "",
        },
        region_id: "",
      },
      watchedFields: [
        "formData.name.ar",
        "formData.name.en",
        "formData.region_id",
      ],
    };
  },

  methods: {
    async getAllData() {
      this.loading = true;
      const citiesApi = useCitiesApi();
      await citiesApi.fetchCities(this.page, 9999, this.selectedRegionId);
      this.cities = citiesApi.cities.value;
      this.error = citiesApi.error.value;
      this.loading = citiesApi.loading.value;
    },

    async getCountries() {
      const countriesApi = useCountriesApi();
      await countriesApi.fetchCountries();
      this.countries = countriesApi.countries.value;
    },

    async getRegions() {
      if (this.selectedCountryId) {
        const regionsApi = useRegionsApi();
        await regionsApi.fetchRegions(1, 999, this.selectedCountryId);
        this.regions = regionsApi.regions.value;
      }
    },

    async paginag(p) {
      this.page = p;
      await this.getAllData();
    },

    async onCountryChange() {
      this.selectedRegionId = "";
      if (this.selectedCountryId) {
        await this.getRegions();
      }
      await this.getAllData();
    },

    async onRegionChange() {
      this.page = 1;
      await this.getAllData();
    },

    handleCreate() {
      this.editingCity = null;
      this.clearAllErrors(); // Clear previous errors
      this.formData = {
        name: {
          ar: "",
          en: "",
        },
        region_id: "",
      };
      this.showModal = true;
    },

    handleEdit(city) {
      this.editingCity = city;
      this.clearAllErrors(); // Clear previous errors
      this.formData = {
        name: {
          ar: city.name_ar || "",
          en: city.name_en || "",
        },
        region_id: city.region_id?.toString() || "",
      };
      this.showModal = true;
    },

    async handleView(id) {
      try {
        const citiesApi = useCitiesApi();
        this.viewingCity = await citiesApi.getCityById(id);
        this.showViewModal = true;
      } catch (error) {
        console.error("Error fetching city details:", error);
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
              const citiesApi = useCitiesApi();
              await citiesApi.deleteCity(id);
              this.$swal.fire({
                title: "تم الحذف بنجاح!",
                icon: "success",
                confirmButtonText: "تم",
              });
              await this.getAllData();
            } catch (error) {
              console.error("Error deleting city:", error);
            }
          }
        });
    },

    async handleSave() {
      try {
        this.formLoading = true;
        this.clearAllErrors();

        const citiesApi = useCitiesApi();
        const data = {
          name: {
            ar: this.formData.name.ar,
            en: this.formData.name.en,
          },
          region_id: parseInt(this.formData.region_id),
        };

        if (this.editingCity) {
          await citiesApi.updateCity(this.editingCity.id, data);
          this.$swal.fire({
            title: "تم التحديث بنجاح!",
            icon: "success",
            confirmButtonText: "تم",
          });
        } else {
          await citiesApi.createCity(data);
          this.$swal.fire({
            title: "تم الإضافة بنجاح!",
            icon: "success",
            confirmButtonText: "تم",
          });
        }

        this.closeModal();
        await this.getAllData();
      } catch (error) {
        console.error("Error saving city:", error);

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
      this.editingCity = null;
      this.clearAllErrors();
      this.formLoading = false;
    },

    closeViewModal() {
      this.showViewModal = false;
      this.viewingCity = null;
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

    toggleCityDistricts(cityId) {
      const index = this.expandedCities.indexOf(cityId);
      if (index > -1) {
        this.expandedCities.splice(index, 1);
      } else {
        this.expandedCities.push(cityId);
      }
    },
  },

  async mounted() {
    await this.getAllData();
    await this.getCountries();
    await this.getRegions();
  },
};
</script>
