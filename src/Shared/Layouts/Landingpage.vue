<template>
  <div>
    <router-view />
    <Backtotop />
  </div>
</template>

<script>
import Backtotop from "../Components/Backtotop/Backtotop.vue";
export default {
  beforeCreate() {
    document.body.classList.add(
      "app",
      "sidebar-mini",
      "ltr",
      "landing-page",
      "horizontalmenu"
    );
    document.body.classList.remove(
      "main-body",
      "leftmenu",
      "layout-boxed",
      "dark-theme",
      "light-theme",
      "rtl",
      "horizontalmenu-hover",
      "dark-menu",
      "light-menu",
      "color-menu",
      "header-light",
      "header-dark",
      "color-header",
      "layout-fullwidth",
      "scrollable-layout",
      "fixed-layout"
    );
  },
  components: { Backtotop },
};
</script>

<style></style>
