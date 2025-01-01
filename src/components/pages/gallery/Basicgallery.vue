<template>
  <ul id="lightgallery" class="list-unstyled row mb-0">
    <li
      class="col-xs-6 col-sm-4 col-md-4 col-xl-4 mb-3"
      data-responsive="../assets/img/media/1.jpg"
      data-src="../assets/img/media/1.jpg"
      data-sub-html="<h4>Gallery Image 1</h4><p> Many desktop publishing packages and web page editors now use Lorem Ipsum</p>"
      v-for="(src, index) in imgs"
      :key="index"
      @click="() => showImg(index)"
    >
      <img :src="src" class="img-responsive" />
    </li>

    <vue-easy-lightbox
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    >
    </vue-easy-lightbox>
  </ul>
</template>

<script>
import image1 from "../../../assets/img/media/1.jpg";
import image2 from "../../../assets/img/media/2.jpg";
import image3 from "../../../assets/img/media/3.jpg";
import image4 from "../../../assets/img/media/4.jpg";
import image5 from "../../../assets/img/media/5.jpg";
import image6 from "../../../assets/img/media/6.jpg";
import image7 from "../../../assets/img/media/7.jpg";
import image8 from "../../../assets/img/media/8.jpg";
import image9 from "../../../assets/img/media/9.jpg";
export default {
  name: "App",
  data() {
    return {
      visible: false,
      index: 0, // default: 0
      imgs: [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image9,
        image8,
      ],
    };
  },
  methods: {
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    handleNext() {
      this.index >= this.imgs.length - 1 ? (this.index = 0) : (this.index += 1);
    },
    handlePrev() {
      this.index <= 0 ? (this.index = this.imgs.length - 1) : (this.index -= 1);
    },
  },
  mounted() {
    window.addEventListener("keyup", (event) => {
      if (event.keyCode === 37) this.handlePrev();
      if (event.keyCode === 39) this.handleNext();
    });
  },
};
</script>

<style></style>
