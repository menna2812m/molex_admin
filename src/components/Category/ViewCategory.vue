<template>
  <section v-if="onecategory">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <h4 class="mb-0">القسم</h4>
          
          </div>
          <div class="row align-items-center justify-content-center pt-3">
            <div class="col-lg-7">
              <div class="row" >
                <div class="col-lg-4 text-center">
                  <img
                    :src="onecategory.image"
                    alt="img"
                    class="mx-auto"
                    style="width: 80px; height: 80px; border-radius: 50%"
                  />
              
                </div>
                <div class="col-lg-8 text-center">
                  <div class="d-flex align-items-center">
                    <h4 class="px-2">
                      الاسم :
                    </h4>
                    {{ onecategory.name?onecategory.name.ar:'' }}
                    </div>
                  <div class="d-flex align-items-center">
                    <h4 class="px-2">
                      الوصف :
                    </h4>
                    {{ onecategory.description?onecategory.description.ar:'' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div  >
            <div class="d-flex align-items-end">
            <img :src="arroww" alt="" width="90">
            <h4 class="mb-0">الاقسام الفرعية</h4>
          </div>
          <div class="row align-items-center justify-content-center pt-3 " v-if="onecategory.sub_categories?onecategory.sub_categories.length!=0:' '">
            <div class="col-lg-7">
              <div class="row mb-5"  v-for="sub in onecategory.sub_categories" :key="sub.id" >
                <div class="col-lg-4 text-center">
                  <img
                    :src="sub.image"
                    alt="img"
                    class="mx-auto"
                    style="width: 80px; height: 80px; border-radius: 50%"
                  />
              
                </div>
                <div class="col-lg-8 text-center">
                  <div class="d-flex align-items-center">
                  <h4 class="px-2">الاسم:</h4>
                    {{ sub.name?sub.name.ar:'' }}</div>
                  <div class="d-flex align-items-center">
                    <h4 class="px-2">
                     الوصف:
                    </h4>
                    {{ sub.description?sub.description.ar:'' }}
                  </div>
                </div>
              
              </div>
            
            </div>
          </div>
          <div v-else>
            <h4 class="text-center">
              لا يوجد اقسام فرعية بعد
            </h4>
          </div>
          </div>
         
         
        </div>
      </div>
    </div>
  </section>
  <section class="position-relative" style="height: 100vh;display: grid;
    place-items: center;"
    v-else
   >

<section class="cate">
</section>
 <progress class="pure-material-progress-circular"/> 

   </section>  
</template>

<script>
import arroww from "../../assets/img/arro.png"
import crudDataService from "../../Services/crudDataService.js";
export default {
  data() {
    return {
      onecategory: null,
      arroww
    };
  },
  methods: {
    async getcategory() {
      const res = await crudDataService.get(
        "categories",
        `${this.$route.params.id}`
      );
      this.onecategory=res.data.data
      console.log(res.data.data);
    },
  },
  mounted() {
    this.getcategory();
  },
};
</script>

<style scoped lang="scss">
.dropend {
  background: #fff;
  position: absolute;
  width: 150px;
  box-shadow: 0px 3px 3px 0px #e6edf0;
  border-radius: 3px;
  a {
    cursor: pointer;
  }
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
.modal .modal-header {
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
