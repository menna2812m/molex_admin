<template>
  <section class="mt-5 pt-5">
    <div class="row">
      <div class="col-md-3"  v-if="general" @click="single(general[0].page)">
        <div class="card custom-card border mg-b-20 py-4 text-center">
          <h5 class="mb-0">الإعدادات العامة</h5>
        </div>
      </div>

      <div class="col-md-3" v-if="footer" @click="single(footer[0].page)">
        <div class="card custom-card border mg-b-20 py-4 text-center">
          <h5 class="mb-0">اعدادت نهاية الصفحة</h5>
        </div>
      </div>
      <div class="col-md-3"  v-if="perminlocal.includes('payment_methods-index')">
        <div class="card custom-card border mg-b-20 py-4 text-center" @click="payment()" style="cursor: pointer;">
          <h5 class="mb-0"> طرق الدفع </h5>
        </div>
      </div>
   
      </div>
   
  </section>
</template>

<script>
import crudDataService from "../../Services/crudDataService.js";
export default {
  components: {},
  data() {
    return {
      ShowModel: false,
      items: [],
      general:[],
      footer:[],
    perminlocal : localStorage.getItem('permissions')

    };
  },
  methods: {
    async setting() {
      let res = await crudDataService.getAll("settings");
    //   this.items = res.data.data;      
      res.data.data.forEach(element => {
        if (element.page=='general') {
            this.general.push(element)
        }else if(element.page=='footer'){
            this.footer.push(element)
        }
      })
    },
    single(page){
        this.$router.push({name:'SettingPage',params:{ page }})
    },
    payment(){
      this.$router.push({name:'Payment'})
    }
  },
  mounted() {
    this.setting();
  },
};
</script>
