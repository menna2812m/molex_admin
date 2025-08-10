export const themeMixin = {
  data() {
    return {
      isDark: false,
      themeUnsubscribe: null,
    };
  },

  computed: {
    themeClass() {
      return this.isDark ? "dark-theme" : "light-theme";
    },
  },

  methods: {
    setupThemeListener() {
      // Check if themeManager is available
      if (
        this.$themeManager &&
        typeof this.$themeManager.subscribe === "function"
      ) {
        this.themeUnsubscribe = this.$themeManager.subscribe((theme) => {
          this.isDark = theme.isDark;
        });
      } else {
        console.warn("Theme manager not available in sidebar, using fallback");
        this.setupFallbackThemeListener();
      }
    },

    // Fallback theme listener
    setupFallbackThemeListener() {
      const checkTheme = () => {
        this.isDark = document.body.classList.contains("dark-theme");
      };

      // Check initially
      checkTheme();

      // Watch for storage changes
      const storageListener = (e) => {
        if (e.key === "Spruhadark" || e.key === "SpruhaLighttheme") {
          setTimeout(checkTheme, 100); // Small delay to ensure DOM is updated
        }
      };
      window.addEventListener("storage", storageListener);

      // Watch for DOM changes
      const observer = new MutationObserver(() => {
        checkTheme();
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });
    },
    checkCurrentTheme() {
      if (this.$themeManager) {
        this.isDark = this.$themeManager.isDarkTheme();
      } else {
        this.isDark = document.body.classList.contains("dark-theme");
      }
    },
  },

  mounted() {
    this.checkCurrentTheme();
    this.setupThemeListener();
  },

  beforeUnmount() {
    if (this.themeUnsubscribe && typeof this.themeUnsubscribe === "function") {
      this.themeUnsubscribe();
    }
  },
};
