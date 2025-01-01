<template>
  <section>
    <div id="mySidebar" :class="[style ? 'showing' : 'hiding', 'w3-sidebar']">
      <div class="p-3">
        <div class="w-100 text-end">
          <i
            @click="close()"
            class="zmdi zmdi-close fs-6 ms-auto text-end"
            style="
              color: #fe7eae;
              background: #fe7eae1a;
              border-radius: 2px;
              padding: 4px 6px;
            "
          ></i>
        </div>
        <div>
          <p class="mb-0 fw-semibold">فرز كوبونات التخفيض حسب</p>
          <div class="search mt-2">
            <input
              type="text"
              class="searchTerm"
              placeholder="اسم الكوبون ..."
            />
            <button type="submit" class="searchButton">
              <i class="fa fa-search fs-6 pb-3"></i>
            </button>
          </div>
          <div class="py-2">
            <div class="d-flex justify-content-between align-items-center" @click="opencheckes" style="cursor: pointer;">
              <h6 class="pt-2" style="color: #fe7eae">عرض كوبونات التخفيض</h6>
              <i class="fe fe-minus"></i>
            </div>
            <div v-if="checksboxes" >
              <label class="ckbox">
                <input type="checkbox" />
                <span> الكل</span>
              </label>
              <label class="ckbox">
                <input type="checkbox" />
                <span> المفعلة</span>
              </label>
              <label class="ckbox">
                <input type="checkbox" />
                <span> المعطلة</span>
              </label>
              <label class="ckbox">
                <input type="checkbox" />
                <span> لم تبدأ بعد</span>
              </label>
            </div>
          </div>
          <div class="py-2">
            <div class="d-flex justify-content-between align-items-center" @click="opencopun" style="cursor: pointer;">
              <h6 class="pt-2" style="color: #fe7eae">نوع الكوبون  </h6>
              <i class="fe fe-minus"></i>
            </div>
            <div v-if="copunstype" >
              <label class="ckbox">
                <input type="checkbox" />
                <span> الكل</span>
              </label>
              <label class="ckbox">
                <input type="checkbox" />
                <span> كوبون عادي</span>
              </label>
              <label class="ckbox">
                <input type="checkbox" />
                <span> كوبون تسويقي</span>
              </label>
            
            </div>
          </div>
          <div class="py-2">
            <div class="d-flex justify-content-between align-items-center" @click="openorder" style="cursor: pointer;">
              <h6 class="pt-2" style="color: #fe7eae">ترتيب كوبونات التخفيض   </h6>
              <i class="fe fe-minus"></i>
            </div>
            <div v-if="copunsorder" >
              <label class="rdiobox">
                <input name="rdio" type="radio" />
                 <span>حسب الإضافة </span>
                 </label>
                 <label class="rdiobox">
                <input name="rdio" type="radio" />
                 <span>أبجديا  </span>
                 </label>
                 <label class="rdiobox">
                <input name="rdio" type="radio" />
                 <span>تاريخ البداية  </span>
                 </label>
                 <label class="rdiobox">
                <input name="rdio" type="radio" />
                 <span>تاريخ الإنتهاء  </span>
                 </label>
                 <label class="rdiobox">
                <input name="rdio" type="radio" />
                 <span>الأكثر مبيعا  </span>
                 </label>
            </div>
          </div>
          <div class="py-2">
            <div class="d-flex justify-content-between align-items-center" @click="openview" style="cursor: pointer;">
              <h6 class="pt-2" style="color: #fe7eae">عرض حسب     </h6>
              <i class="fe fe-minus"></i>
            </div>
            <div v-if="copunsview" >
              <label class="rdiobox">
                <input name="rdio" type="radio" />
                 <span>الأحدث اولا  </span>
                 </label>
                 <label class="rdiobox">
                <input name="rdio" type="radio" />
                 <span>الأقدم اولا  </span>
                 </label>
                
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
                  <button
                    class="text-white border-0 rounded w-50 me-1 p-2"
                    style="color: #E66239; background:#E66239;"
                  >
                  عرض النتائج 
                  </button>
                  <button class="border-0 rounded w-50 p-2 text-black m-0 " style="background: #DFDFDF;">إعادة تعيين</button>
                </div>
        </div>
      </div>
    </div>
    <button @click="open()" class="bg-transparent border-0 fw-semibold">
      <i class="typcn typcn-filter"></i>
      تصفية
    </button>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      style: false,
      checksboxes:true,
      copunstype:true,
      copunsorder:true,
      copunsview:true
    };
  },
  methods: {
    open() {
        this.style = !this.style;
    },

    close() {
      this.style = !this.style;
    },
    opencheckes(){
      this.checksboxes = !this.checksboxes;
    },
    opencopun(){
      this.copunstype = !this.copunstype;
    },
    openorder(){
      this.copunsorder = !this.copunsorder;
    },
    openview(){
      this.copunsview=!this.copunsview
    }
  },
};
</script>
<style lang="scss" scoped>
.showing {
  display: block;
}
.hiding {
  display: none;
}
.w3-sidebar {
  height: 100%;
  width: 280px;
  background-color: #fff;
  position: fixed !important;
  z-index: 112;
  overflow: auto;
  left: 0;
  top: 0;
  i {
    cursor: pointer;
  }
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 1px solid #E66239;
  border-left: none;
  border-radius: 0 5px 5px 0;
  outline: none;
  color: #9dbfaf;
}

.searchTerm:focus {
  color: #E66239;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #E66239;
  background: #E66239;
  text-align: center;
  color: #fff;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
  font-size: 20px;
}
</style>
