import axios from "axios";
const authlocal = localStorage.getItem("authlocal");
console.log(authlocal);
var domain = "https://mall.alharazy.com/dashboard";
axios.defaults.baseURL = domain;
if (domain == "https://mall.alharazy.com/dashboard") {
  axios.defaults.token = `Bearer ${authlocal}`;
} else {
  axios.defaults.token;
}
