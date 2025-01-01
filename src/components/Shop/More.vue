<template>
  <div class="row">
    <h5 class="pb-4" style="color: #fe7eae">الإضافات</h5>
    <div class="col-md-3">
      <div class="card custom-card mg-b-20 py-2 pb-4">
        <div class="card-body p-0 text-center">
          <div class="mop">
            <img src="../../assets/img/svgexport-7.png" alt="" />
          </div>
          <h6 class="pt-2" style="color: #fe7eae">زيادة عدد الفروع</h6>
          <p class="text-muted">
            (
            <span class="text-black">115</span>
            ر.س)
          </p>
          <p class="text-muted">أضف جميع فروعك وأظهرها لعملائك</p>
          <button class="btn-add twobtn">أضف لمتجرك</button>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card custom-card mg-b-20 py-2 pb-4">
        <div class="card-body p-0 text-center">
          <div class="mop">
            <img src="../../assets/img/svgexport-10.png" alt="" />
          </div>
          <h6 class="pt-2" style="color: #fe7eae">زياده عدد المستخدمين</h6>
          <p class="text-muted">( <span class="text-black">250</span> ر.س)</p>
          <p class="text-muted">أضف طاقم عملك لإدارة متجرك بشكل متكامل</p>
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
  width: 78px;
  height: 75px;
  border-radius: 50%;
  background: rgba(98, 149, 213, 0.1019607843);
  margin: auto;
  display: grid;
  place-items: center;
  padding: 20px;
}
</style>
