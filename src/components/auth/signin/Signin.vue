<template>
  <div class="page main-signin-wrapper">
    <!-- Row -->
    <div class="row signpages text-center">
      <div class="col-md-12 my-auto">
        <div class="card">
          <div class="d-flex">
            <div
              class="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary-05"
            >
              <div
                class="mt-2 p-2 d-flex justify-content-between flex-column align-items-center"
              >
                <img
                  src="../../../assets/img/logo.png"
                  class="header-brand-img mb-4"
                  alt="logo"
                  v-if="isDark"
                />
                <img
                  src="../../../assets/img/logo-dark.png"
                  class="header-brand-img mb-4"
                  alt="logo"
                  v-if="!isDark"
                />
                <div class="clearfix"></div>
                <img
                  src="../../../assets/img/svgs/user.svg"
                  class="ht-100 mb-0"
                  alt="user"
                />
                <!-- <h5 class="mt-4 text-white">Create Your Account</h5> -->
                <!-- <span class="tx-white-6 tx-13 mb-5 mt-xl-0"
                    >Signup to create, discover and connect with the global community</span
                  > -->
              </div>
            </div>
            <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form">
              <div class="main-container container-fluid">
                <div class="row row-sm">
                  <div class="card-body mt-2 mb-2">
                    <img
                      src="../../../assets/img/logo.png"
                      class="d-lg-none header-brand-img text-start float-start error-logo-light mb-4"
                      alt="logo"
                    />
                    <img
                      src="../../../assets/img/logo.png"
                      class="d-lg-none header-brand-img text-start float-start error-logo mb-4"
                      alt="logo"
                      v-if="isDark"
                    />
                    <img
                      src="../../../assets/img/logo-dark.png"
                      class="d-lg-none header-brand-img text-start float-start error-logo mb-4"
                      alt="logo"
                      v-if="!isDark"
                    />
                    <div class="clearfix"></div>
                    <form action="#" @submit.prevent="handleLogin()">
                      <div class="form-group text-start">
                        <label>البريد الإلكتروني</label>
                        <input
                          name="email"
                          type="email"
                          v-model="form.email"
                          class="form-control"
                          placeholder="ex@email.com"
                        />
                      </div>
                      <div class="form-group text-start">
                        <label>كلمة السر </label>
                        <input
                          type="password"
                          name="password"
                          v-model="form.password"
                          class="form-control"
                          placeholder="*******"
                        />
                      </div>
                      <p class="text-danger" v-if="errorvalidation">
                        {{ errorvalidation }}
                      </p>
                      <button
                        type="submit"
                        class="btn ripple btn-primary btn-block"
                      >
                        تسجيل الدخول
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Row -->
  </div>
</template>
<script>
import { error } from "jquery";
import crudDataService from "../../../Services/crudDataService.js";
import { themeMixin } from "../../../mixins/themeMixin.js";
export default {
  mixins: [themeMixin],

  data() {
    return {
      errorvalidation: "",
      url: import.meta.env.BASE_URL,
      form: {
        email: "",
        password: "",
      },
      permissions: [],
    };
  },
  methods: {
    Switcherbutton() {
      return this.$store.commit("Switcherbutton");
    },
    async handleLogin() {
      await crudDataService
        .create("login", this.form)
        .then((response) => {
          localStorage.setItem("authlocal", response.data.data.token);
          response.data.data.admin.role[0].permissions.forEach((element) => {
            this.permissions.push(element.name);
            localStorage.setItem("permissions", this.permissions);
          });

          this.$router.push({ name: "Dashboard" });

          setTimeout(() => {
            window.location.reload();
          }, 800);
        })
        .catch((error) => {
          if (error.data.errors.length > 0) {
            this.errorvalidation = Object.values(error.data.errors)
              .flat()
              .join(" | ");
          } else {
            this.errorvalidation = error.data.message;
          }
        });
    },
  },
};
</script>

<style></style>
