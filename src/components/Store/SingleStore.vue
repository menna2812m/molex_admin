<template>
  <section v-if="onestore">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <h4 class="mb-0">المتجر</h4>
            <h4 class="px-2">اسم المتجر : {{ onestore.name }}</h4>
          </div>
          <div class="row align-items-center justify-content-center pt-3">
            <div class="row pb-2">
              <h4>تفاصيل التاجر</h4>
              <div class="col-lg-2 text-center">
                <!-- Store image placeholder -->
              </div>
              <div
                class="col-lg-9"
                v-for="vendor in onestore.vendors"
                :key="vendor.id"
              >
                <div>
                  <h5 class="px-2">
                    اسم التاجر :
                    <span class="text-muted">{{ vendor.name }}</span>
                  </h5>
                  <h5 class="px-2">
                    البريد الالكتروني :
                    <a :href="'mailto:' + vendor.email" class="text-muted">{{
                      vendor.email
                    }}</a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button @click="ShowModel = true" class="btn-add m-2">
              <i class="fe fe-plus"></i>
              إضافة منتج جديد
            </button>
            <vue-good-table
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
                <span
                  v-if="props.column.field === 'cover_image'"
                  class="imgetext"
                >
                  <img
                    :src="props.formattedRow[props.column.field]"
                    class="imagetable"
                    width="150"
                    height="100"
                  />
                </span>
                <span v-if="props.column.field == 'actions'">
                  <button
                    class="btn btn-primary me-2"
                    @click="edit(props.row)"
                    v-if="perminlocal.includes('products-update')"
                    v-b-modal.modal-center
                  >
                    <i class="fe fe-edit-2"></i>
                  </button>

                  <button
                    class="btn btn-danger me-2"
                    v-if="perminlocal.includes('products-destroy')"
                    @click="del(props.row.id, props.index, props.row.name)"
                  >
                    <i class="fe fe-trash"></i>
                  </button>
                </span>
              </template>
            </vue-good-table>

            <!-- Add Product Modal -->
            <teleport to="body">
              <b-modal
                id="add-page"
                v-model="ShowModel"
                hide-footer
                class="add"
                title="إضافة منتج"
                modal-class="store-model"
              >
                <div class="row pos-relative" style="z-index: 5555">
                  <div class="col-lg-12">
                    <form ref="anyName" @submit.prevent="add">
                      <div class="row">
                        <!-- Arabic Name -->
                        <div class="col-md-6 mt-3">
                          <label for=""> الإسم عربي </label>
                          <input
                            type="text"
                            placeholder=""
                            v-model="formData.name.ar"
                            class="form-control"
                            :class="{ 'is-invalid': hasFieldError('name.ar') }"
                            @input="clearFieldError('name.ar')"
                          />
                          <div
                            v-if="hasFieldError('name.ar')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("name.ar") }}
                          </div>
                        </div>

                        <!-- English Name -->
                        <div class="col-md-6 mt-3">
                          <label for="">الإسم انجليزي</label>
                          <input
                            type="text"
                            placeholder=""
                            v-model="formData.name.en"
                            class="form-control"
                            :class="{ 'is-invalid': hasFieldError('name.en') }"
                            @input="clearFieldError('name.en')"
                          />
                          <div
                            v-if="hasFieldError('name.en')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("name.en") }}
                          </div>
                        </div>

                        <!-- Arabic Description -->
                        <div
                          class="col-md-6 mt-3"
                          :class="{
                            'ckeditor-error': hasFieldError('description.en'),
                          }"
                        >
                          <label for="">الوصف عربي</label>
                          <ckeditor
                            :editor="editor"
                            v-model="formData.description.ar"
                            :editorConfigs="editorConfigs"
                            @input="clearFieldError('description.ar')"
                          ></ckeditor>
                          <div
                            v-if="hasFieldError('description.ar')"
                            class="text-danger small mt-1"
                          >
                            {{ getFieldError("description.ar") }}
                          </div>
                        </div>

                        <!-- English Description -->
                        <div
                          class="col-md-6 mt-3"
                          :class="{
                            'ckeditor-error': hasFieldError('description.en'),
                          }"
                        >
                          <label for="">الوصف انجليزي</label>
                          <ckeditor
                            :editor="editor"
                            v-model="formData.description.en"
                            :editorConfigs="editorConfigs"
                            @input="clearFieldError('description.en')"
                          ></ckeditor>
                          <div
                            v-if="hasFieldError('description.en')"
                            class="text-danger small mt-1"
                          >
                            {{ getFieldError("description.en") }}
                          </div>
                        </div>

                        <!-- Brand Selection -->
                        <div class="col-md-6 mt-3">
                          <label for=""> اختر العلامة التجارية </label>
                          <Multiselect
                            label="name"
                            :searchable="true"
                            :options="Selectbrand"
                            placeholder="اختر العلامة التجارية"
                            v-model="formData.brand_id"
                            :class="{ 'is-invalid': hasFieldError('brand_id') }"
                            @select="clearFieldError('brand_id')"
                          />
                          <div
                            v-if="hasFieldError('brand_id')"
                            class="text-danger small mt-1"
                          >
                            {{ getFieldError("brand_id") }}
                          </div>
                        </div>

                        <!-- Categories Selection -->
                        <div class="col-md-6 mt-3">
                          <label for=""> اختر القسم </label>
                          <Multiselect
                            label="name"
                            :searchable="true"
                            :options="Selectcategories"
                            placeholder="اختر القسم "
                            v-model="formData.categories_ids"
                            mode="tags"
                            :close-on-select="true"
                            group-values="options"
                            group-label="name"
                            class="itteemm"
                            :class="{
                              'is-invalid': hasFieldError('categories_ids'),
                            }"
                            @select="clearFieldError('categories_ids')"
                          >
                            <template v-slot:option="{ option }">
                              <div
                                :style="getOptionStyle(option)"
                                style="
                                  padding: 10px;
                                  width: 100%;
                                  text-align: right;
                                  margin-bottom: 2px;
                                "
                              >
                                {{ option.name }}
                              </div>
                            </template>
                          </Multiselect>
                          <div
                            v-if="hasFieldError('categories_ids')"
                            class="text-danger small mt-1"
                          >
                            {{ getFieldError("categories_ids") }}
                          </div>
                        </div>

                        <!-- Base Price -->
                        <div class="col-md-6 mt-3">
                          <label for=""> السعر الأساسي</label>
                          <input
                            type="number"
                            step="0.01"
                            placeholder=""
                            v-model="formData.base_price"
                            class="form-control"
                            :class="{
                              'is-invalid': hasFieldError('base_price'),
                            }"
                            @input="clearFieldError('base_price')"
                          />
                          <div
                            v-if="hasFieldError('base_price')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("base_price") }}
                          </div>
                        </div>

                        <!-- SEO URL -->
                        <div class="col-md-6 mt-3">
                          <label for=""> لينك seo </label>
                          <input
                            type="text"
                            placeholder=""
                            v-model="formData.seo_url"
                            class="form-control"
                            :class="{ 'is-invalid': hasFieldError('seo_url') }"
                            @input="clearFieldError('seo_url')"
                          />
                          <div
                            v-if="hasFieldError('seo_url')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("seo_url") }}
                          </div>
                        </div>

                        <!-- SEO Title -->
                        <div class="col-md-6 mt-3">
                          <label for=""> عنوان seo </label>
                          <input
                            type="text"
                            placeholder=""
                            v-model="formData.seo_title"
                            class="form-control"
                            :class="{
                              'is-invalid': hasFieldError('seo_title'),
                            }"
                            @input="clearFieldError('seo_title')"
                          />
                          <div
                            v-if="hasFieldError('seo_title')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("seo_title") }}
                          </div>
                        </div>

                        <!-- SEO Description -->
                        <div class="col-md-6 mt-3">
                          <label for=""> وصف seo </label>
                          <input
                            type="text"
                            placeholder=""
                            v-model="formData.seo_description"
                            class="form-control"
                            :class="{
                              'is-invalid': hasFieldError('seo_description'),
                            }"
                            @input="clearFieldError('seo_description')"
                          />
                          <div
                            v-if="hasFieldError('seo_description')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("seo_description") }}
                          </div>
                        </div>

                        <!-- Barcode -->
                        <div class="col-md-6 mt-3">
                          <label for=""> باركود </label>
                          <input
                            type="text"
                            placeholder=""
                            v-model="formData.barcode"
                            class="form-control"
                            :class="{ 'is-invalid': hasFieldError('barcode') }"
                            @input="clearFieldError('barcode')"
                          />
                          <div
                            v-if="hasFieldError('barcode')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("barcode") }}
                          </div>
                        </div>

                        <!-- Quantity -->
                        <div class="col-md-6 mt-3">
                          <label for=""> كمية </label>
                          <input
                            type="number"
                            placeholder=""
                            v-model="formData.quantity"
                            class="form-control"
                            :class="{ 'is-invalid': hasFieldError('quantity') }"
                            @input="clearFieldError('quantity')"
                          />
                          <div
                            v-if="hasFieldError('quantity')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("quantity") }}
                          </div>
                        </div>

                        <!-- Price -->
                        <div class="col-md-6 mt-3">
                          <label for=""> السعر </label>
                          <input
                            type="number"
                            step="0.01"
                            placeholder=""
                            v-model="formData.price"
                            class="form-control"
                            :class="{ 'is-invalid': hasFieldError('price') }"
                            @input="clearFieldError('price')"
                          />
                          <div
                            v-if="hasFieldError('price')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("price") }}
                          </div>
                        </div>

                        <!-- Cost Price -->
                        <div class="col-md-6 mt-3">
                          <label for=""> سعر الكلفة </label>
                          <input
                            type="number"
                            step="0.01"
                            placeholder=""
                            v-model="formData.cost_price"
                            class="form-control"
                            :class="{
                              'is-invalid': hasFieldError('cost_price'),
                            }"
                            @input="clearFieldError('cost_price')"
                          />
                          <div
                            v-if="hasFieldError('cost_price')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("cost_price") }}
                          </div>
                        </div>

                        <!-- Discounted Price -->
                        <div class="col-md-6 mt-3">
                          <label for=""> السعر بعد الخصم</label>
                          <input
                            type="number"
                            step="0.01"
                            placeholder=""
                            v-model="formData.discounted_price"
                            class="form-control"
                            :class="{
                              'is-invalid': hasFieldError('discounted_price'),
                            }"
                            @input="clearFieldError('discounted_price')"
                          />
                          <div
                            v-if="hasFieldError('discounted_price')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("discounted_price") }}
                          </div>
                        </div>

                        <!-- Discount End Date -->
                        <div class="col-md-6 mt-3">
                          <label for=""> تاريخ انتهاء الخصم </label>
                          <input
                            type="date"
                            placeholder=""
                            v-model="formData.discount_end_date"
                            class="form-control"
                            :class="{
                              'is-invalid': hasFieldError('discount_end_date'),
                            }"
                            @input="clearFieldError('discount_end_date')"
                          />
                          <div
                            v-if="hasFieldError('discount_end_date')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("discount_end_date") }}
                          </div>
                        </div>

                        <!-- Images -->
                        <div class="col-md-12 mt-3">
                          <label for="">الصوره</label>
                          <div class="form-group">
                            <input
                              type="file"
                              @change="handleFileChange"
                              accept=".pdf, image/jpeg, image/png"
                              class="form-control"
                              :class="{ 'is-invalid': hasFieldError('images') }"
                              multiple
                            />
                            <div
                              v-if="hasFieldError('images')"
                              class="invalid-feedback"
                            >
                              {{ getFieldError("images") }}
                            </div>
                            <div class="d-flex flex-wrap mt-2">
                              <img
                                :src="url.path"
                                alt="Preview Image"
                                style="
                                  width: 200px;
                                  height: 200px;
                                  object-fit: fill;
                                "
                                class="m-1"
                                v-for="(url, index) in imageUrl"
                                :key="index"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        class="btn btn-primary m-auto d-block"
                        :disabled="isSubmitting"
                      >
                        <span v-if="isSubmitting">جاري الإضافة...</span>
                        <span v-else>إضافة</span>
                      </button>
                    </form>
                  </div>
                </div>
              </b-modal>
            </teleport>

            <!-- Edit Product Modal -->
            <teleport to="body">
              <b-modal
                id="edit-page"
                v-model="ShowModelEdit"
                hide-footer
                class="edit"
                title="تعديل منتج "
                centered
                modal-class="store-model"
              >
                <div class="row pos-relative" style="z-index: 5555">
                  <div class="col-lg-12">
                    <div class="row">
                      <!-- Arabic Name -->
                      <div class="col-md-6 mt-1">
                        <label for=""> الإسم عربي </label>
                        <input
                          type="text"
                          placeholder=""
                          v-model="formEdit.name.ar"
                          class="form-control"
                          :class="{ 'is-invalid': hasFieldError('name.ar') }"
                          @input="clearFieldError('name.ar')"
                        />
                        <div
                          v-if="hasFieldError('name.ar')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("name.ar") }}
                        </div>
                      </div>

                      <!-- English Name -->
                      <div class="col-md-6 mt-1">
                        <label for="">الإسم انجليزي</label>
                        <input
                          type="text"
                          placeholder=""
                          v-model="formEdit.name.en"
                          class="form-control"
                          :class="{ 'is-invalid': hasFieldError('name.en') }"
                          @input="clearFieldError('name.en')"
                        />
                        <div
                          v-if="hasFieldError('name.en')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("name.en") }}
                        </div>
                      </div>

                      <!-- Arabic Description -->
                      <div class="col-md-6 mt-1">
                        <label for="">الوصف عربي</label>
                        <div
                          class="ckeditor-wrapper"
                          :class="{
                            'ckeditor-error': hasFieldError('description.ar'),
                          }"
                        >
                          <ckeditor
                            :editor="editor"
                            v-model="formEdit.description.ar"
                            :editorConfigs="editorConfigs"
                            @input="clearFieldError('description.ar')"
                          ></ckeditor>
                        </div>
                        <div
                          v-if="hasFieldError('description.ar')"
                          class="text-danger small mt-1"
                        >
                          {{ getFieldError("description.ar") }}
                        </div>
                      </div>

                      <!-- English Description -->
                      <div class="col-md-6 mt-1">
                        <label for="">الوصف انجليزي</label>
                        <div
                          class="ckeditor-wrapper"
                          :class="{
                            'ckeditor-error': hasFieldError('description.en'),
                          }"
                        >
                          <ckeditor
                            :editor="editor"
                            v-model="formEdit.description.en"
                            :editorConfigs="editorConfigs"
                            @input="clearFieldError('description.en')"
                          ></ckeditor>
                        </div>
                        <div
                          v-if="hasFieldError('description.en')"
                          class="text-danger small mt-1"
                        >
                          {{ getFieldError("description.en") }}
                        </div>
                      </div>

                      <!-- Brand Selection -->
                      <div class="col-md-6 mt-1">
                        <label for=""> اختر العلامة التجارية </label>
                        <Multiselect
                          label="name"
                          :searchable="true"
                          :options="Selectbrand"
                          placeholder="اختر العلامة التجارية"
                          v-model="formEdit.brand_id"
                          :class="{ 'is-invalid': hasFieldError('brand_id') }"
                          @select="clearFieldError('brand_id')"
                        />
                        <div
                          v-if="hasFieldError('brand_id')"
                          class="text-danger small mt-1"
                        >
                          {{ getFieldError("brand_id") }}
                        </div>
                      </div>

                      <!-- Categories Selection -->
                      <div class="col-md-6 mt-1">
                        <label for=""> اختر القسم </label>
                        <Multiselect
                          label="name"
                          :searchable="true"
                          :options="Selectcategories"
                          placeholder="اختر القسم "
                          v-model="formEdit.categories_ids"
                          mode="tags"
                          :close-on-select="false"
                          group-values="options"
                          group-label="name"
                          class="itteemm"
                          :class="{
                            'is-invalid': hasFieldError('categories_ids'),
                          }"
                          @select="clearFieldError('categories_ids')"
                        >
                          <template v-slot:option="{ option }">
                            <div
                              :style="getOptionStyle(option)"
                              style="
                                padding: 10px;
                                width: 100%;
                                text-align: right;
                                margin-bottom: 2px;
                              "
                            >
                              {{ option.name }}
                            </div>
                          </template>
                        </Multiselect>
                        <div
                          v-if="hasFieldError('categories_ids')"
                          class="text-danger small mt-1"
                        >
                          {{ getFieldError("categories_ids") }}
                        </div>
                      </div>

                      <!-- Base Price -->
                      <div class="col-md-6 mt-1">
                        <label for=""> السعر الأساسي</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder=""
                          v-model="formEdit.base_price"
                          class="form-control"
                          :class="{ 'is-invalid': hasFieldError('base_price') }"
                          @input="clearFieldError('base_price')"
                        />
                        <div
                          v-if="hasFieldError('base_price')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("base_price") }}
                        </div>
                      </div>

                      <!-- SEO URL -->
                      <div class="col-md-6 mt-1">
                        <label for=""> لينك seo </label>
                        <input
                          type="text"
                          placeholder=""
                          v-model="formEdit.seo_url"
                          class="form-control"
                          :class="{ 'is-invalid': hasFieldError('seo_url') }"
                          @input="clearFieldError('seo_url')"
                        />
                        <div
                          v-if="hasFieldError('seo_url')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("seo_url") }}
                        </div>
                      </div>

                      <!-- SEO Title -->
                      <div class="col-md-6 mt-1">
                        <label for=""> عنوان seo </label>
                        <input
                          type="text"
                          placeholder=""
                          v-model="formEdit.seo_title"
                          class="form-control"
                          :class="{ 'is-invalid': hasFieldError('seo_title') }"
                          @input="clearFieldError('seo_title')"
                        />
                        <div
                          v-if="hasFieldError('seo_title')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("seo_title") }}
                        </div>
                      </div>

                      <!-- SEO Description -->
                      <div class="col-md-6 mt-1">
                        <label for=""> وصف seo </label>
                        <input
                          type="text"
                          placeholder=""
                          v-model="formEdit.seo_description"
                          class="form-control"
                          :class="{
                            'is-invalid': hasFieldError('seo_description'),
                          }"
                          @input="clearFieldError('seo_description')"
                        />
                        <div
                          v-if="hasFieldError('seo_description')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("seo_description") }}
                        </div>
                      </div>

                      <!-- Barcode -->
                      <div class="col-md-6 mt-1">
                        <label for=""> باركود </label>
                        <input
                          type="text"
                          placeholder=""
                          v-model="formEdit.barcode"
                          class="form-control"
                          :class="{ 'is-invalid': hasFieldError('barcode') }"
                          @input="clearFieldError('barcode')"
                        />
                        <div
                          v-if="hasFieldError('barcode')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("barcode") }}
                        </div>
                      </div>

                      <!-- Quantity -->
                      <div class="col-md-6 mt-1">
                        <label for=""> كمية </label>
                        <input
                          type="number"
                          placeholder=""
                          v-model="formEdit.quantity"
                          class="form-control"
                          :class="{ 'is-invalid': hasFieldError('quantity') }"
                          @input="clearFieldError('quantity')"
                        />
                        <div
                          v-if="hasFieldError('quantity')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("quantity") }}
                        </div>
                      </div>

                      <!-- Price -->
                      <div class="col-md-6 mt-1">
                        <label for=""> السعر </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder=""
                          v-model="formEdit.price"
                          class="form-control"
                          :class="{ 'is-invalid': hasFieldError('price') }"
                          @input="clearFieldError('price')"
                        />
                        <div
                          v-if="hasFieldError('price')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("price") }}
                        </div>
                      </div>

                      <!-- Cost Price -->
                      <div class="col-md-6 mt-1">
                        <label for=""> سعر الكلفة </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder=""
                          v-model="formEdit.cost_price"
                          class="form-control"
                          :class="{ 'is-invalid': hasFieldError('cost_price') }"
                          @input="clearFieldError('cost_price')"
                        />
                        <div
                          v-if="hasFieldError('cost_price')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("cost_price") }}
                        </div>
                      </div>

                      <!-- Discounted Price -->
                      <div class="col-md-6 mt-1">
                        <label for=""> السعر بعد الخصم</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder=""
                          v-model="formEdit.discounted_price"
                          class="form-control"
                          :class="{
                            'is-invalid': hasFieldError('discounted_price'),
                          }"
                          @input="clearFieldError('discounted_price')"
                        />
                        <div
                          v-if="hasFieldError('discounted_price')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("discounted_price") }}
                        </div>
                      </div>

                      <!-- Discount End Date -->
                      <div class="col-md-6 mt-1">
                        <label for=""> تاريخ انتهاء الخصم </label>
                        <input
                          type="date"
                          placeholder=""
                          v-model="formEdit.discount_end_date"
                          class="form-control"
                          :class="{
                            'is-invalid': hasFieldError('discount_end_date'),
                          }"
                          @input="clearFieldError('discount_end_date')"
                        />
                        <div
                          v-if="hasFieldError('discount_end_date')"
                          class="invalid-feedback"
                        >
                          {{ getFieldError("discount_end_date") }}
                        </div>
                      </div>

                      <!-- Images -->
                      <div class="col-md-12 mt-3">
                        <label for="">الصوره</label>
                        <div class="form-group">
                          <input
                            type="file"
                            @change="handleFileedit"
                            accept=".pdf, image/jpeg, image/png"
                            class="form-control"
                            :class="{ 'is-invalid': hasFieldError('images') }"
                            multiple
                          />
                          <div
                            v-if="hasFieldError('images')"
                            class="invalid-feedback"
                          >
                            {{ getFieldError("images") }}
                          </div>
                          <div class="d-flex flex-wrap mt-2">
                            <div
                              v-for="(url, index) in imageedit"
                              :key="index"
                              class="d-flex position-relative"
                            >
                              <img
                                :src="url.path"
                                alt="Preview Image"
                                style="
                                  width: 200px;
                                  height: 200px;
                                  object-fit: fill;
                                "
                                class="m-1"
                              />
                              <span
                                class="si si-close text-danger bg-white rounded-circle p-1 position-absolute"
                                @click="removeimage(index)"
                                style="
                                  top: 5px;
                                  right: 10px;
                                  cursor: pointer;
                                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                                "
                              ></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      class="btn btn-primary m-auto d-block mt-3"
                      @click="update"
                      :disabled="isSubmitting"
                    >
                      <span v-if="isSubmitting">جاري التعديل...</span>
                      <span v-else>تعديل</span>
                    </button>
                  </div>
                </div>
              </b-modal>
            </teleport>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    class="position-relative"
    style="height: 100vh; display: grid; place-items: center"
    v-else
  >
    <section class="cate"></section>
    <progress class="pure-material-progress-circular" />
  </section>
</template>

<script>
import { reactive } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import crudDataService from "../../Services/crudDataService.js";
import Multiselect from "@vueform/multiselect";
import { FormErrorMixin } from "../../mixins/FormErrorMixin.js"; // Import the mixin
import { useToast } from "vue-toastification"; // Assuming you're using vue-toastification

export default {
  components: {
    Multiselect,
  },
  mixins: [FormErrorMixin], // Apply the mixin
  setup() {
    const editorConfigs = reactive({});
    const toast = useToast(); // Initialize toast
    return { editor: ClassicEditor, editorConfigs, toast };
  },
  data() {
    return {
      isSubmitting: false,
      perminlocal: localStorage.getItem("permissions"),
      // Define fields to watch for automatic error clearing
      watchedFields: [
        "formData.name.ar",
        "formData.name.en",
        "formData.description.ar",
        "formData.description.en",
        "formData.brand_id",
        "formData.categories_ids",
        "formData.base_price",
        "formData.price",
        "formData.quantity",
        "formData.cost_price",
        "formData.discounted_price",
        "formData.barcode",
        "formData.seo_url",
        "formData.seo_title",
        "formData.seo_description",
        "formData.discount_end_date",
      ],
      columns: [
        {
          label: "الصوره",
          field: "cover_image",
        },
        {
          label: "الإسم",
          field: "name.ar",
        },
        {
          label: "السعر",
          field: "current_price",
        },
        {
          label: "الماركة",
          field: "brand.name.ar",
        },
        {
          label: "فعل",
          field: "actions",
        },
      ],
      rows: [],
      onestore: null,
      Selectcategories: [],
      Selectbrand: [],
      imageUrl: [],
      imageedit: [],
      ShowModel: false,
      ShowModelEdit: false,
      formData: {
        name: {
          ar: "",
          en: "",
        },
        description: {
          ar: "",
          en: "",
        },
        base_price: "",
        seo_url: "",
        seo_title: "",
        seo_description: "",
        barcode: "",
        quantity: "",
        price: "",
        cost_price: "",
        discounted_price: "",
        discount_end_date: "",
        categories_ids: [],
        images: [],
        brand_id: "",
      },
      formEdit: {
        name: {
          ar: "",
          en: "",
        },
        description: {
          ar: "",
          en: "",
        },
        base_price: "",
        seo_url: "",
        seo_title: "",
        seo_description: "",
        barcode: "",
        quantity: "",
        price: "",
        cost_price: "",
        discounted_price: "",
        discount_end_date: "",
        categories_ids: [],
        images: [],
        brand_id: "",
      },
      id: null,
    };
  },
  methods: {
    async getstore() {
      try {
        const res = await crudDataService.get(
          "stores",
          `${this.$route.params.id}`
        );
        this.onestore = res.data.data;
        this.rows = res.data.data.products.map((product) => {
          return { ...product };
        });
        this.Selectcategories = res.data.data.categories.map((ele) => ({
          value: ele.id,
          name: ele.name.ar,
        }));
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    getOptionStyle(option) {
      return {
        background: option.options ? "#d6d8dddb" : "",
      };
    },

    handleFileChange(event) {
      const files = event.target.files;
      this.formData.images = [];
      this.imageUrl = [];

      // Clear any existing file errors
      this.clearFieldError("images");

      Array.from(files).forEach((file) => {
        // Validate file size (example: max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          this.setFieldErrors({
            images: ["حجم الملف يجب أن يكون أقل من 2 ميجابايت"],
          });
          return;
        }

        this.formData.images.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl.push({
            path: e.target.result,
            thumbnail: e.target.result,
          });
        };
        reader.readAsDataURL(file);
      });
    },

    removeimage(index) {
      this.imageedit.splice(index, 1);
    },

    handleFileedit(event) {
      const files = event.target.files;
      this.formEdit.images = [];

      Array.from(files).forEach((file) => {
        this.formEdit.images.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageedit.push({
            path: e.target.result,
            thumbnail: e.target.result,
          });
        };
        reader.readAsDataURL(file);
      });
    },

    async getbrands() {
      try {
        const res = await crudDataService.getAll("brands");
        this.Selectbrand = res.data.data.data.map((ele) => ({
          value: ele.id,
          name: ele.name,
        }));
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      }
    },

    // Validation rules for the form
    getValidationRules() {
      return {
        "name.ar": { required: true, label: "الاسم بالعربية" },
        "name.en": { required: true, label: "الاسم بالإنجليزية" },
        "description.ar": { required: true, label: "الوصف بالعربي" },
        "description.en": { required: true, label: "الوصف بالإنجليزية" },
        base_price: { required: true, label: "السعر الأساسي" },
        price: { required: true, label: "السعر" },
        quantity: { required: true, label: "الكمية" },
        brand_id: { required: true, label: "العلامة التجارية" },
        categories_ids: { required: true, label: "الأقسام" },
        images: { required: true, label: "الصورة" },
      };
    },

    async add() {
      // Clear previous errors
      this.clearAllErrors();

      // Validate form
      if (!this.validateForm(this.getValidationRules())) {
        return;
      }

      this.isSubmitting = true;

      try {
        await crudDataService.create(
          `stores/${this.$route.params.id}/products`,
          this.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Success
        this.ShowModel = false;
        this.resetFormData();
        this.getstore();

        this.toast.success("تم إضافة المنتج بنجاح", {
          position: "top-right",
          timeout: 3000,
        });
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      } finally {
        this.isSubmitting = false;
      }
    },

    resetFormData() {
      this.formData = {
        name: { ar: "", en: "" },
        description: { ar: "", en: "" },
        base_price: "",
        seo_url: "",
        seo_title: "",
        seo_description: "",
        barcode: "",
        quantity: "",
        price: "",
        cost_price: "",
        discounted_price: "",
        discount_end_date: "",
        categories_ids: [],
        images: [],
        brand_id: "",
      };
      this.imageUrl = [];
      this.clearAllErrors();
    },

    async edit(data) {
      this.clearAllErrors();
      this.id = data.id;
      this.ShowModelEdit = true;

      // Populate edit form
      this.formEdit.name.ar = data.name.ar;
      this.formEdit.description.ar = data.description.ar;
      this.formEdit.brand_id = data.brand ? data.brand.id : "";
      this.formEdit.name.en = data.name.en;
      this.formEdit.description.en = data.description.en;
      this.formEdit.barcode = data.barcode;
      this.formEdit.base_price = data.base_price;
      this.formEdit.seo_url = data.seo_url;
      this.formEdit.seo_title = data.seo_title;
      this.formEdit.seo_description = data.seo_description;
      this.formEdit.quantity = data.quantity;
      this.formEdit.price = data.price;
      this.formEdit.cost_price = data.cost_price;
      this.formEdit.discounted_price = data.discounted_price;
      this.formEdit.discount_end_date = data.discount_end_date;
      this.formEdit.categories_ids = data.categories.map((category) =>
        category ? category.id : ""
      );
      this.imageedit = data.images;
    },

    async update() {
      this.clearAllErrors();
      this.isSubmitting = true;

      try {
        await crudDataService.create(
          `stores/${this.$route.params.id}/products/${this.id}?_method=put`,
          this.formEdit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.ShowModelEdit = false;
        this.getstore();

        this.toast.success("تم تعديل المنتج بنجاح", {
          position: "top-right",
          timeout: 3000,
        });
      } catch (error) {
        this.handleApiErrors(error, this.toast);
      } finally {
        this.isSubmitting = false;
      }
    },

    del(data, index, name) {
      this.$swal
        .fire({
          title: ` ؟"${name.ar}" هل تريد حذف `,
          showCancelButton: true,
          cancelButtonText: "إلغاء",
          confirmButtonText: "نعم",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire({
              title: "تم الحذف بنجاح!",
              icon: "success",
              confirmButtonText: "تم",
            });
            crudDataService
              .delete(`stores/${this.$route.params.id}/products`, `${data}`)
              .then(() => {
                this.rows.splice(index, 1);
              })
              .catch((error) => {
                this.handleApiErrors(error, this.toast);
              });
          }
        });
    },
  },

  computed: {
    filteredColumns() {
      if (
        !this.perminlocal.includes("stores-show") ||
        !this.perminlocal.includes("stores-update") ||
        !this.perminlocal.includes("stores-destroy")
      ) {
        return this.columns?.length ? this.columns : [];
      }
      return this.columns;
    },
  },

  mounted() {
    this.getstore();
    this.getbrands();
  },
};
</script>
<style lang="scss">
.store-model.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(0, -15%);
}
</style>
<style scoped lang="scss">
// Loading state for buttons
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

<style lang="scss">
.multiselect-caret {
  margin: 0 var(--ms-px, 0.875rem) 0 var(--ms-px, 0.875rem);
}

.multiselect-multiple-label,
.multiselect-placeholder,
.multiselect-single-label {
  left: auto;
  padding-right: 9px;
  right: 0;
}

.imgtoadd {
  background: #fff;
  width: 100px;
  height: 100px;
  position: absolute;
  right: 40%;
  border-radius: 50%;
  top: -50px;
  text-align: center;
  img {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
}

@media (min-width: 576px) {
  .modal-dialog {
    margin: 8.75rem auto;
  }
}
</style>
