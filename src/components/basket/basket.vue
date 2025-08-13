<template>
  <section class="mt-5">
    <div class="">
      <remember v-if="perminlocal.includes('cart_reminders-store')" />
    </div>

    <div class="border-0 mg-b-20">
      <div class="p-4 px-0">
        <h5 class="mb-4" style="color: #fe7eae">تذكرات السلات المتروكة</h5>
        <tablereminder />
      </div>
    </div>
    <tableforbasket />
  </section>
</template>

<script>
import remember from "./remember.vue";
import tablereminder from "./tablereminder.vue";
import tableforbasket from "./tableforbasket.vue";
export default {
  components: {
    tableforbasket,
    remember,
    tablereminder,
  },
  data() {
    return {
      perminlocal: localStorage.getItem("permissions"),
    };
  },
  methods: {
    newcampaign() {},
  },
};
</script>
