<template>
  <div class="page main-signin-wrapper">
    <div class="d-flex header-setting-icon demo-icon fa-spin">
      <a class="nav-link icon" href="javascript:;">
        <i
          class="fe fe-settings settings-icon"
          v-on:click="Switcherbutton()"
        ></i>
      </a>
    </div>
    <!-- Row -->
    <div class="row signpages text-center" v-on:click="Removebutton()">
      <div class="col-md-12 my-auto">
        <div class="card">
          <div class="row row-sm">
            <div
              class="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details"
            >
              <div class="mt-3 pt-3 p-2 pos-absolute">
                <img
                  src="../../../assets/img/logo.png"
                  class="header-brand-img"
                  alt="logo"
                  v-if="isDark"
                />
                <img
                  src="../../../assets/img/logo-dark.png"
                  class="header-brand-img"
                  alt="logo"
                  v-if="!isDark"
                />
                <div class="clearfix"></div>
                <img
                  src="../../../assets/img/svgs/user.svg"
                  class="ht-100 mb-0"
                  alt="user"
                />
                <h5 class="mt-4 text-white">Reset Your Password</h5>
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
                      class="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light"
                      alt="logo"
                    />
                    <img
                      src="../../../assets/img/logo.png"
                      class="d-lg-none header-brand-img text-start float-start mb-4 error-logo"
                      alt="logo"
                      v-if="isDark"
                    />
                    <img
                      src="../../../assets/img/logo-dark.png"
                      class="d-lg-none header-brand-img text-start float-start mb-4 error-logo"
                      alt="logo"
                      v-if="!isDark"
                    />
                    <div class="clearfix"></div>
                    <h5 class="text-start mb-2">Forgot Password</h5>
                    <p class="mb-4 text-muted tx-13 ms-0 text-start">
                      It's free to signup and only takes a minute.
                    </p>
                    <form>
                      <div class="form-group text-start">
                        <label>Email</label>
                        <input
                          class="form-control"
                          placeholder="Enter your email"
                          type="text"
                          value=""
                        />
                        <button class="btn ripple btn-primary btn-block mt-2">
                          Request reset link
                        </button>
                      </div>
                    </form>

                    <div class="card-footer border-top-0 ps-0 mt-3 text-start">
                      <p>Did you remembered your password?</p>
                      <p class="mb-0">
                        Try to <router-link to="signin">Signin</router-link>
                      </p>
                    </div>
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
import { themeMixin } from "../../../mixins/themeMixin";

export default {
  mixins: [themeMixin],

  methods: {
    Switcherbutton() {
      return this.$store.commit("Switcherbutton");
    },
    Removebutton() {
      return this.$store.commit("Removebutton");
    },
  },
  data() {
    return {
      url: import.meta.env.BASE_URL,
    };
  },
};
</script>

<style></style>
