<template>
  <div @click="scrollToTop()"  :class="['back-to-top-btn', isTop ?  'go-top':'' ]">
    <div><i class="fe fe-arrow-up fs-14"></i></div>
    <i class="ri-arrow-up-s-line"></i>
  </div>
</template>
<script>
export default {
  name: "BackToTop",
  data() {
    return {
      isTop: false,
    };
  },
  methods: {
    scrollToTop() {
      document.documentElement.scrollTo(0, 0);
    },
    debounce(fn, delay) {
      let timeoutID;
      return function (...args) {
        if (timeoutID) {
          clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
          fn(...args);
        }, delay);
      };
    },

  },
  mounted() {
    let scrollpage;
    if (window) {
      scrollpage = window;
    }
    else {
      scrollpage = document.documentElement;
    }
    scrollpage.addEventListener("scroll", this.debounce(e => {
      const that = this;
      let scrollPos = scrollpage.scrollY;
      if (scrollPos >= 90) {
        that.isTop = true;
      } else {
        that.isTop = false;
      }
    }, 1000));
  },
};
</script>

<style lang="scss">
.back-to-top-btn {
  position: fixed;
  cursor: pointer;
  color: #ffffff;
  background-color: #E66239;
  z-index: 4;
  width: 40px;
  height: 40px;
  opacity: 0;
  visibility: hidden;
  border-radius: 5px;
  bottom: 123px;
  left: 34px;
  font-size: 20px;
  transition: 0.6s;
  overflow: hidden;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);

  i {
    position: absolute;
    right: 0;
    left: 0;
    top: 45%;
    transform: translateY(-45%);
    text-align: center;
    font-size: 20px;
    margin-left: auto;
    margin-right: auto;
  }
  &.go-top {
    opacity: 1;
    visibility: visible;
  }
  &:hover {
    background-color: #fff;
    border: 1px solid #E66239;
    color: #E66239;
    transition: 0.6s;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    // transform: translateY(-5px);
  }
}

.rtl {
  .back-to-top-btn {
    left: 34px;
    right: inherit;
  }
}
</style>
