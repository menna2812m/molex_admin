<template>

  <section class="mt-5 pt-5" v-if="perminlocal.includes('statistics-index')">
    <div class="row pb-5 "  v-if="items">
    <div class="col-xl-3" v-for="(item, key) in items" :key="key">

      <div class="card custom-card pos-relative">
        <a :href="admin[key]?.href" class="stretched-link"></a>
        <div class="card-body">
          <div class="card-order">
            {{ admin.key }}
            <label class="main-content-label mb-3 pt-1">{{ key }}</label>
            <h2 class="text-end card-item-icon card-icon">
              <i class="float-start text-white" :class="admin[key]?.icon"></i>
             <span class="font-weight-bold">{{ item }}</span>
            </h2>
          </div>
        </div>
      </div>
      <!-- <chartsmonth /> -->
      <!-- <latestorder/> -->
    </div>
    <div class="col-xl-5">
      <!-- <latestv/> -->
    </div>
  </div>
   <section class="position-relative" style="height: 100vh;display: grid;
    place-items: center;"
    v-else
   >

<section class="cate">
</section>
 <progress class="pure-material-progress-circular"/> 

   </section>  
  </section>
  <section class="position-relative" style="height: 100vh;display: grid;
    place-items: center;"
    v-else
   >
<div style="
background: #E66239;
    padding: 30px;
    font-size: 20px;" class="w-50 text-center text-white rounded-10">
  اهلا بك معنا
</div>
   </section> 
</template>

<!-- <script>

import chartsmonth from "./chartsmonth.vue";
import latestv from "./latestv.vue";
import latestorder from "./latestorder.vue";
export default {
  components: {
    chartsmonth,
    latestv,
    latestorder
  },
};
</script> -->
<script>
import crudDataService from "../../Services/crudDataService.js";
export default {
  data() {
    return {
      items:null,
      icon: false,
      admin:{},
    perminlocal : localStorage.getItem('permissions')

    };
  },
  methods: {
    async getstatistics() {
      if (this.perminlocal.includes('statistics-index')) {
        const res = await crudDataService.getAll("statistics").then((res)=>{
        this.items = res.data.data;
        this.setupAdminIcons();

      }).catch((err)=>{
        console.log(err);
      })
      }else{
        console.log('nothing');
      }
  
    },
    setupAdminIcons() {
      const iconMap = {
        المسؤولين: { icon: "si si-user", href: "/admins" },
        المستخدمين: { icon: "si si-people", href: "/customer"  },
        البائعين: { icon: "si ti-archive", href: "/vendors"  },
        المتاجر: { icon: "fas fa-store", href: "/stores"  },
        "جهات الاتصال": { icon: "si si-bubbles", href: "/contact"  },
        القسائم: { icon: "si si-tag", href: "/category"  },
        العروض: { icon: "si si-star" , href: "/dashboard" },
        الطلبات: { icon: "si si-bag", href: "/ordering"  },
        المنتجات: { icon: "si si-grid", href: "/products"  },
        الأسئلة: { icon: "si si-question", href: "/dashboard"  },
        المراجعات: { icon: "si si-heart", href: "/dashboard"  },
      };

      this.admin = Object.keys(this.items).reduce((acc, key) => {
        acc[key] = iconMap[key] || {};
        return acc;
      }, {});
    },
  },
  mounted() {
    this.getstatistics();
  },
};
</script>
<style scoped>
.card-order .fas,
.card-order .si{
  background:#E66239;
  font-size: 16px;
}
</style>