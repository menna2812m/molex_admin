export class ThemeManager {
  constructor() {
    // Initialize listeners Set properly
    this.listeners = new Set();
    this.storageListener = null;
    this.init();
  }

  init() {
    this.initTheme();
    this.setupStorageListener();
  }

  initTheme() {
    // Check localStorage for saved theme preference
    const isDark = localStorage.getItem("Spruhadark") === "true";
    const isLight = localStorage.getItem("SpruhaLighttheme") === "true";

    console.log("Theme Manager Init:", { isDark, isLight });

    if (isDark) {
      this.applyDarkTheme();
    } else if (isLight) {
      this.applyLightTheme();
    } else {
      // Default theme - set to light
      this.applyLightTheme();
    }
  }

  setupStorageListener() {
    // Remove existing listener if any
    if (this.storageListener) {
      window.removeEventListener("storage", this.storageListener);
    }

    // Create new listener
    this.storageListener = (e) => {
      if (e.key === "Spruhadark" || e.key === "SpruhaLighttheme") {
        console.log("Storage changed:", e.key, e.newValue);
        this.initTheme();
        this.notifyListeners();
      }
    };

    // Listen for localStorage changes from other tabs/windows
    window.addEventListener("storage", this.storageListener);
  }

  applyDarkTheme() {
    console.log("Applying dark theme");
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
    document.body.classList.remove("light-menu");
    document.body.classList.remove("header-light");
    document.body.classList.remove("color-menu");
    document.body.classList.remove("color-header");
    document.body.classList.add("dark-menu");
    document.body.classList.add("header-dark");
  }

  applyLightTheme() {
    console.log("Applying light theme");
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
    document.body.classList.remove("dark-menu");
    document.body.classList.remove("header-dark");
    document.body.classList.remove("color-menu");
    document.body.classList.remove("color-header");
  }

  getCurrentTheme() {
    const isDark = document.body.classList.contains("dark-theme");
    const isLight = document.body.classList.contains("light-theme");
    return { isDark, isLight };
  }

  toggleTheme() {
    const currentTheme = this.getCurrentTheme();

    if (currentTheme.isDark) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
    this.notifyListeners();
  }

  setDarkTheme() {
    this.applyDarkTheme();
    localStorage.setItem("Spruhadark", "true");
    localStorage.removeItem("SpruhaLighttheme");
  }

  setLightTheme() {
    this.applyLightTheme();
    localStorage.setItem("SpruhaLighttheme", "true");
    localStorage.removeItem("Spruhadark");
  }

  // Subscribe to theme changes
  subscribe(callback) {
    if (typeof callback !== "function") {
      return () => {}; // Return empty unsubscribe function
    }

    // Ensure listeners is initialized
    if (!this.listeners) {
      this.listeners = new Set();
    }

    this.listeners.add(callback);

    // Return unsubscribe function
    return () => {
      if (this.listeners && this.listeners.has(callback)) {
        this.listeners.delete(callback);
      }
    };
  }

  // Notify all subscribers
  notifyListeners() {
    if (!this.listeners) {
      return;
    }

    const theme = this.getCurrentTheme();

    this.listeners.forEach((callback) => {
      try {
        callback(theme);
      } catch (error) {
        console.error("Error in theme listener:", error);
      }
    });
  }

  // Helper methods
  isDarkTheme() {
    return document.body.classList.contains("dark-theme");
  }

  isLightTheme() {
    return document.body.classList.contains("light-theme");
  }

  // Cleanup method
  destroy() {
    if (this.storageListener) {
      window.removeEventListener("storage", this.storageListener);
      this.storageListener = null;
    }
    if (this.listeners) {
      this.listeners.clear();
    }
  }
}

// Create and export global instance
export const themeManager = new ThemeManager();

// Make it available globally for debugging
if (typeof window !== "undefined") {
  window.themeManager = themeManager;
}
