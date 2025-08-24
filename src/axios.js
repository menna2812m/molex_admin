import axios from "axios";

const authlocal = localStorage.getItem("authlocal");
console.log(authlocal);
var domain = "https://mall.alharazy.com/dashboard";
axios.defaults.baseURL = domain;

if (domain == "https://mall.alharazy.com/dashboard" && authlocal) {
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
