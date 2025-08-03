import axios from "axios";
import router from "./Router";
import { useToast } from "vue-toastification";
const toast = useToast();
const http = axios.create({
  baseURL: axios.defaults.baseURL ?? "https://mall.alharazy.com/dashboard",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: axios.defaults.token,
  },
});
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (!navigator.onLine) {
      toast.error("No internet connection, please check your connection.", {
        position: "top-center",
      });

      console.clear();
    }
    if (error && error.response) {
      if (error.response.status == 401) {
        router.push({
          name: "SignIn",
        });
      } else if (error.response.status == 404) {
        router.push("/404");
      } else {
        return Promise.reject(error.response);
      }
    }
  }
);
http.interceptors.request.use(
  (config) => {
    // Check if the token exists
    const token = axios.defaults.token;
    if (token) {
      // Add the token to the request header
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default http;
