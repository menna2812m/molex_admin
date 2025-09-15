<template>
  <div class="main-container container-fluid">
    <div class="page-header">
      <div class="row align-items-center justify-content-between">
        <div class="col">
          <h4 class="">إدارة المناطق</h4>
        </div>
        <div class="col-auto">
          <button @click="handleCreate" class="btn btn-primary btn-icon-text">
            <i class="fe fe-plus me-2"></i>
            إضافة منطقة جديدة
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

    <!-- Regions Table -->
    <div v-else class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered text-nowrap border-bottom">
                <thead>
                  <tr>
                    <th class="border-bottom-0">الاسم</th>
                    <th class="border-bottom-0">البلد</th>
                    <th class="border-bottom-0">عدد المدن</th>
                    <th class="border-bottom-0">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="region in regions" :key="region.id">
                    <tr>
                      <td>{{ region.name }}</td>
                      <td>
                        <span class="badge bg-success">
                          {{ region.country?.name || " -" }}
                        </span>
                      </td>
                      <td>{{ region.cities_count || 0 }}</td>
                      <td>
                        <div class="btn-group gap-2" role="group">
                          <button
                            @click="toggleRegionDetails(region.id)"
                            class="btn btn-secondary btn-sm"
                            title="عرض التفاصيل"
                          >
                            <i class="fe fe-info"></i>
                          </button>

                          <button
                            @click="handleEdit(region)"
                            class="btn btn-primary btn-sm"
                            title="تعديل"
                          >
                            <i class="fe fe-edit-2"></i>
                          </button>
                          <button
                            @click="handleDelete(region.id, region.name)"
                            class="btn btn-danger btn-sm"
                            title="حذف"
                          >
                            <i class="fe fe-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <!-- Expandable Details Row -->
                    <tr v-if="expandedRegions.includes(region.id)">
                      <td colspan="4" class="bg-light">
                        <div class="p-3">
                          <h6 class="text-primary mb-3">
                            <i class="fe fe-map-pin me-2"></i>
                            تفاصيل منطقة {{ region.name }}
                          </h6>

                          <!-- Cities Table -->
                          <div v-if="region.cities && region.cities.length > 0">
                            <h6 class="mb-2">
                              المدن ({{ region.cities.length }})
                            </h6>
                            <div class="table-responsive">
                              <table class="table table-sm table-bordered">
                                <thead class="table-secondary">
                                  <tr>
                                    <th>اسم المدينة</th>
                                    <th>عدد الأحياء</th>
                                    <th>الإجراءات</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <template
                                    v-for="city in region.cities"
                                    :key="city.id"
                                  >
                                    <tr>
                                      <td>{{ city.name }}</td>
                                      <td>
                                        <span class="badge bg-info">{{
                                          city.districts_count || 0
                                        }}</span>
                                      </td>
                                      <td>
                                        <button
                                          @click="toggleCityDistricts(city.id)"
                                          class="btn btn-outline-primary btn-xs"
                                          title="عرض الأحياء"
                                        >
                                          <i class="fe fe-list"></i>
                                          الأحياء
                                        </button>
                                      </td>
                                    </tr>
                                    <!-- Expandable Districts Row -->
                                    <tr v-if="expandedCities.includes(city.id)">
                                      <td colspan="3" class="bg-light">
                                        <div class="p-2">
                                          <h6 class="text-secondary mb-2">
                                            <i class="fe fe-home me-2"></i>
                                            أحياء مدينة {{ city.name }}
                                          </h6>
                                          <div
                                            v-if="
                                              city.districts &&
                                              city.districts.length > 0
                                            "
                                            class="row g-2"
                                          >
                                            <div
                                              v-for="district in city.districts"
                                              :key="district.id"
                                              class="col-md-4 col-sm-6"
                                            >
                                              <div class="card card-body py-2">
                                                <small class="text-muted">{{
                                                  district.name
                                                }}</small>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            v-else
                                            class="alert alert-info py-2"
                                          >
                                            <small
                                              >لا توجد أحياء في هذه
                                              المدينة</small
                                            >
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </template>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div v-else class="alert alert-warning py-2">
                            <small>لا توجد مدن في هذه المنطقة</small>
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
        id="region-modal"
        v-model="showModal"
        hide-footer
        :title="editingRegion ? 'تعديل المنطقة' : 'إضافة منطقة جديدة'"
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
                :class="{ 'is-invalid': hasFieldError('name_ar') }"
                required
                @input="clearFieldError('name_ar')"
              />
              <div v-if="hasFieldError('name_ar')" class="invalid-feedback">
                {{ getFieldError("name_ar") }}
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
                :class="{ 'is-invalid': hasFieldError('name_en') }"
                required
                @input="clearFieldError('name_en')"
              />
              <div v-if="hasFieldError('name_en')" class="invalid-feedback">
                {{ getFieldError("name_en") }}
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <label class="form-label"
                >البلد <span class="text-red">*</span></label
              >
              <select
                v-model="formData.country_id"
                class="form-control"
                :class="{ 'is-invalid': hasFieldError('country_id') }"
                required
                @change="clearFieldError('country_id')"
              >
                <option value="">اختر البلد</option>
                <option
                  v-for="country in countries"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </select>
              <div v-if="hasFieldError('country_id')" class="invalid-feedback">
                {{ getFieldError("country_id") }}
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
              {{ editingRegion ? "تحديث" : "إضافة" }}
            </button>
          </div>
        </form>
      </b-modal>
    </teleport>
  </div>
</template>

<script>
import { useRegionsApi } from "../../composables/useRegionsApi.js";
import { useCountriesApi } from "../../composables/useCountriesApi.js";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";

export default {
  name: "RegionsPage",
  mixins: [FormErrorMixin],
  data() {
    return {
      regions: [],
      countries: [],
      loading: false,
      formLoading: false,
      error: null,
      page: 1,
      last: 1,
      selectedCountryId: 1,
      showModal: false,
      showViewModal: false,
      editingRegion: null,
      viewingRegion: null,
      expandedRegions: [],
      expandedCities: [],
      formData: {
        name: {
          ar: "",
          en: "",
        },
        country_id: "",
      },
      watchedFields: [
        "formData.name",
        "formData.name_ar",
        "formData.name_en",
        "formData.country_id",
      ],
    };
  },

  methods: {
    async getAllData() {
      this.loading = true;
      const regionsApi = useRegionsApi();
      await regionsApi.fetchRegions(this.page, 9999, this.selectedCountryId);
      this.regions = regionsApi.regions.value;
      this.error = regionsApi.error.value;
      this.loading = regionsApi.loading.value;
    },

    async getCountries() {
      const countriesApi = useCountriesApi();
      await countriesApi.fetchCountries();
      this.countries = countriesApi.countries.value;
    },

    async paginag(p) {
      this.page = p;
      await this.getAllData();
    },

    handleCreate() {
      this.editingRegion = null;
      this.clearAllErrors(); // Clear previous errors
      this.formData = {
        name: {
          ar: "",
          en: "",
        },
        country_id: "",
      };
      this.showModal = true;
    },

    handleEdit(region) {
      this.editingRegion = region;
      this.clearAllErrors(); // Clear previous errors
      this.formData = {
        name: {
          ar: region.name_ar || "",
          en: region.name_en || "",
        },
        country_id: (region.country_id || region.country?.id || "").toString(),
      };
      this.showModal = true;
    },

    async handleView(id) {
      try {
        const regionsApi = useRegionsApi();
        this.viewingRegion = await regionsApi.getRegionById(id);
        this.showViewModal = true;
      } catch (error) {
        console.error("Error fetching region details:", error);
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
              const regionsApi = useRegionsApi();
              await regionsApi.deleteRegion(id);
              this.$swal.fire({
                title: "تم الحذف بنجاح!",
                icon: "success",
                confirmButtonText: "تم",
              });
              await this.getAllData();
            } catch (error) {
              console.error("Error deleting region:", error);
            }
          }
        });
    },

    async handleSave() {
      try {
        this.formLoading = true;
        this.clearAllErrors();

        const regionsApi = useRegionsApi();
        const data = {
          name: {
            ar: this.formData.name.ar,
            en: this.formData.name.en,
          },
          country_id: parseInt(this.formData.country_id),
        };

        if (this.editingRegion) {
          await regionsApi.updateRegion(this.editingRegion.id, data);
          this.$swal.fire({
            title: "تم التحديث بنجاح!",
            icon: "success",
            confirmButtonText: "تم",
          });
        } else {
          await regionsApi.createRegion(data);
          this.$swal.fire({
            title: "تم الإضافة بنجاح!",
            icon: "success",
            confirmButtonText: "تم",
          });
        }

        this.closeModal();
        await this.getAllData();
      } catch (error) {
        console.error("Error saving region:", error);

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
      this.editingRegion = null;
      this.clearAllErrors();
      this.formLoading = false;
    },

    closeViewModal() {
      this.showViewModal = false;
      this.viewingRegion = null;
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

    toggleRegionDetails(regionId) {
      const index = this.expandedRegions.indexOf(regionId);
      if (index > -1) {
        this.expandedRegions.splice(index, 1);
        // Also close any expanded cities in this region
        this.expandedCities = [];
      } else {
        this.expandedRegions.push(regionId);
      }
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
  },
};
</script>
