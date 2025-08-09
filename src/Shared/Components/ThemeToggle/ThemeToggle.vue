<template>
  <div class="theme-toggle">
    <button
      @click="toggleTheme"
      class="btn btn-icon btn-sm"
      :class="isDark ? 'btn-light' : 'btn-dark'"
      :title="isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
    >
      <i :class="isDark ? 'fe fe-sun' : 'fe fe-moon'"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "ThemeToggle",
  data() {
    return {
      isDark: false,
    };
  },
  mounted() {
    this.checkCurrentTheme();
  },
  methods: {
    checkCurrentTheme() {
      this.isDark = document.body.classList.contains("dark-theme");
    },
    toggleTheme() {
      if (this.isDark) {
        this.setLightTheme();
      } else {
        this.setDarkTheme();
      }
      this.checkCurrentTheme();
    },
    setDarkTheme() {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      document.body.classList.remove("light-menu");
      document.body.classList.remove("header-light");
      document.body.classList.remove("color-menu");
      document.body.classList.remove("color-header");
      document.body.classList.add("dark-menu");
      document.body.classList.add("header-dark");
      localStorage.setItem("Spruhadark", true);
      localStorage.removeItem("SpruhaLighttheme");
    },
    setLightTheme() {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      document.body.classList.remove("dark-menu");
      document.body.classList.remove("header-dark");
      document.body.classList.remove("color-menu");
      document.body.classList.remove("color-header");
      // document.body.classList.add("light-menu");
      // document.body.classList.add("header-light");
      localStorage.setItem("SpruhaLighttheme", true);
      localStorage.removeItem("Spruhadark");
    },
  },
};
</script>

<style scoped>
.theme-toggle {
  display: inline-block;
}

.theme-toggle .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle .btn:hover {
  transform: scale(1.1);
}

.theme-toggle .btn i {
  font-size: 16px;
}
</style>
