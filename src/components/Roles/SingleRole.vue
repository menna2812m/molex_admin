<template>
  <section v-if="item">
    <div class="row row-sm mt-5 pt-5">
      <div class="col-12">
        <div class="card productdesc pb-3 border-1">
          <div
            class="card-header pb-2 d-flex align-items-center justify-content-between"
          >
            <h4 class="mb-0">
              {{ item.name }}
            </h4>
            <div class="pos-relative">
              <button
                class="twobtn bg-white border"
                style="border-color: #E66239 !important; color: #E66239"
      v-if="perminlocal.includes('roles-update')"
              
              >
                <a  @click="edit()">تعديل الأدوار </a>
              </button>

            </div>
          </div>
          <div class="card-body">
            <div class="pb-3">
              <h3 class="py-2">الإذن</h3>
              <div class="ms-4">
                <ul
                  class="list-group list-group-flush"
                  v-for="(role, i) in item.permissions"
                  :key="i"
                >
                  <li class="p-2">
                  <input type="checkbox" name="vehicle1" :value="role.display_name" v-model="ischecked" disabled/>

                    {{ role.display_name }}
                  </li>
                </ul>
              </div>
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
import crudDataService from "../../Services/crudDataService.js";

export default {
  data() {
    return {
      item: null,
      ischecked:true,
      perminlocal: localStorage.getItem("permissions"),

    };
  },
  methods: {

    edit() {
        this.$router.push({ name: "editRole", params:   `${this.$route.params.id}` });

    },
    async getPage() {
      const res = await crudDataService.get(
        "roles",
        `${this.$route.params.id}`
      );
      this.item = res.data.data;
      console.log(this.item);

    },
  
  },
  mounted() {
    this.getPage();
  },
};
</script>
