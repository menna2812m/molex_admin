<template>
  <div class="page main-signin-wrapper bg-primary construction">
    <div class="d-flex header-setting-icon demo-icon fa-spin">
      <a class="nav-link icon" href="javascript:;">
        <i class="fe fe-settings settings-icon" v-on:click="Switcherbutton()"> </i>
      </a>
    </div>
    <div class="container">
      <div
        class="construction1 text-center details text-white pt-3 pt-sm-0"
        v-on:click="Removebutton()"
      >
        <div class="">
          <img src="../../../assets/img/brand/lds-logo-inverted.png" class="mb-5" alt="logo" />
          <h4 class="text-center text-white tx-30 font-weight-bold">
            We are Comming soon
          </h4>
          <p class="text-white-50 tx-15">
            We're making the system more awesome.we'll be back shortly.
          </p>

          <div>
            <vue-countdown
              id="launch_date"
              class="info"
              :time="2 * 24 * 60 * 60 * 1000"
              v-slot="{ days, hours, minutes, seconds }"
            >
              <!-- Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, -->
              <div class="countdown mb-4">
                <li>
                  {{ days }}
                  <p>days</p>
                </li>
                <li>
                  {{ hours }}
                  <p>hours</p>
                </li>
                <li>
                  {{ minutes }}
                  <p>minutes</p>
                </li>
                <li>
                  {{ seconds }}
                  <p>seconds</p>
                </li>
              </div>
            </vue-countdown>
          </div>
        </div>
        <div class="text-center">
          © 2020 <a href="https://www.spruko.com/" class="text-white-50">Spruko</a> All
          rights reserved.
        </div>
      </div>
    </div>
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
