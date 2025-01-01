<template>
  <div className="horizontalMenucontainer">
    <div className="page">
      <Sidebar />
      <div className="main-content side-content pt-0" v-on:click="remove()">
        <div className="main-container container-fluid">
          <div className="inner-body">
            <router-view />
          </div>
        </div>
      </div>
      <Rightsidebar />
    </div>
    <Backtotop />
    <Footer />
  </div>
</template>
<script>
import Footer from "../../Shared/Components/Footer/Footer.vue";
import Rightsidebar from "../../Shared/Components/Rightsidebar/Rightsidebar.vue";
import Sidebar from "../../Shared/Components/Sidebar/Sidebar.vue";
import Pageheader from "../../Shared/Components/Pageheader/Pageheader.vue";
import Switcher from "../../Shared/Components/Switcher/Switcher.vue";
import Backtotop from "../Components/Backtotop/Backtotop.vue";
export default {
  methods: {
    remove() {
      document.querySelector(".sidebar-right").classList.remove("sidebar-open");
    },
  },
  components: {

    Rightsidebar,
    Footer,
    Sidebar,
    Pageheader,
    Switcher,
    Backtotop,
  },
};
</script>
