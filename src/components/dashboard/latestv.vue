<template>
    <section>
    <div class="card custom-card border-0 mt-xl-0 mt-4">
    <div class="card-header header-notifi p-4 pb-0 bg-transparent">
      <h5 class="mb-0">
        <img src="../../assets/img/bell-badge.png" alt="" />
        التنبيهات
      </h5>
    </div>
    <div class="card-body">
      <ul class="list-unstyled px-0">
        <li v-for="(item, index) in myList" :key="index" class="list_item py-3 w-100 justify-content-between">
          <div class="d-flex align-items-center">
         <i :class="item.icon"></i>
<div>
    <h5  class="ps-2">
            {{ item.name }}
            <span class="fw-normal fs-6 text-secondary">{{ item.text }}</span>
          </h5>
          <span class="text-secondary ps-3">{{ item.span }}</span>
        
</div>
            </div>
        
          <img :src="item.imageUrl" />
        </li>
      </ul>
    </div>
  </div>
  <div class="card custom-card border-0  mt-4">
    <div class="card-header heder-finished p-4 pb-0 bg-transparent">
      <h5 class="mb-0">
        <i class="fa fa-bell notifi"></i>
        منتجات نفذت
      </h5>
    </div>
    <div class="card-body listoffinished">
      <ul class="list-unstyled px-0">
        <li v-for="(item, index) in finished" :key="index" class="list_item py-3 w-100">
            <img :src="item.imageUrl" />
          <div class="ps-2">
            <h5 >
            {{ item.name }}
          </h5>
          <span class="text-secondary">{{ item.span }}</span>
          </div>
        
        
        </li>
      </ul>
    </div>
  </div>
    </section>
 
</template>

<script>
import myImage from '@/assets/img/nnw.png';
import image2 from "@/assets/img/aurelia-dubois-xzrJCS4grC4-unsplash.png"

export default {
  data() {
    return {
      myList: [
        {
          icon: "mdi mdi-account-plus icon_color icon_color_1",
          name: " عبد الرحمن محمد",
          text: "اضاف ساعة يد ماركة بولغاري للسلة",
          imageUrl: myImage,
          span: "منذ 14 ساعة",
       
        },
        {
            icon: "mdi mdi-account-plus icon_color icon_color_2",
          name: " عبد الرحمن محمد",
          text: "اضاف ساعة يد ماركة بولغاري للسلة",
          imageUrl: image2,
          span: "منذ 14 ساعة",
        },
        {
          icon: "mdi mdi-account-plus icon_color icon_color_3",
          name: " عبد الرحمن محمد",
          text: "اضاف ساعة يد ماركة بولغاري للسلة",
          imageUrl: image2,
          span: "منذ 14 ساعة",
        },
        {
            icon: "mdi mdi-account-plus icon_color icon_color_4",
          name: " عبد الرحمن محمد",
          text: "اضاف ساعة يد ماركة بولغاري للسلة",
          imageUrl: myImage,
          span: "منذ 14 ساعة",
        },
        {
            icon: "mdi mdi-account-plus icon_color icon_color_2",
          name: " عبد الرحمن محمد",
          text: "اضاف ساعة يد ماركة بولغاري للسلة",
          imageUrl: myImage,
          span: "منذ 14 ساعة",
        },
        {
            icon: "mdi mdi-account-plus icon_color icon_color_3",
          name: " عبد الرحمن محمد",
          text: "اضاف ساعة يد ماركة بولغاري للسلة",
          imageUrl: image2,
          span: "منذ 14 ساعة",
        },
        {
            icon: "mdi mdi-account-plus icon_color icon_color_4",
          name: " عبد الرحمن محمد",
          text: "اضاف ساعة يد ماركة بولغاري للسلة",
          imageUrl: image2,
          span: "منذ 14 ساعة",
        },
      ],
      finished:[
        {
          name: " ساعة يد ماركة بولغاري  ",
          imageUrl: myImage,
          span: " 111رس ",
       
        },
        {
          name: " ساعة يد ماركة بولغاري  ",
          imageUrl: myImage,
          span: " 111رس ",
       
        },
        {
          name: " ساعة يد ماركة بولغاري  ",
          imageUrl: myImage,
          span: " 111رس ",
       
        },
      ]
    };
  },
};
</script>

<style scoped lang="scss">
.custom-card {
  box-shadow: 1px 3px 20px 2px #e6edf0;
  border-radius: 15px;
  .card-header.header-notifi {
    color: #E66239;
    border-bottom: none;
  }
  .list_item:not(:last-child){
    border-bottom: 1px solid #e8e7ff;
  }
  .icon_color {
    padding: 12px;
    border-radius: 50%;
    height: 40px;
    padding-right: 13px;
    &.icon_color_1 {
      color: #929aff;
      background: #e8e7ff;
    }
    &.icon_color_2 {
      color: #929aff;
      background: #e7faff;
    }
    &.icon_color_3 {
      color: #ffd891;
      background: #fffde7;
    }
    &.icon_color_4 {
      color: #ff7f7f;
      background: #ffe7e7;
    }
   
  }
  .card-header.heder-finished  {
    color: #fe6c6c;
    border-bottom: none;
    .notifi{
    color: #fe6c6c;
    font-size: 22px;
  }
  }
 .listoffinished{

    h5{
    color: #fe6c6c;

    }
 }
}
</style>
