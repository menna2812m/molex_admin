import { createApp, markRaw } from "vue";
import router from "./Router/";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "@vueform/multiselect/themes/default.css";
import "./style.scss";
import VueGoodTablePlugin from "vue-good-table-next";
import "vue3-openlayers/dist/vue3-openlayers.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import rate from "vue-rate";
import "vue-rate/dist/vue-rate.css";
import Lightbox from "vue-easy-lightbox";
// import the styles
import "vue-good-table-next/dist/vue-good-table-next.css";
import "simplebar/dist/simplebar.min.css";
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/dist/vue3-openlayers.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Vue3ColorPicker from "vue3-colorpicker";
import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/solarized-light.css";
import CKEditor from "@ckeditor/ckeditor5-vue";
import "vue3-colorpicker/style.css";
import VueTelInput from "vue-tel-input";
// import Vue3FormWizard from "vue-form-wizard";
import InputColorPicker from "vue-native-color-picker";
import ColorPicker from "@oysterlee/vue-color-picker";
import "vue3-form-wizard/dist/style.css";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import Vue3Autocounter from "vue3-autocounter";
import VueCountdown from "@chenfengyuan/vue-countdown";
import { createStore } from "vuex";
// import VueContentPlaceholders from 'vue-content-placeholders';
import VueBarcode from "@chenfengyuan/vue-barcode";
import { createPinia } from "pinia";
import print from "vue3-print-nb";

import "./axios";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
//LDS End
const app = createApp(App).component("vue3-autocounter", Vue3Autocounter);
app.component(VueCountdown.name, VueCountdown);
app.component(VueBarcode.name, VueBarcode);
// app.use(VueContentPlaceholders);
app.use(pinia); // LDS
app.use(print);
app.use(PerfectScrollbar, {
  watchOptions: 0,
  options: {
    suppressScrollX: 0,
  },
});

import VueHtmlToPaper from "vue-html-to-paper";
import { themeManager } from "./utils/eventBus";
app.use(VueHtmlToPaper);
const store = createStore({
  state() {
    return {
      count: "dark",
    };
  },
  mutations: {},
});

app.use(store);
app.use(ColorPicker);
app.use(VueHighlightJS);
app.use(InputColorPicker);
app.use(CKEditor);
app.component("Datepicker", Datepicker);
app.use(VueTelInput);
app.use(router);
app.use(Toast);
app.use(Vue3ColorPicker);
app.use(OpenLayersMap);
app.use(rate);
app.use(VueSweetalert2);
app.use(Lightbox);
app.use(BootstrapVue3);

// // Initialize dark theme by default
// const initializeDarkTheme = () => {
//   // Force dark theme as default regardless of saved preferences
//   document.body.classList.add("dark-theme");
//   document.body.classList.remove("light-theme");
//   document.body.classList.remove("light-menu");
//   document.body.classList.remove("header-light");
//   document.body.classList.remove("color-menu");
//   document.body.classList.remove("color-header");
//   document.body.classList.add("dark-menu");
//   document.body.classList.add("header-dark");

//   // Set the primary color to #fd601f
//   document
//     .querySelector("html")
//     .style.setProperty("--primary-rgb", "253, 96, 31");

//   // Always save dark theme preference
//   localStorage.setItem("Spruhadark", true);
//   localStorage.removeItem("SpruhaLighttheme");
// };

// // Initialize theme before mounting
// initializeDarkTheme();

app.config.globalProperties.$themeManager = themeManager;

app.mount("#app");
app.use(VueGoodTablePlugin);
