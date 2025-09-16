// Example usage of global error handler in any component

import { handleApiError, ApiErrorHandler } from "../utils/errorHandler.js";
import crudDataService from "../Services/crudDataService.js";

export default {
  data() {
    return {
      loading: false,
      data: [],
    };
  },
  methods: {
    // Simple usage - automatically handles 404 and other errors
    async fetchData() {
      this.loading = true;
      try {
        const res = await crudDataService.getAll("your-endpoint");
        this.data = res.data.data;
      } catch (error) {
        this.data = handleApiError(error, []); // Returns [] as default value
      } finally {
        this.loading = false;
      }
    },

    // Advanced usage with custom options
    async fetchDataAdvanced() {
      this.loading = true;
      try {
        const res = await crudDataService.getAll("your-endpoint");
        this.data = res.data.data;
      } catch (error) {
        this.data = ApiErrorHandler.handle(error, {
          defaultValue: [],
          showToast: true,
          customMessage: "فشل في تحميل البيانات المخصصة",
          redirect404: true,
        });
      } finally {
        this.loading = false;
      }
    },

    // Check specific error types
    async someApiCall() {
      try {
        const res = await crudDataService.create("endpoint", data);
        // Handle success
      } catch (error) {
        if (ApiErrorHandler.is404(error)) {
          // Handle 404 specifically
          console.log("Resource not found");
        } else if (ApiErrorHandler.is401(error)) {
          // Handle unauthorized specifically
          console.log("User not authorized");
        } else {
          // Handle other errors
          handleApiError(error);
        }
      }
    },
  },
};
