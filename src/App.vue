<template>
  <router-view />
</template>

<script>
import { useToast } from "vue-toastification";


export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
 
  data() {
    return {
      isLoading: true,
      No: false,
      Yes: true,
    };
  },
  methods: {
  
    handleOnlineStatus() {
      if (navigator.onLine) {
        // Show success Toast when internet connection is restored
        this.toast.success("Internet connection restored!", {
          position: "top-center",
        });
        this.No = false;
        this.Yes = true;
      } else {
        // Show error Toast when the user is offline
        this.toast.error(
          "No internet connection, please check your connection.",
          {
            position: "top-center",
          }
        );
        this.No = true;
        this.Yes = false;
      }
    },
    
  },
  created() {
    // Online status event listener
    window.addEventListener("online", this.handleOnlineStatus);

    // Offline status event listener
    window.addEventListener("offline", this.handleOnlineStatus);
 },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
   
  },

  beforeDestroy() {
    // Don't forget to remove event listeners when the component is destroyed
    window.removeEventListener("online", this.handleOnlineStatus);
    window.removeEventListener("offline", this.handleOnlineStatus);
  },
};
</script>

<style>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  background-image: url("./assets/img/loader.gif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>
