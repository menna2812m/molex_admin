<template>
  <div className="horizontalMenucontainer">
    <Switcher />
    <div className="page">
      <Header />
      <Sidebar />
      <div className="main-content side-content pt-0" v-on:click="Remove()">
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
import Header from "../../Shared/Components/Header/Header.vue";
import Footer from "../../Shared/Components/Footer/Footer.vue";
import Rightsidebar from "../../Shared/Components/Rightsidebar/Rightsidebar.vue";
import Sidebar from "../../Shared/Components/Sidebar/Sidebar.vue";
import Pageheader from "../../Shared/Components/Pageheader/Pageheader.vue";
import Switcher from "../../Shared/Components/Switcher/Switcher.vue";
import Backtotop from "../Components/Backtotop/Backtotop.vue";
export default {
  beforeCreate() {
    document.body.classList.remove("error-1");
    document.body.classList.remove(
      "app",
      "sidebar-mini",
      "landing-page",
      "horizontalmenu"
    );
    document.body.classList.add("main-body", "leftmenu");
  },

  methods: {
    Remove: function () {
      document.querySelector(".sidebar-right").classList.remove("sidebar-open");
      document.body.classList.remove("main-sidebar-show");
      document.querySelector(".demo_changer").classList.remove("active");
      document.querySelector(".demo_changer").style.right = "-270px";
    },
  },
  components: {
    Header,
    // Sidemenu,
    Rightsidebar,
    Footer,
    Sidebar,
    Pageheader,
    Switcher,
    Backtotop,
  },
};
</script>
