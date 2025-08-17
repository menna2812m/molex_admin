<template>
  <div class="main-header side-header sticky">
    <div class="main-container container-fluid">
      <div class="main-header-left">
        <a
          class="main-header-menu-icon"
          href="javascript:;"
          id="mainSidebarToggle"
          v-on:click="HeaderToggleButton()"
          ><span></span
        ></a>
        <div class="hor-logo">
          <router-link class="main-logo" :to="`${url}admin`">
            <img
              src="../../../../src/assets/img/logo-dark.png"
              class="header-brand-img desktop-logo"
              alt="logo"
              v-if="!isDark"
            />
            <img
              src="../../../../src/assets/img/logo.png"
              class="header-brand-img desktop-logo-dark"
              alt="logo"
              v-if="isDark"
            />
          </router-link>
        </div>
      </div>
      <div class="w-50 me-auto">
        <div class="position-relative search mt-2">
          <div class="w-100 d-flex mx-auto align-center paddinginput">
            <input
              type="text"
              class="searchTerm"
              placeholder=" ابحث برقم الطلب"
              @keyup.enter="performSearch"
              v-model="searchQuery"
            />
            <button type="submit" class="searchButton" @click="performSearch">
              <i class="fa fa-search fs-6 pb-3"></i>
            </button>
          </div>
          <div class="searchdiv" v-if="show">
            <div
              class="d-flex py-2 border-b"
              v-for="oneitem in resultsearch"
              :key="oneitem.id"
            >
              <h4
                class="pr-2"
                @click="detail(oneitem.id)"
                style="cursor: pointer"
              >
                {{ oneitem.order_id }}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <ThemeToggle class="me-3" />
        <div class="avatar-select d-flex gap-1">
          <i
            data-v-fe05682f=""
            class="mdi mdi-account-plus icon_color icon_color_2"
          ></i>
          <button
            @click="toggleDropdown"
            class="twobtn bg-transparent text-primary"
          >
            مدير المتجر <i class="fas fa-caret-down ms-1"></i>
          </button>

          <div class="text-start dropend mt-1" v-if="isDropdownOpen">
            <a class="dropdown-item" @click="profile">
              <i class="fe fe-user"></i>
              الملف الشخصي
            </a>
            <a class="dropdown-item text-danger" @click="logout">
              <i class="fe fe-log-in"></i>
              تسجيل الخروج
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import crudDataService from "../../../Services/crudDataService.js";
import ThemeToggle from "../ThemeToggle/ThemeToggle.vue";

export default {
  data() {
    return {
      url: import.meta.env.BASE_URL,
      isDropdownOpen: false,
      resultsearch: [],
      show: false,
      searchQuery: "",
    };
  },
  name: "Header",

  methods: {
    detail(id) {
      this.$router.push({ name: "SingleOrder", params: { id } });
      this.show = false;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    async performSearch() {
      // Logic to perform the search
      console.log("Searching for:", this.searchQuery);
      // Add your API call or search logic here
      let res = await crudDataService.getAll(
        `orders?filter[order_id]=${this.searchQuery}`
      );
      console.log(res.data.data.data);
      if (res.data.data.data.length > 0) {
        this.resultsearch = res.data.data.data;
        this.show = true;
      } else {
        this.show = false;
      }
    },
    async logout() {
      let res = await crudDataService.create("logout", ``);
      localStorage.clear();
      this.$router.push({
        name: "SignIn",
      });
    },
    async profile() {
      this.$router.push({
        name: "Profile",
      });
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    HeaderToggleButton() {
      let body = document.body;
      let innerWidth = window.innerWidth;
      if (body !== !body) {
        if (innerWidth >= 992) {
          document.body?.classList.toggle("main-sidebar-hide");
          document.body?.classList.remove("main-sidebar-show");
        } else if (document.body.classList.contains("horizontalmenu")) {
          document.body?.classList.toggle("main-navbar-show");
          document.body?.classList.remove("main-sidebar-show");
          document.body?.classList.remove("main-sidebar-hide");
        } else {
          document.body?.classList.toggle("main-sidebar-show");
          document.body?.classList.remove("main-sidebar-hide");
        }
      }
    },
  },
  components: {
    ThemeToggle,
  },
};
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 1px solid #fd601f;
  border-left: none;
  border-radius: 0 5px 5px 0;
  outline: none;
  color: #9dbfaf;
}

.searchTerm:focus {
  color: #fd601f;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #fd601f;
  background: #fd601f;
  text-align: center;
  color: #fff;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
  font-size: 20px;
}
.icon_color {
  padding: 12px;
  border-radius: 50%;
  height: 40px;
  padding-right: 13px;

  &.icon_color_2 {
    color: #929aff;
    background: #e7faff;
  }
}
.avatar-select select {
  border: none;
}
</style>
