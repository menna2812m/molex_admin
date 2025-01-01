<template>
  <section class="mt-5 pt-5">
    <div class="card custom-card border-0 mg-b-20 card-chart">
      <div class="card-header p-3 bg-transparent">
        <h5 class="fw-bold mb-0">الحملة التسويقية</h5>
      </div>
      <div class="card-body p-4">
        <div class="row px-5">
          <div class="col-md-6 mb-3">
            <label for="" class="fw-bold"> اسم الحملة</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="اضف اسم مناسب للحملة"
              class="form-control pos-relative"
              style="padding-right: 37px"
            />
            <img
              src="../../assets/img/subtitles.png"
              alt=""
              class="pos-absolute"
              style="top: 59%; right: 4.5%"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label for="" class="fw-bold">الرابط </label>
            <Multiselect
              label="name"
              :searchable="true"
              :options="Selectcity"
              placeholder="اختر الرابط "
              style="padding-right: 28px"
              class="pos-relative"
            />
            <img
              src="../../assets/img/link-variant.png"
              alt=""
              class="pos-absolute"
              style="top: 59%; right: 4.5%"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="" class="fw-bold">نص رسالة الحملة </label>

            <ckeditor
              :editor="editor"
              v-model="description"
              :editorConfigs="editorConfigs"
            ></ckeditor>
          </div>
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-start">
              <label class="custom-switch">
                <span class="custom-switch-description"> </span>
                <input
                  type="checkbox"
                  name="custom-switch-checkbox"
                  class="custom-switch-input"
                  checked="true"
                />

                <span class="custom-switch-indicator"></span>
              </label>
              <div class="ps-2 pb-3">
                <label for="" class="fw-bold">اختصار الرابط</label>
                <span class="text-muted d-block">
                  عرض الرابط بشكل مختصر في رسالة
                </span>
              </div>
            </div>

            <div class="d-flex align-items-end w-100">
              <div class="message">
                <div class="input h-100 bg-transparent border-0">
                  <div class="m-3 overflow-auto mt-4" style="height: 76%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card custom-card border-0 mg-b-20 card-chart">
      <div class="card-header p-3 bg-transparent">
        <h5 class="fw-bold mb-0">الشريحة المستهدفة</h5>
      </div>
      <div class="card-body p-4">
        <div class="row px-5">
          <div class="col-md-6 mb-3">
            <label for="" class="fw-bold">الشرط </label>
            <Multiselect
              label="name"
              :searchable="true"
              :options="Selectcity"
              placeholder="الدولة"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="" class="fw-bold">الدولة </label>
            <Multiselect
              label="name"
              :searchable="true"
              :options="Selectcity"
              placeholder="اختر..."
            />
          </div>
          <div class="col-md-12 mb-3">
            <div class="d-flex align-items-start">
              <label class="custom-switch">
                <span class="custom-switch-description"> </span>
                <input
                  type="checkbox"
                  name="custom-switch-checkbox"
                  class="custom-switch-input"
                  checked="true"
                />

                <span class="custom-switch-indicator"></span>
              </label>
              <div class="ps-2 pb-3">
                <label for="" class="fw-bold">تنطبق عليهم جميع الشروط </label>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="d-flex justify-content-between">
              <div style="background: #fe7eae1a;border-radius: 0 5px 5px 0;" class=" p-2 w-100">
                <div
                  class="d-flex justify-content-between"
                  style="color: #fe7eae"
                >
                  <h6 class="mb-0">
                    <i class="mdi mdi-alert-circle"></i>

                    العملاء المستهدفين
                  </h6>
                  <span> 15855522 </span>
                </div>
              </div>
              <button
                class="text-white  border-0 px-3"
                style="background: #fe7eae;border-radius: 5px 0 0 5px;"
              >
                عرض
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card custom-card border-0 mg-b-20 card-chart">
      <div class="card-header p-3 bg-transparent">
        <h5 class="fw-bold mb-0">هدف الحملة </h5>
      </div>
      <div class="card-body p-4">
        <div class="row px-5">
          <div class="col-12 mb-3">
            <label for="" class="fw-bold">الهدف </label>
            <Multiselect
              label="name"
              :searchable="true"
              :options="Selectcity"
              placeholder="اختر الهدف"
            />
          </div>
       
      
   
        </div>
      </div>
    </div>
    <div class="card custom-card border-0 mg-b-20 card-chart">
      <div class="card-header p-3 bg-transparent">
        <h5 class="fw-bold mb-0">جدولة الحملة  </h5>
      </div>
      <div class="card-body p-4">
        <div class="row px-5">
          <div class="col-12 mb-3">
         
            <label class="rdiobox">
                <input name="rdio" type="radio" />
                 <span>الأن  </span>
                 </label>
                 <label class="rdiobox">
                <input name="rdio" type="radio" />
                 <span>تحديد وقت النشر  </span>
                 </label>
          </div>
       
      
   
        </div>
      </div>
    </div>
    <div class="card custom-card border-0 mg-b-20 card-chart">
      <div class="card-header p-3 bg-transparent d-flex justify-content-between align-items-center">
        <h5 class="fw-bold mb-0">رصيد الحملة   </h5>
        <button
                class="rounded twobtn  border-0 "
                style="background: #6295D51A;color:#6295D5"
              >
              شراء رصيد
              </button>
      </div>
      <div class="card-body p-4">
        <div class="row px-5">
          <div class="col-md-6 mb-3 text-center">
            <span
            style="color:#6295D5"
            >
                6590

            </span>
        <p class="text-muted">
            الرصيد المطلوب
        </p>
          </div>
          <div class="col-md-6 mb-3 text-center">
            <span
            style="color:#FE7EAE"
            >
            - 895
            </span>
        <p class="text-muted">
            الرصيد المتوفر 
        </p>
          </div>
        </div>
      </div>
    </div>
    <div data-v-2700480a="" class="text-center"><button data-v-2700480a="" class="fs-15 btn-save mx-1">إنشاء حلمة</button><button data-v-2700480a="" class="fs-15 btn-cancel mx-1">حفظ كمسودة</button></div>
  </section>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { reactive, ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    Multiselect,
  },
  setup() {
    const description = ref();
    const editorConfigs = reactive({});
    return { description, editor: ClassicEditor, editorConfigs };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.card {
  color: #161548;
  box-shadow: 0px 3px 3px 0px #e6edf0;
}
.custom-card.card-chart {
  .card-header {
    border-bottom: 1px solid #f7fafd;
  }
}
.message {
  width: 100%;
  height: 200px;
  background: url(/src/assets/img/Groupqw.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  .input {
    width: 95%;
    margin-right: auto;
  }
}
</style>
<style lang="scss">
.ck-content {
  height: 230px !important;
}
</style>
