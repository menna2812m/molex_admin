<template>
  <div class="panel panel-primary tabs-style-3 border-0 p-0">
    <div class="tab-menu-heading">
      <div class="tabs-menu d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <Prouductdrop v-if="perminlocal.includes('products-store')" />
          <div
            v-if="listofproducr.length >= 1"
            class="px-3 py-1 ms-2 border rounded pos-relative"
          >
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
            />
            <button
              @click="toggleDropdown"
              class="bg-transparent py-1 border-0 me-0"
            >
              المنتجات المحددة
              <span style="color: #fb99bf">
                ( {{ listofproducr.length }} )
              </span>
            </button>
            <div v-if="isDropdownOpen" class="dropitem" style="z-index: 4444">
              <div class="tx-13 text-start">
                <a
                  class="dropdown-item bg-transparent text-muted d-flex border-bottom"
                  @click="
                    ShowModel = true;
                    isDropdownOpen = false;
                  "
                >
                  <img
                    src="../../assets/img/delete-empty.png"
                    class="h-25 px-2 pt-1"
                    alt=""
                  />

                  <p class="mb-0 text-danger">حذف المنتج نهائيا</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- Tabs -->
        <ul class="nav panel-tabs edit-nav">
          <li>
            <a href="#tab12" data-bs-toggle="tab" class="py-1">
              <i class="mdi mdi-apps fs-5"></i>
            </a>
          </li>
          <li class="">
            <a href="#tab11" class="active px-3" data-bs-toggle="tab">
              <i class="fa fa-bars fs-6"></i>
            </a>
          </li>
        </ul>
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
    <div v-else>
      <div class="panel-body tabs-menu-body px-0" v-if="items.length > 0">
        <div class="tab-content">
          <div class="tab-pane active" id="tab11">
            <div
              class="row border rounded mb-2 p-2"
              v-for="(item, index) in items"
              :key="index"
            >
              <div class="col-md-4 overflow-hidden">
                <div
                  class="d-flex justify-content-between py-2"
                  style="width: max-content"
                >
                  <!-- <input
                    type="checkbox"
                    class="my-3 ms-0 me-2"
                    @change="selectthis($event.target.checked, $event.target)"
                  /> -->

                  <vueper-slides fade>
                    <vueper-slide
                      v-for="img in item.images"
                      :key="img.id"
                      :image="img.path"
                    />
                  </vueper-slides>
                </div>
              </div>
              <div class="col-md-8">
                <div class="h-100 border rounded p-2">
                  <div class="row">
                    <div class="col-md-4">
                      <p class="fw-bold mb-1 mb-1">
                        الاسم :
                        <span class="fw-semibold"> {{ item.name.ar }}</span>
                      </p>
                      <p class="fw-bold mb-1" v-if="item.current_price">
                        السعر بعد الخصم :
                        <span class="fw-semibold">
                          {{ item.current_price }}</span
                        >
                      </p>
                      <p class="fw-bold mb-1" v-else>
                        السعر :
                        <span class="fw-semibold"> {{ item.base_price }}</span>
                      </p>
                    </div>
                    <div class="col-md-4">
                      <p class="fw-bold mb-1">
                        التقييم :
                        <span class="fw-semibold"> {{ item.rating }}</span>
                      </p>

                      <p class="fw-bold mb-1">
                        عدد المقيمين :
                        <span class="fw-semibold">
                          {{ item.raters_count }}</span
                        >
                      </p>
                    </div>
                    <div class="col-md-4">
                      <p class="fw-bold mb-1">
                        جميع الطلبات :
                        <span class="fw-semibold">
                          {{ item.total_orders }}</span
                        >
                      </p>

                      <p class="fw-bold mb-1">
                        كمية الطلبات :
                        <span class="fw-semibold">
                          {{ item.total_orders_quantity }}</span
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-2">
                <div class="d-flex h-100 align-items-center">
                  <button
                    class="btn btn-info rounded m-1 border-0"
                    @click="edit(item)"
                    v-if="perminlocal.includes('products-update')"
                  >
                    <i class="fe fe-edit-2"></i>
                  </button>
                  <button
                    class="btn btn-danger rounded m-1 border-0"
                    @click="del(item.id, index, item.name)"
                    v-if="perminlocal.includes('products-destroy')"
                  >
                    <i class="fe fe-trash"></i>
                  </button>
                  <button
                    class="btn btn-success rounded m-1 border-0"
                    @click="addoption(item)"
                  >
                    <i class="fe fe-plus"></i>
                  </button>
                  <div class="">
                     <input type="text" class="form-control w-100"> 
                    <label
                      class="custom-switch justify-content-center"
                      v-if="perminlocal.includes('products-toggle')"
                    >
                      <input
                        type="checkbox"
                        name="custom-switch-checkbox"
                        class="custom-switch-input"
                        :checked="item.is_active"
                        @change="toggleactive(item.id)"
                      />
                      <span class="custom-switch-description"> </span>
                      <span class="custom-switch-indicator"></span>
                    </label>
                     <button class="btn-add fs-15 twobtn ms-0">
            <i class="ion-reply"></i>
             رد
              
             الموافقة
           </button> 
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div class="tab-pane" id="tab12">
            <div class="row">
              <div class="col-md-4" v-for="(item, index) in items" :key="index">
                <div class="card mb-2 align-start overflow-hidden">
                  <!-- <input
                    class="ms-2 mt-2"
                    type="checkbox"
                    @change="selectthis($event.target.checked, $event.target)"
                  /> -->

                  <div class="py-2">
                    <vueper-slides fade>
                      <vueper-slide
                        v-for="img in item.images"
                        :key="img.id"
                        :image="img.path"
                      />
                    </vueper-slides>
                  </div>
                  <div class="h-100 rounded p-2">
                    <p class="fw-bold mb-1 mb-1">
                      الاسم :
                      <span class="fw-semibold"> {{ item.name.ar }}</span>
                    </p>
                    <p class="fw-bold mb-1">
                      السعر :
                      <span class="fw-semibold"> {{ item.base_price }}</span>
                    </p>
                    <p class="fw-bold mb-1">
                      التقييم :
                      <span class="fw-semibold"> {{ item.rating }}</span>
                    </p>

                    <p class="fw-bold mb-1">
                      عدد المقيمين :
                      <span class="fw-semibold"> {{ item.raters_count }}</span>
                    </p>
                    <p class="fw-bold mb-1">
                      جميع الطلبات :
                      <span class="fw-semibold"> {{ item.total_orders }}</span>
                    </p>

                    <p class="fw-bold mb-1">
                      كمية الطلبات :
                      <span class="fw-semibold">
                        {{ item.total_orders_quantity }}</span
                      >
                    </p>
                    <div class="text-center">
                      <button
                        class="btn btn-info rounded m-1 border-0"
                        @click="edit(item)"
                        v-if="perminlocal.includes('products-update')"
                      >
                        <i class="fe fe-edit-2"></i>
                      </button>
                      <button
                        class="btn btn-danger rounded m-1 border-0"
                        @click="del(item.id, index, item.name)"
                        v-if="perminlocal.includes('products-destroy')"
                      >
                        <i class="fe fe-trash"></i>
                      </button>
                      <!-- <button
                        class="btn btn-success rounded m-1 border-0"
                        @click="addoption(item)"
                      >
                        <i class="fe fe-plus"></i>
                      </button> -->
                      <label
                        class="custom-switch justify-content-center"
                        v-if="perminlocal.includes('products-toggle')"
                      >
                        <input
                          type="checkbox"
                          name="custom-switch-checkbox"
                          class="custom-switch-input"
                          :checked="item.is_active"
                          @change="toggleactive(item.id)"
                        />
                        <span class="custom-switch-description"> </span>
                        <span class="custom-switch-indicator"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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
      </div>
      <section
        class="position-relative"
        style="height: 100vh; display: grid; place-items: center"
        v-else
      >
        <div
          style="background: #E66239; padding: 30px; font-size: 20px"
          class="w-50 text-center text-white rounded-10"
        >
          لا يوجد منتجات حتي الان
        </div>
      </section>
    </div>
    <teleport to="body">
      <b-modal id="add" v-model="ShowModel" hide-footer>
        <div class="imgtoadd">
          <img src="../../assets/img/delet.png" alt="img2" />
        </div>
        <div class="mt-5">
          <form @submit.prevent="add">
            <h5 class="text-center pb-4">سيتم حذف المنتج نهائيا</h5>
            <div class="text-center">
              <button class="fs-15 btn-save mx-1">موافق</button>
              <button class="fs-15 btn-cancel mx-1" @click="ShowModel = false">
                الغاء
              </button>
            </div>
          </form>
        </div>
      </b-modal>
    </teleport>
    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="ShowModelEdit"
        hide-footer
        class="edit"
        title="تعديل منتج "
      >
        <div class="row pos-relative" style="z-index: 5555">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-md-6 mt-1">
                <label for=""> الإسم عربي </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.name.ar"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for="">الإسم انجليزي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.name.en"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for="">الوصف عربي</label>
                <ckeditor
                  :editor="editor"
                  v-model="formData.description.ar"
                  :editorConfigs="editorConfigs"
                ></ckeditor>
              </div>
              <div class="col-md-6 mt-1">
                <label for="">الوصف انجليزي</label>
                <ckeditor
                  :editor="editor"
                  v-model="formData.description.en"
                  :editorConfigs="editorConfigs"
                ></ckeditor>
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> اختر العلامة التجارية </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="Selectbrand"
                  placeholder="اختر العلامة التجارية"
                  v-model="formData.brand_id"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> اختر القسم </label>
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="Selectcategories"
                  placeholder="اختر القسم "
                  v-model="formData.categories_ids"
                  mode="multiple"
                  :close-on-select="false"
                  group-values="options"
                  group-label="name"
                  class="itteemm"
                >
                  <template v-slot:option="{ option }">
                    <!-- Check if the option is a main category or a sub-category -->
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
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> السعر الأساسي</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.base_price"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> لينك seo </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.seo_url"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> عنوان seo </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.seo_title"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> وصف seo </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.seo_description"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> باركود </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.barcode"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> كمية </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.quantity"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> السعر </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.price"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> سعر الكلفة </label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.cost_price"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> السعر بعد الخصم</label>
                <input
                  type="text"
                  placeholder=""
                  v-model="formData.discounted_price"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 mt-1">
                <label for=""> تاريخ انتهاء الخصم </label>
                <input
                  type="date"
                  placeholder=""
                  v-model="formData.discount_end_date"
                  class="form-control"
                />
              </div>
              <div class="col-md-12 mt-3">
                <label for="">الصوره</label>
                <div class="form-group">
                  <input
                    type="file"
                    @change="handleFileChange"
                    accept=".pdf, image/jpeg, image/png"
                    class="form-control"
                    multiple
                  />
                  <div class="d-flex flex-wrap mt-2">
                    <div
                      v-for="(url, index) in imageUrl"
                      :key="index"
                      class="d-flex"
                    >
                      <img
                        :src="url.path"
                        alt="Preview Image"
                        style="width: 200px; height: 200px; object-fit: fill"
                        class="m-1"
                      />
                      <span
                        class="si si-close text-red"
                        @click="removeimage(index)"
                        style="
                          margin-right: -30px;
                          background: #fff;
                          padding: 5px;
                          height: max-content;
                          margin-top: 5px;
                        "
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary m-auto d-block" @click="update">
              تعديل
            </button>
          </div>
        </div>
      </b-modal>
    </teleport>
    <teleport to="body">
      <b-modal
        id="add-page"
        v-model="addModel"
        hide-footer
        class="edit"
        title="  خيارات المنتج  "
      >
        <div class="mt-4">
          <div class="form-group">
            <label class="custom-switch">
              <input
                type="checkbox"
                name="custom-switch-checkbox"
                class="custom-switch-input"
                @change="showdetail($event)"
              />
              <span class="custom-switch-indicator"></span>
              <span class="custom-switch-description">
                تفعيل خيارات المنتج</span
              >
            </label>
          </div>

          <div v-if="cardnew">
            <div class="row" v-for="(option, i) in options" :key="i">
              <div class="col-md-6 mb-2">
                <input
                  v-model="option.id"
                  type="number"
                  class="form-control mb-2"
                  placeholder="الرقم التسلسلي"
                />
                <input
                  v-model="option.name.ar"
                  placeholder="مسمي الخيار مثل (اللون و المقاس)"
                  type="text"
                  class="form-control mb-2"
                />
              </div>
              <div class="col-md-6 mb-2">
                <Multiselect
                  label="name"
                  :searchable="true"
                  :options="Selectone"
                  @change="selctchange($event, i)"
                  v-model="option.select"
                  class="mb-2"
                />
                <input
                  v-model="option.name.en"
                  placeholder="Name the option, such as (color and size)"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-12 mb-2">
                <div v-for="(element, index) in option.values" :key="index">
                  <input
                    v-model="element.id"
                    type="number"
                    class="form-control mb-2"
                    placeholder="الرقم التسلسلي"
                  />
                  <div class="pos-relative">
                    <input
                      v-if="option.is_color"
                      type="color"
                      class="pos-absolute p-0 border-0"
                      style="width: 40px; top: 5px; left: 25px"
                      v-model="element.color"
                    />
                    <input
                      type="text"
                      class="form-control mb-2"
                      :placeholder="'القيمة' + `${index + 1}`"
                      v-model="element.value.ar"
                      @keyup="addElement"
                    />
                  </div>

                  <input
                    type="text"
                    class="form-control mb-2"
                    :placeholder="'value' + `${index + 1}`"
                    v-model="element.value.en"
                    @keyup="addElement"
                  />
                </div>
              </div>

              <div class="col-12 mb-2">
                <button
                  @click="addNewInput(i)"
                  class="w-100 p-2 bg-transparent rounded"
                  style="border: 1px dashed #87a9e3"
                >
                  <i class="fa fa-plus"></i>
                  اضافة قيمة جديدة
                </button>
              </div>
            </div>
            <button
              @click="addNewOption"
              class="w-100 p-2 bg-transparent rounded mb-2"
              style="border: 1px dashed #87a9e3"
            >
              <i class="fa fa-plus"></i>
              اضافة خيار جديد
            </button>
            <button
              @click="addalloptions"
              class="w-100 p-2 bg-primary rounded mb-2 border-0"
            >
              <i class="fa fa-plus"></i>
              اضافة للمتغيرات
            </button>
            <div
              aria-multiselectable="true"
              class="accordion"
              id="accordion"
              role="tablist"
              v-if="cartdetail"
            >
              <div
                class="card mb-2"
                v-for="(onevar, iover) in variants"
                :key="iover"
              >
                <div class="card-header" :id="`heading_${iover}`" role="tab">
                  <a
                    :aria-controls="`collapse_${iover}`"
                    aria-expanded="false"
                    class="collapsed"
                    data-bs-toggle="collapse"
                    :href="`#collapse_${iover}`"
                  >
                    متغير
                    {{ iover + 1 }}
                  </a>
                </div>
                <div
                  :aria-labelledby="`heading_${iover}`"
                  class="collapse"
                  :id="`collapse_${iover}`"
                  data-bs-parent="#accordion"
                  role="tabpanel"
                >
                  <div class="card-body">
                    <form action="">
                      <div class="row">
                        <div class="col-md-12 mb-2">
                          <input
                            v-model="onevar.id"
                            type="number"
                            class="form-control"
                            placeholder="الرقم التسلسلي"
                          />
                        </div>
                        <div class="col-md-6 mb-2">
                          <select
                            style="
                              width: 100%;
                              padding: 4px;
                              border-radius: 6px;
                              color: #999999;
                              border: 1px solid #e8e8f7;
                            "
                            v-model="optionfirstid"
                          >
                            <option v-for="(oneoption, i) in options" :key="i" :value="oneoption.id">
                              {{ oneoption.name.ar }}
                            </option>
                          </select>
                        </div>
                        <div class="col-md-6 mb-2">
                          <select
                            style="
                              width: 100%;
                              padding: 4px;
                              border-radius: 6px;
                              color: #999999;
                              border: 1px solid #e8e8f7;
                            "
                            v-model="valfirstid"
                          >
                            <option v-for="(valoption, i) in valueinoption" :key="i" :value="valoption.id">
                              {{ valoption.value.ar }}

                            </option>
                          </select>
                        </div>
                        <div class="col-md-6 mb-2">
                          <select
                            style="
                              width: 100%;
                              padding: 4px;
                              border-radius: 6px;
                              color: #999999;
                              border: 1px solid #e8e8f7;
                            "
                            v-model="optionsecondid"
                          >
                            <option v-for="(oneoption, i) in options" :key="i" :value="oneoption.id" >
                              {{ oneoption.name.ar }}
                            </option>
                          </select>
                        </div>
                     
                        <div class="col-md-6 mb-2">
                          <select
                            style="
                              width: 100%;
                              padding: 4px;
                              border-radius: 6px;
                              color: #999999;
                              border: 1px solid #e8e8f7;
                            "
                            v-model="valsecondid"
                          >
                            <option v-for="(valoption, i) in valueinoption" :key="i" :value="valoption.id" >
                              {{ valoption.value.ar }}
                            </option>
                          </select>
                        </div>

                        <div class="col-md-12 mb-2">
                          <label for=""> السعر </label>
                          <input
                            type="number"
                            class="form-control"
                            v-model="onevar.price"
                          />
                        </div>
                        <div class="col-md-6 mb-2">
                          <label for=""> سعر التكلفه </label>
                          <input
                            type="number"
                            class="form-control"
                            v-model="onevar.cost_price"
                          />
                        </div>
                        <div class="col-md-6 mb-2">
                          <label for=""> سعر المخفض </label>
                          <input
                            type="number"
                            class="form-control"
                            v-model="onevar.discounted_price"
                          />
                        </div>
                        <div class="col-md-4 mb-2">
                          <label for=""> الوزن </label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="onevar.weight"
                          />
                        </div>
                        <div class="col-md-4 mb-2">
                          <label for=""> الباركود </label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="onevar.barcode"
                          />
                        </div>

                        <div class="col-md-4 mb-2">
                          <label for=""> رمز التخزين </label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="onevar.sku"
                          />
                        </div>
                        <div class="col-md-12 mb-2">
                          <label for=""> الكمية </label>
                          <input
                            type="number"
                            class="form-control"
                            v-model="onevar.quantity"
                          />
                        </div>
                        <div class="col-md-12 mb-2">
                          <input
                            v-model="onevar.is_default"
                            type="checkbox"
                          />
                          افتراضي
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <button class="w-100 btn btn-primary" @click="newvariant()">
                حفظ
              </button>
            </div>
         </div>

        </div>
      </b-modal>
    </teleport>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

import crudDataService from "../../Services/crudDataService.js";
import Multiselect from "@vueform/multiselect";
import Prouductdrop from "./Prouductdrop.vue";
import "vueperslides/dist/vueperslides.css";
import { VueperSlides, VueperSlide } from "vueperslides";
import { reactive } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    Prouductdrop,
    Multiselect,
    VueperSlides,
    VueperSlide,
  },
  setup() {
    const editorConfigs = reactive({});
    return { editor: ClassicEditor, editorConfigs };
  },
  data() {
    return {
    valueinoption:[],
      optionfirstid:'',
      valfirstid:'',
      optionsecondid:'',
      valsecondid:'',
      loading: false,
      sizesen: [],
      sizesar: [],
      colorsar: [],
      colorsen: [],
      Selectone: [
        { value: "text", name: "نص" },
        { value: "color", name: "لون" },
      ],

      options: [
        {
          id: null,
          is_new: true,
          name: {
            ar: "",
            en: "",
          },
          select: "",
          is_color: false,
          values: [],
        },
      ],
      variants: [],
      addModel: false,
      Selectbrand: [],
      imageUrl: [],
      ShowModelEdit: false,
      ShowModel: false,
      Selecttype: [{ value: 1, name: "النوع" }],
      listofproducr: [],
      myList: [
        {
          selected: false,
        },
        {
          selected: false,
        },
        {
          selected: false,
        },
      ],
      selectAll: false,
      color: true,
      isDropdownOpen: false,
      items: [],
      id: null,
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
      Selectcategories: [],
      links: [],
      page: 1,
      last: 2,
      variant: [],
      cardnew: false,
      perminlocal: localStorage.getItem("permissions"),
      cartdetail: false,
    };
  },

  methods: {
    handleSelectChange(selectedValue) {
    this.valfirstid = selectedValue.target.value;
  },
  handleSelectvalue(selectedValue){
    this.valsecondid = selectedValue.target.value;

  },
    async toggleactive(id) {
      let res = await crudDataService.create(`products/${id}/toggle`, "");
      const toast = useToast();
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    },
    getOptionStyle(option) {
      return {
        background: option.options ? "#d6d8dddb" : "",
      };
    },
    removeimage(index) {
      this.imageUrl.splice(index, 1);
    },
    addalloptions() {
      this.options.forEach(element => {
        this.valueinoption.push(...element.values)
      });

      this.cartdetail = true;
      this.variants.push({
        id: null,
        is_default: false,
        sku: null,
        barcode: null,
        quantity: null,
        price: "",
        cost_price: null,
        discounted_price: null,
        discount_end_date: null,
        weight: null,
        weight_unit_id: null,
        dimensions: null,
        max_user_quantity: "",
        min_notify_quantity: null,
        options: [],
      });
    },
    addoption(data) {
      this.addModel = true;
      this.id = data.id;
    },
    async newvariant() {

      this.variants.forEach((element) => {
     element.options.push({
      option_id:this.optionfirstid,
      value_id:this.valfirstid
     },{
      option_id:this.optionsecondid,
      value_id:this.valsecondid
     });
      });
 
      let res = await crudDataService.create(`products/${this.id}/variants`, {
        options: this.options,
        variants: this.variants,
      });
      this.addModel = false;
    },

    addNewInput(index) {
      if (this.options[index].is_color) {
        this.options[index].values.push({
          value: {
            ar: "",
            en: "",
          },
          color: "",
          id: "",
          is_new: true,
        });
      } else {
        this.options[index].values.push({
          value: {
            ar: "",
            en: "",
          },
          color:"#FFF",
          id: "",
          is_new: true,
        });
      }
    },

    addNewOption() {
      this.options.push({
        id: null,
        is_new: true,
        name: {
          ar: "",
          en: "",
        },
        select: "",
        is_color: false,
        values: [
        ],
      });
     
    },

    selctchange(selectedValue, index) {
      const is_color = selectedValue === "color";
      this.options[index].is_color = is_color;
      if (is_color) {
        this.options[index].values.push({
          id: null,
          is_new: true,
          value: {
            ar: "",
            en: "",
          },
          color: "",
        });
      } else {
        this.options[index].values.push({
          id: null,
          is_new: true,
        color:"#FFF",
          value: {
            ar: "",
            en: "",
          },
        });
      }
    },

    addElement() {
      this.options.forEach((element) => {
        if (element.is_color) {
          element.values.map((option) => {
            this.colorsar.push(option);
            this.colorsen.push(option);
          });
        } else {
          element.values.map((option) => {
            this.sizesar.push(option);
            this.sizesen.push(option);
          });
        }
      });
    },
    showdetail(e) {
      if (e.target.checked) {
        this.cardnew = true;
      } else {
        this.cardnew = false;
      }
    },
    handleFileChange(event) {
      const files = event.target.files;
      this.formData.images = [];
      Array.from(files).forEach((file) => {
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

    async getbrands() {
      const res = await crudDataService.getAll("brands");
      this.Selectbrand = res.data.data.data.map((ele) => ({
        value: ele.id,
        name: ele.name,
      }));
    },
    async getcategories() {
      const res = await crudDataService.getAll("categories");
      const groupedCategories = [];
      res.data.data.data.forEach((ele) => {
        const mainCategory = {
          value: ele.id,
          name: ele.name.ar,
          options: [],
          style: {
            background: "blue",
          },
        };
        if (ele.sub_categories && ele.sub_categories.length > 0) {
          ele.sub_categories.forEach((subCat) => {
            mainCategory.options.push({
              value: subCat.id,
              name: subCat.name.ar,
            });
          });
        }
        groupedCategories.push(mainCategory);
      });

      this.Selectcategories = groupedCategories.reduce((acc, category) => {
        acc.push(category, ...category.options);
        return acc;
      }, []);
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleSelectAll() {
      this.myList.forEach((item) => (item.selected = this.selectAll));
    },
    selectthis(e, target) {
      if (e) {
        this.listofproducr.push(target);
      } else {
        this.listofproducr.splice(target, 1);
      }
    },

    async getAllData() {
      this.loading = true; // Start loading

      try {
        let res = await crudDataService.getAll(`products`);
        this.items = res.data.data.data;
        this.last = res.data.data.last_page;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error
      } finally {
        this.loading = false; // End loading regardless of success or failure
      }
    },
    async paginag(p) {
      let res = await crudDataService.getAll(`products?page=${this.page}`);
      this.items = res.data.data.data;
    },
    async edit(data) {
      this.id = data.id;
      let res = await crudDataService.getAll(`products/${this.id}/variants`);
      this.variant = res.data.data;
      this.ShowModelEdit = true;
      this.formData.name.ar = data.name.ar;
      this.formData.description.ar = data.description.ar;
      this.formData.brand_id = data.brand ? data.brand.id : "";
      this.formData.name.en = data.name.en;
      this.formData.description.en = data.description.en;
      this.formData.barcode = data.barcode;
      this.formData.base_price = data.base_price;
      this.formData.seo_url = data.seo_url;
      this.formData.seo_title = data.seo_title;
      this.formData.seo_description = data.seo_description;
      this.formData.quantity = data.quantity;
      this.formData.price = data.price;
      this.formData.cost_price = data.cost_price;
      this.formData.discounted_price = data.discounted_price;
      this.formData.discount_end_date = data.discount_end_date;
      this.formData.categories_ids = data.categories.map((category) =>
        category ? category.id : ""
      );
      this.imageUrl = data.images;
    },
    async update() {
      let res = await crudDataService.create(
        `products/${this.id}?_method=put`,
        this.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.ShowModelEdit = false;
      this.getAllData();
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
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
               this.$swal.fire({
            title: "تم الحذف بنجاح!",
            icon: "success",
            confirmButtonText: "تم", // ✅ Custom OK button text
          });
            crudDataService.delete("products", `${data}`).then(() => {
              this.items.splice(index, 1);
              this.ShowModelEdit = false;
            });
          }
        });
    },
  },

  mounted() {
    this.getAllData();
    this.getbrands();
    this.getcategories();
    // this.generateCombinations();
  },
};
</script>

<style scoped lang="scss">
.edit-nav {
  margin-right: auto;
  width: max-content;
  background: #f1f4fa;
  border-radius: 6px;
  &.nav.panel-tabs li a {
    background: transparent;
    padding: 9px 14px;
    margin: 0;
    color: #E66239;
  }
  &.nav.panel-tabs li a.active {
    color: #fff;
    background: #E66239;
  }
}
.plus {
  position: absolute;
  top: 5px;
  right: 6px;
}
.pin-icon {
  padding: 5px;
  background: #eff4fb;
  border-radius: 2px;
  color: #E66239;
}
.pin-color {
  padding: 5px;
  background: #E66239;
  border-radius: 2px;
  color: #eff4fb;
}
.spanprice {
  background: #6295d51a;
  color: #E66239;
  text-align: center;
  justify-content: center;
  img {
    width: 30px;
  }
  span {
    border-left: 1px solid #6295d533;
  }
}
.dropitem {
  position: absolute;
  top: 44px;
  right: -1px;
  background: #fff;
  border: 1px solid #e8e8f7;
  margin: 0;
  border-radius: 3px;
  width: 200px;
  a {
    cursor: pointer;
  }

  img {
    width: 30px;
  }
}
</style>
<style lang="scss">
.modal.show.edit .modal-header {
  display: inline-flex;
}
.modal.show.edit .modal-dialog {
  max-width: 800px;
}

.vueperslides {
  width: 400px;
}
.vueperslides__bullets {
  display: none;
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
