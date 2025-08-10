<template>
  <section class="mt-5 pt-5">
    <div class="row">
      <div class="col-xl-6">
        <div class="card custom-card mg-b-20 card-shop">
          <div class="card-body p-0">
            <div class="d-flex justify-content-between align-items-start p-3">
              <img
                src="../../assets/img/logo.png"
                alt=""
                class="ps-3"
                v-if="isDark"
              />
              <img
                src="../../assets/img/logo-dark.png"
                alt=""
                class="ps-3"
                v-if="!isDark"
              />

              <div class="w-100">
                <div class="">
                  <div
                    class="d-flex w-100 justify-content-between align-items-end"
                  >
                    <h4 class="fw-semibold pb-1 mb-0">كشك بلس</h4>
                    <p class="fw-semibold mb-0">
                      <span style="color: #fe7eae" class="fs-5">99</span>
                      ر.س / شهريا
                    </p>
                  </div>
                  <div class="pt-3">
                    <ul class="list-unstyled">
                      <li
                        class="d-flex align-items-center fw-semibold pb-3 fs-6"
                      >
                        <i
                          class="si si-check fw-bold"
                          style="color: #fe7eae"
                        ></i>
                        <p class="mb-0 px-1">
                          تفعيل الدفع الإلكتروني (Apple pay مدي , فيزا , تمارا)
                        </p>
                      </li>
                      <li
                        class="d-flex align-items-center fw-semibold pb-3 fs-6"
                      >
                        <i
                          class="si si-check fw-bold"
                          style="color: #fe7eae"
                        ></i>
                        <p class="mb-0 px-1">
                          دعم أكثر من 23 شركة شحن عالمية ومحلية
                        </p>
                      </li>
                      <li
                        class="d-flex align-items-center fw-semibold pb-3 fs-6"
                      >
                        <i
                          class="si si-check fw-bold"
                          style="color: #fe7eae"
                        ></i>
                        <p class="mb-0 px-1">ربط المتجر بدومين خاص</p>
                      </li>
                      <li
                        class="d-flex align-items-center fw-semibold pb-3 fs-6"
                      >
                        <i
                          class="si si-check fw-bold"
                          style="color: #fe7eae"
                        ></i>
                        <p class="mb-0 px-1">
                          عزز هوية متجرك من خلال ثيمات كشك ومميزات أكثر
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <button
                    class="twobtn bg-white"
                    style="color: #fd601f; border: 1px solid #fd601f"
                  >
                    أكتشف المزيد
                  </button>
                  <button class="btn-add twobtn">تغير</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card custom-card mg-b-20 card-shop box">
          <div class="card-body p-0">
            <div class="ribbon ribbon-top-left"><span>اختيار التجار</span></div>
            <div class="d-flex justify-content-between align-items-start p-3">
              <img
                src="../../assets/img/logo.png"
                alt=""
                class="ps-3"
                v-if="isDark"
              />
              <img
                src="../../assets/img/logo-dark.png"
                alt=""
                class="ps-3"
                v-if="!isDark"
              />
              <div class="w-100">
                <div class="">
                  <div
                    class="d-flex justify-content-between align-items-end"
                    style="width: 85%"
                  >
                    <h4 class="fw-semibold pb-1 mb-0">كشك بلس</h4>
                    <p class="fw-semibold mb-0">
                      <span style="color: #fe7eae" class="fs-5">99</span>
                      ر.س / شهريا
                    </p>
                  </div>
                  <div class="pt-3">
                    <ul class="list-unstyled">
                      <li
                        class="d-flex align-items-center fw-semibold pb-3 fs-6"
                      >
                        <i
                          class="si si-check fw-bold"
                          style="color: #fe7eae"
                        ></i>
                        <p class="mb-0 px-1">
                          تفعيل الدفع الإلكتروني (Apple pay مدي , فيزا , تمارا)
                        </p>
                      </li>
                      <li
                        class="d-flex align-items-center fw-semibold pb-3 fs-6"
                      >
                        <i
                          class="si si-check fw-bold"
                          style="color: #fe7eae"
                        ></i>
                        <p class="mb-0 px-1">
                          دعم أكثر من 23 شركة شحن عالمية ومحلية
                        </p>
                      </li>
                      <li
                        class="d-flex align-items-center fw-semibold pb-3 fs-6"
                      >
                        <i
                          class="si si-check fw-bold"
                          style="color: #fe7eae"
                        ></i>
                        <p class="mb-0 px-1">ربط المتجر بدومين خاص</p>
                      </li>
                      <li
                        class="d-flex align-items-center fw-semibold pb-3 fs-6"
                      >
                        <i
                          class="si si-check fw-bold"
                          style="color: #fe7eae"
                        ></i>
                        <p class="mb-0 px-1">
                          عزز هوية متجرك من خلال ثيمات كشك ومميزات أكثر
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <button
                    class="twobtn bg-white"
                    style="color: #fd601f; border: 1px solid #fd601f"
                  >
                    أكتشف المزيد
                  </button>
                  <button class="btn-add twobtn">تغير</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SMS />
    <More />
  </section>
</template>

<script>
import SMS from "./SMS.vue";
import More from "./More.vue";
import { themeMixin } from "../../mixins/themeMixin";

export default {
  mixins: [themeMixin],

  components: {
    SMS,
    More,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.card-shop {
  background: url(/src/assets/img/Group.png);
  background-repeat: no-repeat;
  background-size: 50% 75%, cover;
  background-position: right top;
}

.box {
  position: relative;
}

/* common */
.ribbon {
  width: 120px;
  height: 120px;
  overflow: hidden;
  position: absolute;
}
.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: "";
  display: block;
  border: 5px solid #fe7eae;
}

.ribbon span {
  position: absolute;
  display: block;
  width: 200px;
  padding: 5px 0;
  background-color: #fe7eae;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-size: 12px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  text-align: center;
}
/* top left*/
.ribbon-top-left {
  top: -10px;
  left: -10px;
}
.ribbon-top-left::before,
.ribbon-top-left::after {
  border-top-color: transparent;
  border-left-color: transparent;
}
.ribbon-top-left::before {
  top: 0;
  right: 0;
}
.ribbon-top-left::after {
  bottom: 0;
  left: 0;
}
.ribbon-top-left span {
  right: -29px;
  top: 39px;
  transform: rotate(-45deg);
}
@media (max-width: 576px) {
  .twobtn {
    width: 100px;
  }
}
</style>
