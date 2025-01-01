<template>
  <router-view />
  <Customwitcherpage />
</template>
<script>
import Customwitcherpage from "../Components/Switcher/Customwitcherpage.vue";

export default {
  mounted() {
    document.body.classList.add("error-1");
  },
  components: {  Customwitcherpage },
};
</script>

<style></style>
