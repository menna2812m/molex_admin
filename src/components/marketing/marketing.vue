<template>
    <section class="mt-5 pt-5">
      <div class="">
        <div class=" p-2 rounded mb-3" style="background: #FFD3431A;color:#C4A50B ">
                <i class="mdi mdi-alert-circle"></i>
                <p class="d-inline">
                  SMS يرجي تفعيل احد مزودين خدمة
                  من صفحة ربك الخدمات اضغط هنا
                </p>

              </div>
      <button @click="newcampaign" class="btn-add me-0 mb-4">
        <i class="fe fe-plus"></i>
        حملة جديدة   
      </button>
   
      </div>
  
      <div class="card custom-card border-0 mg-b-20">
        <div class="card-body p-4">
          <h5 class=" mb-0" style="color: #FE7EAE;">الحملات </h5>
          <div class="text-center ">
            <img src="../../assets/img/Intersection.png" alt="" class="d-block m-auto">
            <span class="text-muted">
              لا يوجد حملات حاليا
            </span>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>

  export default {
    components: {
    },
    data() {
      return {
       
      };
    },
    methods: {
    
      newcampaign(){
        this.$router.push({name:"Newcampaign"})
       }
    
    },
  };
  </script>