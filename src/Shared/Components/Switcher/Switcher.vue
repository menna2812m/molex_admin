<template>
  <div class="switcher-wrapper">
    <div class="demo_changer">
      <div class="form_holder sidebar-right1">
        <perfect-scrollbar style="height: 100vh; overflow-y: autoplay">
          <div class="row">
            <div class="predefined_styles">
              <div class="swichermainleft">
                <h4>LTR and RTL Versions</h4>
                <div class="skin-body">
                  <div class="switch_section">
                    <div class="switch-toggle d-flex">
                      <span class="me-auto">LTR</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch7"
                          id="myonoffswitch19"
                          class="onoffswitch2-checkbox"
                          checked
                          v-on:click="RtltoLtr()"
                        />
                        <label
                          for="myonoffswitch19"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle d-flex mt-2">
                      <span class="me-auto">RTL</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch7"
                          id="myonoffswitch20"
                          class="onoffswitch2-checkbox"
                          v-on:click="LtrtoRtl()"
                        />
                        <label
                          for="myonoffswitch20"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swichermainleft menu-styles">
                <h4>Navigation Style</h4>
                <div class="skin-body">
                  <div class="switch_section">
                    <div class="switch-toggle d-flex">
                      <span class="me-auto">Vertical Menu</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch01"
                          id="myonoffswitch01"
                          class="onoffswitch2-checkbox"
                          checked
                          v-on:click="VerticalMenu()"
                        />
                        <label
                          for="myonoffswitch01"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle d-flex mt-2">
                      <span class="me-auto">Horizontal Click Menu</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch01"
                          id="myonoffswitch02"
                          class="onoffswitch2-checkbox"
                          v-on:click="Horizontal()"
                        />
                        <label
                          for="myonoffswitch02"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle d-flex mt-2">
                      <span class="me-auto">Horizontal Hover Menu</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch01"
                          id="myonoffswitch03"
                          class="onoffswitch2-checkbox"
                          v-on:click="HorizontalHoverMenu()"
                        />
                        <label
                          for="myonoffswitch03"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swichermainleft">
                <h4>Light Theme Style</h4>
                <div class="skin-body">
                  <div class="switch_section">
                    <div class="switch-toggle d-flex">
                      <span class="me-auto">Light Theme</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch1"
                          id="myonoffswitch1"
                          class="onoffswitch2-checkbox"
                          checked
                          v-on:click="LightTheme()"
                        />
                        <label
                          for="myonoffswitch1"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle d-flex mt-2">
                      <span class="me-auto">Light Primary</span>
                      <div class="">
                        <input
                          class="wd-30 ht-30 input-color-picker color-primary-light"
                          value="#fd601f"
                          id="colorID"
                          type="color"
                          data-id="bg-color"
                          data-id1="bg-hover"
                          data-id2="bg-border"
                          data-id7="transparentcolor"
                          name="lightPrimary"
                          @input="DynamicLightprimaryColor"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swichermainleft">
                <h4>Dark Theme Style</h4>
                <div class="skin-body">
                  <div class="switch_section">
                    <div class="switch-toggle d-flex">
                      <span class="me-auto">Dark Theme</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch1"
                          id="myonoffswitch2"
                          class="onoffswitch2-checkbox"
                          v-on:click="Dark()"
                        />
                        <label
                          for="myonoffswitch2"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle d-flex mt-2">
                      <span class="me-auto">Dark Primary</span>
                      <div class="">
                        <input
                          class="wd-30 ht-30 input-dark-color-picker color-primary-dark"
                          value="#fd601f"
                          type="color"
                          data-id="bg-color"
                          data-id1="bg-hover"
                          data-id2="bg-border"
                          data-id3="primary"
                          data-id8="transparentcolor"
                          name="darkPrimary"
                          @input="DynamiDarkprimaryColor"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swichermainleft menu-colors">
                <h4>Menu Styles</h4>
                <div class="skin-body">
                  <div class="switch_section">
                    <div class="switch-toggle lightMenu d-flex">
                      <span class="me-auto">Light Menu</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch2"
                          id="myonoffswitch3"
                          class="onoffswitch2-checkbox"
                          v-on:click="LightMenu()"
                        />
                        <label
                          for="myonoffswitch3"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle colorMenu d-flex mt-2">
                      <span class="me-auto">Color Menu</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch2"
                          id="myonoffswitch4"
                          class="onoffswitch2-checkbox"
                          v-on:click="ColorMenu()"
                        />
                        <label
                          for="myonoffswitch4"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle darkMenu d-flex mt-2">
                      <span class="me-auto">Dark Menu</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch2"
                          id="myonoffswitch5"
                          class="onoffswitch2-checkbox"
                          checked
                          v-on:click="DarkMenu()"
                        />
                        <label
                          for="myonoffswitch5"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swichermainleft header-colors">
                <h4>Header Styles</h4>
                <div class="skin-body">
                  <div class="switch_section">
                    <div class="switch-toggle lightHeader d-flex">
                      <span class="me-auto">Light Header</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch3"
                          id="myonoffswitch6"
                          class="onoffswitch2-checkbox"
                          checked
                          v-on:click="Lightheader()"
                        />
                        <label
                          for="myonoffswitch6"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle colorHeader d-flex mt-2">
                      <span class="me-auto">Color Header</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch3"
                          id="myonoffswitch7"
                          class="onoffswitch2-checkbox"
                          v-on:click="Colorheader()"
                        />
                        <label
                          for="myonoffswitch7"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle darkHeader d-flex mt-2">
                      <span class="me-auto">Dark Header</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch3"
                          id="myonoffswitch8"
                          class="onoffswitch2-checkbox"
                          v-on:click="Darkheader()"
                        />
                        <label
                          for="myonoffswitch8"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swichermainleft layout-width-style">
                <h4>Layout Width Styles</h4>
                <div class="skin-body">
                  <div class="switch_section">
                    <div class="switch-toggle d-flex">
                      <span class="me-auto">Full Width</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch4"
                          id="myonoffswitch9"
                          class="onoffswitch2-checkbox"
                          checked
                          v-on:click="FullWidth()"
                        />
                        <label
                          for="myonoffswitch9"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle d-flex mt-2">
                      <span class="me-auto">Boxed</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch4"
                          id="myonoffswitch10"
                          class="onoffswitch2-checkbox"
                          v-on:click="Boxed()"
                        />
                        <label
                          for="myonoffswitch10"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swichermainleft layout-positions">
                <h4>Layout Positions</h4>
                <div class="skin-body">
                  <div class="switch_section">
                    <div class="switch-toggle d-flex">
                      <span class="me-auto">Fixed</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch5"
                          id="myonoffswitch11"
                          class="onoffswitch2-checkbox"
                          checked
                          v-on:click="Fixed()"
                        />
                        <label
                          for="myonoffswitch11"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div class="switch-toggle d-flex mt-2">
                      <span class="me-auto">Scrollable</span>
                      <p class="onoffswitch2">
                        <input
                          type="radio"
                          name="onoffswitch5"
                          id="myonoffswitch12"
                          class="onoffswitch2-checkbox"
                          v-on:click="Scrollable()"
                        />
                        <label
                          for="myonoffswitch12"
                          class="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swichermainleft">
                <h4>Reset All Styles</h4>
                <div class="skin-body">
                  <div class="switch_section my-4">
                    <button
                      class="btn btn-danger btn-block"
                      v-on:click="resetData()"
                    >
                      Reset All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </perfect-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Switcher",

  methods: {
    //DynamicDarkprimarycolor
    DynamiDarkprimaryColor(eventData) {
      this.Dark();
      document
        .querySelector("html")
        .style.setProperty(
          "--primary-rgb",
          this.hex2rgb(eventData.target.value)
        );
      localStorage.setItem("darkcolor", this.hex2rgb(eventData.target.value));
      localStorage.setItem("Dynamicdarkprimarycolor", true);
      localStorage.removeItem("Dynamiclightprimarycolor");
      localStorage.removeItem("lightcolor");
    },
    //DynamicLightprimarycolor
    DynamicLightprimaryColor(eventData) {
      this.LightTheme();
      document
        .querySelector("html")
        .style.setProperty(
          "--primary-rgb",
          this.hex2rgb(eventData.target.value)
        );
      localStorage.setItem("lightcolor", this.hex2rgb(eventData.target.value));
      localStorage.setItem("Dynamiclightprimarycolor", true);
      localStorage.removeItem("Dynamicdarkprimarycolor");
      localStorage.removeItem(
        "darkcolor",
        this.hex2rgb(eventData.target.value)
      );
    },
    hex2rgb(hex) {
      let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    },
    //LtrtoRtl
    LtrtoRtl() {
      document.body.classList.add("rtl");
      document.querySelector("html[lang=en]").setAttribute("dir", "rtl");
      document.body.classList.remove("ltr");
      localStorage.setItem("SpruhaLtrtoRtl", true);
      localStorage.removeItem("SpruhaRtltoLtr");
    },
    //RTL TO LTR
    RtltoLtr() {
      document.body.classList.add("ltr");
      document.querySelector("html[lang=en]").setAttribute("dir", "ltr");
      document.body.classList.remove("rtl");
      localStorage.setItem("SpruhaRtltoLtr", true);
      localStorage.removeItem("SpruhaLtrtoRtl");
    },
    //LIGHTHEADER
    Lightheader() {
      document.body.classList.remove("color-header");
      document.body.classList.remove("header-dark");
      document.body.classList.add("header-light");
      localStorage.setItem("Lightheader", true);
      localStorage.removeItem("Colorheader");
      localStorage.removeItem("Darkheader");
    },
    //COLORHEADER
    Colorheader() {
      document.body.classList.remove("header-dark");
      document.body.classList.remove("header-light");
      document.body.classList.add("color-header");
      localStorage.setItem("Colorheader", true);
      localStorage.removeItem("Lightheader");
      localStorage.removeItem("Darkheader");
    },
    //DARKHEADER
    Darkheader() {
      document.body.classList.remove("color-header");
      document.body.classList.remove("header-light");
      document.body.classList.add("header-dark");
      localStorage.setItem("Darkheader", true);
      localStorage.removeItem("Lightheader");
      localStorage.removeItem("Colorheader");
    },
    //LIGHTMENU
    LightMenu() {
      document.body.classList.remove("color-menu");
      document.body.classList.remove("dark-menu");
      document.body.classList.add("light-menu");
      localStorage.setItem("Lightmenu", true);
      localStorage.removeItem("Colormenu");
      localStorage.removeItem("Darkmenu");
    },
    //COLORMENU
    ColorMenu() {
      document.body.classList.remove("light-menu");
      document.body.classList.remove("dark-menu");
      document.body.classList.add("color-menu");
      localStorage.setItem("Colormenu", true);
      localStorage.removeItem("Lightmenu");
      localStorage.removeItem("Darkmenu");
    },
    //DARKMENU
    DarkMenu() {
      document.body.classList.remove("light-menu");
      document.body.classList.remove("color-menu");
      document.body.classList.add("dark-menu");
      localStorage.setItem("Darkmenu", true);
      localStorage.removeItem("Lightmenu");
      localStorage.removeItem("Colormenu");
    },
    //FULLWIDTH
    FullWidth() {
      document.body.classList.remove("layout-boxed");
      document.body.classList.add("layout-fullwidth");
      localStorage.setItem("Fullwidth", true);
      localStorage.removeItem("Boxed");
    },
    //BOXED
    Boxed() {
      document.body.classList.remove("layout-fullwidth");
      document.body.classList.add("layout-boxed");
      localStorage.setItem("Boxed", true);
      localStorage.removeItem("Fullwidth");
    },
    //FIXED
    Fixed() {
      document.body.classList.remove("scrollable-layout");
      document.body.classList.add("fixed-layout");
      localStorage.setItem("fixed", true);
      localStorage.removeItem("scrollable");
    },
    //SCROLLABLE
    Scrollable() {
      document.body.classList.remove("fixed-layout");
      document.body.classList.add("scrollable-layout");
      localStorage.setItem("scrollable", true);
      localStorage.removeItem("fixed");
    },
    //VERTICALMENU
    VerticalMenu() {
      let li = document.querySelectorAll(".menu-icon");
      document.body.classList.add("leftmenu", "main-body");
      document.querySelector(".main-content").classList.add("side-content");
      document.querySelector(".main-header").classList.add("sticky");
      document
        .querySelectorAll(".main-container")
        .forEach((e) => e.classList.add("container-fluid"));
      document
        .querySelector(".main-menu")
        .classList.add("main-sidebar", "main-sidebar-sticky", "side-menu");
      document
        .querySelector(".main-menu")
        .classList.remove("main-navbar", "hor-menu");
      document
        .querySelector(".main-container-1")
        .classList.add("main-sidebar-header");
      document.querySelector(".main-body-1").classList.add("main-sidebar-body");
      document
        .querySelector("body")
        .classList.remove("horizontalmenu", "horizontalmenu-hover");
      document.querySelector(".main-header").classList.remove("hor-header");
      document.querySelector(".main-content").classList.remove("hor-content");
      document
        .querySelectorAll(".main-container")
        .forEach((e) => e.classList.remove("container"));
      document.querySelector(".main-container-1").classList.remove("container");
      document.querySelector(".menu-icon").classList.remove("hor-icon");
      li.forEach((e) => e.classList.add("sidemenu-icon"));
      localStorage.setItem("Spruhavertical", true);
      localStorage.removeItem("Spruhahorizontal");
      localStorage.removeItem("Spruhahorizontalhover");
    },
    Horizontal() {
      let li = document.querySelectorAll(".menu-icon");
      document.body.classList.add("horizontalmenu");
      document.querySelector(".main-content").classList.add("hor-content");
      document.querySelector(".main-header").classList.add("hor-header");
      document.querySelector(".main-header").classList.remove("sticky-pin");
      document.querySelector(".main-container-1").classList.add("container");
      document
        .querySelector(".main-menu")
        .classList.add("main-navbar", "hor-menu");
      document
        .querySelectorAll(".main-container")
        .forEach((e) => e.classList.add("container"));
      li.forEach((e) => e.classList.add("hor-icon"));
      document.body.classList.remove(
        "horizontalmenu-hover",
        "leftmenu",
        "main-body",
        "default-menu"
      );
      document.body.classList.remove("main-sidebar-hide");
      document.querySelector(".main-header").classList.remove("sticky");
      document.querySelector(".main-content").classList.remove("side-content");
      document
        .querySelector(".main-container-1")
        .classList.remove("main-sidebar-header");
      document
        .querySelector(".main-menu")
        .classList.remove("main-sidebar", "main-sidebar-sticky", "side-menu");
      document
        .querySelector(".main-body-1")
        .classList.remove("main-sidebar-body");
      document
        .querySelectorAll(".main-container")
        .forEach((e) => e.classList.remove("container-fluid"));
      li.forEach((e) => e.classList.remove("sidemenu-icon"));
      localStorage.setItem("Spruhahorizontal", true);
      localStorage.removeItem("Spruhavertical");
      localStorage.removeItem("Spruhahorizontalhover");
      this.checkHoriMenu();
      this.switcherArrowFn();
    },
    HorizontalHoverMenu() {
      let li = document.querySelectorAll(".menu-icon");
      document
        .querySelector("body")
        .classList.add("horizontalmenu", "horizontalmenu-hover");
      if (!document.body.classList.contains("horizontalmenu-hover"))
        document.querySelector(".main-content").classList.add("hor-content");
      document.querySelector(".main-header").classList.add("hor-header");
      document.querySelector(".main-header").classList.remove("sticky-pin");
      document
        .querySelector(".main-menu")
        .classList.add("main-navbar", "hor-menu");
      document.querySelector(".main-container-1").classList.add("container");
      document
        .querySelectorAll(".main-container")
        .forEach((e) => e.classList.add("container"));
      li.forEach((e) => e.classList.add("hor-icon"));
      document.body.classList.remove("leftmenu", "main-body");
      document.body.classList.remove("main-sidebar-hide");
      document.querySelector(".main-header").classList.remove("sticky");
      document.querySelector(".main-content").classList.remove("side-content");
      document
        .querySelector(".main-menu")
        .classList.remove("main-sidebar", "main-sidebar-sticky", "side-menu");
      document
        .querySelector(".main-container-1")
        .classList.remove("main-sidebar-header");
      document
        .querySelector(".main-body-1")
        .classList.remove("main-sidebar-body");
      document.body.classList.remove("default-menu");
      document
        .querySelectorAll(".main-container")
        .forEach((e) => e.classList.remove("container-fluid"));
      li.forEach((e) => e.classList.remove("sidemenu-icon"));
      localStorage.setItem("Spruhahorizontalhover", true);
      localStorage.removeItem("Spruhahorizontal");
      localStorage.removeItem("Spruhavertical");
      this.checkHoriMenu();
      this.switcherArrowFn();
    },
    Dark() {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      document.body.classList.remove("light-menu");
      document.body.classList.remove("header-light");
      document.body.classList.remove("color-menu");
      document.body.classList.remove("color-header");
      document.querySelector("#myonoffswitch8").checked = true;
      document.querySelector("#myonoffswitch5").checked = true;
      document.querySelector("#myonoffswitch2").checked = true;
      document.querySelector("html").style = "";
      // localStorage.clear();
      localStorage.setItem("Spruhadark", true);
      localStorage.removeItem("SpruhaLighttheme");
    },
    // Color theme
    LightTheme() {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      document.body.classList.remove("dark-menu");
      document.body.classList.remove("header-dark");
      document.body.classList.remove("color-menu");
      document.body.classList.remove("color-header");
      document.querySelector("#myonoffswitch1").checked = true;
      document.querySelector("#myonoffswitch5").checked = true;
      document.querySelector("#myonoffswitch6").checked = true;
      document.querySelector("html").style = "";
      localStorage.setItem("SpruhaLighttheme", true);
      localStorage.removeItem("Spruhadark");
    },

    checkHoriMenu() {
      let menuWidth = document.querySelector(".hor-menu");
      let menuItems = document.querySelector(".menu-nav");
      let mainSidemenuWidth = document.querySelector(".main-sidemenu");
      let menuContainerWidth =
        menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
      let marginLeftValue = Math.ceil(
        Number(window.getComputedStyle(menuItems).marginLeft.split("px")[0])
      );
      let marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuItems).marginRight.split("px")[0])
      );
      let check =
        menuItems.scrollWidth +
        (0 - menuWidth?.offsetWidth) +
        menuContainerWidth;
      if (document.querySelector(".main-body")?.classList.contains("ltr")) {
        menuItems.style.marginRight = 0;
      } else {
        menuItems.style.marginLeft = 0;
      }
      if (
        menuItems.scrollWidth - 2 <
        menuWidth?.offsetWidth - menuContainerWidth
      ) {
        document.querySelector(".slide-left")?.classList.add("d-none");
        document.querySelector(".slide-right")?.classList.add("d-none");
        document.querySelector(".slide-leftRTL")?.classList.add("d-none");
        document.querySelector(".slide-rightRTL")?.classList.add("d-none");
      } else if (marginLeftValue !== 0 || marginRightValue !== 0) {
        document.querySelector(".slide-right")?.classList.remove("d-none");
        document.querySelector(".slide-rightRTL")?.classList.remove("d-none");
      } else if (marginLeftValue !== -check || marginRightValue !== -check) {
        document.querySelector(".slide-left")?.classList.remove("d-none");
        document.querySelector(".slide-leftRTL")?.classList.remove("d-none");
      }
      if (
        menuItems.scrollWidth - 2 >
        menuWidth?.offsetWidth - menuContainerWidth
      ) {
        document.querySelector(".slide-left")?.classList.remove("d-none");
        document.querySelector(".slide-right")?.classList.remove("d-none");
        document.querySelector(".slide-leftRTL")?.classList.remove("d-none");
        document.querySelector(".slide-rightRTL")?.classList.remove("d-none");
      }
      if (marginLeftValue === 0 || marginRightValue === 0) {
        document.querySelector(".slide-left")?.classList.add("d-none");
        document.querySelector(".slide-leftRTL")?.classList.add("d-none");
      }
      if (marginLeftValue !== 0 || marginRightValue !== 0) {
        document.querySelector(".slide-left")?.classList.remove("d-none");
        document.querySelector(".slide-leftRTL")?.classList.remove("d-none");
      }
    },
    handleThemeUpdate(cssVars) {
      const root = document.querySelector(":root");
      const keys = Object.keys(cssVars);
      keys.forEach((key) => {
        root.style.setProperty(key, cssVars[key]);
      });
    },
    hexToRgba(hexValue, alpha = 1) {
      if (!isValidHex(hexValue)) {
        return null;
      }
      const chunkSize = Math.floor((hexValue.length - 1) / 3);
      const hexArr = getChunksFromString(hexValue.slice(1), chunkSize);
      const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
      return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
    },
    dynamicLightPrimaryColor(primaryColor, color) {
      primaryColor.forEach((item) => {
        const cssPropName = `--primary-${item.getAttribute("data-id")}`;
        const cssPropName1 = `--primary-${item.getAttribute("data-id1")}`;
        const cssPropName2 = `--primary-${item.getAttribute("data-id2")}`;
        handleThemeUpdate({
          [cssPropName]: hexToRgba(color),
          [cssPropName1]: hexToRgba(color, 0.9),
          [cssPropName2]: hexToRgba(color),
        });
      });
    },
    dynamicDarkPrimaryColor(primaryColor, color) {
      primaryColor.forEach((item) => {
        const cssPropName = `--primary-${item.getAttribute("data-id")}`;
        const cssPropName1 = `--primary-${item.getAttribute("data-id1")}`;
        const cssPropName2 = `--primary-${item.getAttribute("data-id2")}`;
        handleThemeUpdate({
          [cssPropName]: hexToRgba(color),
          [cssPropName1]: hexToRgba(color, 0.9),
          [cssPropName2]: hexToRgba(color),
        });
      });
    },
    resetData() {
      localStorage.clear();
      let li = document.querySelectorAll(".menu-icon");
      document.querySelector("#myonoffswitch19").checked = true; //LTR
      document.querySelector("#myonoffswitch01").checked = true; //VERTICALMENU
      document.querySelector("#myonoffswitch2").checked = true; //DARK THEME
      document.querySelector("#myonoffswitch5").checked = true; //DARK MENU
      document.querySelector("#myonoffswitch8").checked = true; //DARK HEADER
      document.querySelector("#myonoffswitch9").checked = true; //FULL WIDTH
      document.querySelector("#myonoffswitch11").checked = true; //FIXED LAYOUTPOSTION
      document.body.classList.add("dark-theme");
      let mainContainer = document.querySelectorAll(".main-container");
      mainContainer.forEach((e) => {
        e.classList.remove("container");
        e.classList.add("container-fluid");
      });
      document.body.classList.add("leftmenu");
      document.body.classList.add("main-body");
      document.querySelector(".main-content").classList.add("side-content");
      document.querySelector(".main-header").classList.add("sticky");
      document
        .querySelector(".main-menu")
        .classList.add("main-sidebar", "main-sidebar-sticky", "side-menu");
      document
        .querySelector(".main-container-1")
        .classList.add("main-sidebar-header");
      document.querySelector(".main-body-1").classList.add("main-sidebar-body");
      document.body.classList.add("dark-menu");
      document.body.classList.remove("rtl");
      document.body.classList.remove("light-theme");
      document.body.classList.remove("light-menu");
      document.body.classList.remove("color-menu");
      document.body.classList.remove("horizontalmenu");
      document.querySelector(".main-content").classList.remove("hor-content");
      document.querySelector(".main-header").classList.remove("hor-header");
      document.querySelector(".main-container-1").classList.remove("container");
      document
        .querySelector(".main-menu")
        .classList.remove("main-navbar", "hor-menu");
      document.body.classList.remove("color-menu");
      document.body.classList.add("header-dark");
      document.body.classList.remove("color-header");
      document.body.classList.remove("layout-boxed");
      document.body.classList.remove("icontext-menu");
      document.body.classList.remove("icon-overlay");
      document.body.classList.remove("closed-leftmenu");
      document.body.classList.remove("hover-submenu");
      document.body.classList.remove("hover-submenu1");
      document.body.classList.remove("sidenav-toggled");
      document.body.classList.remove("scrollable-layout");
      document.body.classList.remove("horizontalmenu-hover");
      document.querySelector("html").style = "";

      li.forEach((e) => e.classList.add("sidemenu-icon"));
    },

    localStorageBackUp() {
      // Always set dark theme as default
      this.Dark();
      document.querySelector("#myonoffswitch2").checked = true;

      // Only apply light theme if explicitly saved by user
      if (
        localStorage.getItem("SpruhaLighttheme") &&
        !localStorage.getItem("Spruhadark")
      ) {
        this.LightTheme();
        document.querySelector("#myonoffswitch1").checked = true;
      }

      //dynamiclightcolor

      ///Ltrtortl
      if (localStorage.getItem("SpruhaLtrtoRtl")) {
        this.LtrtoRtl();
        document.querySelector("#myonoffswitch20").checked = true;
      }

      //LightheaderLocalbackup
      if (localStorage.getItem("Lightheader")) {
        this.Lightheader();
        document.querySelector("#myonoffswitch6").checked = true;
      }
      //ColorheaderLocalbackup
      if (localStorage.getItem("Colorheader")) {
        this.Colorheader();
        document.querySelector("#myonoffswitch7").checked = true;
      }
      //DarkheaderLocalbackup
      if (localStorage.getItem("Darkheader")) {
        this.Darkheader();
        document.querySelector("#myonoffswitch8").checked = true;
      }
      //Fullwidth
      if (localStorage.getItem("Fullwidth")) {
        this.FullWidth();
        document.querySelector("#myonoffswitch9").checked = true;
      }
      //Boxedinloaclbackup
      if (localStorage.getItem("Boxed")) {
        this.Boxed();
        document.querySelector("#myonoffswitch10").checked = true;
      }
      //Fixed
      if (localStorage.getItem("Fixed")) {
        this.Fixed();
        document.querySelector("#myonoffswitch11").checked = true;
      }
      //Scrollable
      if (localStorage.getItem("scrollable")) {
        this.Scrollable();
        document.querySelector("#myonoffswitch12").checked = true;
      }
      //lightmenubackup
      if (localStorage.getItem("Lightmenu")) {
        this.LightMenu();
        document.querySelector("#myonoffswitch3").checked = true;
      }
      //darkmenubackuop
      if (localStorage.getItem("Darkmenu")) {
        this.DarkMenu();
        document.querySelector("#myonoffswitch5").checked = true;
      }
      //colormenubackup
      if (localStorage.getItem("Colormenu")) {
        this.ColorMenu();
        document.querySelector("#myonoffswitch4").checked = true;
      }
      //Spruhahorizontal
      if (localStorage.getItem("Spruhahorizontal")) {
        this.Horizontal();
        document.querySelector("#myonoffswitch02").checked = true;
      }
      //
      if (localStorage.getItem("Spruhahorizontalhover")) {
        this.HorizontalHoverMenu();
        document.querySelector("#myonoffswitch03").checked = true;
      }
      ///-----------------------------dynamiccolor
      if (localStorage.getItem("darkcolor")) {
        this.Dark();
        document.querySelector("#myonoffswitch2").checked = true;
        document
          .querySelector("html")
          .style.setProperty(
            "--primary-rgb",
            localStorage.getItem("darkcolor")
          );
      }
      if (localStorage.getItem("lightcolor")) {
        this.LightTheme();
        document
          .querySelector("html")
          .style.setProperty(
            "--primary-rgb",
            localStorage.getItem("lightcolor")
          );
      }
    },
    //horizontal-arrows
    switcherArrowFn() {
      let slideLeft = document.querySelector(".slide-left");
      let slideRight = document.querySelector(".slide-right");
      // used to remove is-expanded class and remove class on clicking arrow buttons
      function slideClick() {
        let slide = document.querySelectorAll(".slide");
        let sideMenuitem = document.querySelectorAll(".slide-menu__item");
        let slideMenu = document.querySelectorAll(".slide-menu");
        slide.forEach((element, _index) => {
          if (element.classList.contains("is-expanded") === true) {
            element.classList.remove("is-expanded");
          }
        });
        sideMenuitem.forEach((element, _index) => {
          if (element.classList.contains("active") === true) {
            element.classList.remove("active");
          }
        });
        slideMenu.forEach((element, _index) => {
          if (element) {
            element.style.display = "none";
          }
        });
      }
      // horizontal arrows
      window.addEventListener("resize", () => {
        let menuWidth = document.querySelector(".hor-menu");
        let menuItems = document.querySelector(".menu-nav");
        let mainSidemenuWidth = document.querySelector(".main-body-1");
        let menuContainerWidth =
          menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
        let marginLeftValue = Math.ceil(
          Number(window.getComputedStyle(menuItems).marginLeft.split("px")[0])
        );
        let marginRightValue = Math.ceil(
          Number(window.getComputedStyle(menuItems).marginRight.split("px")[0])
        );
        let check =
          menuItems.scrollWidth +
          (0 - menuWidth?.offsetWidth) +
          menuContainerWidth;

        if (
          menuWidth?.offsetWidth - menuContainerWidth >
          menuItems.scrollWidth
        ) {
          document.querySelector(".slide-left")?.classList.add("d-none");
          document.querySelector(".slide-right")?.classList.add("d-none");
          menuItems.style.marginRight = 0;
          menuItems.style.marginLeft = 0;
        } else {
          document.querySelector(".slide-right")?.classList.remove("d-none");
        }

        if (document.querySelector("html")?.getAttribute("dir") === "rtl") {
          if (
            Math.abs(marginRightValue) < Math.abs(check) === false &&
            menuWidth?.offsetWidth - menuContainerWidth < menuItems.scrollWidth
          ) {
            menuItems.style.marginRight = -check + "px";
            document.querySelector(".slide-left")?.classList.remove("d-none");
          } else {
            menuItems.style.marginRight = 0;
          }
        } else {
          if (
            Math.abs(marginLeftValue) < Math.abs(check) === false &&
            menuWidth?.offsetWidth - menuContainerWidth < menuItems.scrollWidth
          ) {
            menuItems.style.marginLeft = -check + "px";
            document.querySelector(".slide-right")?.classList.add("d-none");
          } else {
            menuItems.style.marginLeft = 0;
          }
        }
      });

      if (
        !document.body.classList.contains("login-img") &&
        !document.body.classList.contains("error-bg")
      ) {
        this.checkHoriMenu();
      }

      slideLeft.addEventListener("click", () => {
        slideClick();
        let menuWidth = document.querySelector(".hor-menu");
        let menuItems = document.querySelector(".menu-nav");
        let mainSidemenuWidth = document.querySelector(".main-body-1");
        let menuContainerWidth =
          menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
        let marginLeftValue =
          Math.ceil(
            Number(window.getComputedStyle(menuItems).marginLeft.split("px")[0])
          ) + 100;
        let marginRightValue =
          Math.ceil(
            Number(
              window.getComputedStyle(menuItems).marginRight.split("px")[0]
            )
          ) + 100;

        if (document.querySelector("html").getAttribute("dir") === "rtl") {
          if (marginRightValue < 0) {
            menuItems.style.marginLeft = "0px";
            menuItems.style.marginRight =
              Number(menuItems.style.marginRight.split("px")[0]) + 100 + "px";
            document.querySelector(".slide-right")?.classList.remove("d-none");
            document.querySelector(".slide-left")?.classList.remove("d-none");
          } else {
            document.querySelector(".slide-left")?.classList.add("d-none");
          }

          if (marginRightValue >= 0) {
            menuItems.style.marginLeft = "0px";
            menuItems.style.marginRight = "0px";
          }

          // to remove dropdown when clicking arrows in horizontal menu
          let subNavSub = document.querySelectorAll(".sub-nav-sub");
          subNavSub.forEach((e) => {
            e.style.display = "";
          });
          let subNav = document.querySelectorAll(".nav-sub");
          subNav.forEach((e) => {
            e.style.display = "";
          });
        } else {
          if (marginLeftValue < 0) {
            menuItems.style.marginLeft =
              Number(menuItems.style.marginLeft.split("px")[0]) + 100 + "px";
            if (
              menuWidth?.offsetWidth - menuContainerWidth <
              menuItems.scrollWidth
            ) {
              document.querySelector(".slide-left")?.classList.remove("d-none");
              document
                .querySelector(".slide-right")
                ?.classList.remove("d-none");
            }
          } else {
            document.querySelector(".slide-left")?.classList.add("d-none");
          }
          if (marginLeftValue >= 0) {
            menuItems.style.marginLeft = "0px";
            if (menuWidth?.offsetWidth < menuItems.scrollWidth) {
              document.querySelector(".slide-left")?.classList.add("d-none");
            }
          }
          // to remove dropdown when clicking arrows in horizontal menu
          let subNavSub = document.querySelectorAll(".sub-nav-sub");
          subNavSub.forEach((e) => {
            e.style.display = "";
          });
          let subNav = document.querySelectorAll(".nav-sub");
          subNav.forEach((e) => {
            e.style.display = "";
          });
        }
      });
      slideRight.addEventListener("click", () => {
        slideClick();
        let menuWidth = document.querySelector(".hor-menu");
        let menuItems = document.querySelector(".menu-nav");
        let mainSidemenuWidth = document.querySelector(".main-body-1");
        let menuContainerWidth =
          menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
        let marginLeftValue =
          Math.ceil(
            Number(window.getComputedStyle(menuItems).marginLeft.split("px")[0])
          ) - 100;
        let marginRightValue =
          Math.ceil(
            Number(
              window.getComputedStyle(menuItems).marginRight.split("px")[0]
            )
          ) - 100;
        let check =
          menuItems.scrollWidth +
          (0 - menuWidth?.offsetWidth) +
          menuContainerWidth;

        if (document.querySelector("html").getAttribute("dir") === "rtl") {
          if (marginRightValue > -check) {
            menuItems.style.marginLeft = "0px";
            menuItems.style.marginRight =
              Number(menuItems.style.marginRight.split("px")[0]) - 100 + "px";
          } else {
            menuItems.style.marginLeft = "0px";
            menuItems.style.marginRight = -check + "px";
            document.querySelector(".slide-right")?.classList.add("d-none");
            document.querySelector(".slide-left")?.classList.remove("d-none");
          }

          if (marginRightValue !== 0) {
            document.querySelector(".slide-left")?.classList.remove("d-none");
          }
          // to remove dropdown when clicking arrows in horizontal menu
          let subNavSub = document.querySelectorAll(".sub-nav-sub");
          subNavSub.forEach((e) => {
            e.style.display = "";
          });
          let subNav = document.querySelectorAll(".nav-sub");
          subNav.forEach((e) => {
            e.style.display = "";
          });
        } else {
          if (marginLeftValue > -check) {
            // menuItems.style.marginRight = 0;
            menuItems.style.marginLeft =
              Number(menuItems.style.marginLeft.split("px")[0]) - 100 + "px";
          } else {
            // menuItems.style.marginRight = 0;
            menuItems.style.marginLeft = -check + "px";
            document.querySelector(".slide-right")?.classList.add("d-none");
          }
          if (marginLeftValue !== 0) {
            document.querySelector(".slide-left")?.classList.remove("d-none");
          }
          // to remove dropdown when clicking arrows in horizontal menu
          let subNavSub = document.querySelectorAll(".sub-nav-sub");
          subNavSub.forEach((e) => {
            e.style.display = "";
          });
          let subNav = document.querySelectorAll(".nav-sub");
          subNav.forEach((e) => {
            e.style.display = "";
          });
          //
        }
      });
    },
    responsiveSidebarclose() {
      //leftsidemenu
      document.querySelector(".main-body").classList.remove("sidenav-toggled");
      //rightsidebar
      // document.querySelector(".sidebar-right").classList.remove("sidebar-open");
      //swichermainright
      document.querySelector(".demo_changer").classList.remove("active");
      document.querySelector(".demo_changer").style.right = "-270px";
    },
    //stick-pin
  },
  mounted() {
    this.localStorageBackUp();
  },
};
</script>

<style></style>
