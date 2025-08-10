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
      unsubscribe: null,
    };
  },
  mounted() {
    this.checkCurrentTheme();
    this.setupThemeListener();
  },
  beforeUnmount() {
    this.removeThemeListener();
  },
  methods: {
    checkCurrentTheme() {
      // Check if themeManager is available
      console.log(this.$themeManager);

      if (this.$themeManager) {
        this.isDark = this.$themeManager.isDarkTheme();
      } else {
        // Fallback to direct DOM check
        this.isDark = document.body.classList.contains("dark-theme");
      }
    },

    setupThemeListener() {
      // Use themeManager subscription instead of event bus
      if (
        this.$themeManager &&
        typeof this.$themeManager.subscribe === "function"
      ) {
        this.unsubscribe = this.$themeManager.subscribe((theme) => {
          this.isDark = theme.isDark;
        });
      } else {
        console.warn("Theme manager not available, using fallback approach");
        this.setupFallbackListener();
      }
    },

    setupFallbackListener() {
      // Fallback: Watch localStorage changes
      this.storageListener = (e) => {
        if (e.key === "Spruhadark" || e.key === "SpruhaLighttheme") {
          this.checkCurrentTheme();
        }
      };
      window.addEventListener("storage", this.storageListener);
    },

    removeThemeListener() {
      // Remove theme manager subscription
      if (this.unsubscribe && typeof this.unsubscribe === "function") {
        this.unsubscribe();
        this.unsubscribe = null;
      }

      // Remove fallback listener
      if (this.storageListener) {
        window.removeEventListener("storage", this.storageListener);
        this.storageListener = null;
      }
    },

    toggleTheme() {
      if (
        this.$themeManager &&
        typeof this.$themeManager.toggleTheme === "function"
      ) {
        // Use global theme manager
        this.$themeManager.toggleTheme();
      } else {
        // Fallback to original toggle logic
        if (this.isDark) {
          this.setLightTheme();
        } else {
          this.setDarkTheme();
        }
      }
      this.checkCurrentTheme();
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
