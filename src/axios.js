import axios from "axios";
import { ApiErrorHandler } from "./utils/errorHandler.js";

const authlocal = localStorage.getItem("authlocal");
var domain = "https://backend.molexapp.com/dashboard";
axios.defaults.baseURL = domain;

if (domain == "https://backend.molexapp.com/dashboard" && authlocal) {
  axios.defaults.token = `Bearer ${authlocal}`;
} else {
  axios.defaults.token = null;
}

// Add a function to update token dynamically
export const updateAxiosToken = (token) => {
  if (token) {
    axios.defaults.token = `Bearer ${token}`;
  } else {
    axios.defaults.token = null;
  }
};

// Add a function to clear authentication
export const clearAuth = () => {
  localStorage.removeItem("authlocal");
  localStorage.removeItem("permissions");
  axios.defaults.token = null;
};

// Global response interceptor for error handling
axios.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      const status = error.response.status;

      // Handle specific status codes that need immediate action
      if (status === 401) {
        // Unauthorized - clear auth and redirect to login
        clearAuth();
        ApiErrorHandler.handle(error, { showToast: false });
      } else if (status === 404) {
        // 404 errors will be handled by individual components
        // Don't handle globally to allow component-specific logic
      }
    }

    // Always reject the promise so components can handle errors
    return Promise.reject(error);
  }
);
