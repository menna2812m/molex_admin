import { useToast } from "vue-toastification";
import router from "../Router/index.js";

/**
 * Global API Error Handler
 * Handles common API errors consistently across the application
 */
export class ApiErrorHandler {
  /**
   * Handle API errors with appropriate actions
   * @param {Error} error - The error object from API call
   * @param {Object} options - Configuration options
   * @param {*} options.defaultValue - Default value to return on error
   * @param {boolean} options.showToast - Whether to show toast notification
   * @param {string} options.customMessage - Custom error message
   * @param {boolean} options.redirect404 - Whether to redirect on 404
   * @returns {*} Default value or null
   */
  static handle(error, options = {}) {
    const {
      defaultValue = null,
      showToast = true,
      customMessage = null,
      redirect404 = true,
    } = options;

    console.error("API Error:", error);

    // Check if error response exists
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 404:
          if (redirect404) {
            router.push({ name: "404page" });
            return defaultValue;
          }
          break;

        case 401:
          // Handle unauthorized access
          localStorage.removeItem("authlocal");
          localStorage.removeItem("permissions");
          router.push({ name: "SignIn" });
          return defaultValue;

        case 403:
          // Handle forbidden access
          if (showToast) {
            const toast = useToast();
            toast.error("ليس لديك صلاحية للوصول إلى هذا المحتوى", {
              position: "top-center",
              timeout: 5000,
            });
          }
          break;

        case 500:
          // Handle server errors
          if (showToast) {
            const toast = useToast();
            toast.error("خطأ في الخادم، يرجى المحاولة مرة أخرى", {
              position: "top-center",
              timeout: 5000,
            });
          }
          break;

        default:
          // Handle other HTTP errors
          if (showToast) {
            const toast = useToast();
            const message = customMessage || "حدث خطأ أثناء تحميل البيانات";
            toast.error(message, {
              position: "top-center",
              timeout: 5000,
            });
          }
      }
    } else if (error.request) {
      // Network error
      if (showToast) {
        const toast = useToast();
        toast.error("خطأ في الاتصال بالشبكة", {
          position: "top-center",
          timeout: 5000,
        });
      }
    } else {
      // Other errors
      if (showToast) {
        const toast = useToast();
        const message = customMessage || "حدث خطأ غير متوقع";
        toast.error(message, {
          position: "top-center",
          timeout: 5000,
        });
      }
    }

    return defaultValue;
  }

  /**
   * Check if error is a 404 error
   * @param {Error} error - The error object
   * @returns {boolean} True if error is 404
   */
  static is404(error) {
    return error.response && error.response.status === 404;
  }

  /**
   * Check if error is a 401 error
   * @param {Error} error - The error object
   * @returns {boolean} True if error is 401
   */
  static is401(error) {
    return error.response && error.response.status === 401;
  }

  /**
   * Handle 404 errors specifically
   * @param {Error} error - The error object
   */
  static handle404(error) {
    if (this.is404(error)) {
      router.push({ name: "404page" });
    }
  }
}

/**
 * Shorthand function for handling API errors
 * @param {Error} error - The error object
 * @param {*} defaultValue - Default value to return
 * @returns {*} Default value
 */
export const handleApiError = (error, defaultValue = null) => {
  return ApiErrorHandler.handle(error, { defaultValue });
};

/**
 * Handle 404 errors specifically
 * @param {Error} error - The error object
 */
export const handle404Error = (error) => {
  ApiErrorHandler.handle404(error);
};
