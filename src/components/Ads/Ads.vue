<template>
  <section class="ads-container mt-5 pt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="section-title mb-0">إدارة الإعلانات</h4>
      <button @click="openAddModal" class="btn-add">
        <i class="fe fe-plus me-1"></i>
        إعلان جديد
      </button>
    </div>

    <!-- Search and Filter Section -->
    <div class="filter-section mb-4">
      <div class="row g-3">
        <div class="col-md-4">
          <input
            type="text"
            class="form-control"
            placeholder="البحث في العنوان..."
            v-model="filters.search"
            @input="debouncedSearch"
          />
        </div>
        <div class="col-md-3">
          <select
            class="form-control"
            v-model="filters.status"
            @change="applyFilters"
          >
            <option value="">جميع الحالات</option>
            <option value="1">نشط</option>
            <option value="0">غير نشط</option>
          </select>
        </div>
        <div class="col-md-2">
          <input
            type="date"
            class="form-control"
            placeholder="من تاريخ"
            v-model="filters.date_from"
            @change="applyFilters"
          />
        </div>
        <div class="col-md-2">
          <input
            type="date"
            class="form-control"
            placeholder="إلى تاريخ"
            v-model="filters.date_to"
            @change="applyFilters"
          />
        </div>
        <div class="col-md-1">
          <button @click="clearFilters" class="btn btn-outline-secondary">
            <i class="fe fe-x"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div class="loading-container" v-if="loading">
      <section class="cate"></section>
      <progress class="pure-material-progress-circular" />
    </div>

    <!-- Content when loaded -->
    <section v-else>
      <!-- Grid view of ads -->
      <div class="row" v-if="myList.length > 0">
        <div
          class="col-md-6 col-lg-4 mb-4"
          v-for="(item, index) in myList"
          :key="item.id"
        >
          <div class="ad-card card">
            <div class="ad-image-container">
              <img :src="item.image" :alt="item.title" class="ad-image" />
              <div
                class="ad-status"
                :class="{ 'status-active': item.is_active }"
              >
                {{ item.is_active ? "نشط" : "غير نشط" }}
              </div>
            </div>

            <div class="ad-content">
              <h5 class="ad-title">{{ item.title }}</h5>
              <p class="ad-link">{{ item.link || "لا يوجد رابط" }}</p>
              <div class="ad-dates">
                <small class="text-muted">
                  من: {{ formatDate(item.start_date) }} - إلى:
                  {{ formatDate(item.end_date) }}
                </small>
              </div>

              <div class="ad-actions">
                <!-- <label class="custom-switch me-3">
                  <input
                    type="checkbox"
                    class="custom-switch-input"
                    :checked="item.is_active"
                    @change="toggleactive(item.id, index)"
                  />
                  <span class="custom-switch-indicator"></span>
                  <span class="custom-switch-description">تفعيل</span>
                </label> -->

                <div class="action-buttons">
                  <button
                    class="btn btn-icon"
                    @click="viewDetails(item.id)"
                    title="عرض التفاصيل"
                  >
                    <i class="fe fe-eye text-primary"></i>
                  </button>
                  <button
                    class="btn btn-icon"
                    @click="edit(item)"
                    title="تعديل"
                  >
                    <i class="fe fe-edit-2 text-info"></i>
                  </button>
                  <button
                    class="btn btn-icon"
                    @click="del(item.id, index, item.title)"
                    title="حذف"
                  >
                    <i class="fe fe-trash text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Empty state -->
      <div class="empty-state" v-else>
        <div class="empty-state-message">لا يوجد إعلانات حتي الان</div>
      </div>
      <!-- Pagination -->
      <div
        class="pagination-container"
        v-if="pagination.total > pagination.per_page"
      >
        <nav>
          <ul class="pagination justify-content-center">
            <li
              class="page-item"
              :class="{ disabled: !pagination.prev_page_url }"
            >
              <button
                class="page-link"
                @click="changePage(pagination.current_page - 1)"
                :disabled="!pagination.prev_page_url"
              >
                السابق
              </button>
            </li>

            <li
              class="page-item"
              v-for="page in visiblePages"
              :key="page"
              :class="{ active: page === pagination.current_page }"
            >
              <button class="page-link" @click="changePage(page)">
                {{ page }}
              </button>
            </li>

            <li
              class="page-item"
              :class="{ disabled: !pagination.next_page_url }"
            >
              <button
                class="page-link"
                @click="changePage(pagination.current_page + 1)"
                :disabled="!pagination.next_page_url"
              >
                التالي
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>

    <!-- View Details Modal -->
    <teleport to="body">
      <b-modal
        id="view-details-modal"
        v-model="ShowDetailsModel"
        hide-footer
        centered
        size="lg"
      >
        <template #modal-header>
          <h5 class="modal-title">تفاصيل الإعلان</h5>
        </template>

        <div class="modal-body-content" v-if="selectedAd">
          <div class="announcement-details">
            <div class="detail-image" v-if="selectedAd.image">
              <img
                :src="selectedAd.image"
                :alt="selectedAd.title"
                class="img-fluid rounded"
              />
            </div>

            <div class="detail-info">
              <h4>{{ selectedAd.title }}</h4>

              <div class="info-row">
                <label>الرابط:</label>
                <span>{{ selectedAd.link || "لا يوجد رابط" }}</span>
              </div>

              <div class="info-row">
                <label>تاريخ البداية:</label>
                <span>{{ formatDate(selectedAd.start_date) }}</span>
              </div>

              <div class="info-row">
                <label>تاريخ النهاية:</label>
                <span>{{ formatDate(selectedAd.end_date) }}</span>
              </div>

              <div class="info-row">
                <label>الحالة:</label>
                <span
                  class="status-badge"
                  :class="{ active: selectedAd.is_active }"
                >
                  {{ selectedAd.is_active ? "نشط" : "غير نشط" }}
                </span>
              </div>

              <div class="info-row">
                <label>تاريخ الإنشاء:</label>
                <span>{{ formatDateTime(selectedAd.created_at) }}</span>
              </div>

              <div class="info-row">
                <label>آخر تحديث:</label>
                <span>{{ formatDateTime(selectedAd.updated_at) }}</span>
              </div>
            </div>
          </div>

          <div class="detail-actions">
            <button @click="edit(selectedAd)" class="btn btn-primary">
              تعديل الإعلان
            </button>
            <button @click="ShowDetailsModel = false" class="btn btn-secondary">
              إغلاق
            </button>
          </div>
        </div>
      </b-modal>
    </teleport>

    <!-- Add Ad Modal -->
    <teleport to="body">
      <b-modal
        id="add-ad-modal"
        v-model="ShowModel"
        hide-footer
        centered
        size="lg"
      >
        <h5 class="modal-title">إضافة إعلان جديد</h5>

        <div class="modal-body-content">
          <form @submit.prevent="add" class="ad-form">
            <div class="row g-3">
              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">عنوان الإعلان *</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('title') }"
                    placeholder="أدخل عنوان الإعلان"
                    v-model="formData.title"
                    required
                  />
                  <div v-if="hasFieldError('title')" class="invalid-feedback">
                    {{ getFieldError("title") }}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">الرابط</label>
                  <div class="input-with-icon">
                    <i class="fe fe-link input-icon"></i>
                    <input
                      type="url"
                      class="form-control"
                      :class="{ 'is-invalid': hasFieldError('link') }"
                      placeholder="أدخل الرابط"
                      v-model="formData.link"
                    />
                  </div>
                  <div v-if="hasFieldError('link')" class="invalid-feedback">
                    {{ getFieldError("link") }}
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">تاريخ البداية *</label>
                  <input
                    type="date"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('start_date') }"
                    v-model="formData.start_date"
                    required
                  />
                  <div
                    v-if="hasFieldError('start_date')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("start_date") }}
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">تاريخ النهاية *</label>
                  <input
                    type="date"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('end_date') }"
                    v-model="formData.end_date"
                    required
                  />
                  <div
                    v-if="hasFieldError('end_date')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("end_date") }}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label class="custom-switch">
                    <input
                      type="checkbox"
                      class="custom-switch-input"
                      v-model="formData.is_active"
                      :true-value="1"
                      :false-value="0"
                    />
                    <span class="custom-switch-indicator"></span>
                    <span class="custom-switch-description">تفعيل الإعلان</span>
                  </label>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">صورة الإعلان</label>
                  <div class="image-upload-container">
                    <div class="image-upload-area" @click="triggerFileInput">
                      <input
                        type="file"
                        ref="fileInput"
                        class="file-input"
                        @change="onFileSelected"
                        accept="image/jpeg, image/png, image/jpg"
                      />
                      <div v-if="!imgurl.length" class="upload-placeholder">
                        <i class="fe fe-upload"></i>
                        <p>اضغط لاختيار صورة</p>
                      </div>
                      <img
                        v-else
                        :src="imgurl"
                        class="preview-image"
                        alt="معاينة الصورة"
                      />
                    </div>
                  </div>
                  <div
                    v-if="hasFieldError('image')"
                    class="invalid-feedback d-block"
                  >
                    {{ getFieldError("image") }}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button
                class="btn btn-primary"
                type="submit"
                :disabled="isLoading || !isFormValid"
              >
                <span v-if="!isLoading"> إضافة الإعلان </span>
                <span v-if="isLoading"> جاري الاضافه... </span>
              </button>

              <button
                class="btn btn-light"
                type="button"
                @click="ShowModel = false"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>

    <!-- Edit Ad Modal -->
    <teleport to="body">
      <b-modal
        id="edit-ad-modal"
        v-model="ShowEditModel"
        hide-footer
        centered
        size="lg"
      >
        <h5 class="modal-title">تعديل الإعلان</h5>

        <div class="modal-body-content">
          <form @submit.prevent="update" class="ad-form">
            <div class="row g-3">
              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">عنوان الإعلان *</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('title') }"
                    placeholder="أدخل عنوان الإعلان"
                    v-model="EditData.title"
                    required
                  />
                  <div v-if="hasFieldError('title')" class="invalid-feedback">
                    {{ getFieldError("title") }}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">الرابط</label>
                  <div class="input-with-icon">
                    <i class="fe fe-link input-icon"></i>
                    <input
                      type="url"
                      class="form-control"
                      :class="{ 'is-invalid': hasFieldError('link') }"
                      placeholder="أدخل الرابط"
                      v-model="EditData.link"
                    />
                  </div>
                  <div v-if="hasFieldError('link')" class="invalid-feedback">
                    {{ getFieldError("link") }}
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">تاريخ البداية *</label>
                  <input
                    type="date"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('start_date') }"
                    v-model="EditData.start_date"
                    required
                  />
                  <div
                    v-if="hasFieldError('start_date')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("start_date") }}
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">تاريخ النهاية *</label>
                  <input
                    type="date"
                    class="form-control"
                    :class="{ 'is-invalid': hasFieldError('end_date') }"
                    v-model="EditData.end_date"
                    required
                  />
                  <div
                    v-if="hasFieldError('end_date')"
                    class="invalid-feedback"
                  >
                    {{ getFieldError("end_date") }}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label class="custom-switch">
                    <input
                      type="checkbox"
                      class="custom-switch-input"
                      v-model="EditData.is_active"
                      :true-value="1"
                      :false-value="0"
                    />
                    <span class="custom-switch-indicator"></span>
                    <span class="custom-switch-description">تفعيل الإعلان</span>
                  </label>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">صورة الإعلان</label>
                  <div class="image-upload-container">
                    <div
                      class="image-upload-area"
                      @click="triggerEditFileInput"
                    >
                      <input
                        type="file"
                        ref="editFileInput"
                        class="file-input"
                        @change="editFileSelected"
                        accept="image/jpeg, image/png, image/jpg"
                      />
                      <img
                        :src="imageedit"
                        class="preview-image"
                        alt="معاينة الصورة"
                      />
                    </div>
                  </div>
                  <div
                    v-if="hasFieldError('image')"
                    class="invalid-feedback d-block"
                  >
                    {{ getFieldError("image") }}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button
                class="btn btn-primary"
                type="submit"
                :disabled="isEditLoading"
              >
                <span v-if="!isEditLoading"> حفظ التغييرات </span>
                <span v-if="isEditLoading"> جاري حفظ التغييرات... </span>
              </button>

              <button
                class="btn btn-light"
                type="button"
                @click="ShowEditModel = false"
              >
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
import Multiselect from "@vueform/multiselect";
import crudDataService from "../../Services/crudDataService.js";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js";

export default {
  mixins: [FormErrorMixin],
  components: {
    Multiselect,
  },
  data() {
    return {
      textimage: "",
      changeedit: true,
      ShowModel: false,
      ShowEditModel: false,
      myList: [],
      id: null,
      imgurl: [],
      imageedit: [],
      loading: false,
      formData: {
        title: "",
        link: "",
        image: "",
        start_date: "",
        end_date: "",
        is_active: 1,
      },
      EditData: {
        title: "",
        link: "",
        image: "",
        start_date: "",
        end_date: "",
        is_active: 1,
      },
      isLoading: false,
      isEditLoading: false,
      ShowDetailsModel: false,
      selectedAd: null,
      filters: {
        search: "",
        status: "",
        date_from: "",
        date_to: "",
        limit: 10,
      },
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        next_page_url: null,
        prev_page_url: null,
      },
      searchTimeout: null,
      // Watched fields for automatic error clearing
      watchedFields: [
        "formData.title",
        "formData.link",
        "formData.start_date",
        "formData.end_date",
        "formData.image",
      ],
    };
  },
  computed: {
    isFormValid() {
      return (
        this.formData.title &&
        this.formData.start_date &&
        this.formData.end_date
      );
    },
    visiblePages() {
      const pages = [];
      const current = this.pagination.current_page;
      const last = this.pagination.last_page;

      // Show 5 pages max around current page
      const start = Math.max(1, current - 2);
      const end = Math.min(last, current + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("ar-EG");
    },
    formatDateTime(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleString("ar-EG");
    },
    handleImageError(event) {
      event.target.src = "/images/placeholder.png";
    },
    async viewDetails(id) {
      try {
        const toast = useToast();
        const res = await crudDataService.getAnnouncement(id);
        this.selectedAd = res.data.data;
        this.ShowDetailsModel = true;
      } catch (error) {
        const toast = useToast();
        toast.error("فشل في تحميل تفاصيل الإعلان", {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    async toggleactive(id, index) {
      try {
        const toast = useToast();
        let res = await crudDataService.toggleAnnouncementStatus(id);

        if (res.data.status === 200) {
          // Update the local data
          this.myList[index].is_active = !this.myList[index].is_active;
          toast.success(res.data.message, {
            position: "top-center",
            timeout: 5000,
          });
        }
      } catch (error) {
        const toast = useToast();
        toast.error("فشل في تغيير حالة الإعلان", {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    debouncedSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.applyFilters();
      }, 500);
    },
    applyFilters() {
      this.pagination.current_page = 1; // Reset to first page
      this.announcements();
    },
    clearFilters() {
      this.filters = {
        search: "",
        status: "",
        date_from: "",
        date_to: "",
        limit: 10,
      };
      this.applyFilters();
    },
    changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.pagination.current_page = page;
        this.announcements();
      }
    },
    async announcements() {
      this.loading = true;

      try {
        const params = {
          ...this.filters,
          page: this.pagination.current_page,
        };

        // Remove empty filters
        Object.keys(params).forEach((key) => {
          if (
            params[key] === "" ||
            params[key] === null ||
            params[key] === undefined
          ) {
            delete params[key];
          }
        });

        let res = await crudDataService.getAnnouncements(params);
        this.myList = res.data.data.data;

        // Update pagination info
        this.pagination = {
          current_page: res.data.data.current_page,
          last_page: res.data.data.last_page,
          per_page: res.data.data.per_page,
          total: res.data.data.total,
          next_page_url: res.data.data.next_page_url,
          prev_page_url: res.data.data.prev_page_url,
        };
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
        const toast = useToast();
        toast.error("فشل في تحميل الإعلانات", {
          position: "top-center",
          timeout: 5000,
        });
      } finally {
        this.loading = false;
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    triggerEditFileInput() {
      this.$refs.editFileInput.click();
    },
    onFileSelected(event) {
      this.formData.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imgurl = reader.result;
      };
      reader.readAsDataURL(this.formData.image);
    },
    editFileSelected(event) {
      console.log(event);
      if (event.target) {
        this.changeedit = false;

        this.EditData.image = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imageedit = reader.result;
        };
        reader.readAsDataURL(this.EditData.image);
      } else {
        this.changeedit = true;

        this.EditData.image = event;
      }
    },
    async edit(data) {
      this.clearAllErrors(); // Clear any previous errors
      this.id = data.id;
      this.ShowEditModel = true;
      this.EditData.title = data.title;
      this.EditData.link = data.link;
      this.EditData.start_date = data.start_date
        ? data.start_date.split("T")[0]
        : "";
      this.EditData.end_date = data.end_date ? data.end_date.split("T")[0] : "";
      this.EditData.is_active = data.is_active ? 1 : 0;
      this.textimage = data.image;
      this.EditData.image = this.editFileSelected(data.image);
      this.imageedit = data.image;
    },
    async update() {
      const toast = useToast();
      this.clearAllErrors(); // Clear previous errors
      this.isEditLoading = true;

      try {
        let res = await crudDataService.updateAnnouncement(
          this.id,
          this.EditData
        );
        this.isEditLoading = false;
        this.ShowEditModel = false;
        this.announcements();
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        this.isEditLoading = false;
        this.handleApiErrors(error, toast);
      }
    },
    async add() {
      const toast = useToast();
      this.clearAllErrors();
      this.isLoading = true;

      if (!this.isFormValid) {
        this.isLoading = false;
        toast.error("يرجى ملء جميع الحقول المطلوبة", {
          position: "top-center",
          timeout: 5000,
        });
        return;
      }

      try {
        let res = await crudDataService.createAnnouncement(this.formData);
        this.isLoading = false;
        this.announcements();
        this.ShowModel = false;
        this.resetForm();

        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      } catch (error) {
        this.isLoading = false;
        this.handleApiErrors(error, toast);
      }
    },
    del(id, index, name) {
      this.$swal
        .fire({
          title: `هل تريد حذف الإعلان "${name}"؟`,
          showCancelButton: true,
          confirmButtonText: "نعم",
          cancelButtonText: "إلغاء",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await crudDataService.deleteAnnouncement(id);
              this.myList.splice(index, 1);
              this.$swal.fire("تم الحذف بنجاح!", "", "success");
            } catch (error) {
              this.$swal.fire("خطأ!", "فشل في حذف الإعلان", "error");
            }
          }
        });
    },
    resetForm() {
      this.formData.title = "";
      this.formData.link = "";
      this.formData.image = "";
      this.formData.start_date = "";
      this.formData.end_date = "";
      this.formData.is_active = 1;
      this.imgurl = "";
      this.clearAllErrors(); // Clear errors when resetting form
    },
    openAddModal() {
      this.clearAllErrors(); // Clear any previous errors
      this.ShowModel = true;
    },
  },
  mounted() {
    this.announcements();
  },
};
</script>

<style scoped lang="scss">
.ads-container {
  padding-bottom: 2rem;
}

.section-title {
  font-weight: 600;
}

.loading-container {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

/* Ad Card Styling */
.ad-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  }
}

.ad-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.ad-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.ad-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.85);
  color: #777;

  &.status-active {
    background-color: rgba(40, 167, 69, 0.85);
    color: white;
  }
}

.ad-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.ad-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.ad-link {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ad-dates {
  margin-bottom: 16px;

  small {
    display: block;
    font-size: 0.8rem;
    color: #999;
  }
}

.ad-actions {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .action-buttons {
    display: flex;
    gap: 8px;
  }
}

.custom-switch {
  display: inline-flex;
  align-items: center;

  .custom-switch-description {
    margin-right: 8px;
    font-size: 0.9rem;
    color: #555;
  }

  .custom-switch-indicator {
    border-radius: 50px;
  }
}

.btn-icon {
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #eee;

  &:hover {
    background: #f8f8f8;
  }
}

.empty-state {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  &-message {
    background: #e66239;
    padding: 20px 30px;
    border-radius: 8px;
    color: white;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    box-shadow: 0 4px 12px rgba(230, 98, 57, 0.2);
  }
}

/* Modal Styling */
.modal-body-content {
  padding: 1rem;
}

.ad-form {
  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-label {
    font-weight: 500;
    margin-bottom: 8px;
    display: block;
  }

  .input-with-icon {
    position: relative;

    .input-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #999;
    }

    .form-control {
      padding-left: 40px;
    }
  }
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1.5rem;

  .btn {
    min-width: 120px;
  }
}

/* Image Upload Styling */
.image-upload-container {
  width: 100%;
}

.image-upload-area {
  position: relative;
  width: 100%;
  height: 200px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #e66239;

    .upload-placeholder {
      color: #e66239;
    }
  }
}

.file-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #777;

  i {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.filter-section {
  background: var(--dark-theme);
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(230, 98, 57, 0.2);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.pagination-container {
  margin-top: 2rem;
}

.announcement-details {
  .detail-image {
    text-align: center;
    margin-bottom: 1.5rem;

    img {
      max-height: 300px;
      object-fit: cover;
    }
  }

  .info-row {
    display: flex;
    margin-bottom: 1rem;

    label {
      font-weight: 600;
      min-width: 120px;
      color: #a2b6ca;
    }
  }

  .status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.875rem;
    background-color: #dc3545;
    color: white;

    &.active {
      background-color: #28a745;
    }
  }
}

.detail-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>

<style lang="scss">
// Modal positioning and overflow fixes
.modal {
  overflow: auto;

  .modal-dialog {
    margin: 1.75rem auto;
    max-height: calc(100vh - 3.5rem);

    @media (max-width: 576px) {
      margin: 0.5rem;
      max-width: none;
      max-height: calc(100vh - 1rem);
    }
  }

  .modal-content {
    border-radius: 8px;
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 3.5rem);
    overflow: hidden;

    @media (max-width: 576px) {
      max-height: calc(100vh - 1rem);
    }
  }

  .modal-header {
    display: none;
  }

  .modal-body {
    max-height: calc(100vh - 50px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;

      &:hover {
        background: #a8a8a8;
      }
    }
  }
}

// Backdrop positioning
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
}

// Ensure proper z-index layering
.modal {
  z-index: 1055;
}
</style>
