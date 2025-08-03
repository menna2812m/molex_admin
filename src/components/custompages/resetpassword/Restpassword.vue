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
              <div class="mt-4 pt-5 p-2 pos-absolute">
                <img
                  src="../../../assets/icons/logo.png"
                  class="header-brand-img mb-4"
                  alt="logo"
                />
                <div class="clearfix"></div>
                <img
                  src="../../../assets/img/svgs/user.svg"
                  class="ht-100 mb-0"
                  alt="user"
                />
                <h5 class="mt-4 text-white">Reset Your Password</h5>
                <span class="tx-white-6 tx-13 mb-5 mt-xl-0"
                  >Signup to create, discover and connect with the global
                  community</span
                >
              </div>
            </div>
            <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form">
              <div class="main-container container-fluid">
                <div class="row row-sm">
                  <div class="card-body mt-2 mb-2">
                    <img
                      src="../../../assets/icons/logo.png"
                      class="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light"
                      alt="logo"
                    />
                    <img
                      src="../../../assets/icons/logo.png"
                      class="d-lg-none header-brand-img text-start float-start mb-4 error-logo"
                      alt="logo"
                    />
                    <div class="clearfix"></div>
                    <h5 class="text-start mb-2">Reset Your Password</h5>
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
                        />
                      </div>
                      <div class="form-group text-start">
                        <label>New Password</label>
                        <input
                          class="form-control"
                          placeholder="Enter your password"
                          type="password"
                        />
                      </div>
                      <div class="form-group text-start">
                        <label>Confirm Password</label>
                        <input
                          class="form-control"
                          placeholder="Enter your password"
                          type="password"
                        />
                      </div>
                      <button class="btn ripple btn-primary btn-block">
                        Reset Password
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
export default {
  methods: {
    Switcherbutton() {
      return this.$store.commit("Switcherbutton");
    },
    Removebutton() {
      return this.$store.commit("Removebutton");
    },
  },
};
</script>

<style></style>
