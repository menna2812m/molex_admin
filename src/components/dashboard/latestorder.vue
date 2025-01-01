<template>
  <div class="card custom-card border-0 mt-4">
    <div class="card-header header-notifi p-4 pb-0 bg-transparent">
      <h5 class="mb-0">
        <i class="fa fa-bell notifi"></i>
        احدث الطلبات
      </h5>
    </div>
    <div class="card-body">
      <ul class="list-unstyled px-0">
        <li
          v-for="(item, index) in myList"
          :key="index"
          class="list_item py-3 w-100 align-items-center justify-content-between"
        >
          <div class="d-flex">
            <i :class="item.icon"></i>
            <div>
              <h5 class="ps-2 mb-0">
                {{ item.name }}
              </h5>
              <div class="d-flex justify-content-between">
                <span class="text-secondary">
                  <i class="typcn typcn-location text-black"></i>
                  {{ item.location }}
                </span>
                <span class="text-secondary">
                  {{ item.code }}
                </span>
              </div>
            </div>
          </div>
          <div>
            <p :class="[item.stat, 'mb-0']">
              <i :class="item.status_icon"></i>
              {{ item.status }}
            </p>
          </div>
          <span style="color: #fb99bf">{{ item.price }}</span>
          <span class="text-secondary">{{ item.span }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myList: [
        {
          icon: "mdi mdi-account-plus icon_color icon_color_1",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record success",
          status: "تم التنفيذ ",
          location: "الرياض",
          code: "#123456",
          stat: "success",
        },
        {
          icon: "mdi mdi-account-plus icon_color icon_color_2",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record faild",
          status: "ملغي ",
          location: "الرياض",
          code: "#123456",
          stat: "faild",
        },
        {
          icon: "mdi mdi-account-plus icon_color icon_color_3",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record progres",
          status: "بانتظار المراجعه",
          location: "الرياض",
          code: "#123456",
          stat: "progres",
        },
        {
          icon: "mdi mdi-account-plus icon_color icon_color_4",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record success",
          status: "تم التنفيذ ",
          location: "الرياض",
          code: "#123456",
          stat: "success",
        },
        {
          icon: "mdi mdi-account-plus icon_color icon_color_2",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record progres",
          status: "بانتظار المراجعه",
          location: "الرياض",
          code: "#123456",
          stat: "progres",
        },
        {
          icon: "mdi mdi-account-plus icon_color icon_color_3",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record faild",
          status: "ملغي ",
          location: "الرياض",
          code: "#123456",
          stat: "faild",
        },
        {
          icon: "mdi mdi-account-plus icon_color icon_color_4",
          name: " عبد الرحمن محمد",
          span: "منذ 14 ساعة",
          price: " 1500 ر.س   ",
          status_icon: "typcn typcn-media-record progres",
          status: "بانتظار المراجعه",
          location: "الرياض",
          code: "#123456",
          stat: "progres",
        },
      ],
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
  .list_item:not(:last-child) {
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
  .progres {
    color: #E66239;
    font-weight: 600;
    font-size: 16px;
  }
  .faild {
    color: #ff6060;
    font-weight: 600;
    font-size: 16px;
  }
  .success {
    color: #62d56d;
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
