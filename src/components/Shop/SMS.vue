<template>
  <div class="row">
    <h6 class="pb-4" style="color: #fe7eae">SMS</h6>
    <div class="col-md-3">
      <div class="card custom-card mg-b-20 py-2 pb-4">
        <div class="card-body p-0 text-center">
          <div class="mop">
            <img src="../../assets/img/svgexport.png" alt="" />
          </div>
          <h6 class="pt-2" style="color: #fe7eae">1000 نقطة</h6>
          <p class="text-muted">
            (
            <span class="text-black">115</span>
            ر.س)
          </p>
          <p class="text-muted">تواصل أوسع و وصول أسرع بتكاليف أقل</p>
          <button class="btn-add twobtn">أضف لمتجرك</button>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card custom-card mg-b-20 py-2 pb-4">
        <div class="card-body p-0 text-center">
          <div class="mop">
            <img src="../../assets/img/svgexport.png" alt="" />
          </div>
          <h6 class="pt-2" style="color: #fe7eae">5000 نقطة</h6>
          <p class="text-muted">
            (
            <span class="text-black">250</span>
            ر.س)
          </p>
          <p class="text-muted">تواصل أوسع و وصول أسرع بتكاليف أقل</p>

          <button class="btn-add twobtn">أضف لمتجرك</button>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card custom-card mg-b-20 py-2 pb-4">
        <div class="card-body p-0 text-center">
          <div class="mop">
            <img src="../../assets/img/svgexport.png" alt="" />
          </div>
          <h6 class="pt-2" style="color: #fe7eae">10000 نقطة</h6>
          <p class="text-muted">
            (
            <span class="text-black">300</span>
            ر.س)
          </p>
          <p class="text-muted">تواصل أوسع و وصول أسرع بتكاليف أقل</p>
          <button class="btn-add twobtn">أضف لمتجرك</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
.mop {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #6295d51a;
  margin: auto;
  display: grid;
  place-items: center;
  padding: 10px;
  img {
    width: 35px;
  }
}
</style>
