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
                <div class="text-center welcome-section">
                  <h3 class="text-white fw-bold mb-3">
                    مرحباً بك في لوحة التحكم
                  </h3>
                  <p class="text-white-75 mb-4 px-3">
                    يرجى تسجيل الدخول للوصول إلى لوحة تحكم الأدمن
                  </p>
                  <div class="welcome-divider mx-auto"></div>
                </div>
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
                    <div class="text-center mb-4">
                      <h4 class="text-primary mb-2 fw-bold">تسجيل الدخول</h4>
                      <p class="text-muted">
                        ادخل بياناتك للوصول إلى لوحة التحكم
                      </p>
                    </div>
                    <form action="#" @submit.prevent="handleLogin()">
                      <div class="form-group text-start mb-4">
                        <label class="form-label fw-semibold mb-2"
                          >البريد الإلكتروني</label
                        >
                        <input
                          name="email"
                          type="email"
                          v-model="form.email"
                          class="form-control form-control-lg"
                          placeholder="ex@email.com"
                        />
                      </div>
                      <div class="form-group text-start mb-4">
                        <label class="form-label fw-semibold mb-2"
                          >كلمة السر</label
                        >
                        <input
                          type="password"
                          name="password"
                          v-model="form.password"
                          class="form-control form-control-lg"
                          placeholder="*******"
                        />
                      </div>
                      <div class="error-message mb-3" v-if="errorvalidation">
                        <p
                          class="text-danger text-center p-3 bg-danger-subtle rounded"
                        >
                          {{ errorvalidation }}
                        </p>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg m-auto d-flex align-items-center justify-content-center w-100 py-3 fw-semibold"
                        :disabled="loading"
                      >
                        <span
                          v-if="loading"
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span v-if="loading">جاري تسجيل الدخول...</span>
                        <span v-if="!loading">تسجيل الدخول</span>
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
import { updateAxiosToken } from "../../../axios.js";

export default {
  mixins: [themeMixin],

  data() {
    return {
      errorvalidation: "",
      loading: false,
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
      this.loading = true;
      this.errorvalidation = "";

      await crudDataService
        .create("login", this.form)
        .then((response) => {
          const token = response.data.data.token;

          // Store authentication data
          localStorage.setItem("authlocal", token);

          // Update axios token
          updateAxiosToken(token);

          // Store permissions
          response.data.data.admin.role[0].permissions.forEach((element) => {
            this.permissions.push(element.name);
          });
          localStorage.setItem("permissions", this.permissions);

          // Navigate to dashboard
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
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.welcome-section {
  margin: 2rem 0;
}

.welcome-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #fff, #ffffff80);
  border-radius: 2px;
}

.text-white-75 {
  color: rgba(255, 255, 255, 0.85) !important;
}

.form-control-lg {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.form-control-lg:focus {
  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);
  border-color: var(--bs-primary);
}

.form-label {
  color: #495057;
  margin-bottom: 0.5rem;
}

.btn-lg {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(var(--bs-primary-rgb), 0.3);
}

.btn-primary:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  transform: none;
}

.btn-primary:disabled:hover {
  transform: none;
  box-shadow: none;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.error-message {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-danger-subtle {
  background-color: #f8d7da !important;
  border: 1px solid #f5c2c7;
}

.card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 991.98px) {
  .welcome-section h3 {
    font-size: 1.5rem;
  }

  .welcome-section p {
    font-size: 0.9rem;
  }
}
</style>
